import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Note } from '../note';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.scss']
})
export class EditNoteComponent implements OnInit {
  editNoteForm: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required)
  })
  eNote!: Note;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private dialogRef: MatDialogRef<EditNoteComponent>) { }

  ngOnInit(): void {
    this.eNote = this.data;
    this.editNoteForm.controls['title'].setValue(this.eNote.title);
    this.editNoteForm.controls['content'].setValue(this.eNote.content);
  }

  saveNote() {
    this.eNote = {
      title: this.editNoteForm.controls['title'].value,
      content: this.editNoteForm.controls['content'].value,
      time: new Date().toISOString(),
      modified:true
    }
    this.dialogRef.close(this.eNote);
  }
}
