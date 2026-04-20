import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layout/layout/layout.component';
import { EmployeesComponent } from './features/employees/employees.component';
import { LoginComponent } from './features/auth/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';
import { DepartmentsComponent } from './features/departments/departments/departments.component';
import { DesignationsComponent } from './features/designations/designations/designations.component';
const routes: Routes = [

  { path: 'login', component: LoginComponent },
   { path: '', redirectTo: 'login', pathMatch: 'full' },  // optional but clean


  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'employees', component: EmployeesComponent },
      { path: 'departments', component: DepartmentsComponent },
      { path: 'designations', component: DesignationsComponent }
    ]
  }  


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }