import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, Subscription, switchMap } from 'rxjs';
import { HttpResponeHandler } from 'src/app/shared/classes/http_response_handler';
import { EventModel } from 'src/app/shared/models/event.model';
import { TokenModel } from 'src/app/shared/models/token.model';
import { LocalStorageService } from 'src/app/shared/services/db/local-storage.service';
import { EventService } from 'src/app/shared/services/event/event.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent extends HttpResponeHandler {
  public active_event$: Observable<EventModel>;
  public event_password = new FormControl('',
    [
      Validators.required,
      Validators.minLength(3),
    ]
  );
  
  private event_id?: string;
  public waiting_for_response = false;

  constructor(
    private event_service: EventService,
    private local_storage_service: LocalStorageService,
    private error_snackbar: MatSnackBar,
  ) {
    super(error_snackbar);
    this.active_event$ = this.event_service.getActiveEvent();
  }


  private handleSuccessfulLogin(jwt: TokenModel): void {
    this.cleanupSubscription();

    this.local_storage_service.store("JWT", jwt.access_token);

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

    this.http_response_sub = this.active_event$.pipe(
      switchMap(value => {
        this.event_id = value.id;

        return this.event_service.tryToLogin(this.event_id, password)
      })
    ).subscribe(
      {
        next: (jwt) => this.handleSuccessfulLogin(jwt),
        error: (err) => this.handleUnsuccessfulLogin(err)
      }  
    );
  }
}
