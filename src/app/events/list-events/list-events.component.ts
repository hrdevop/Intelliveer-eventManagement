import { Component, Input, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IEvent } from '..';
import { EventService } from '../event.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { AddEditEventsComponent } from '../add-edit-events/add-edit-events.component';
import { DeviceService } from '../../shared/services/device.service';
import { Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-list-events',
  templateUrl: './list-events.component.html',
  styleUrl: './list-events.component.scss',
})
export class ListEventsComponent implements OnDestroy {
  subscription: Subscription = new Subscription();
  @Input({ required: true }) events: MatTableDataSource<IEvent> = new MatTableDataSource<IEvent>([]);
  @Input({ required: true }) searchTerm: string = '';
  isMobile: boolean = false;
  constructor(
    private eventService: EventService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private deviceService: DeviceService
  ) {
    const sub = this.deviceService.isMobile$
      .pipe(
        tap((res) => {
          this.isMobile = res;
        })
      )
      .subscribe();

    this.subscription.add(sub);
  }

  displayedColumns: string[] = ['title', 'date', 'location', 'description', 'actions'];

  editEvent(event: IEvent) {
    const dialog = this.dialog.open(AddEditEventsComponent, {
      width: '400px',
      data: event,
    });

    dialog.afterClosed().subscribe((result) => {
      if (result.status) {
        this.snackBar.open(result.message, 'Close', {
          duration: 3000,
        });
      }
    });
  }
  deleteEvent(id: string) {
    this.eventService.deleteEvent(id);
    this.snackBar.open('Event deleted successfully', 'Close', {
      duration: 3000,
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
