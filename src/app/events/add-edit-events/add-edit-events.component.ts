import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EventService } from '../event.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IEvent } from '..';

@Component({
  selector: 'app-add-edit-events',
  templateUrl: './add-edit-events.component.html',
  styleUrl: './add-edit-events.component.scss',
})
export class AddEditEventsComponent {
  form: FormGroup;
  isEdit: boolean = false;

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private dialogRef: MatDialogRef<AddEditEventsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IEvent
  ) {
    this.form = this.fb.group({
      id: [''],
      title: ['', Validators.required],
      date: ['', Validators.required],
      description: ['', Validators.required],
      location: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.initEditForm();
      this.isEdit = true;
    }
  }

  initEditForm(): void {
    if (this.data) {
      this.form.patchValue(this.data);
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      if (this.isEdit) {
        this.eventService.updateEvent(this.form.value);
        this.dialogRef.close({
          status: true,
          message: 'Event updated successfully',
        });
      } else {
        this.eventService.addEvent(this.form.value);
        this.dialogRef.close({
          status: true,
          message: 'Event added successfully',
        });
      }
    }
  }
}
