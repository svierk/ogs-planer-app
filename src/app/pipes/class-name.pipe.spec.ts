import { Class } from '../models/class';
import { ClassNamePipe } from './class-name.pipe';

describe('ClassNamePipe', () => {
  it('create an instance', () => {
    // given
    const pipe = new ClassNamePipe();

    // then
    expect(pipe).toBeTruthy();
  });

  it('should show class name', () => {
    // given
    const classId = '123';
    const classes: Class[] = [
      {
        id: 123,
        name: '1a',
      },
    ];
    const pipe = new ClassNamePipe();

    // then
    expect(pipe.transform(classId, classes)).toEqual('1a');
  });
});
