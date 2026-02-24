import { TestBed } from '@angular/core/testing';
import { Child } from '../models/child';
import { ChildCourse } from '../models/child-course';
import { Class } from '../models/class';
import { Course } from '../models/course';
import { Days } from '../models/days';
import { EarlyCare } from '../models/early-care';
import { Homework } from '../models/homework';
import { Lunch } from '../models/lunch';
import { Pickup } from '../models/pickup';
import { DbService } from './db.service';

describe('DbService', () => {
  let service: DbService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [],
    });
    service = TestBed.inject(DbService);
  });

  it('should be created', () => {
    // given
    const spy = spyOnProperty(service, 'isElectron').and.returnValue(true);

    // then
    expect(service.isElectron).toBe(true);
    expect(spy).toHaveBeenCalledWith();
  });

  describe('ipc renderer methods', () => {
    let mockIpcRenderer: jasmine.SpyObj<any>;

    beforeEach(() => {
      mockIpcRenderer = jasmine.createSpyObj('ipcRenderer', ['send', 'on']);
      service.ipcRenderer = mockIpcRenderer;
    });

    it('should call get children', () => {
      service.getChildren();

      expect(mockIpcRenderer.send).toHaveBeenCalledWith('getChildren');
    });

    it('should call create child', () => {
      const child: Child = { firstName: 'Max', lastName: 'Mustermann' };
      service.createChild(child);

      expect(mockIpcRenderer.send).toHaveBeenCalledWith('createChild', child);
    });

    it('should call update child', () => {
      const child: Child = { id: 1, firstName: 'Max', lastName: 'Mustermann' };
      service.updateChild(child);

      expect(mockIpcRenderer.send).toHaveBeenCalledWith('updateChild', child);
    });

    it('should call delete child', () => {
      service.deleteChild(1);

      expect(mockIpcRenderer.send).toHaveBeenCalledWith('deleteChild', 1);
    });

    it('should call get classes', () => {
      service.getClasses();

      expect(mockIpcRenderer.send).toHaveBeenCalledWith('getClasses');
    });

    it('should call create class', () => {
      const classItem: Class = { name: '1a' };
      service.createClass(classItem);

      expect(mockIpcRenderer.send).toHaveBeenCalledWith('createClass', classItem);
    });

    it('should call update class', () => {
      const classItem: Class = { id: 1, name: '1a' };
      service.updateClass(classItem);

      expect(mockIpcRenderer.send).toHaveBeenCalledWith('updateClass', classItem);
    });

    it('should call delete class', () => {
      service.deleteClass(1);

      expect(mockIpcRenderer.send).toHaveBeenCalledWith('deleteClass', 1);
    });

    it('should call get class schedules', () => {
      service.getClassSchedules();

      expect(mockIpcRenderer.send).toHaveBeenCalledWith('getClassSchedules');
    });

    it('should call get courses', () => {
      service.getCourses();

      expect(mockIpcRenderer.send).toHaveBeenCalledWith('getCourses');
    });

    it('should call create course', () => {
      const course: Course = { name: 'Kurs', teacher: 'Lehrer', day: Days.Monday, start: '14:00', end: '15:00' };
      service.createCourse(course);

      expect(mockIpcRenderer.send).toHaveBeenCalledWith('createCourse', course);
    });

    it('should call update course', () => {
      const course: Course = { id: 1, name: 'Kurs', teacher: 'Lehrer', day: Days.Monday, start: '14:00', end: '15:00' };
      service.updateCourse(course);

      expect(mockIpcRenderer.send).toHaveBeenCalledWith('updateCourse', course);
    });

    it('should call delete course', () => {
      service.deleteCourse(1);

      expect(mockIpcRenderer.send).toHaveBeenCalledWith('deleteCourse', 1);
    });

    it('should call get early care', () => {
      service.getEarlyCare();

      expect(mockIpcRenderer.send).toHaveBeenCalledWith('getEarlyCare');
    });

    it('should call create early care', () => {
      const items: EarlyCare[] = [{ childId: 1, day: 'Montag', participation: 1, start: '1. Stunde' }];
      service.createEarlyCare(items);

      expect(mockIpcRenderer.send).toHaveBeenCalledWith('createEarlyCare', items);
    });

    it('should call update early care', () => {
      const items: EarlyCare[] = [{ childId: 1, day: 'Montag', participation: 1, start: '1. Stunde' }];
      service.updateEarlyCare(items);

      expect(mockIpcRenderer.send).toHaveBeenCalledWith('updateEarlyCare', items);
    });

    it('should call get lunch', () => {
      service.getLunch();

      expect(mockIpcRenderer.send).toHaveBeenCalledWith('getLunch');
    });

    it('should call create lunch', () => {
      const items: Lunch[] = [{ childId: 1, day: 'Montag', participation: 1 }];
      service.createLunch(items);

      expect(mockIpcRenderer.send).toHaveBeenCalledWith('createLunch', items);
    });

    it('should call update lunch', () => {
      const items: Lunch[] = [{ childId: 1, day: 'Montag', participation: 1 }];
      service.updateLunch(items);

      expect(mockIpcRenderer.send).toHaveBeenCalledWith('updateLunch', items);
    });

    it('should call get homework', () => {
      service.getHomework();

      expect(mockIpcRenderer.send).toHaveBeenCalledWith('getHomework');
    });

    it('should call create homework', () => {
      const items: Homework[] = [{ childId: 1, day: 'Montag', participation: 1 }];
      service.createHomework(items);

      expect(mockIpcRenderer.send).toHaveBeenCalledWith('createHomework', items);
    });

    it('should call update homework', () => {
      const items: Homework[] = [{ childId: 1, day: 'Montag', participation: 1 }];
      service.updateHomework(items);

      expect(mockIpcRenderer.send).toHaveBeenCalledWith('updateHomework', items);
    });

    it('should call get child courses', () => {
      service.getChildCourses();

      expect(mockIpcRenderer.send).toHaveBeenCalledWith('getChildCourses');
    });

    it('should call create child courses', () => {
      const courseInfo: ChildCourse[] = [{ childId: 1, courseId: 1 }];
      service.createChildCourses(courseInfo);

      expect(mockIpcRenderer.send).toHaveBeenCalledWith('createChildCourses', courseInfo);
    });

    it('should call update child courses with courses array', () => {
      const courses: ChildCourse[] = [{ childId: 1, courseId: 1 }];
      service.updateChildCourses(courses);

      expect(mockIpcRenderer.send).toHaveBeenCalledWith('updateChildCourses', courses);
    });

    it('should call update child courses with number', () => {
      service.updateChildCourses(1);

      expect(mockIpcRenderer.send).toHaveBeenCalledWith('updateChildCourses', 1);
    });

    it('should call get pickup', () => {
      service.getPickup();

      expect(mockIpcRenderer.send).toHaveBeenCalledWith('getPickup');
    });

    it('should call create pickup', () => {
      const items: Pickup[] = [{ childId: 1, day: 'Montag', pickupType: 'Wird abgeholt' }];
      service.createPickup(items);

      expect(mockIpcRenderer.send).toHaveBeenCalledWith('createPickup', items);
    });

    it('should call update pickup', () => {
      const items: Pickup[] = [{ childId: 1, day: 'Montag', pickupType: 'Wird abgeholt' }];
      service.updatePickup(items);

      expect(mockIpcRenderer.send).toHaveBeenCalledWith('updatePickup', items);
    });
  });
});
