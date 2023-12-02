import { Routes } from '@angular/router';
import { ChildrenComponent } from './components/children/children.component';
import { ClassesComponent } from './components/classes/classes.component';
import { CoursesComponent } from './components/courses/courses.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: 'dashboard',
    pathMatch: 'full',
    component: DashboardComponent,
  },
  {
    path: 'children',
    pathMatch: 'full',
    component: ChildrenComponent,
  },
  {
    path: 'classes',
    pathMatch: 'full',
    component: ClassesComponent,
  },
  {
    path: 'courses',
    pathMatch: 'full',
    component: CoursesComponent,
  },
  {
    path: '**',
    redirectTo: '/dashboard',
  },
];
