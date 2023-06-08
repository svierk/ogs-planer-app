/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const electron = (<any>window).require('electron');

@Injectable({
  providedIn: 'root',
})
export class DbService {
  children = new BehaviorSubject<any[]>([]);

  constructor() {
    electron.ipcRenderer.on('getAllChildren', (event: any, children: any[]) => {
      this.children.next(children);
    });
    electron.ipcRenderer.on('addChild', (event: any, children: any[]) => {
      this.children.next(children);
    });
  }

  getAllChildren() {
    electron.ipcRenderer.send('getAllChildren');
  }

  addChild() {
    electron.ipcRenderer.send('addChild');
  }
}
