import { HttpErrorResponse } from "@angular/common/http";
import { Host } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

export class HttpResponeHandler {
    protected http_response_sub?: Subscription;
   
    constructor(
        private response_mat_snackbar: MatSnackBar,
        protected router: Router
    ) { }

    protected cleanupSubscription(): void {
        if(!!this.http_response_sub) {
            this.http_response_sub.unsubscribe();
            this.http_response_sub = undefined;
        }
    }

    public handleSuccess(): void {
        this.cleanupSubscription();

        this.response_mat_snackbar.open("Success!", '', {
            duration: 1000
        });
    }

    public handleHttpError(err: HttpErrorResponse | undefined = undefined, msg: string | undefined = undefined): void {
        this.cleanupSubscription();

        const unknown_error_msg = "Something went wrong...";
        let final_msg = !!msg ? msg : unknown_error_msg;

        if(!!err) {
            console.warn(err);

            const err_msg = err.error["detail"];
            if(!!err_msg) {
                final_msg = err_msg;
            }

            if(err.status != 400) { // bad request
                final_msg = unknown_error_msg;
            }

            if(err.status == 401) { // unauthorized
                this.router.navigateByUrl("/");
            }
        }

        this.response_mat_snackbar.open(final_msg, '', {
            duration: 1500
        });
    }
} 