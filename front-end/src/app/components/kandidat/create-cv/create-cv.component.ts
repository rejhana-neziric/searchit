import {Component, EventEmitter, Inject, OnInit, Output, PLATFORM_ID} from '@angular/core';
import {NavbarComponent} from "../../navbar/navbar.component";
import {DatePipe, isPlatformBrowser, NgClass, NgForOf, NgIf} from "@angular/common";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormField} from "@angular/material/form-field";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatInput} from "@angular/material/input";
import {NotificationToastComponent} from "../../notifications/notification-toast/notification-toast.component";
import {GetVjestineEndpoint} from "../../../endpoints/vjestine-endpoint/get/get-vjestine-endpoint";
import {
  GetTehnickeVjestineEndpoint
} from "../../../endpoints/tehnicke-vjestine-endpoint/get/tehnicke-vjestine-get-endpoint";
import {firstValueFrom, take} from "rxjs";
import {CvDodajRequest} from "../../../endpoints/cv-endpoint/dodaj/cv-dodaj-request";
import {CVDodajEndpoint} from "../../../endpoints/cv-endpoint/dodaj/cv-dodaj-endpoint";
import {User} from "../../../modals/user";
import {AuthService} from "../../../services/auth-service";
import {NotificationService} from "../../../services/notification-service";
import {Router, RouterLink} from "@angular/router";
import {CVGetEndpoint} from "../../../endpoints/cv-endpoint/get/cv-get-endpoint";
import {CVGetResponseCV} from "../../../endpoints/cv-endpoint/get/cv-get-response";
import {FooterComponent} from "../../footer/footer.component";

declare var bootstrap: any;

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
    ReactiveFormsModule,
    RouterLink,
    FooterComponent
  ],
  templateUrl: './create-cv.component.html',
  styleUrl: './create-cv.component.css'
})
export class CreateCvComponent implements OnInit {

  @Output() dataEmitter = new EventEmitter<CvDodajRequest>();

  sections: Section[] = [
    {id: 'section1', name: 'Personal Details', isActive: false, isCompleted: false},
    {id: 'section2', name: 'Professional Summary', isActive: false, isCompleted: false},
    {id: 'section3', name: 'Education', isActive: false, isCompleted: false},
    {id: 'section4', name: 'Employment History', isActive: false, isCompleted: false},
    {id: 'section5', name: 'Skills', isActive: false, isCompleted: false},
    {id: 'section6', name: 'Technical Skills', isActive: false, isCompleted: false},
    {id: 'section7', name: 'Courses', isActive: false, isCompleted: false},
    {id: 'section8', name: 'Websites & Social Links', isActive: false, isCompleted: false},
  ];

  selectedSectionId: string | null = null;
  submitted: boolean = false;
  form: FormGroup = new FormGroup({});
  professionalSummary: string | null | undefined = null;
  skills: string[] = [];
  selectedSkills: string[] = [];
  technicalSkills: string[] = [];
  selectedTechnicalSkills: string[] = [];
  courses: string[] = [];
  cv: CvDodajRequest | undefined = undefined;
  loggedUserId: string = "";
  employments: any[] = [];
  educations: any[] = [];
  urls: { naziv: string; putanja: string }[] = [];
  previouslyCreatedCv: CVGetResponseCV | null = null;

  constructor(private formBuilder: FormBuilder,
              private getVjestineEndpoint: GetVjestineEndpoint,
              private getTehnickeVjestineEndpoint: GetTehnickeVjestineEndpoint,
              private cvDodajEndpoint: CVDodajEndpoint,
              private cvGetEndpoint: CVGetEndpoint,
              private authService: AuthService,
              private notificationService: NotificationService,
              private router: Router,
              @Inject(PLATFORM_ID) private platformId: any) {

  }

  async ngOnInit(): Promise<void> {
    this.selectedSectionId = 'section1';
    this.initializeForm();
    await this.getVjestine();
    await this.getTehnickeVjestine();

    const savedData = localStorage.getItem('cvData');
    if (savedData) {
      this.cv = JSON.parse(savedData);
      this.getSavedData();
    }


    this.authService.user$.pipe(take(1)).subscribe({
      next: (user: User | null) => {
        if (user) {
          this.loggedUserId = user.id;
        }
      }
    })

    await this.getCV();



  }

  async getCV() {
    const requset = {
      kandidatId: this.loggedUserId,
      objavljen: null
    };

    try {
      const response = await firstValueFrom(this.cvGetEndpoint.obradi(requset));
      this.previouslyCreatedCv = response.cv.$values[0];
    } catch (error) {
      console.log(error);
    }
  }

  initializeForm() {
    this.form = this.formBuilder.group({
      naziv: ['', [Validators.required]],
      firstName: ['', [Validators.required, Validators.min(3), Validators.max(30)]],
      lastName: ['', [Validators.required, Validators.min(3), Validators.max(30)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.pattern(/^\+\d{1,3}-\d{2}-\d{3}-\d{3,4}$/)]],
      city: [''],
      country: [''],
    })
  }

