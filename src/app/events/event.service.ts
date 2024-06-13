import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalStorageService } from '../shared/services/local-storage.service';
import { IEvent } from '.';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private eventsSubject = new BehaviorSubject<IEvent[]>([]);
  private events: IEvent[] = [];
  private readonly eventsKey = 'events';

  constructor(private localStorageService: LocalStorageService) {
    this.loadEvents();
  }

  private loadEvents(): void {
    this.events = this.localStorageService.getItem<IEvent[]>(this.eventsKey) || [];
    this.eventsSubject.next(this.events || []);
  }

  /**
   * Retrieves the list of events from local storage.
   * @returns The list of events.
   */
  getEvents$(): Observable<IEvent[]> {
    if (!this.events.length) {
      this.loadEvents();
    }
    return this.eventsSubject.asObservable();
  }

  /**
   * Adds a new event to the list and stores it in local storage.
   * @param event The event to add.
   */
  addEvent(event: IEvent): void {
    event.id = crypto.randomUUID();
    this.events.push(event);
    this.localStorageService.setItem(this.eventsKey, this.events);
    this.eventsSubject.next(this.events);
  }

  /**
   * Updates an existing event in the list and stores it in local storage.
   * @param updatedEvent The updated event.
   */
  updateEvent(updatedEvent: IEvent): void {
    const index = this.events.findIndex((event) => event.id === updatedEvent.id);
    if (index !== -1) {
      this.events[index] = updatedEvent;
      this.localStorageService.setItem(this.eventsKey, this.events);
      this.eventsSubject.next(this.events);
    }
  }

  /**
   * Deletes an event from the list and updates local storage.
   * @param eventId The ID of the event to delete.
   */
  deleteEvent(eventId: string): void {
    const events = this.events.filter((event) => event.id !== eventId);
    this.localStorageService.setItem(this.eventsKey, events);
    this.eventsSubject.next(events);
  }
}
