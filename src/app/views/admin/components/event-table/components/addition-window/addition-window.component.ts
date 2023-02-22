import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'addition-window',
  templateUrl: './addition-window.component.html',
  styleUrls: ['./addition-window.component.css']
})
export class AdditionWindowComponent {
  public new_event_password_form_control = new FormControl();

  constructor(
    public dialogRef: MatDialogRef<AdditionWindowComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
}
