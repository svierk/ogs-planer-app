import { Routes } from '@angular/router';
import { ActivitiesComponent } from './components/activities/activities.component';
import { ChildrenComponent } from './components/children/children.component';
import { ClassesComponent } from './components/classes/classes.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'children',
    component: ChildrenComponent,
  },
  {
    path: 'classes',
    component: ClassesComponent,
  },
  {
    path: 'activities',
    component: ActivitiesComponent,
  },
];
