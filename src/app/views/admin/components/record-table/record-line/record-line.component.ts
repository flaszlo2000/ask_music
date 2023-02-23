import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RecordModel } from '../../../models/record.model';

@Component({
  selector: 'record-line',
  templateUrl: './record-line.component.html',
  styleUrls: ['./record-line.component.css']
})
export class RecordLineComponent {
  public record_data?: RecordModel;

  @Output() done = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();
    
  @Input() set record(data: RecordModel) {
    this.record_data = data;
  }
  
  constructor(
    private clipboard_snackbar: MatSnackBar
  ) { }


  public successfullCopy(): void {
    this.clipboard_snackbar.open("Copied to the clipboard!", "", {
      duration: 1000
    });
  }
}
