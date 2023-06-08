import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { ChildrenDeleteActionComponent } from './components/children-delete-action/children-delete-action.component';
import { ChildrenTableComponent } from './components/children-table/children-table.component';
import { ChildrenUpdateActionComponent } from './components/children-update-action/children-update-action.component';
import { ChildrenComponent } from './components/children/children.component';
import { ClassesTableComponent } from './components/classes-table/classes-table.component';
import { ClassesComponent } from './components/classes/classes.component';
import { CoursesComponent } from './components/courses/courses.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ToastComponent } from './components/toast/toast.component';
import { ToasterComponent } from './components/toaster/toaster.component';

const materialModules = [MatButtonModule, MatIconModule, MatTableModule, MatToolbarModule];

@NgModule({
  declarations: [
    AppComponent,
    ChildrenComponent,
    ChildrenDeleteActionComponent,
    ChildrenTableComponent,
    ChildrenUpdateActionComponent,
    ClassesComponent,
    ClassesTableComponent,
    CoursesComponent,
    DashboardComponent,
    ToastComponent,
    ToasterComponent,
  ],
  imports: [RouterModule.forRoot(routes), BrowserModule, AppRoutingModule, BrowserAnimationsModule, ...materialModules],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
