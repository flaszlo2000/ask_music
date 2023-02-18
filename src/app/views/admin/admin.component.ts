import { Component } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  public selectedIndex = 1; // tab focus

  public event_info_update = new Subject<void>();
  public events_update = new Subject<void>();
}
