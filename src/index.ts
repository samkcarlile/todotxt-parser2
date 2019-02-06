import fs from 'fs';
import { promisify } from 'util';
const readFileAsync = promisify(fs.readFile);

const TodoTxtRegex = /(?:(?<completed>x )(?<date_1>[0-9]{4}-[0-9]{2}-[0-9]{2} )?)?(?:\((?<priority>[A-Z])\) )?(?<date_2>[0-9]{4}-[0-9]{2}-[0-9]{2} )?(?<body>.+)/;
const ContextRegex = /\s(@\S+)/g;
const ProjectRegex = /\s(\+\S+)/g;
const MetaRegex = /\s(?:(?<key>[^\s:]+):(?<value>[^\s:]+))/g;


export async function parseFile(filePath: string): Promise<Todo[]> {
  const content = await readFileAsync(filePath, 'utf-8');
  const lines = content.split('\n').filter(line => line.length > 0);
  let todos: Todo[] = [];
  lines.map(line => todos.push(new Todo(line)));
  return todos;
}

export default class Todo {

  complete: boolean;
  priority: PriorityLetter;
  date_completed: Date;
  date_created: Date;
  body: string;
  meta: { [key: string]: string } = {};

  constructor(raw?: string) {
    if (raw) {
      Todo._parse(raw, this);
    } else {
      this.date_created = new Date();
    }
  }

  private static _parse(raw: string, todo: Todo) {
    TodoTxtRegex.lastIndex = 0;
    const groups = TodoTxtRegex.exec(raw).groups;
    todo.complete = groups['completed'] ? true : false;
    todo.priority = groups['priority'] ? groups['priority'] as PriorityLetter : undefined;
    if (todo.complete) {
      if (groups['date_1']) {
        todo.date_completed = parseDate(groups['date_1']);
      }
      // The parser forgives if there's not a creation date with the completion date
      if (groups['date_2']) {
        todo.date_created = parseDate(groups['date_2']);
      }
    } else {
      if (groups['date_1']) {
        todo.date_created = parseDate(groups['date_1']);
      } else if (groups['date_2']) {
        todo.date_created = parseDate(groups['date_2']);
      }
    }

    const bodyWithMeta = groups['body'];
    if (!bodyWithMeta) {
      throw 'Todo doesn\'t seem to have a body (or my regex failed in this specific case).';
    }

    let bodyNoMeta = bodyWithMeta;
    let match: RegExpExecArray;
    while ((match = MetaRegex.exec(bodyNoMeta)) !== null) {
      if (match.groups && match.groups['key'] && match.groups['value']) {
        const k = match.groups.key;
        const v = match.groups.value;
        todo.meta[k] = v;
        // remove this meta tag from body
        bodyNoMeta = bodyNoMeta.replace(`${k}:${v}`, '');
      }
    }

    todo.body = bodyNoMeta.trim();

    return todo;
  }

  toString(): string {
    let parts: string[] = [];
    if (this.complete) {
      parts.push('x');
      if (this.date_completed) {
        parts.push(formatDate(this.date_completed));
        // if (!this.date_created) throw 'A task with a completion date must also have a creation date!';
      }
    } else {
      this.priority && parts.push('(' + this.priority + ')');
    }

    this.date_created && parts.push(formatDate(this.date_created));
    parts.push(this.body);

    this.meta && Object.entries(this.meta).forEach(
      ([key, value]) => parts.push(key + ':' + value)
    );

    return parts.join(' ');
  }

  get projects(): string[] {
    let projects = new Set<string>();
    let regexArray: RegExpExecArray;
    while ((regexArray = ProjectRegex.exec(this.body)) !== null) {
      projects.add(regexArray[1]);
    }
    return Array.from(projects);
  }

  get contexts(): string[] {
    let contexts = new Set<string>();
    let regexArray: RegExpExecArray;
    while ((regexArray = ContextRegex.exec(this.body)) !== null) {
      contexts.add(regexArray[1]);
    }
    return Array.from(contexts);
  }

}

// Parse a data in the xxxx-xx-xx format
export function parseDate(str: string): Date {
  let arr = str.split('-').map(s => parseInt(s));
  return new Date(arr[0], arr[1] - 1, arr[2]);
}

// Convert date back to the xxxx-xx-xx format
function formatDate(d: Date): string {
  const year = d.getFullYear();
  const month = d.getMonth() < 9 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1) + '';
  const day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate() + '';
  return `${year}-${month}-${day}`;
}

export type PriorityLetter = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K" | "L" | "M" | "N" | "O" | "P" | "Q" | "R" | "S" | "T" | "U" | "V" | "W" | "X" | "Y" | "Z";