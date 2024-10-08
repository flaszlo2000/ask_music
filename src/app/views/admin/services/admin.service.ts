import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DbService } from 'src/app/shared/services/db/db.service';
import { DetailedEventModel } from '../models/detailed_event.model';
import { RecordModel } from '../models/record.model';


@Injectable({
  providedIn: 'root'
})
export class AdminService extends DbService {
  public getDetailedEvent(event_id: string = ""): Observable<DetailedEventModel> {
    const endpoint = "/admin/".concat(
      (event_id == "" ? "detailed_current_event" : "detailed_event/".concat(event_id))
    );

    return this.http_client.getWithJwt<DetailedEventModel>(
      this.SERVER_BASE_URL.concat(endpoint)
    );
  }

  public changeEventState(event_id: string, new_state: boolean): Observable<void> {
    return this.http_client.postWithJwt<void>(
      this.SERVER_BASE_URL.concat("/admin/event_state/".concat(event_id)),
      new_state
    );
  }

  public getRecordsFor(event_id: string): Observable<Array<RecordModel>> {
    return this.http_client.getWithJwt<Array<RecordModel>>(
      this.SERVER_BASE_URL.concat("/admin/records/".concat(event_id))
    );
  }

  public changeRecordState(record_id: number, new_state: boolean): Observable<void> {
    return this.http_client.postWithJwt<void>(
      this.SERVER_BASE_URL.concat("/admin/finish_record/".concat(record_id.toString())),
      {} // TODO: make record_state_change instead of finish
    );
  }

  public getEvents(): Observable<Array<DetailedEventModel>> {
    return this.http_client.getWithJwt<Array<DetailedEventModel>>(
      this.SERVER_BASE_URL.concat("/admin/events")
    );
  }

  public addEvent(new_event: DetailedEventModel): Observable<void> {
    return this.http_client.postWithJwt<void>(
      this.SERVER_BASE_URL.concat("/admin/add_event"),
      new_event
    );
  }

  public deleteEvent(event_id: string): Observable<void> {
    return this.http_client.deleteWithJwt<void>(
      this.SERVER_BASE_URL.concat("/admin/delete_event/".concat(event_id))
    );
  }
}
