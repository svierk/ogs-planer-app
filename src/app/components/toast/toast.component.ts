/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild, input } from '@angular/core';
import { Toast } from 'bootstrap';
import { fromEvent, take } from 'rxjs';
import { EventTypes } from 'src/app/models/event-types';
import { NgClass } from '@angular/common';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'ogs-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  standalone: true,
  imports: [NgClass, MatIconButton, MatIcon],
})
export class ToastComponent implements OnInit {
  @Output() disposeEvent = new EventEmitter();

  @ViewChild('toastElement', { static: true })
  toastEl!: ElementRef;

  readonly type = input.required<EventTypes>();
  readonly title = input.required<string>();
  readonly message = input.required<string>();

  toast!: Toast;

  ngOnInit() {
    this.show();
  }

  show() {
    this.toast = new Toast(
      this.toastEl.nativeElement,
      this.type() === EventTypes.Error
        ? {
            autohide: false,
          }
        : {
            delay: 5000,
          }
    );

    fromEvent(this.toastEl.nativeElement, 'hidden.bs.toast')
      .pipe(take(1))
      .subscribe(() => this.hide());

    this.toast.show();
  }

  hide() {
    this.toast.dispose();
    this.disposeEvent.emit();
  }
}
