import { List } from './list';

describe('List', () => {
  it('should create an instance', () => {
    expect(new List("To Do", ["Pay Electricity Bill", "Make Grocery List"])).toBeTruthy();
  });
});
