import { Component } from '@angular/core';
import {NavbarComponent} from "../../navbar/navbar.component";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {FormControl, FormsModule} from "@angular/forms";
import {MatFormField} from "@angular/material/form-field";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatInput} from "@angular/material/input";
import { Moment } from 'moment';
import * as moment from 'moment';

interface Section {
  id: string;
  name: string;
  isActive: boolean;
  isCompleted: boolean;
}

interface Employment {
  jobTitle: string;
  companyName: string;
  startDate: string;
  endDate: string;
  isExpanded: boolean;
}

@Component({
  selector: 'app-create-cv',
  standalone: true,
  imports: [
    NavbarComponent,
    NgForOf,
    NgClass,
    NgIf,
    FormsModule,
    MatFormField,
    MatDatepickerToggle,
    MatDatepickerInput,
    MatDatepicker,
    MatInput
  ],
  templateUrl: './create-cv.component.html',
  styleUrl: './create-cv.component.css'
})
export class CreateCvComponent {
  sections: Section[] = [
    { id: 'section1', name: 'Personal Details', isActive: false, isCompleted: false },
    { id: 'section2', name: 'Professional Summary', isActive: false, isCompleted: false },
    { id: 'section3', name: 'Employment History', isActive: false, isCompleted: false }
  ];

  selectedSectionId: string | null = null;
  submitted: boolean = false;

  form: any = {
    firstName: null,
    lastName: null,
    phoneNumber: null,
    email: null,
    country: null,
    city: null,
    professionalSummary: null
  };

  selectSection(sectionId: string): void {
    this.selectedSectionId = sectionId;
  }

  completeSection(sectionId: string): void {
    const section = this.sections.find(s => s.id === sectionId);
    if (section) {
      section.isCompleted = true;
    }
  }

  employments: any[] = [
    { companyName: '', position: '', startDate: '', endDate: '', description: '', isExpanded: false }
  ];

  toggleEmployment(index: number): void {
    this.employments[index].isExpanded = !this.employments[index].isExpanded;
  }

  addEmployment(): void {
    this.employments.push({ companyName: '', position: '', startDate: '', endDate: '', description: '', isExpanded: false });
  }



}
