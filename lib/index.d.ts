export declare function parseFile(filePath: string): Promise<Todo[]>;
export declare class Todo {
    raw: string;
    complete: boolean;
    priority: PriorityLetter;
    date_completed: Date;
    date_created: Date;
    body: string;
    constructor(content: string);
    toString(): string;
    readonly projects: string[];
    readonly contexts: string[];
    getMeta(key: string): string;
}
export declare type PriorityLetter = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K" | "L" | "M" | "N" | "O" | "P" | "Q" | "R" | "S" | "T" | "U" | "V" | "W" | "X" | "Y" | "Z";
