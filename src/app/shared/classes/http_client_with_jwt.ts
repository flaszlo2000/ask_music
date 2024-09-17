import { HttpClient, HttpHeaders } from "@angular/common/http";
import { JwtService } from "../services/auth/jwt.service";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class HttpClientWithJwt extends HttpClient {
  private jwt_service: JwtService = inject(JwtService);

  private getJwtHeader(): HttpHeaders {
    return new HttpHeaders("Authorization: Bearer " + this.jwt_service.getJWT());
  }

  public postWithJwt<T>(url: string, body: any | null): Observable<T> {
    return super.post(url, body,
      {
        headers: this.getJwtHeader()
      }
    ) as Observable<T>;
  }

  public getWithJwt<T>(url: string): Observable<T> {
    return super.get(url,
      {
        headers: this.getJwtHeader()
      }
    ) as Observable<T>;
  }

  public deleteWithJwt<T>(url: string): Observable<T> {
    return super.delete(url,
      {
        headers: this.getJwtHeader()
      }
    ) as Observable<T>;
  }
}
