import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatIconModule} from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog'
const Modules = [MatFormFieldModule,MatInputModule,MatButtonModule,MatDatepickerModule
  ,MatExpansionModule, MatIconModule,MatCardModule,MatProgressSpinnerModule, MatDialogModule];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    Modules
  ],
  exports:[Modules],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class MaterialModule { }
