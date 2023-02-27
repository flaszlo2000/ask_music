import { Component, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { HttpResponeHandler } from 'src/app/shared/classes/http_response_handler';
import { RecordModel } from '../../models/record.model';
import { AdminService } from '../../services/admin.service';
import { WebsocketService } from '../../services/websocket.service';

@Component({
  selector: 'admin-record-table',
  templateUrl: './record-table.component.html',
  styleUrls: ['./record-table.component.css']
})
export class RecordTableComponent extends HttpResponeHandler {
  public records$: Observable<Array<RecordModel>>;

  constructor(
    private admin_service: AdminService,
    private ws_sevice: WebsocketService,
    private snackbar: MatSnackBar
  ) {
    super(snackbar);

    this.records$ = this.ws_sevice.getData();
  }

  public recordDelete(id: number): void {
    console.log("TODO: record delete");
  }

  private handleSuccessfulStateChange(): void {
    this.handleSuccess();
  }

  public changeRecordState(id: number, new_state: boolean): void {
    this.http_response_sub = this.admin_service
      .changeRecordState(id, new_state)
      .subscribe({
        next: () => this.handleSuccessfulStateChange(),
        error: (err) => this.handleHttpError(err)
      });
  }
}
