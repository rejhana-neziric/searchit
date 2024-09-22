import {Component, EventEmitter, Inject, OnInit, Output, PLATFORM_ID} from '@angular/core';
import {NavbarComponent} from "../../layout/navbar/navbar.component";
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
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {CVGetEndpoint} from "../../../endpoints/cv-endpoint/get/cv-get-endpoint";
import {CVGetResponseCV} from "../../../endpoints/cv-endpoint/get/cv-get-response";
import {FooterComponent} from "../../layout/footer/footer.component";
import {CVGetByIdEndpoint} from "../../../endpoints/cv-endpoint/get-by-id/cv-get-by-id-endpoint";
import {CVGetByIdResponse} from "../../../endpoints/cv-endpoint/get-by-id/cv-get-by-id-response";
import {CVUpdateEndpoint} from "../../../endpoints/cv-endpoint/update/cv-update-endpoint";
import {ModalComponent} from "../../notifications/modal/modal.component";
import {ModalService} from "../../../services/modal-service";
import {KandidatGetByIdResponse} from "../../../endpoints/kandidat-endpoint/get-by-id/kandidat-get-by-id-response";
import {KandidatGetByIdEndpoint} from "../../../endpoints/kandidat-endpoint/get-by-id/kandidat-get-by-id-endpoint";

interface Section {
  id: string;
  name: string;
  isActive: boolean;
  isCompleted: boolean;
}

