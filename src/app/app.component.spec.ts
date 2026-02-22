import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ToasterComponent } from './components/toaster/toaster.component';
import { DbService } from './services/db.service';

describe('AppComponent', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    const dbService: Partial<DbService> = {
      getChildren: jasmine.createSpy('getChildren'),
      getClasses: jasmine.createSpy('getClasses'),
      getCourses: jasmine.createSpy('getCourses'),
      getEarlyCare: jasmine.createSpy('getEarlyCare'),
      getLunch: jasmine.createSpy('getLunch'),
      getHomework: jasmine.createSpy('getHomework'),
      getChildCourses: jasmine.createSpy('getChildCourses'),
      getPickup: jasmine.createSpy('getPickup'),
      getClassSchedules: jasmine.createSpy('getClassSchedules'),
    };

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, MatIconModule, MatToolbarModule, MatButtonModule],
      declarations: [AppComponent, ToasterComponent],
      providers: [{ provide: DbService, useValue: dbService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have as title 'ogs-planer-app'`, () => {
    expect(app.title).toEqual('ogs-planer-app');
  });
});
