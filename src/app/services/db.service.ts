import { Injectable } from '@angular/core';
import { ipcRenderer } from 'electron';
import { BehaviorSubject } from 'rxjs';
import { Child } from '../models/child';
import { ChildCourse } from '../models/child-course';
import { Class } from '../models/class';
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
  courses = new BehaviorSubject<any[]>([]);
  earlyCare = new BehaviorSubject<any[]>([]);
  lunch = new BehaviorSubject<any[]>([]);
  homework = new BehaviorSubject<any[]>([]);
  childCourses = new BehaviorSubject<any[]>([]);
  pickup = new BehaviorSubject<any[]>([]);
  ipcRenderer!: typeof ipcRenderer;

  constructor() {
    if (this.isElectron) {
      this.ipcRenderer = window.require('electron').ipcRenderer;
      this.ipcRenderer.on('getChildren', (event: any, children: any[]) => {
        this.children.next(children);
      });
      this.ipcRenderer.on('getClasses', (event: any, classes: any[]) => {
        this.classes.next(classes);
      });
      this.ipcRenderer.on('getCourses', (event: any, courses: any[]) => {
        this.courses.next(courses);
      });
      this.ipcRenderer.on('getEarlyCare', (event: any, earlyCare: any[]) => {
        this.earlyCare.next(earlyCare);
      });
      this.ipcRenderer.on('getLunch', (event: any, lunch: any[]) => {
        this.lunch.next(lunch);
      });
      this.ipcRenderer.on('getHomework', (event: any, homework: any[]) => {
        this.homework.next(homework);
      });
      this.ipcRenderer.on('getChildCourses', (event: any, childCourses: any[]) => {
        this.childCourses.next(childCourses);
      });
      this.ipcRenderer.on('getPickup', (event: any, pickup: any[]) => {
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

  createEarlyCare(item: EarlyCare) {
    this.ipcRenderer.send('createEarlyCare', item);
  }

  updateEarlyCare(item: EarlyCare) {
    this.ipcRenderer.send('updateEarlyCare', item);
  }

  deleteEarlyCare(id: number) {
    this.ipcRenderer.send('deleteEarlyCare', id);
  }

  getLunch() {
    this.ipcRenderer.send('getLunch');
  }

  createLunch(item: Lunch) {
    this.ipcRenderer.send('createLunch', item);
  }

  updateLunch(item: Lunch) {
    this.ipcRenderer.send('updateLunch', item);
  }

  deleteLunch(id: number) {
    this.ipcRenderer.send('deleteLunch', id);
  }

  getHomework() {
    this.ipcRenderer.send('getHomework');
  }

  createHomework(item: Homework) {
    this.ipcRenderer.send('createHomework', item);
  }

  updateHomework(item: Homework) {
    this.ipcRenderer.send('updateHomework', item);
  }

  deleteHomework(id: number) {
    this.ipcRenderer.send('deleteHomework', id);
  }

  getChildCourses() {
    this.ipcRenderer.send('getChildCourses');
  }

  createChildCourse(item: ChildCourse) {
    this.ipcRenderer.send('createChildCourse', item);
  }

  updateChildCourse(item: ChildCourse) {
    this.ipcRenderer.send('updateChildCourse', item);
  }

  deleteChildCourse(id: number) {
    this.ipcRenderer.send('deleteChildCourse', id);
  }

  getPickup() {
    this.ipcRenderer.send('getPickup');
  }

  createPickup(item: Pickup) {
    this.ipcRenderer.send('createPickup', item);
  }

  updatePickup(item: Pickup) {
    this.ipcRenderer.send('updatePickup', item);
  }

  deletePickup(id: number) {
    this.ipcRenderer.send('deletePickup', id);
  }
}
