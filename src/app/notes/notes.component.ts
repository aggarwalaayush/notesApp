import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Note } from '../note';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  newNoteForm: FormGroup = new FormGroup(
    {
      title: new FormControl('',Validators.required),
      content: new FormControl('',Validators.required)
    }
  );
  noteAdded:boolean = false;
  newNoteBtnClicked:boolean = false;
  notesArray: Note[] = [];
  defaultNote: Note = {
    title: "Default",
    content: "This is a sample note",
    time: new Date().toISOString()
  };

  constructor(private toastr: ToastrService) { }
  ngOnInit(): void {
    console.log(typeof(JSON.parse(JSON.stringify(window.localStorage.getItem("notes-array")))))
    if(window.localStorage.getItem("notes-array")!=null){
      let localArray = JSON.parse(JSON.stringify(window.localStorage.getItem("notes-array")));
      this.notesArray = JSON.parse(localArray);
    }
    else{
    this.notesArray.push(this.defaultNote);
    }
  }

  createNote() {
    if (this.newNoteForm.valid) {
      window.localStorage.clear()
      this.noteAdded = false;
      const newNote: Note = {
        title: this.newNoteForm.controls['title'].value,
        content: this.newNoteForm.controls['content'].value,
        time: new Date().toISOString()
      }
      setTimeout(()=>{
        this.noteAdded = true;
        this.notesArray.push(newNote);
        this.newNoteBtnClicked = false;
        this.newNoteForm.reset();
        window.localStorage.setItem("notes-array",JSON.stringify(this.notesArray));
        this.toastr.success("Note has been added successfully","Note added",{ positionClass: 'toast-bottom-center'} );
      },3000)
    }    
  }

  deleteNote(i:number){
    this.notesArray.splice(i,1);
    this.toastr.success("Note has been deleted successfully","Note Deleted",{ positionClass: 'toast-bottom-center'} );

    window.localStorage.setItem("notes-array",JSON.stringify(this.notesArray));
  }
}
