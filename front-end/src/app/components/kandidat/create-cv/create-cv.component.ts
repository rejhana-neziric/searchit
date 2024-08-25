import {Component, OnInit} from '@angular/core';
import {NavbarComponent} from "../../navbar/navbar.component";
import {DatePipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormField} from "@angular/material/form-field";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatInput} from "@angular/material/input";
import { Moment } from 'moment';
import * as moment from 'moment';
import {NotificationToastComponent} from "../../notifications/notification-toast/notification-toast.component";
import {Employment} from "../../../modals/employment";
import {GetVjestineEndpoint} from "../../../endpoints/vjestine-endpoint/get/get-vjestine-endpoint";
import {
  GetTehnickeVjestineEndpoint
} from "../../../endpoints/tehnicke-vjestine-endpoint/get/tehnicke-vjestine-get-endpoint";
import {HttpClient} from "@angular/common/http";
import {catchError, throwError} from "rxjs";
import {GetVjestineResponse} from "../../../endpoints/vjestine-endpoint/get/get-vjestine-response";

interface Section {
  id: string;
  name: string;
  isActive: boolean;
  isCompleted: boolean;
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
    MatInput,
    DatePipe,
    NotificationToastComponent,
    ReactiveFormsModule
  ],
  templateUrl: './create-cv.component.html',
  styleUrl: './create-cv.component.css'
})
export class CreateCvComponent implements OnInit{

  sections: Section[] = [
    { id: 'section1', name: 'Personal Details', isActive: false, isCompleted: false },
    { id: 'section2', name: 'Professional Summary', isActive: false, isCompleted: false },
    { id: 'section3', name: 'Education', isActive: false, isCompleted: false },
    { id: 'section4', name: 'Employment History', isActive: false, isCompleted: false },
    { id: 'section5', name: 'Skills', isActive: false, isCompleted: false },
    { id: 'section6', name: 'Technical Skills', isActive: false, isCompleted: false },
    { id: 'section7', name: 'Courses', isActive: false, isCompleted: false },
    { id: 'section8', name: 'Websites & Social Links', isActive: false, isCompleted: false },
  ];

  selectedSectionId: string | null = null;
  submitted: boolean = false;
  form: FormGroup = new FormGroup({});
  professionalSummary: string | null = null;
  skills: string[] = [];
  selectedSkills: string[] = [];
  technicalSkills: string[] = [];
  selectedTechnicalSkills: string[] = [];
  courses: string[] = [];

  constructor(private formBuilder: FormBuilder,
              private getVjestineEndpoint: GetVjestineEndpoint,
              private getTehnickeVjestineEndpoint: GetTehnickeVjestineEndpoint,
              private http: HttpClient) {

  }

  async ngOnInit(): Promise<void> {
    this.initializeForm();
    await this.getVjestine();
    await this.getTehnickeVjestine();

    console.log(this.skills);
  }

  initializeForm() {
    this.form = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.min(3), Validators.max(30)]],
      lastName: ['', [Validators.required, Validators.min(3), Validators.max(30)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.pattern("^\\+[0-9]{3}-[0-9]{3}-[0-9]{3}-[0-9]{3,4}$")],
      city: [''],
      country: [''],
    })
  }

  async getVjestine() {
    this.getVjestineEndpoint.obradi().subscribe({
      next: x => {
          //const lista = x.lista
          this.skills = x.lista.$values
      },
      error: err => {
        console.error('Error fetching skills:', err); // Log the error
      }
    })

    console.log('Skills before update:', this.skills);
  }


  onSkillChange(skill: string, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.selectedSkills.push(skill);
    } else {
      this.selectedSkills = this.selectedSkills.filter(s => s !== skill);
    }

    console.log(this.selectedSkills)
  }

  onTechnicalSkillChange(technicalSkill: string, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.selectedTechnicalSkills.push(technicalSkill);
    } else {
      this.selectedTechnicalSkills = this.selectedTechnicalSkills.filter(s => s !== technicalSkill);
    }
    console.log(this.selectedTechnicalSkills)
  }


  async getTehnickeVjestine() {
    this.getTehnickeVjestineEndpoint.obradi().subscribe({
      next: x => {
        this.technicalSkills = x.lista.$values;
      }
    })
  }


  // Add a new course with an empty name
  addCourse() {
    this.courses.push('');
  }

  // Remove a course by index
  removeCourse(index: number) {
    this.courses.splice(index, 1);
  }

  trackByFn(index: number, item: string) {
    return index; // Track items by their index
  }

  addUrl() {
    this.urls.push({ name: '', link: '' });
  }

  removeUrl(index: number) {
    this.urls.splice(index, 1);
  }

  // Get the list of course names (e.g., to save to the backend)
  getCoursesList(): string[] {
    return this.courses;
  }

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
    //{ companyName: '', position: '', startDate: '', endDate: '', description: '', isExpanded: false }
  ];

  educations: any[] = [
    //{ schoolName: '', city: '', startDate: '', endDate: '', description: '', isExpanded: false }
  ];

  urls: { name: string; link: string }[] = [];

  toggleEducation(index: number): void {
    this.educations[index].isExpanded = !this.educations[index].isExpanded;
  }

  toggleEmployment(index: number): void {
    this.employments[index].isExpanded = !this.employments[index].isExpanded;
  }

  addEmployment(): void {
    this.employments.push({ companyName: '', position: '', startDate: '', endDate: '', description: '', isExpanded: false });
  }

  deleteEmployment(index: number): void {
    this.employments.splice(index, 1);
  }

  addEducation(): void {
    this.educations.push({ companyName: '', position: '', startDate: '', endDate: '', description: '', isExpanded: false });
  }

  deleteEducation(index: number): void {
    this.educations.splice(index, 1);
  }

  savePersonalDetails() {
    this.submitted = true;

    if (this.form.valid) {
      this.completeSection('section1');
      this.selectedSectionId = 'section2';
    }

  }

  completedProfessinalSummary(){
    this.selectedSectionId = 'section3';

    if(this.professionalSummary != null){
      this.completeSection('section2');
    }
  }

  completedEducation() {
    this.selectedSectionId = 'section4';

    if(this.educations.length > 0){
      this.completeSection('section3');
    }
  }

  completedEmployment() {
    this.selectedSectionId = 'section5';

    if(this.employments.length > 0){
      this.completeSection('section4');
    }
  }

  completedSkills() {
    this.selectedSectionId = 'section6';

    if(this.selectedSkills.length > 0){
      this.completeSection('section5');
    }
  }

  completedTechnicalSkills() {
    this.selectedSectionId = 'section7';

    if(this.selectedTechnicalSkills.length > 0){
      this.completeSection('section6');
    }
  }

  completedCourses() {
    this.selectedSectionId = 'section8';

    if(this.courses.length > 0){
      this.completeSection('section7');
    }
  }
}
