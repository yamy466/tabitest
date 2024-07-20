import { Routes } from '@angular/router';
import { HomeComponent } from './routes/home/home.component';
import { UserDetailsComponent } from './routes/user-details/user-details.component';
import { AppRoutes } from '../core/models/routes.model';

export const routes: Routes = [
    { path: AppRoutes.UserDetails, loadComponent: () => UserDetailsComponent },
    { path: AppRoutes.Home, loadComponent: () => HomeComponent },
    { path: '**', loadComponent: () => HomeComponent }
];
