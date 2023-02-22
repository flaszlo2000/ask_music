import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
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
export class EventTableComponent extends EventUpdateHandler {
  private r_events: RefreshableDataSource<Array<DetailedEventModel>>;
  public events$: Observable<Array<DetailedEventModel>>;

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

  protected refresh(): void {
    this.r_events.refresh();
  }

  public handeSuccessfulStateChange(): void {
    this.eventUpdate.emit();
    this.refresh();
    this.handleSuccess();
  }

  public changeEventState(event_id: string, new_state: boolean): void {
    this.admin_service.changeEventState(event_id, new_state).subscribe(
      {
        next: () => this.handeSuccessfulStateChange(),
        error: (err) => this.handleHttpError(err),
      }
    );
  }

  public addNewEvent(): void {
    this.dialog.open(AdditionWindowComponent).afterClosed().subscribe(result => {
      console.log(result)
    });
  }
}
