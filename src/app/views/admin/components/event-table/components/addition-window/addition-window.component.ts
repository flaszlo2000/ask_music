import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef} from '@angular/material/dialog';
import { DetailedEventModel } from 'src/app/views/admin/models/detailed_event.model';


@Component({
  selector: 'addition-window',
  templateUrl: './addition-window.component.html',
  styleUrls: ['./addition-window.component.css']
})
export class AdditionWindowComponent {
  public new_event_password_form_control = new FormControl();

  constructor(
    public dialogRef: MatDialogRef<AdditionWindowComponent>,
  ) { }
  
  public saveNewEvent(new_event: DetailedEventModel): void {
    this.dialogRef.close(new_event);
  }
}
