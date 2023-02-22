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
  public name_form_control = new FormControl();
  public password_form_control = new FormControl();
  private tmp_event_detail = {
      name: "",
      note: "",
      password: "",
      
      // ...
      id: "",
      alive: false
    };
  
    public inner_event_detail: DetailedEventModel = this.tmp_event_detail;

  @Input() set editable(state: boolean) {
    this.allow_edit = state;
    this.checkFormControlState();
  }
  @Input() set form_control(form_control: FormControl) {
    this.password_form_control = form_control;
    this.checkFormControlState();
  }
  @Input() set event_detail(data: DetailedEventModel) {
    this.tmp_event_detail = data;
    this.inner_event_detail = data;
    this.name_form_control.setValue(this.inner_event_detail.name);
  };
  @Output() cancelEdit = new EventEmitter<void>();
  @Output() onEdit = new EventEmitter<DetailedEventModel>();

  constructor() { }

  private checkFormControlState(): void {
    const form_controls = [
      this.name_form_control,
      this.password_form_control,
    ]

    form_controls.forEach(form_control => {
      if(this.allow_edit) {
        form_control.enable();
      } else {
        form_control.disable();
      }
    });
  }

  public cancelEditAction(): void {
    this.cancelEdit.emit();
    this.toggleEdit();
  }

  public saveAction(): void {
    const result: DetailedEventModel = {
      name: this.name_form_control.getRawValue(),
      password: this.password_form_control.getRawValue(),
      note: this.inner_event_detail.note,
      alive: this.inner_event_detail.alive,
      id: this.inner_event_detail.id
    };

    this.onEdit.emit(result);
  }

  public toggleEdit(): void {
    this.allow_edit = !this.allow_edit;
    this.checkFormControlState();

    if(!this.allow_edit) {
      this.inner_event_detail = this.tmp_event_detail;
      this.name_form_control.setValue(this.inner_event_detail.name);
      this.password_form_control.setValue(this.inner_event_detail.password)
      // TODO: update note
    }
  }
}
