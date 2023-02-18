import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  constructor(private router: Router) { }

  public login(): void {
    this.router.navigateByUrl("/admin/dashboard");
  }
}
