import { HttpErrorResponse } from "@angular/common/http";
import { Observable, BehaviorSubject, Subject, Subscription } from "rxjs";

const HTTP_CONFLICT = 409; // the server use this to show the lack of existance of a running event

export class RefreshableDataSource<T> {
    private m_data$ = new Subject<T>();
    private m_data_source_sub?: Subscription;

    constructor(private data_source: Observable<T>) {
        this.getData()
    }
  
    private getData(): void {
        this.m_data_source_sub = this.data_source.subscribe(
            {
                next: (result) => {
                    this.m_data$.next(result);
                },
                error: (err: HttpErrorResponse) => {
                    if(err.status != HTTP_CONFLICT) { 
                        console.warn(err);
                        // if error is thrown then the observable will break
                        this.m_data$.error(err);
                    }
                }
            }
        );
    }

    public refresh(): void {
        if(!!this.m_data_source_sub) {
            this.m_data_source_sub.unsubscribe();
            this.m_data_source_sub = undefined;
        }

        this.getData();
    }

    public get data$(): Observable<T> {
        return this.m_data$.asObservable();
    }
  }