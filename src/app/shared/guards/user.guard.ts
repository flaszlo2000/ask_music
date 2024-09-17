import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { LocalStorageService } from '../services/db/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  constructor(
    private router: Router,
    private local_storage_service: LocalStorageService
  ) { }

  canActivate(): boolean | UrlTree {
    /* simple but effective, if the user sets it's own jwt
      but if it is not correct then the server simply won't serve it's requests
    */
    const jwt_is_present = this.local_storage_service.load("JWT") != null;

    if(!jwt_is_present) {
      return this.router.parseUrl("/");
    }

    return true;
  }
}
