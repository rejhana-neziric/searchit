import {Component, ElementRef, Inject, OnInit, PLATFORM_ID, ViewChild} from '@angular/core';
import {DatePipe, isPlatformBrowser, NgClass, NgForOf, NgIf} from "@angular/common";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NavbarComponent} from "../../layout/navbar/navbar.component";
import {NotificationToastComponent} from "../../notifications/notification-toast/notification-toast.component";
import {KandidatGetByIdResponse} from "../../../endpoints/kandidat-endpoint/get-by-id/kandidat-get-by-id-response";
import {KandidatUpdateRequest} from "../../../endpoints/kandidat-endpoint/update/kandidat-update-request";
import {AuthService} from "../../../services/auth-service";
import {NotificationService} from "../../../services/notification-service";
import {Router} from "@angular/router";
import {take} from "rxjs";
import {User} from "../../../modals/user";
import {KompanijaGetByIdEndpoint} from "../../../endpoints/kompanija-endpoint/get-by-id/kompanija-get-by-id-endpoint";
import {KompanijaGetByIdResponse} from "../../../endpoints/kompanija-endpoint/get-by-id/kompanija-get-by-id-response";
import {KompanijaUpdateEndpoint} from "../../../endpoints/kompanija-endpoint/update/kompanija-update-endpoint";
import {KompanijaUpdateRequest} from "../../../endpoints/kompanija-endpoint/update/kompanija-update-request";
import {
  GetBrojZaposlenihEndpoint
} from "../../../endpoints/kompanija-endpoint/get-broj-zaposlenih-range/get-broj-zaposlenih-endpoint";
import {KompanijaDeleteEndpoint} from "../../../endpoints/kompanija-endpoint/delete/kompanija-delete-endpoint";
import {ModalComponent} from "../../notifications/modal/modal.component";
import {ModalService} from "../../../services/modal-service";
import {SharedService} from "../../../services/shared.service";

@Component({
  selector: 'app-account-details-company',
  standalone: true,
  imports: [
    DatePipe,
    FormsModule,
    NavbarComponent,
    NgIf,
    NotificationToastComponent,
    ReactiveFormsModule,
    NgForOf,
    ModalComponent,
    NgClass
  ],
  templateUrl: './account-details-company.component.html',
  styleUrl: './account-details-company.component.css'
})
export class AccountDetailsCompanyComponent implements OnInit{
  companyForm: FormGroup = new FormGroup({});
  submitted = false;
  errorMessages: string[] = [];
  loggedCompanyId: string = "";
  loggedCompany: KompanijaGetByIdResponse | null = null;
  updateCompany: KompanijaUpdateRequest | null = null;
  numberOfEmployeesRange: string[] = [];
  confirmCodeForm: FormGroup = new FormGroup({});
  submittedConfirmCode: boolean = false;
  confirmCode: boolean = false;
  is2FAEnabled: boolean = false;
  logoPreview: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;

  @ViewChild('textareaElement') textareaElement!: ElementRef<HTMLTextAreaElement>;

  deleteButtons = [
    { text: 'Cancel', class: 'btn-cancel', action: () => this.closeDeleteModal() },
    { text: 'Delete', class: 'btn-danger', action: () => this.confirmDelete() }
  ];

