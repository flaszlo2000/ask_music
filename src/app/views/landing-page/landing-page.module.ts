import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './landing-page.component';
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { EventService } from 'src/app/shared/services/event/event.service';
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { RouterModule } from '@angular/router';
import { VisibilityInputModule } from 'src/app/shared/components/visibility-input/visibility-input.module';
import { LocalStorageService } from 'src/app/shared/services/db/local-storage.service';

@NgModule({
  declarations: [
    LandingPageComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatSnackBarModule,
    RouterModule,
    VisibilityInputModule
  ],
  providers: [
    EventService,
    LocalStorageService
  ],
  exports: [
    LandingPageComponent
  ]
})
export class LandingPageModule { }
