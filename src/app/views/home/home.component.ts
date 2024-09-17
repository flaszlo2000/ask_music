import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpResponeHandler } from 'src/app/shared/classes/http_response_handler';
import { LocalStorageService } from 'src/app/shared/services/db/local-storage.service';
import { RecordsService } from 'src/app/shared/services/event/records.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent extends HttpResponeHandler implements OnInit {
  public event_id: string = "";
  public request_form_control: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
    Validators.max(100)
  ]);

  public already_sent_requests: Array<string> = new Array<string>();

  constructor(
    private records_service: RecordsService,
    private local_storage_service: LocalStorageService,
    private response_snackbar: MatSnackBar
  ) {
    super(response_snackbar);
    const navigation = this.router.getCurrentNavigation();

    // either way
    if(!!navigation) {
      const navigation_state = navigation.extras.state;

      if(!!navigation_state) {
        this.event_id = navigation_state["event_id"];
      }
    }

    if(this.event_id === "") {
      console.error("welp we did not get the event_id thru navigate")
      throw new Error("event_id must be initialized to send requested record!");
    }
  }

  private updateAlreadySentRequests(): void {
    if(!!this.local_storage_service.load(this.event_id)) {
      this.already_sent_requests = this.local_storage_service.getValuesOf(this.event_id);
    }
  }

  ngOnInit(): void {
    this.updateAlreadySentRequests();
  }

  private httpSuccess(requested_record: string): void {
    this.handleSuccess();
    this.local_storage_service.storeList(this.event_id, requested_record);
    this.request_form_control.setValue("");
    this.updateAlreadySentRequests();
  }

  public sendRequestedRecord(): void {
    const requested_record = this.request_form_control.value;

    this.http_response_sub = this.records_service.addRecord(this.event_id, requested_record).subscribe(
      {
        next: () => this.httpSuccess(requested_record),
        error: (err) => this.handleHttpError(err)
      }
    )
  }
}
