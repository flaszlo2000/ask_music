import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'visibility-input',
  templateUrl: './visibility-input.component.html',
  styleUrls: ['./visibility-input.component.css']
})
export class VisibilityInputComponent {
  public inner_form_control: FormControl = new FormControl();
  public visible_password = false;

  @Input() set form_control(form_control: FormControl) {
    this.inner_form_control = form_control;
  }

  public toggleVisibility(): void {
    this.visible_password = !this.visible_password;
  }
}
