import { Component, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription, switchMap } from 'rxjs';
import { HttpResponeHandler } from 'src/app/shared/classes/http_response_handler';
import { RecordModel } from '../../models/record.model';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'admin-record-table',
  templateUrl: './record-table.component.html',
  styleUrls: ['./record-table.component.css']
})
export class RecordTableComponent extends HttpResponeHandler implements OnDestroy {
  private ongoing_event_records_sub: Subscription;
  private ongoing_event_records?: Array<RecordModel>;

  constructor(
    private admin_service: AdminService,
    private response_snackbar: MatSnackBar
  ) {
    super(response_snackbar);

    //! FIXME make this on call
    this.ongoing_event_records_sub = this.admin_service.getOngoingEvent().pipe(
      switchMap(ongoing_event => {
        return this.admin_service.getRecordsFor(ongoing_event.id);
    })).subscribe(result => {
      this.ongoing_event_records = result;
    });
  }

  ngOnDestroy(): void {
      this.ongoing_event_records_sub.unsubscribe();
  }


  private recordFilter(done: boolean): Array<RecordModel> {
    let result = new Array<RecordModel>()

    if(!!this.ongoing_event_records) {
      this.ongoing_event_records.forEach(elem => {
        if(elem.done === done) {
          result.push(elem);
        }
      })
    }

    return result
  }

  public get undone_records(): Array<RecordModel> {
    return this.recordFilter(false);
  }

  public get done_records(): Array<RecordModel> {
    return this.recordFilter(true);
  }

  private updateView(): void {
    // TODO
  }

  public recordDelete(id: number): void {
    this.updateView();
    console.log("TODO: record delete");
  }

  public changeRecordState(id: number, new_state: boolean): void {
    this.updateView();
    this.http_response_sub = this.admin_service
      .changeRecordState(id, new_state)
      .subscribe({
        next: () => this.handleSuccess(),
        error: (err) => this.handleHttpError(err)
      });
  }
}
