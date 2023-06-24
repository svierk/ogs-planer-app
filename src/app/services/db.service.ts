import { Injectable } from '@angular/core';
import { ipcRenderer } from 'electron';
import { BehaviorSubject } from 'rxjs';
import { Child } from '../models/child';
import { Class } from '../models/class';
import { Course } from '../models/course';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  children = new BehaviorSubject<any[]>([]);
  classes = new BehaviorSubject<any[]>([]);
  courses = new BehaviorSubject<any[]>([]);
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
}
