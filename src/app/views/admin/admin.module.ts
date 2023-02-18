import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs'
import { RouterModule } from '@angular/router';
import { EventInfoComponent } from './components/event-info/event-info.component';
import { RecordTableComponent } from './components/record-table/record-table.component';
import { EventTableComponent } from './components/event-table/event-table.component';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar'
import { AdminService } from './services/admin.service';
import { DbService } from 'src/app/shared/services/db/db.service';
import { VisibilityInputModule } from 'src/app/shared/components/visibility-input/visibility-input.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RecordLineComponent } from './components/record-table/record-line/record-line.component';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    AdminComponent,
    AdminLoginComponent,
    EventInfoComponent,
    RecordTableComponent,
    EventTableComponent,
    RecordLineComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatTabsModule,
    RouterModule,
    MatCardModule,
    MatToolbarModule,
    VisibilityInputModule,
    MatSnackBarModule,
    MatIconModule,
  ],
  providers: [
    DbService,
    AdminService
  ],
  exports: [
    AdminLoginComponent,
    AdminComponent,
  ]
})
export class AdminModule { }
