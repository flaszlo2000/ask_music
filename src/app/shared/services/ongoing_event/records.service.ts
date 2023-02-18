import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DbService } from '../db/db.service';

@Injectable({
  providedIn: 'root'
})
export class RecordsService {
  constructor(private db_service: DbService) { }

  public addRecord(event_id: string, record: string): Observable<void> {
    return this.db_service.addRecord(event_id, record);
  }
}
