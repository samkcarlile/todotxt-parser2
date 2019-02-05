import Todo from '../index';
import examples from './cases';

describe('string -> todo', () => {
  test.each(examples)("%# - %s", (raw, expected) => {
    const todo = new Todo(raw);
    expect(expected).toMatchObject(todo);
  })
});