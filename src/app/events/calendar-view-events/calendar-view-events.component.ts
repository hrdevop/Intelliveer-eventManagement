import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { IEvent } from '..';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-calendar-view-events',
  templateUrl: './calendar-view-events.component.html',
  styleUrls: ['./calendar-view-events.component.scss'],
})
export class CalendarViewEventsComponent implements OnInit, OnChanges {
  @Input() events: IEvent[] = [];
  calendarEvents: any[] = [];
  calendarOptions!: CalendarOptions;

  constructor() {}

  ngOnInit() {
    this.calendarOptions = {
      plugins: [dayGridPlugin, interactionPlugin],
      initialView: 'dayGridMonth',
      weekends: false,
      height: '70vh',
      themeSystem: 'bootstrap5',
      events: this.calendarEvents,
    };
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['events'] && changes['events'].currentValue) {
      this.calendarEvents = this.events.map((event) => ({
        title: event.title,
        start: event.date,
      }));

      // Update calendar options with new events
      this.calendarOptions = {
        ...this.calendarOptions,
        events: this.calendarEvents,
      };
    }
  }
}
