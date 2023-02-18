import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable, Subscription } from "rxjs";
import { HttpResponeHandler } from "src/app/shared/classes/http_response_handler";

@Component({
  "template": ''
})
export abstract class EventUpdateHandler extends HttpResponeHandler implements OnInit, OnDestroy {
  protected m_event_updater?: Observable<void>;
  protected event_updater_sub?: Subscription;


  @Output() eventUpdate = new EventEmitter<void>();
  @Input() set event_update$(event_updater: Observable<void>) {
    this.m_event_updater = event_updater;
  }

  constructor(
    private response_snackbar: MatSnackBar
  ) {
    super(response_snackbar)
  }

  protected abstract refresh(): void;

  ngOnInit(): void {
    if(!!this.m_event_updater) {
      this.event_updater_sub = this.m_event_updater.subscribe(
        result => {
          this.refresh();
        }
      );
    }
  }

  ngOnDestroy(): void {
    if(!!this.event_updater_sub) {
      this.event_updater_sub.unsubscribe();
    }
  }
}