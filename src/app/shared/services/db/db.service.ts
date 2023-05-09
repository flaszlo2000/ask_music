import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EventModel } from '../../models/event.model';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtService } from '../auth/jwt.service';
import { TokenModel } from '../../models/token.model';


@Injectable({
  providedIn: 'root'
})
export class DbService {
  protected SERVER_BASE_URL = environment.server_uri;

  constructor(
    protected http_client: HttpClient,
    private jwt_service: JwtService
  ) { }

  public getActiveEvent(): Observable<EventModel> {
    return this.http_client.get<EventModel>(this.SERVER_BASE_URL.concat("/event"));
  }

  public checkPasswordForEvent(event_id: string, password: string): Observable<TokenModel> {
    return this.http_client.post<any>(
      this.SERVER_BASE_URL.concat("/event_login/".concat(event_id)),
      password
    );
  }

  public addRecord(event_id: string, record: string): Observable<void> {
    const jwt_or_error = this.jwt_service.getJWT();

    if(typeof jwt_or_error === "string") {
      return this.http_client.post<void>(
        this.SERVER_BASE_URL.concat("/record_request/".concat(event_id)),
        record,
        {
          headers: new HttpHeaders("Authorization: Bearer " + jwt_or_error)
        }
      )
    }

    return jwt_or_error;
  }
}
