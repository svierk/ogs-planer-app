/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Child } from '../models/child';

const electron = (<any>window).require('electron');

@Injectable({
  providedIn: 'root',
})
export class DbService {
  children = new BehaviorSubject<any[]>([]);

  constructor() {
    electron.ipcRenderer.on('getChildren', (event: any, children: any[]) => {
      this.children.next(children);
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
}
