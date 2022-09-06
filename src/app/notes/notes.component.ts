import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Note } from '../note';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { EditNoteComponent } from '../edit-note/edit-note.component';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  @ViewChildren(MatAccordion) accordion!: QueryList<MatAccordion>;
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
    time: new Date().toISOString(),
    modified:false
  };
  eNote!: Note;
  gridView:boolean = false;
  allExpanded:boolean = false;

  constructor(private toastr: ToastrService, public dialog: MatDialog) { }
  ngOnInit(): void {
    if(window.localStorage.getItem("notes-array")!=null){
      let localArray = JSON.parse(JSON.stringify(window.localStorage.getItem("notes-array")));
      this.notesArray = JSON.parse(localArray);
    }
    else{
    this.notesArray.push(this.defaultNote);
    }
  }
  ngAfterViewInit(){
    let el =document.querySelectorAll('accordion')
    console.log(this.accordion,"el",el)
  }
  expandAll(){
    this.accordion.forEach((item)=>{
      item.openAll();
    });
    this.allExpanded = true;
  }
  collapseAll(){
    this.accordion.forEach((item)=>{
      item.closeAll();
    });
    this.allExpanded = false;
  }
  createNote() {
    if (this.newNoteForm.valid) {
      window.localStorage.clear()
      this.noteAdded = false;
      const newNote: Note = {
        title: this.newNoteForm.controls['title'].value,
        content: this.newNoteForm.controls['content'].value,
        time: new Date().toISOString(),
        modified:false
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
  editNote(i:number){
    window.localStorage.removeItem("notes-array");
    this.eNote = this.notesArray[i];
    let temp = this.eNote;
    const dialogRef = this.dialog.open(EditNoteComponent,{
      data:this.eNote
    })
    dialogRef.afterClosed().subscribe(res =>{
      if(res)
      {
        this.notesArray[i] = res;
      }
      else{
        this.notesArray[i] = temp;
      }
      window.localStorage.setItem("notes-array",JSON.stringify(this.notesArray));
    })
  }
  changeView(){
    this.gridView = !this.gridView;
  }
}
