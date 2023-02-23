import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { AdditionWindowComponent } from './components/event-table/components/addition-window/addition-window.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CurrentEventComponent } from './components/current-event/current-event.component';
import { MatExpansionModule } from '@angular/material/expansion'
import { WebsocketService } from './services/websocket.service';
import { ClipboardModule } from '@angular/cdk/clipboard';


@NgModule({
  declarations: [
    AdminComponent,
    AdminLoginComponent,
    EventInfoComponent,
    RecordTableComponent,
    EventTableComponent,
    RecordLineComponent,
    AdditionWindowComponent,
    CurrentEventComponent
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
    MatDialogModule,
    MatExpansionModule,
    ClipboardModule
  ],
  providers: [
    DbService,
    AdminService,
    WebsocketService
  ],
  exports: [
    AdminLoginComponent,
    AdminComponent,
  ]
})
export class AdminModule { }
