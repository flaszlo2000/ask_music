import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, Subscription, switchMap } from 'rxjs';
import { HttpResponeHandler } from 'src/app/shared/classes/http_response_handler';
import { OnGoingEventModel } from 'src/app/shared/models/ongoing_event.model';
import { OngoingEventService } from 'src/app/shared/services/ongoing_event/ongoing-event.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent extends HttpResponeHandler {
  public ongoing_event$: Observable<OnGoingEventModel>;
  public event_password = new FormControl('',
    [
      Validators.required,
      Validators.minLength(3),
    ]
  );
  
  private event_id?: string;
  public waiting_for_response = false;

  constructor(
    private ongoing_event_service: OngoingEventService,
    private router: Router,
    private error_snackbar: MatSnackBar,
  ) {
    super(error_snackbar);
    this.ongoing_event$ = this.ongoing_event_service.getOngoingEvent();
  }


  private handleSuccessfulLogin(): void {
    this.cleanupSubscription();

    this.router.navigateByUrl(
      "/home", {
        "state": {
          "event_id": this.event_id
        }
      }
    );
  }

  private handleUnsuccessfulLogin(err: HttpErrorResponse): void {
    this.waiting_for_response = false;
    this.handleHttpError(undefined, "Wrong password!");
  }

  public checkPwd(): void {
    if(this.waiting_for_response) { return; }

    const password = !!this.event_password.value ? this.event_password.value : "";
    this.waiting_for_response = true    

    this.http_response_sub = this.ongoing_event$.pipe(
      switchMap(value => {
        this.event_id = value.id;

        return this.ongoing_event_service.tryToLogin(this.event_id, password)
      })
    ).subscribe(
      {
        next: () => this.handleSuccessfulLogin(),
        error: (err) => this.handleUnsuccessfulLogin(err)
      }  
    );
  }
}