  saveButtons = [
    { text: 'Cancel', class: 'btn-cancel', action: () => this.closeSaveModal() },
    { text: 'Save', class: 'btn-confirm', action: () => this.confirmSave() }
  ];

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private kompanijaGetByIdEndpoint: KompanijaGetByIdEndpoint,
              private kompanijaUpdateEndpoint: KompanijaUpdateEndpoint,
              private getBrojZaposlenihEndpoint : GetBrojZaposlenihEndpoint,
              private kompanijaDeleteEndpoint: KompanijaDeleteEndpoint,
              private notificationService: NotificationService,
              private sharedService: SharedService,
              private router: Router,
              private modalService: ModalService,
              @Inject(PLATFORM_ID) private platformId: any) {
  }

  ngOnInit(): void {
    this.initializeForm();
    this.initializVerificationCodeForm();
    this.getNumberOfEmployees();

    this.authService.user$.pipe(take(1)).subscribe({
      next: (company: User | null) => {
        if (company) {
          this.loggedCompanyId = company.id;
        }
      }
    })

    this.getCompany();
  }

  initializeForm() {
    this.companyForm = this.formBuilder.group({
      companyName: ['', [Validators.required, Validators.min(3), Validators.max(30)]],
      location: ['', [Validators.required]],
      numberOfEmployees: ['', [Validators.required]],
      website: [''],
      linkedin: [''],
      twitter: [''],
      shortDecription: [''],
      decription: [''],
      logo: [null],
    })
  }

  initializVerificationCodeForm() {
    this.confirmCodeForm = this.formBuilder.group({
      token: ['', [Validators.required]],
    })
  }

  getCompany() {
     this.kompanijaGetByIdEndpoint.obradi(this.loggedCompanyId).subscribe({
       next: (response: KompanijaGetByIdResponse) => {
         this.loggedCompany = response;
         this.is2FAEnabled = response.twoFactorEnabled;
         this.companyForm.patchValue({
           companyName: this.loggedCompany?.naziv,
           location: this.loggedCompany?.lokacija,
           numberOfEmployees: this.loggedCompany?.brojZaposlenih,
           website: this.loggedCompany?.website,
           linkedin: this.loggedCompany?.linkedIn,
           twitter: this.loggedCompany?.twitter,
           shortDecription: this.loggedCompany?.kratkiOpis,
           decription: this.loggedCompany?.opis,
         });

         if (response.logo) {
           this.logoPreview = `data:image/jpeg;base64,${response.logo}`;
         }

         setTimeout(() => {
           this.adjustTextareaHeight(this.textareaElement.nativeElement);
         }, 0);
       },
       error: error => {
         if (error.error && error.error.message) {
           this.errorMessages.push(error.error.message);
         } else {
           this.errorMessages.push('An unknown error occurred.');
         }
       }
     })
  }

  getNumberOfEmployees() {
    this.getBrojZaposlenihEndpoint.obradi().subscribe({
      next: x => {
        this.numberOfEmployeesRange = x.lista.$values;
      }
    })

    return this.numberOfEmployeesRange;
  }

  save() {
    this.submitted = true;

     if (this.companyForm.valid) {
       this.updateCompany = {
         id: this.loggedCompanyId,
         naziv: this.companyForm.get('companyName')?.value,
         lokacija: this.companyForm.get('location')?.value,
         brojZaposlenih: this.companyForm.get('numberOfEmployees')?.value,
         website: this.companyForm.get('website')?.value,
         linkedIn: this.companyForm.get('linkedin')?.value,
         twitter: this.companyForm.get('twitter')?.value,
         kratkiOpis:  this.companyForm.get('shortDecription')?.value,
         opis: this.companyForm.get('decription')?.value,
         logo: this.logoPreview
       }

       this.kompanijaUpdateEndpoint.obradi(this.updateCompany).subscribe({
         next: any => {
           this.notificationService.addNotification({message: 'Data successfully updated.', type: 'success'});
         },
         error: error => {
           if (error.error && error.error.message) {
             this.errorMessages.push(error.error.message);
           } else {
             this.errorMessages.push('An unknown error occurred.');
           }
         }
       })
     }
  }

  cancel() {
    this.getCompany()
  }

  delete() {
    this.kompanijaDeleteEndpoint.obradi(this.loggedCompanyId).subscribe({
        next: any => {
          this.authService.logout();
          this.notificationService.showModalNotification(true, 'Deleted account', 'Your account has been successfully deleted.');
          this.router.navigateByUrl('');
        },
        error: error => {
          if (error.error && error.error.message) {
            this.errorMessages.push(error.error.message);
          } else {
            this.errorMessages.push('An unknown error occurred.');
          }
        }
      }
    )
  }

  openDeleteModal() {
    this.modalService.openModal('deleteModal', 'Confirm Delete', 'Are you sure you want to delete account?', []);
  }

  async closeDeleteModal() {
    await this.modalService.closeModal('deleteModal');
  }

  async confirmDelete() {
    this.delete();
    await this.modalService.closeModal('deleteModal');
  }

  openSaveModal() {
    this.modalService.openModal('saveModal', 'Confirm Changes', 'Are you sure you want to save changes?', []);
  }

  async closeSaveModal() {
    await this.modalService.closeModal('saveModal');
  }

  async confirmSave() {
    if (this.companyForm.valid) {
      this.save();
      await this.modalService.closeModal('saveModal');
    } else {
      this.notificationService.addNotification({message: 'Invalid data', type: 'error'});
    }
  }

  adjustTextareaHeight(textarea: HTMLTextAreaElement): void {
    textarea.style.height = 'auto'; // Reset the height
    textarea.style.height = `${textarea.scrollHeight}px`; // Set the height based on the content
  }

  onLogoChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.logoPreview = reader.result;
        this.companyForm.patchValue({
          logo: file // Update form control with the new file
        });
      };

      reader.readAsDataURL(file);
    }
  }

  // Toggle 2FA state
  toggle2FA() {
    this.sharedService.toggle2FA().subscribe({
      next: success => {
        this.confirmCode = true;  // Update UI state on success
      }
    });
  }


  // Function to confirm the 2FA verification code
  confirmVerificationCode() {
    this.submittedConfirmCode = true;

    if (this.confirmCodeForm.valid) {
      const token = this.confirmCodeForm.get('token')?.value;

      this.sharedService.confirmVerificationCode(token.toString()).subscribe({
        next: success => {
          this.is2FAEnabled = !this.is2FAEnabled;  // Update the UI state
          this.confirmCode = false;  // Reset the form state
        }
      });
    }
  }
}

