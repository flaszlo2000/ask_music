import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RecordModel } from '../models/record.model';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private ws: WebSocket = new WebSocket(environment.ws_records_uri);

  public data$(): Observable<Array<RecordModel>> {
    return new Observable<Array<RecordModel>>(
       observer => {

        this.ws.onmessage = (event) =>
          observer.next(JSON.parse(event.data).data);

        this.ws.onerror = (event) => observer.error(event);

        this.ws.onclose = (event) => observer.complete();

        return () =>
            this.ws.close();
       }
    );
  }
}
