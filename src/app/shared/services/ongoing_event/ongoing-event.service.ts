import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OnGoingEventModel } from '../../models/ongoing_event.model';
import { DbService } from '../db/db.service';


@Injectable({
  providedIn: 'root'
})
export class OngoingEventService {
  constructor(
    private db_service: DbService,
  ) { }

  public getOngoingEvent(): Observable<OnGoingEventModel> {
    return this.db_service.getOngoingEvent();
  }

  public tryToLogin(event_id: string, password: string): Observable<Boolean> {
    return this.db_service.checkPasswordForEvent(event_id, password);
  }
}
