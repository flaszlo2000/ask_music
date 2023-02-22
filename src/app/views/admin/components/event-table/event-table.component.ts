import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subscription } from 'rxjs';
import { EventUpdateHandler } from '../../classes/event_update_handler';
import { RefreshableDataSource } from '../../classes/refreshable_data_source';
import { DetailedEventModel } from '../../models/detailed_event.model';
import { AdminService } from '../../services/admin.service';
import { AdditionWindowComponent } from './components/addition-window/addition-window.component';

@Component({
  selector: 'admin-event-table',
  templateUrl: './event-table.component.html',
  styleUrls: ['./event-table.component.css']
})
export class EventTableComponent extends EventUpdateHandler implements OnDestroy {
  private r_events: RefreshableDataSource<Array<DetailedEventModel>>;
  public events$: Observable<Array<DetailedEventModel>>;

  private dialog_sub?: Subscription;

  constructor(
    private admin_service: AdminService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ) {
    super(snackbar);

    this.r_events = new RefreshableDataSource<Array<DetailedEventModel>>(
      this.admin_service.getEvents()
    );

    this.events$ = this.r_events.data$;
  }

  override ngOnDestroy(): void {
      super.ngOnDestroy();
      
      if(!!this.dialog_sub) {
        this.dialog_sub.unsubscribe();
      }
  }

  protected refresh(): void {
    this.r_events.refresh();
  }

  public handeSuccessfulStateChange(): void {
    this.eventUpdate.emit();
    this.refresh();
    this.handleSuccess();
  }

  public changeEventState(event_id: string, new_state: boolean): void {
    this.event_updater_sub = this.admin_service.changeEventState(event_id, new_state).subscribe(
      {
        next: () => this.handeSuccessfulStateChange(),
        error: (err) => this.handleHttpError(
          err,
          "There is an already running event!"
        ),
      }
    );
  }

  public addNewEvent(): void {
    if(!!this.dialog_sub) {
      this.dialog_sub.unsubscribe();
      this.dialog_sub = undefined;
    }

    this.dialog_sub = this.dialog.open(AdditionWindowComponent).afterClosed().subscribe(result => {
      if(result === undefined) { return; }

      this.event_updater_sub = this.admin_service
        .addEvent(result as DetailedEventModel)
        .subscribe(
          {
            next: () => this.handeSuccessfulStateChange(),
            error: (err) => this.handleHttpError(err),
          }
        );
    });
  }
}
