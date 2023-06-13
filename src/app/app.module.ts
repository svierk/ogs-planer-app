import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
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
import { CoursesComponent } from './components/courses/courses.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ToastComponent } from './components/toast/toast.component';
import { ToasterComponent } from './components/toaster/toaster.component';
import { ClassNamePipe } from './pipes/class-name.pipe';

const materialModules = [
  MatButtonModule,
  MatChipsModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatRadioModule,
  MatSelectModule,
  MatTableModule,
  MatToolbarModule,
];

@NgModule({
  declarations: [
    AppComponent,
    ChildrenComponent,
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
    DashboardComponent,
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
