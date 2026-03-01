import { Injectable } from '@angular/core';
import { ipcRenderer } from 'electron';
import { BehaviorSubject } from 'rxjs';
import { Child } from '../models/child';
import { ChildCourse } from '../models/child-course';
import { Class } from '../models/class';
import { ClassSchedule } from '../models/class-schedule';
import { Course } from '../models/course';
import { EarlyCare } from '../models/early-care';
import { Homework } from '../models/homework';
import { Lunch } from '../models/lunch';
import { Pickup } from '../models/pickup';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  children = new BehaviorSubject<any[]>([]);
  classes = new BehaviorSubject<any[]>([]);
  classSchedules = new BehaviorSubject<ClassSchedule[]>([]);
  courses = new BehaviorSubject<any[]>([]);
  earlyCare = new BehaviorSubject<EarlyCare[]>([]);
  lunch = new BehaviorSubject<Lunch[]>([]);
  homework = new BehaviorSubject<Homework[]>([]);
  childCourses = new BehaviorSubject<any[]>([]);
  pickup = new BehaviorSubject<Pickup[]>([]);
  ipcRenderer!: typeof ipcRenderer;

  constructor() {
    if (this.isElectron) {
      this.ipcRenderer = (globalThis as any).require('electron').ipcRenderer;
      this.ipcRenderer.on('getChildren', (event: any, children: any[]) => {
        this.children.next(children);
      });
      this.ipcRenderer.on('getClasses', (event: any, classes: any[]) => {
        this.classes.next(classes);
      });
      this.ipcRenderer.on('getClassSchedules', (event: any, classSchedules: ClassSchedule[]) => {
        this.classSchedules.next(classSchedules);
      });
      this.ipcRenderer.on('getCourses', (event: any, courses: any[]) => {
        this.courses.next(courses);
      });
      this.ipcRenderer.on('getEarlyCare', (event: any, earlyCare: EarlyCare[]) => {
        this.earlyCare.next(earlyCare);
      });
      this.ipcRenderer.on('getLunch', (event: any, lunch: Lunch[]) => {
        this.lunch.next(lunch);
      });
      this.ipcRenderer.on('getHomework', (event: any, homework: Homework[]) => {
        this.homework.next(homework);
      });
      this.ipcRenderer.on('getChildCourses', (event: any, childCourses: any[]) => {
        this.childCourses.next(childCourses);
      });
      this.ipcRenderer.on('getPickup', (event: any, pickup: Pickup[]) => {
        this.pickup.next(pickup);
      });
    }
  }

  get isElectron(): boolean {
    return !!window?.process?.type;
  }

  getChildren() {
    this.ipcRenderer.send('getChildren');
  }

  createChild(child: Child) {
    this.ipcRenderer.send('createChild', child);
  }

  updateChild(child: Child) {
    this.ipcRenderer.send('updateChild', child);
  }

  deleteChild(id: number) {
    this.ipcRenderer.send('deleteChild', id);
  }

  getClasses() {
    this.ipcRenderer.send('getClasses');
  }

  createClass(classItem: Class) {
    this.ipcRenderer.send('createClass', classItem);
  }

  updateClass(classItem: Class) {
    this.ipcRenderer.send('updateClass', classItem);
  }

  deleteClass(id: number) {
    this.ipcRenderer.send('deleteClass', id);
  }

  getClassSchedules() {
    this.ipcRenderer.send('getClassSchedules');
  }

  getCourses() {
    this.ipcRenderer.send('getCourses');
  }

  createCourse(course: Course) {
    this.ipcRenderer.send('createCourse', course);
  }

  updateCourse(course: Course) {
    this.ipcRenderer.send('updateCourse', course);
  }

  deleteCourse(id: number) {
    this.ipcRenderer.send('deleteCourse', id);
  }

  getEarlyCare() {
    this.ipcRenderer.send('getEarlyCare');
  }

  createEarlyCare(items: EarlyCare[]) {
    this.ipcRenderer.send('createEarlyCare', items);
  }

  updateEarlyCare(items: EarlyCare[]) {
    this.ipcRenderer.send('updateEarlyCare', items);
  }

  getLunch() {
    this.ipcRenderer.send('getLunch');
  }

  createLunch(items: Lunch[]) {
    this.ipcRenderer.send('createLunch', items);
  }

  updateLunch(items: Lunch[]) {
    this.ipcRenderer.send('updateLunch', items);
  }

  getHomework() {
    this.ipcRenderer.send('getHomework');
  }

  createHomework(items: Homework[]) {
    this.ipcRenderer.send('createHomework', items);
  }

  updateHomework(items: Homework[]) {
    this.ipcRenderer.send('updateHomework', items);
  }

  getChildCourses() {
    this.ipcRenderer.send('getChildCourses');
  }

  createChildCourses(courseInfo: ChildCourse[]) {
    this.ipcRenderer.send('createChildCourses', courseInfo);
  }

  updateChildCourses(courses: ChildCourse[] | number) {
    this.ipcRenderer.send('updateChildCourses', courses);
  }

  getPickup() {
    this.ipcRenderer.send('getPickup');
  }

  createPickup(items: Pickup[]) {
    this.ipcRenderer.send('createPickup', items);
  }

  updatePickup(items: Pickup[]) {
    this.ipcRenderer.send('updatePickup', items);
  }
}
