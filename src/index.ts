import fs from 'fs';
import { promisify } from 'util';
const readFileAsync = promisify(fs.readFile);

const TodoTxtRegex = /(?:(?<completed>x )(?<date_1>[0-9]{4}-[0-9]{2}-[0-9]{2} )?)?(?:\((?<priority>[A-Z])\) )?(?<date_2>[0-9]{4}-[0-9]{2}-[0-9]{2} )?(?<body>.+)/;
const ContextRegex = /\s(@[^\s]+)/g;
const ProjectRegex = /\s(\+[^\s]+)\s/g;
const MetaRegex = (key : string) => new RegExp(`${key}:([^\s]+)`, 'g');


export async function parseFile(filePath : string) : Promise<Todo[]> {
  const content = await readFileAsync(filePath, 'utf-8');
  const lines = content.split('\n').filter(line => line.length > 0);
  let todos : Todo[] = [];
  lines.map(line => todos.push(new Todo(line)));
  return todos;
}

export class Todo {

  raw : string;
  complete : boolean;
  priority : PriorityLetter;
  date_completed: Date;
  date_created: Date;
  body : string;

  constructor(content : string) {
    this.raw = content;
    TodoTxtRegex.lastIndex = 0;
    const groups = TodoTxtRegex.exec(this.raw).groups;
    this.complete = groups['completed'] ? true : false;
    this.body = groups['body'];
    this.priority = groups['priority'] ? groups['priority'] as PriorityLetter : undefined;
    if (this.complete) {
      if (groups['date_1']) {
        this.date_completed = parseDate(groups['date_1']);
      }
      if (groups['date_2']) {
        this.date_created = parseDate(groups['date_2']);
      }
    } else {
      if (groups['date_1']) {
        this.date_created = parseDate(groups['date_1']);
      } else if (groups['date_2']) {
        this.date_created = parseDate(groups['date_2']);
      }
    }
  }

  toString() : string {
    return this.raw;
  }

  get projects() : string[] {
    let projects : string[] = [];
    let regexArray : RegExpExecArray;
    while ((regexArray = ProjectRegex.exec(this.body)) !== null) {
      projects.push(regexArray[1]);
    }
    return projects;
  }

  get contexts() : string[] {
    let contexts : string[] = [];
    let regexArray : RegExpExecArray;
    while ((regexArray = ContextRegex.exec(this.body)) !== null) {
      contexts.push(regexArray[1]);
    }
    return contexts;
  }

  getMeta(key : string) : string {
    const groups = MetaRegex(key).exec(this.body);
    return groups[1] ? groups[1] : "";
  }

}

// Parse a data in the xxxx-xx-xx format
function parseDate(str : string) : Date {
  let arr = str.split('-').map(s => parseInt(s));
  return new Date(arr[0], arr[1] - 1, arr[2]);
}

export type PriorityLetter = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K" | "L" | "M" | "N" | "O" | "P" | "Q" | "R" | "S" | "T" | "U" | "V" | "W" | "X" | "Y" | "Z";