@Component({
  selector: 'app-cv-create',
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
    FooterComponent,
    ModalComponent
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

  saveButtons = [
    {text: 'Cancel', class: 'btn-cancel', action: () => this.closeSaveModal()},
    {text: 'Save', class: 'btn-confirm', action: () => this.confirmSave()}
  ];

  createCVButtons = [
    {text: 'Cancel', class: 'btn-cancel', action: () => this.closeCreateCVModal()},
    {text: 'Save as draft', class: 'btn-confirm w-auto', action: () => this.createCV(false)},
    {text: 'Publish', class: 'btn-confirm', action: () => this.createCV(true)},
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
  cvEditId: string | null = null;
  cvEdit: CVGetByIdResponse | null = null;
  edit: boolean = false;
  kandidat: KandidatGetByIdResponse | null = null;
  phoneNumber: string = "";
  isImportDetails: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private getVjestineEndpoint: GetVjestineEndpoint,
              private getTehnickeVjestineEndpoint: GetTehnickeVjestineEndpoint,
              private cvDodajEndpoint: CVDodajEndpoint,
              private cvGetEndpoint: CVGetEndpoint,
              private cvGetByIdEndpoint: CVGetByIdEndpoint,
              private cvUpdateEndpoint: CVUpdateEndpoint,
              private kandidatGetByIdEndpoint: KandidatGetByIdEndpoint,
              private authService: AuthService,
              private notificationService: NotificationService,
              private modalService: ModalService,
              private router: Router,
              private route: ActivatedRoute,
              @Inject(PLATFORM_ID) private platformId: any) {

  }

  async ngOnInit(): Promise<void> {
    this.selectedSectionId = 'section1';
    this.initializeForm();
    await this.getVjestine();
    await this.getTehnickeVjestine();

    // Loading id of the CV that needs to be edited
    this.route.paramMap.subscribe(params => {
      this.cvEditId = params.get('id');
    });

    // Loading data for editing CV
    if (this.cvEditId != null) {
      this.edit = true;
      await this.getCV();
      await this.setFormData(this.cvEdit);
      this.checkCompletedSections();
    }

    // Loading CV data if CV is not created yet
    const savedData = localStorage.getItem('cvData');
    if (savedData) {
      this.cv = JSON.parse(savedData);
      await this.setFormData(this.cv);
      this.checkCompletedSections();
    }

    this.authService.user$.pipe(take(1)).subscribe({
      next: (user: User | null) => {
        if (user) {
          this.loggedUserId = user.id;
        }
      }
    })

    this.getPersonalDetails();
  }

  // Get CV for editing
  async getCV(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.cvGetByIdEndpoint.obradi(Number(this.cvEditId)).subscribe({
        next: (x) => {
          this.cvEdit = x;
          resolve();
        },
        error: (err) => {
          console.error(err);
          reject(err);
        }
      });
    });
  }

  getPersonalDetails() {
    this.kandidatGetByIdEndpoint.obradi(this.loggedUserId).subscribe({
      next: (response: KandidatGetByIdResponse) => {
        this.kandidat = response;
      }
    })
  }

  initializeForm() {
    this.form = this.formBuilder.group({
      naziv: ['', [Validators.required]],
      firstName: ['', [Validators.required, Validators.min(3), Validators.max(30)]],
      lastName: ['', [Validators.required, Validators.min(3), Validators.max(30)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [''],
      city: [''],
      country: [''],
    })
  }

  async setFormData(cvData: any): Promise<void> {
    try {
      this.form.patchValue({
        naziv: cvData?.naziv,
        firstName: cvData?.ime,
        lastName: cvData?.prezime,
        email: cvData?.email,
        city: cvData?.grad,
        country: cvData?.drzava,
        phoneNumber: cvData?.phoneNumber
      });

      this.professionalSummary = cvData?.profesionalniSazetak;
      this.educations = cvData?.edukacija?.$values ?? cvData?.edukacija ?? [];
      this.employments = cvData?.zaposlenje?.$values ?? cvData?.zaposlenje ?? [];
      this.urls = cvData?.url?.$values ?? cvData?.url ?? [];
      this.selectedSkills = cvData?.vjestine?.$values ?? cvData?.vjestine ?? [];
      this.selectedTechnicalSkills = cvData?.tehnickeVjestine?.$values ?? cvData?.tehnickeVjestine ?? [];
      this.courses = cvData?.kursevi?.$values ?? cvData?.kursevi ?? [];
      this.phoneNumber = cvData?.phoneNumber;

    } catch (error) {
      console.error('Error while setting form data:', error);
    }
  }

  async getVjestine() {
    this.getVjestineEndpoint.obradi().subscribe({
      next: x => {
        this.skills = x.lista.$values
      },
      error: err => {
        console.error('Error fetching skills:', err);
      }
    })
  }

  async getTehnickeVjestine() {
    this.getTehnickeVjestineEndpoint.obradi().subscribe({
      next: x => {
        this.technicalSkills = x.lista.$values;
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
  }

  addCourse() {
    this.courses.push('');
  }

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
    this.checkCompletedSections();
    if (this.selectedSectionId == 'section1') {
      this.savePersonalDetails(sectionId);
    } else if (this.selectedSectionId == 'section2') {
      this.completedProfessinalSummary();
    } else {
      this.selectedSectionId = sectionId;
    }
  }

  completeSection(sectionId: string): void {
    const section = this.sections.find(s => s.id === sectionId);
    if (section) {
      section.isCompleted = true;
    }
  }

  checkCompletedSections() {
    this.completeSection('section1');
    this.completedProfessinalSummary();
    this.completedSectionWithList('section3', 'section4', this.educations);
    this.completedSectionWithList('section4', 'section5', this.employments);
    this.completedSectionWithList('section5', 'section6', this.selectedSkills);
    this.completedSectionWithList('section6', 'section7', this.selectedTechnicalSkills);
    this.completedSectionWithList('section7', 'section8', this.courses);
    this.completedSectionWithList('section8', 'section1', this.urls);
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
    this.educations.push({
      nazivSkole: '',
      datumPocetka: '',
      datumZavrsetka: '',
      opis: '',
      isExpanded: false
    });
  }

  deleteEducation(index: number): void {
    this.educations.splice(index, 1);
  }

  savePersonalDetails(sectionId: string) {
    this.submitted = true;
    if (this.form.valid) {
      this.completeSection('section1');
      this.selectedSectionId = sectionId;
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
      phoneNumber: this.form.get('phoneNumber')?.value,
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
    if (this.edit) {
      this.saveCvData(Boolean(this.cvEdit?.objavljen));
      localStorage.setItem('cvData', JSON.stringify(this.cv));
      this.router.navigate([`/cv-preview`, this.cvEditId], {
        state: {data: this.cv}
      });
    } else {
      this.saveCvData(Boolean(this.cv?.objavljen));
      localStorage.setItem('cvData', JSON.stringify(this.cv));
      this.router.navigate(['/cv-preview'], {
        state: {data: this.cv}
      });
    }
  }

  createCV(objavljen: boolean) {
    this.saveCvData(objavljen);
    this.closeCreateCVModal();

    this.cvDodajEndpoint.obradi(this.cv!).subscribe({
      next: response => {
        this.notificationService.showModalNotification(true, 'CV created', 'Your CV has been successfully created.');
        this.router.navigateByUrl('/cv');
        localStorage.removeItem('cvData');
        this.notificationService.clearModalNotification();
      },
      error: error => {
        this.notificationService.addNotification({message: `Error: ${error.message}`, type: 'error'});
      }
    })
  }

  openSaveModal() {
    if (this.form.invalid) {
      this.selectedSectionId = 'section1';
    } else {
      this.modalService.openModal('saveModal', 'Confirm Changes', 'Are you sure you want to save changes?', []);
    }
  }

  async closeSaveModal() {
    await this.modalService.closeModal('saveModal');
  }

  async confirmSave() {
    this.save();
    await this.modalService.closeModal('saveModal');
  }

  openCreateCVModal() {
    if (this.form.invalid) {
      this.selectedSectionId = 'section1';
    } else {
      this.modalService.openModal('createCVModal', 'Publish CV', 'Are you sure you want to publish CV?', []);
    }
  }

  async closeCreateCVModal() {
    await this.modalService.closeModal('createCVModal');
  }

  save() {
    const edukacija = JSON.parse(JSON.stringify(this.educations));
    const zaposlenje = JSON.parse(JSON.stringify(this.employments));
    const url = JSON.parse(JSON.stringify(this.urls));

    const updateRequest = {
      id: this.cvEdit?.id ?? 1,
      kandidatId: this.loggedUserId,
      naziv: this.form.get('naziv')?.value,
      objavljen: this.cvEdit?.objavljen ?? false,
      ime: this.form.get('firstName')?.value,
      prezime: this.form.get('lastName')?.value,
      email: this.form.get('email')?.value,
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

    this.cvUpdateEndpoint.obradi(updateRequest).subscribe({
      next: any => {
        this.notificationService.addNotification({message: 'Your CV has been successfully edited.', type: 'success'});
        this.closeSaveModal()
        localStorage.removeItem('cvData');
        this.router.navigateByUrl('/cv');
      },
      error: error => {
        this.notificationService.addNotification({message: 'Please ensure that all required fields are filled in before proceeding. ', type: 'error'});
      }
    })
  }

  importDetails() {
    this.isImportDetails = true;
    this.phoneNumber = (this.kandidat?.phoneNumber && this.kandidat?.phoneNumberConfirmed) ? this.kandidat?.phoneNumber : "";

    this.form.patchValue({
      naziv: null,
      firstName: this.kandidat?.ime,
      lastName: this.kandidat?.prezime,
      email: this.kandidat?.email,
      phoneNumber: this.kandidat?.phoneNumber,
      city: this.kandidat?.mjestoPrebivalista,
      country: null,
    });
  }

  cancel() {
    localStorage.removeItem('cvData');
    this.router.navigateByUrl('/cv');
  }
}
