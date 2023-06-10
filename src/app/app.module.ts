import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
import { ChildrenDeleteActionComponent } from './components/children-delete-action/children-delete-action.component';
import { ChildrenDeleteDialogComponent } from './components/children-delete-dialog/children-delete-dialog.component';
import { ChildrenTableComponent } from './components/children-table/children-table.component';
import { ChildrenUpdateActionComponent } from './components/children-update-action/children-update-action.component';
import { ChildrenComponent } from './components/children/children.component';
import { ClassesTableComponent } from './components/classes-table/classes-table.component';
import { ClassesComponent } from './components/classes/classes.component';
import { CoursesComponent } from './components/courses/courses.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ToastComponent } from './components/toast/toast.component';
import { ToasterComponent } from './components/toaster/toaster.component';

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
    ChildrenDeleteActionComponent,
    ChildrenDeleteDialogComponent,
    ChildrenTableComponent,
    ChildrenUpdateActionComponent,
    ClassesComponent,
    ClassesTableComponent,
    CoursesComponent,
    DashboardComponent,
    ToastComponent,
    ToasterComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    ...materialModules,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
