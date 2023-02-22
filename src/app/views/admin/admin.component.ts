import { Component } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  public selectedIndex = 2; // tab focus

  public event_info_update = new Subject<void>();
  public events_update = new Subject<void>();
  public any_update = new Subject<void>();

  public eventInfoUpdate(): void {
    this.event_info_update.next();
    this.any_update.next();
  }

  public eventsUpdate(): void {
    this.events_update.next();
    this.any_update.next(); 
  }
}
