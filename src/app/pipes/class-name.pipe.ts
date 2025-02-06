import { Pipe, PipeTransform } from '@angular/core';
import { Class } from '../models/class';

@Pipe({
  name: 'className',
  standalone: false,
})
export class ClassNamePipe implements PipeTransform {
  transform(classId: string, classes: Class[]): string | undefined {
    const classItem = classes.find((item) => item.id === +classId);
    return classItem?.name;
  }
}
