import { Component, OnInit } from '@angular/core';
import { AddEditEventsComponent } from './add-edit-events/add-edit-events.component';
import { MatDialog } from '@angular/material/dialog';
import { EventService } from './event.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { IEvent } from '.';
import { Subscription, tap } from 'rxjs';
import { DeviceService } from '../shared/services/device.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss',
})
export class EventsComponent implements OnInit {
  subscription: Subscription = new Subscription();
  isMobile: boolean = false;
  constructor(
    public dialog: MatDialog,
    private eventService: EventService,
    private snackBar: MatSnackBar,
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

  ngOnInit(): void {
    this.initEvent();
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddEditEventsComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.status) {
        this.snackBar.open(result.message, 'Close', {
          duration: 3000,
        });
      }
    });
  }

  events: MatTableDataSource<IEvent> = new MatTableDataSource<IEvent>([]);
  initEvent() {
    this.eventService
      .getEvents$()
      .pipe(tap((events) => (this.events.data = [...events])))
      .subscribe();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.events.filter = filterValue.trim().toLowerCase();
  }
}
