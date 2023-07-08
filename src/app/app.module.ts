import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { ChildrenActivitiesActionComponent } from './components/children-activities-action/children-activities-action.component';
import { ChildrenActivitiesDialogComponent } from './components/children-activities-dialog/children-activities-dialog.component';
import { ChildrenCreateUpdateActionComponent } from './components/children-create-update-action/children-create-update-action.component';
import { ChildrenCreateUpdateDialogComponent } from './components/children-create-update-dialog/children-create-update-dialog.component';
import { ChildrenDeleteActionComponent } from './components/children-delete-action/children-delete-action.component';
import { ChildrenDeleteDialogComponent } from './components/children-delete-dialog/children-delete-dialog.component';
import { ChildrenTableComponent } from './components/children-table/children-table.component';
import { ChildrenComponent } from './components/children/children.component';
import { ClassesCreateUpdateActionComponent } from './components/classes-create-update-action/classes-create-update-action.component';
import { ClassesCreateUpdateDialogComponent } from './components/classes-create-update-dialog/classes-create-update-dialog.component';
import { ClassesDeleteActionComponent } from './components/classes-delete-action/classes-delete-action.component';
import { ClassesDeleteDialogComponent } from './components/classes-delete-dialog/classes-delete-dialog.component';
import { ClassesTableComponent } from './components/classes-table/classes-table.component';
import { ClassesComponent } from './components/classes/classes.component';
import { CoursesCreateUpdateActionComponent } from './components/courses-create-update-action/courses-create-update-action.component';
import { CoursesCreateUpdateDialogComponent } from './components/courses-create-update-dialog/courses-create-update-dialog.component';
import { CoursesDeleteActionComponent } from './components/courses-delete-action/courses-delete-action.component';
import { CoursesDeleteDialogComponent } from './components/courses-delete-dialog/courses-delete-dialog.component';
import { CoursesTableComponent } from './components/courses-table/courses-table.component';
import { CoursesComponent } from './components/courses/courses.component';
import { DashboardListDialogComponent } from './components/dashboard-list-dialog/dashboard-list-dialog.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ToastComponent } from './components/toast/toast.component';
import { ToasterComponent } from './components/toaster/toaster.component';
import { ClassNamePipe } from './pipes/class-name.pipe';

const materialModules = [
  MatButtonModule,
  MatCardModule,
  MatChipsModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatRadioModule,
  MatSelectModule,
  MatSortModule,
  MatTableModule,
  MatToolbarModule,
];

@NgModule({
  declarations: [
    AppComponent,
    ChildrenComponent,
    ChildrenActivitiesActionComponent,
    ChildrenActivitiesDialogComponent,
    ChildrenCreateUpdateActionComponent,
    ChildrenCreateUpdateDialogComponent,
    ChildrenDeleteActionComponent,
    ChildrenDeleteDialogComponent,
    ChildrenTableComponent,
    ClassesComponent,
    ClassesCreateUpdateActionComponent,
    ClassesCreateUpdateDialogComponent,
    ClassesDeleteActionComponent,
    ClassesDeleteDialogComponent,
    ClassesTableComponent,
    ClassNamePipe,
    CoursesComponent,
    CoursesCreateUpdateActionComponent,
    CoursesCreateUpdateDialogComponent,
    CoursesDeleteDialogComponent,
    CoursesDeleteActionComponent,
    CoursesTableComponent,
    DashboardComponent,
    DashboardListDialogComponent,
    ToastComponent,
    ToasterComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    ...materialModules,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
