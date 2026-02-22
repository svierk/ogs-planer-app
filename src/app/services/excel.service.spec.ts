import { TestBed } from '@angular/core/testing';
import { Child } from '../models/child';
import { ChildCourse } from '../models/child-course';
import { Class } from '../models/class';
import { ClassSchedule } from '../models/class-schedule';
import { Course } from '../models/course';
import { Days } from '../models/days';
import { EarlyCare } from '../models/early-care';
import { Homework } from '../models/homework';
import { Lunch } from '../models/lunch';
import { Pickup } from '../models/pickup';
import { ExcelService } from './excel.service';

const children: Child[] = [{ id: 123, firstName: 'test', lastName: 'child', classId: '123' }];
const classes: Class[] = [{ id: 123, name: '1a' }];
const classSchedules: ClassSchedule[] = [];
const courses: Course[] = [
  {
    id: 123,
    name: 'course',
    teacher: 'teacher',
    day: Days.Monday,
    start: 'start',
    end: 'end',
  },
];
const earlyCare: EarlyCare[] = [
  { id: 123, childId: 123, day: 'Montag', participation: 1, start: '1. Stunde' },
];
const lunch: Lunch[] = [
  { id: 123, childId: 123, day: 'Montag', participation: 1, note: 'note' },
];
const homework: Homework[] = [
  { id: 123, childId: 123, day: 'Montag', participation: 1, note: 'note' },
];
const childCourses: ChildCourse[] = [{ id: 123, childId: 123, courseId: 123 }];
const pickup: Pickup[] = [
  { id: 123, childId: 123, day: 'Montag', pickupTime: '12:00', pickupType: 'Wird abgeholt', note: 'note' },
];

describe('ExcelService', () => {
  let service: ExcelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExcelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should export excel', () => {
    // given
    spyOn(service, 'download');
    spyOn(service, 'export').and.callThrough();

    // when
    service.export([{ test: 'test' }], 'file name', 'heading');

    // then
    expect(service.export).toHaveBeenCalledTimes(1);
    expect(service.download).toHaveBeenCalledTimes(1);
  });

  it('should show error toast for empty list', () => {
    // given
    spyOn(service, 'download');
    spyOn(service, 'export').and.callThrough();

    // when
    service.export([], '', '');

    // then
    expect(service.export).toHaveBeenCalledTimes(1);
    expect(service.download).toHaveBeenCalledTimes(0);
  });

  it('should export activities excel', () => {
    // given
    spyOn(service, 'download');
    spyOn(service, 'exportActivities').and.callThrough();

    // when
    service.exportActivities({
      child: children[0],
      childClass: classes.find((c) => c.id === parseInt(children[0]?.classId as string)),
      classSchedules: classSchedules,
      courses: courses,
      earlyCare: earlyCare.filter((item) => item.childId === children[0].id),
      lunch: lunch.filter((item) => item.childId === children[0].id),
      homework: homework.filter((item) => item.childId === children[0].id),
      childCourses: childCourses.filter((item) => item.childId === children[0].id),
      pickup: pickup.filter((item) => item.childId === children[0].id),
    });

    // then
    expect(service.exportActivities).toHaveBeenCalledTimes(1);
    expect(service.download).toHaveBeenCalledTimes(1);
  });

  it('should show error toast for missing activities', () => {
    // given
    spyOn(service, 'download');
    spyOn(service, 'exportActivities').and.callThrough();

    // when
    service.exportActivities({});

    // then
    expect(service.exportActivities).toHaveBeenCalledTimes(1);
    expect(service.download).toHaveBeenCalledTimes(0);
  });

  it('should show error toast for missing class assignment', () => {
    // given
    spyOn(service, 'download');
    spyOn(service, 'exportActivities').and.callThrough();

    // when
    service.exportActivities({
      child: children[0],
      childClass: undefined,
      classSchedules: classSchedules,
      courses: courses,
      earlyCare: earlyCare.filter((item) => item.childId === children[0].id),
      lunch: lunch.filter((item) => item.childId === children[0].id),
      homework: homework.filter((item) => item.childId === children[0].id),
      childCourses: childCourses.filter((item) => item.childId === children[0].id),
      pickup: pickup.filter((item) => item.childId === children[0].id),
    });

    // then
    expect(service.exportActivities).toHaveBeenCalledTimes(1);
    expect(service.download).toHaveBeenCalledTimes(0);
  });
});
