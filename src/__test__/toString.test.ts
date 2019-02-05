import Todo from '../index';
import examples from './cases';

describe('todo -> string', () => {
  test.each(examples)("%# - %s", (str, todo) => {
    let testTodo = new Todo();
    testTodo.body = todo.body;
    testTodo.date_created = todo.date_created;
    testTodo.date_completed = todo.date_completed;
    testTodo.priority = todo.priority;
    testTodo.complete = todo.complete;
    expect(testTodo.toString()).toEqual(str);
  })
});