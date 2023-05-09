import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { LocalStorageService } from '../db/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  constructor(
    private local_storage_service: LocalStorageService,
    private router: Router
  ) { }

  public getJWT(): string | Observable<void> {
    const jwt = this.local_storage_service.load("JWT");

    if(jwt == null) {
      this.router.navigateByUrl("/");
      return throwError(() => new Error("Nonexistent jwt"));
    }

    return jwt;
  }
}
