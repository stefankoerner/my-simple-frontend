import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import {RouterModule, Routes} from "@angular/router";
import {ToastModule} from "./shared/toast/toast.module";

const routes: Routes = [
  {
    path: 'apartments',
    loadChildren: 'app/apartments/apartments.module#ApartmentsModule',
  },
  {
    path: '',
    redirectTo: 'apartments',
    pathMatch: 'full'
  }
];


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    ToastModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
