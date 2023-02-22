import { Component, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription, switchMap, catchError, of, Observable } from 'rxjs';
import { EventUpdateHandler } from '../../classes/event_update_handler';
import { RefreshableDataSource } from '../../classes/refreshable_data_source';
import { RecordModel } from '../../models/record.model';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'admin-record-table',
  templateUrl: './record-table.component.html',
  styleUrls: ['./record-table.component.css']
})
export class RecordTableComponent extends EventUpdateHandler implements OnDestroy {
  private r_event_records: RefreshableDataSource<Array<RecordModel>>;
  private ongoing_event_records_sub: Subscription;
  private ongoing_event_records?: Array<RecordModel>;

  constructor(
    private admin_service: AdminService,
    private snackbar: MatSnackBar
  ) {
    super(snackbar);

    this.r_event_records = new RefreshableDataSource<Array<RecordModel>>(
      //! FIXME make this on call
      this.admin_service.getOngoingEvent().pipe(
        switchMap(ongoing_event => {
          return this.admin_service.getRecordsFor(ongoing_event.id).pipe(
            catchError((err) => {
              console.log("------------------------------------------")
              return of(err);
            })
          );
        })
      )
    );

    this.ongoing_event_records_sub = this.r_event_records.data$.subscribe(result => {
      this.ongoing_event_records = result;
    });
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();  
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

  protected refresh(): void {
    this.r_event_records.refresh();
  }

  public recordDelete(id: number): void {
    this.refresh();
    console.log("TODO: record delete");
  }

  private handleSuccessfulStateChange(): void {
    this.refresh();
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
