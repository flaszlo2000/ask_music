import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RecordsService } from 'src/app/shared/services/event/records.service';
import { RouterModule } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { StoredRecordComponent } from './components/stored-record/stored-record.component';



@NgModule({
  declarations: [
    HomeComponent,
    StoredRecordComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    RouterModule,
    MatSnackBarModule,
  ],
  providers: [
    RecordsService
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
