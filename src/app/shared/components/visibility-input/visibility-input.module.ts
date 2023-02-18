import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisibilityInputComponent } from './visibility-input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [VisibilityInputComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [VisibilityInputComponent]
})
export class VisibilityInputModule { }
