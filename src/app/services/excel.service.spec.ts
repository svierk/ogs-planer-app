import { TestBed } from '@angular/core/testing';
import { Child } from '../models/child';
import { ChildCourse } from '../models/child-course';
import { Class } from '../models/class';
import { Course } from '../models/course';
import { Days } from '../models/days';
import { ExcelService } from './excel.service';

const children: Child[] = [{ id: 123, firstName: 'test', lastName: 'child', classId: '123' }];
const classes: Class[] = [{ id: 123, name: '1a', lunchMonday: '11:00', homeworkMonday: '12:00' }];
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
const earlyCare: any[] = [
  {
    id: 123,
    childId: 123,
    earlyCareParticipationMonday: 1,
    earlyCareStartMonday: '1. Stunde',
  },
];
const lunch: any[] = [
  {
    id: 123,
    childId: 123,
    lunchParticipationMonday: 1,
    lunchNoteMonday: 'note',
  },
];
const homework: any[] = [
  {
    id: 123,
    childId: 123,
    homeworkParticipationMonday: 1,
    homeworkNoteMonday: 'note',
  },
];
const childCourses: ChildCourse[] = [{ id: 123, childId: 123, courseId: 123 }];
const pickup: any[] = [
  {
    id: 123,
    childId: 123,
    pickupTimeMonday: '12:00',
    pickupTypeMonday: 'Wird abgeholt',
    pickupNoteMonday: 'note',
  },
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
      courses: courses,
      earlyCare: earlyCare.find((item) => item.childId === children[0].id),
      lunch: lunch.find((item) => item.childId === children[0].id),
      homework: homework.find((item) => item.childId === children[0].id),
      childCourses: childCourses.filter((item) => item.childId === children[0].id),
      pickup: pickup.find((item) => item.childId === children[0].id),
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
      courses: courses,
      earlyCare: earlyCare.find((item) => item.childId === children[0].id),
      lunch: lunch.find((item) => item.childId === children[0].id),
      homework: homework.find((item) => item.childId === children[0].id),
      childCourses: childCourses.filter((item) => item.childId === children[0].id),
      pickup: pickup.find((item) => item.childId === children[0].id),
    });

    // then
    expect(service.exportActivities).toHaveBeenCalledTimes(1);
    expect(service.download).toHaveBeenCalledTimes(0);
  });
});
