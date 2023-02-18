import { HttpErrorResponse } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Subscription } from "rxjs";

export class HttpResponeHandler {
    protected http_response_sub?: Subscription;
    
    constructor(
        private response_mat_snackbar: MatSnackBar
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

        const final_msg = !!msg ? msg : "Something went wrong...";

        if(!!err) { console.warn(err.error); }

        this.response_mat_snackbar.open(final_msg, '', {
            duration: 1500
        });
    }
} 