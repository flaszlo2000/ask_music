import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DetailedEventModel } from '../../models/detailed_event.model';


@Component({
  selector: 'event-info',
  templateUrl: './event-info.component.html',
  styleUrls: ['./event-info.component.css']
})
export class EventInfoComponent {  
  public allow_edit = false;
  public password_form_control = new FormControl();

  @Input() set form_control(form_control: FormControl) {
    this.password_form_control = form_control;
    this.checkPasswordFormState();
  }
  @Input() event_detail?: DetailedEventModel;
  @Output() cancelEdit = new EventEmitter<void>();
  @Output() onEdit = new EventEmitter<DetailedEventModel>();

  constructor() { }

  private checkPasswordFormState(): void {
    if(this.allow_edit) {
      this.password_form_control.enable();
    } else {
      this.password_form_control.disable();
    }
  }

  public cancelEditAction(): void {
    this.cancelEdit.emit();
    this.toggleEdit();
  }

  public toggleEdit(): void {
    this.allow_edit = !this.allow_edit;
    this.checkPasswordFormState();
  }
}
