import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ToastComponent } from './components/toast/toast.component';
import { ToasterComponent } from './components/toaster/toaster.component';
import { ChildrenComponent } from './components/children/children.component';
import { ClassesComponent } from './components/classes/classes.component';
import { ActivitiesComponent } from './components/activities/activities.component';

@NgModule({
  declarations: [
    AppComponent,
    ToastComponent,
    ToasterComponent,
    DashboardComponent,
    ChildrenComponent,
    ClassesComponent,
    ActivitiesComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
