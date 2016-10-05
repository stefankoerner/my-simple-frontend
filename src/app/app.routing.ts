import {NgModule, ModuleWithProviders} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from "./app.component";

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/apartments',
    pathMatch: 'full'
  },
  {
    path: 'apartments',
    loadChildren: 'app/apartments/apartments.module#ApartmentsModule'
  }
];

export const appRoutingProviders: any[] = [
];

export const appRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);
