import { Component, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';
import { AdminService } from '../../services/admin.service';

import { DetailedEventModel } from '../../models/detailed_event.model';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RefreshableDataSource } from '../../classes/refreshable_data_source';
import { EventUpdateHandler } from '../../classes/event_update_handler';


@Component({
  selector: 'admin-event-info',
  templateUrl: './event-info.component.html',
  styleUrls: ['./event-info.component.css']
})
export class EventInfoComponent extends EventUpdateHandler implements OnDestroy {
  private r_current_event_data: RefreshableDataSource<DetailedEventModel>;

  private detailed_event_sub: Subscription;
  public ongoing_event_detail?: DetailedEventModel;
  
  public allow_edit = false;
  public password_form_control = new FormControl();

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
          this.ongoing_event_detail = result;
          this.password_form_control.setValue(
            this.ongoing_event_detail.password
          );
        }
      }
    );

    this.checkPasswordFormState();
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
    this.detailed_event_sub.unsubscribe();
  }

  private checkPasswordFormState(): void {
    if(this.allow_edit) {
      this.password_form_control.enable();
    } else {
      this.password_form_control.disable();
    }
  }

  public toggleEdit(): void {
    this.allow_edit = !this.allow_edit;
    this.checkPasswordFormState();
  }

  protected refresh(): void {
    this.ongoing_event_detail = undefined;
    this.r_current_event_data.refresh();
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
