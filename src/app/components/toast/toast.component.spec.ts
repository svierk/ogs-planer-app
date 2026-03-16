import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { EventTypes } from 'src/app/models/event-types';
import { ToastComponent } from './toast.component';

describe('ToastComponent', () => {
  let component: ToastComponent;
  let debugElement: DebugElement;
  let fixture: ComponentFixture<ToastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatIconModule, ToastComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
  });

  it('should create an error toast that does not disappear', () => {
    // given
    fixture.componentRef.setInput('type', EventTypes.Error);
    fixture.componentRef.setInput('title', 'error');
    fixture.componentRef.setInput('message', 'error');

    // when
    fixture.detectChanges();
    spyOn(component.toast, 'dispose');

    // then
    expect(component).toBeTruthy();
    expect(component.toast.dispose).not.toHaveBeenCalled();
  });

  it('should emit dispose event on close button click', () => {
    // given
    fixture.componentRef.setInput('type', EventTypes.Info);
    fixture.componentRef.setInput('title', 'infp');
    fixture.componentRef.setInput('message', 'info');
    spyOn(component.disposeEvent, 'emit');
    const button = debugElement.nativeElement.querySelector('button');

    // when
    fixture.detectChanges();
    spyOn(component.toast, 'dispose');
    button.click();
    fixture.detectChanges();

    // then
    expect(component.disposeEvent.emit).toHaveBeenCalledTimes(1);
    expect(component.toast.dispose).toHaveBeenCalledTimes(1);
  });
});