  getSavedData() {
    this.form.patchValue({
      naziv: this.cv?.naziv,
      firstName: this.cv?.ime,
      lastName: this.cv?.prezime,
      email: this.cv?.email,
      phoneNumber: this.cv?.brojTelefona,
      city: this.cv?.grad,
      country: this.cv?.drzava,
    });

    this.professionalSummary = this.cv?.profesionalniSazetak;
    this.educations = this.cv?.edukacija ?? [];
    this.employments = this.cv?.zaposlenje ?? [];
    this.urls = this.cv?.url ?? [];

    this.selectedSkills = this.cv?.vjestine ?? [];
    this.selectedTechnicalSkills = this.cv?.tehnickeVjestine ?? [];
    this.courses = this.cv?.kursevi ?? [];
  }

  async getVjestine() {
    this.getVjestineEndpoint.obradi().subscribe({
      next: x => {
        //const lista = x.lista
        this.skills = x.lista.$values
      },
      error: err => {
        console.error('Error fetching skills:', err);
      }
    })
  }

  onSkillChange(skill: string, event: Event, selectedSkills: string[]) {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      selectedSkills.push(skill);
    } else {
      selectedSkills = selectedSkills.filter(s => s !== skill);
    }
    console.log(selectedSkills);
  }

  async getTehnickeVjestine() {
    this.getTehnickeVjestineEndpoint.obradi().subscribe({
      next: x => {
        this.technicalSkills = x.lista.$values;
      }
    })
  }

  addCourse() {
    this.courses.push('');
  }

  // Remove a course by index
  removeCourse(index: number) {
    this.courses.splice(index, 1);
  }

  trackByFn(index: number, item: string) {
    return index;
  }

  addUrl() {
    this.urls.push({naziv: '', putanja: ''});
  }

  removeUrl(index: number) {
    this.urls.splice(index, 1);
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

  toggleEducation(index: number): void {
    this.educations[index].isExpanded = !this.educations[index].isExpanded;
  }

  toggleEmployment(index: number): void {
    this.employments[index].isExpanded = !this.employments[index].isExpanded;
  }

  addEmployment(): void {
    this.employments.push({
      nazivKompanije: '',
      nazivPozicije: '',
      datumPocetka: '',
      datumZavrsetka: '',
      opis: '',
      isExpanded: false
    });
  }

  deleteEmployment(index: number): void {
    this.employments.splice(index, 1);
  }

  addEducation(): void {
    this.educations.push({nazivSkole: '', datumPocetka: '', datumZavrsetka: '', opis: '', isExpanded: false});
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

  completedProfessinalSummary() {
    this.selectedSectionId = 'section3';
    if (this.professionalSummary != null) {
      this.completeSection('section2');
    }
  }

  completedSectionWithList(sectionId: string, nextSectionId: string, items: any[]) {
    this.selectedSectionId = nextSectionId;
    if (items.length > 0) {
      this.completeSection(sectionId);
    }
  }

  saveCvData(objavljen: boolean) {
    const edukacija = JSON.parse(JSON.stringify(this.educations));
    const zaposlenje = JSON.parse(JSON.stringify(this.employments));
    const url = JSON.parse(JSON.stringify(this.urls));

    this.cv = {
      kandidatId: this.loggedUserId,
      naziv: this.form.get('naziv')?.value,
      objavljen: objavljen,
      ime: this.form.get('firstName')?.value,
      prezime: this.form.get('lastName')?.value,
      email: this.form.get('email')?.value,
      brojTelefona: this.form.get('phoneNumber')?.value,
      grad: this.form.get('city')?.value,
      drzava: this.form.get('country')?.value,
      profesionalniSazetak: this.professionalSummary!,
      vjestine: this.selectedSkills,
      tehnickeVjestine: this.selectedTechnicalSkills,
      kursevi: this.courses,
      edukacija: edukacija,
      zaposlenje: zaposlenje,
      url: url
    }
  }

  cvPreview() {
    this.saveCvData(false);
    localStorage.setItem('cvData', JSON.stringify(this.cv));

    this.router.navigate(['/cv-preview'], {
      state: {data: this.cv}
    });
  }

  createCV(objavljen: boolean) {
    this.saveCvData(objavljen);

    this.cvDodajEndpoint.obradi(this.cv!).subscribe({
      next: response => {
        this.notificationService.showModalNotification(true, 'CV created', 'Your CV has been successfully created.');
        this.router.navigateByUrl('/cv');
        localStorage.removeItem('cvData');
        this.notificationService.clearModalNotification();
      },
      error: error => {
        this.closeModal();
        this.notificationService.addNotification({message: `Error: ${error.message}`, type: 'error'});
      }
    })
  }

  openModal() {
    if (this.form.invalid) {
      this.selectedSectionId = 'section1';
    } else if (isPlatformBrowser(this.platformId)) {
      const modalElement = document.getElementById('confirmSaveModal');
      if (modalElement) {
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
      }
    }
  }

  closeModal() {
    if (isPlatformBrowser(this.platformId)) {
      const modalElement = document.getElementById('confirmSaveModal');
      if (modalElement) {
        const modal = bootstrap.Modal.getInstance(modalElement);
        if (modal) {
          modal.hide();
        }
      }
    }
  }

  importDetails() {
    this.form.patchValue({
      naziv: this.previouslyCreatedCv?.naziv,
      firstName: this.previouslyCreatedCv?.ime,
      lastName: this.previouslyCreatedCv?.prezime,
      email: this.previouslyCreatedCv?.email,
      phoneNumber: this.previouslyCreatedCv?.brojTelefona,
      city: this.previouslyCreatedCv?.grad,
      country: this.previouslyCreatedCv?.drzava,
    });
  }
}
