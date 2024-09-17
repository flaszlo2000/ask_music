import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EventModel } from '../../models/event.model';
import { environment } from 'src/environments/environment';
import { TokenModel } from '../../models/token.model';
import { HttpClientWithJwt } from '../../classes/http_client_with_jwt';


@Injectable({
  providedIn: 'root'
})
export class DbService {
  protected SERVER_BASE_URL = environment.server_uri;

  constructor(
    protected http_client: HttpClientWithJwt,
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
    return this.http_client.postWithJwt<void>(
      this.SERVER_BASE_URL.concat("/record_request/".concat(event_id)),
      record
    );
  }
}
