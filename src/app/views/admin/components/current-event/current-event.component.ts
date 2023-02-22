import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { EventUpdateHandler } from '../../classes/event_update_handler';
import { RefreshableDataSource } from '../../classes/refreshable_data_source';
import { DetailedEventModel } from '../../models/detailed_event.model';
import { AdminService } from '../../services/admin.service';
import { EventInfoComponent } from '../event-info/event-info.component';

@Component({
  selector: 'admin-current-event',
  templateUrl: './current-event.component.html',
  styleUrls: ['./current-event.component.css']
})
export class CurrentEventComponent extends EventUpdateHandler implements OnDestroy, AfterViewInit {
  private r_current_event_data: RefreshableDataSource<DetailedEventModel>;

  private detailed_event_sub: Subscription;
  public event_detail?: DetailedEventModel;
  
  @ViewChild("event_info") event_info?: EventInfoComponent;
  public event_info_password_form_control = new FormControl()
  public edit = false;

  constructor(
    private admin_service: AdminService,
    private response_snack_bar: MatSnackBar
  ) {
    super(response_snack_bar);

    this.r_current_event_data = new RefreshableDataSource<DetailedEventModel>(
      this.admin_service.getDetailedEvent()
    );

    this.detailed_event_sub = this.r_current_event_data.data$.subscribe(
      {
        next: (result) => {
          this.event_detail = result;
          this.event_info_password_form_control.setValue(
            this.event_detail.password
          );
        }
      }
    );

  }
  
  ngAfterViewInit(): void { }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
    this.detailed_event_sub.unsubscribe();
  }

  protected refresh(): void {
    this.event_detail = undefined;
    this.r_current_event_data.refresh();
  }
  
  public toggleEdit(): void {
    this.edit = !this.edit;
  }

  public startEdit(): void {
    this.toggleEdit()
    this.event_info?.toggleEdit();
  }

  private handleSuccessfulStop(): void {
    this.handleSuccess();
    this.refresh();
    this.eventUpdate.emit();
  }

  public toggleEventState(event_id: string, new_state: boolean): void {
    // TODO: ask the user before proceed
    this.http_response_sub = this.admin_service.changeEventState(event_id, new_state).subscribe(
        {
          next: () => this.handleSuccessfulStop(),
          error: (err) => this.handleHttpError(err)
        }
    );
  }
}
