import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EventModel } from '../../models/event.model';
import { TokenModel } from '../../models/token.model';
import { DbService } from '../db/db.service';


@Injectable({
  providedIn: 'root'
})
export class EventService {
  constructor(
    private db_service: DbService,
  ) { }

  public getActiveEvent(): Observable<EventModel> {
    return this.db_service.getActiveEvent();
  }

  public tryToLogin(event_id: string, password: string): Observable<TokenModel> {
    return this.db_service.checkPasswordForEvent(event_id, password);
  }
}
