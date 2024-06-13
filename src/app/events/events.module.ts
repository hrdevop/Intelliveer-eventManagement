import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsRoutingModule } from './events-routing.module';
import { EventsComponent } from './events.component';
import { AddEditEventsComponent } from './add-edit-events/add-edit-events.component';
import { ListEventsComponent } from './list-events/list-events.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';

import { PipeModule } from '../shared/pipes/pipe.module';
import { CalendarViewEventsComponent } from './calendar-view-events/calendar-view-events.component';
import { FullCalendarModule } from '@fullcalendar/angular';

@NgModule({
  declarations: [EventsComponent, AddEditEventsComponent, ListEventsComponent, CalendarViewEventsComponent],
  imports: [
    CommonModule,
    PipeModule,
    EventsRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTableModule,
    MatIconModule,
    MatMenuModule,
    MatCardModule,
    MatDividerModule,
    FullCalendarModule,
    MatTabsModule,
  ],
  providers: [provideNativeDateAdapter()],
  schemas: [],
})
export class EventsModule {}
