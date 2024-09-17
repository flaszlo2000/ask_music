import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserGuard } from './shared/guards/user.guard';
import { AdminComponent } from './views/admin/admin.component';
import { AdminLoginComponent } from './views/admin/components/admin-login/admin-login.component';
import { HomeComponent } from './views/home/home.component';
import { LandingPageComponent } from './views/landing-page/landing-page.component';


const routes: Routes = [
  {
    "path": "",
    "pathMatch": "full",
    "component": LandingPageComponent
  },
  {
    "path": "home",
    "component": HomeComponent,
    "canActivate": [UserGuard]
  },
  {
    "path": "admin",
    "component": AdminLoginComponent
  },
  {
    "path": "admin/dashboard",
    "component": AdminComponent
  },
  {
    "path": "**",
    "redirectTo": ""
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
