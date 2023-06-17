/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Child } from '../models/child';
import { Class } from '../models/class';
import { Course } from '../models/course';

const electron = (<any>window).require('electron');

@Injectable({
  providedIn: 'root',
})
export class DbService {
  children = new BehaviorSubject<any[]>([]);
  classes = new BehaviorSubject<any[]>([]);
  courses = new BehaviorSubject<any[]>([]);

  constructor() {
    electron.ipcRenderer.on('getChildren', (event: any, children: any[]) => {
      this.children.next(children);
    });
    electron.ipcRenderer.on('getClasses', (event: any, classes: any[]) => {
      this.classes.next(classes);
    });
    electron.ipcRenderer.on('getCourses', (event: any, courses: any[]) => {
      this.courses.next(courses);
    });
  }

  getChildren() {
    electron.ipcRenderer.send('getChildren');
  }

  createChild(child: Child) {
    electron.ipcRenderer.send('createChild', child);
  }

  updateChild(child: Child) {
    electron.ipcRenderer.send('updateChild', child);
  }

  deleteChild(id: number) {
    electron.ipcRenderer.send('deleteChild', id);
  }

  getClasses() {
    electron.ipcRenderer.send('getClasses');
  }

  createClass(classItem: Class) {
    electron.ipcRenderer.send('createClass', classItem);
  }

  updateClass(classItem: Class) {
    electron.ipcRenderer.send('updateClass', classItem);
  }

  deleteClass(id: number) {
    electron.ipcRenderer.send('deleteClass', id);
  }

  getCourses() {
    electron.ipcRenderer.send('getCourses');
  }

  createCourse(course: Course) {
    electron.ipcRenderer.send('createCourse', course);
  }

  updateCourse(course: Course) {
    electron.ipcRenderer.send('updateCourse', course);
  }

  deleteCourse(id: number) {
    electron.ipcRenderer.send('deleteCourse', id);
  }
}
