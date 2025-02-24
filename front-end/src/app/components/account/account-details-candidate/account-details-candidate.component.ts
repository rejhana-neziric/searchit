import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {NavbarComponent} from "../../layout/navbar/navbar.component";
import {FooterComponent} from "../../layout/footer/footer.component";
import {DatePipe, isPlatformBrowser, NgClass, NgForOf, NgIf} from "@angular/common";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {KandidatGetByIdEndpoint} from "../../../endpoints/kandidat-endpoint/get-by-id/kandidat-get-by-id-endpoint";
import {take} from "rxjs";
import {User} from "../../../modals/user";
import {AuthService} from "../../../services/auth-service";
import {KandidatGetByIdResponse} from "../../../endpoints/kandidat-endpoint/get-by-id/kandidat-get-by-id-response";
import {KandidatUpdateRequest} from "../../../endpoints/kandidat-endpoint/update/kandidat-update-request";
import {KandidatUpdateEndpoint} from "../../../endpoints/kandidat-endpoint/update/kandidat-update-endpoint";
import {NotificationService} from "../../../services/notification-service";
import {NotificationToastComponent} from "../../notifications/notification-toast/notification-toast.component";
import {KandidatDeleteEndpoint} from "../../../endpoints/kandidat-endpoint/delete/kandidat-delete-endpoint";
import {ModalComponent} from "../../notifications/modal/modal.component";
import {ModalService} from "../../../services/modal-service";
import {SharedService} from "../../../services/shared.service";

@Component({
  selector: 'app-account-details-candidate',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    RouterLink,
    FormsModule,
    NgClass,
    DatePipe,
    NotificationToastComponent,
    ModalComponent
  ],
  templateUrl: './account-details-candidate.component.html',
  styleUrl: './account-details-candidate.component.css'
})
export class AccountDetailsCandidateComponent implements OnInit {

  candidateForm: FormGroup = new FormGroup({});
  submitted = false;
  errorMessages: string[] = [];
  loggedUserId: string = "";
  loggedUser: KandidatGetByIdResponse | null = null;
  updateUser: KandidatUpdateRequest | null = null;
  confirmNumber: boolean = false;
  submittedConfirmNumber: boolean = false;
  confirmPhoneNumberForm: FormGroup = new FormGroup({});
  confirmCodeForm: FormGroup = new FormGroup({});
  submittedConfirmCode: boolean = false;
  confirmCode: boolean = false;
  is2FAEnabled: boolean = false;
  returnUrl: string | null = null;

  deleteButtons = [
    {text: 'Cancel', class: 'btn-cancel', action: () => this.closeDeleteModal()},
    {text: 'Delete', class: 'btn-danger', action: () => this.confirmDelete()}
  ];

  saveButtons = [
    {text: 'Cancel', class: 'btn-cancel', action: () => this.closeSaveModal()},
    {text: 'Save', class: 'btn-confirm', action: () => this.confirmSave()}
  ];

  constructor(private formBuilder: FormBuilder,
              private kandidatGetByIdEndpoint: KandidatGetByIdEndpoint,
              private kandidatUpdateEndpoint: KandidatUpdateEndpoint,
              private kandidatDeleteEndpoint: KandidatDeleteEndpoint,
              private authService: AuthService,
              private notificationService: NotificationService,
              private modalService: ModalService,
              private sharedService: SharedService,
              private router: Router,
              private activatedRoute: ActivatedRoute,) {
  }

  ngOnInit(): void {
    this.initializeCandidateForm();
    this.initializePhoneVerificationForm();
    this.initializVerificationCodeForm();

    this.authService.user$.pipe(take(1)).subscribe({
      next: (user: User | null) => {
        if (user) {
          this.loggedUserId = user.id;
        }
      }
    })

    this.getUser();

    this.activatedRoute.queryParams.subscribe({
      next: (params: any) => {
        if (params) {
          this.returnUrl = params['returnUrl'];
        }
      }
    })
  }

  initializeCandidateForm() {
    this.candidateForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.min(3), Validators.max(50)]],
      residence: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
    })
  }

  initializePhoneVerificationForm() {
    this.confirmPhoneNumberForm = this.formBuilder.group({
      token: ['', [Validators.required]],
    })
  }

  initializVerificationCodeForm() {
    this.confirmCodeForm = this.formBuilder.group({
      token: ['', [Validators.required]],
    })
  }

  getUser() {
    this.kandidatGetByIdEndpoint.obradi(this.loggedUserId).subscribe({
      next: (response: KandidatGetByIdResponse) => {
        this.loggedUser = response;
        this.is2FAEnabled = response.twoFactorEnabled;
        this.candidateForm.patchValue({
          phoneNumber: this.loggedUser?.phoneNumber,
          title: this.loggedUser?.zvanje,
          residence: this.loggedUser?.mjestoPrebivalista
        });
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

  save() {
    this.submitted = true;

    if (this.candidateForm.valid) {
      // @ts-ignore
      this.updateUser = {
        id: this.loggedUserId,
        mjestoPrebivalista: this.candidateForm.get('residence')?.value,
        phoneNumber: this.candidateForm.get('phoneNumber')?.value,
        zvanje: this.candidateForm.get('title')?.value,
        // @ts-ignore
        username: this.loggedUser?.userName,
        // @ts-ignore
        ime: this.loggedUser?.ime,
        // @ts-ignore
        prezime:this.loggedUser?.prezime
      }
      // @ts-ignore
      this.kandidatUpdateEndpoint.obradi(this.updateUser).subscribe({
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
    this.getUser()
  }

  delete() {
    this.kandidatDeleteEndpoint.obradi(this.loggedUserId).subscribe({
        next: any => {
          this.authService.logout();
          this.notificationService.showModalNotification(true, 'Deleted account', 'Your account has been successfully deleted');
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
    if (this.candidateForm.valid) {
      this.save();
      await this.modalService.closeModal('saveModal');
      this.getUser();
      this.confirmNumber = true;
    } else {
      this.notificationService.addNotification({message: 'Invalid data', type: 'error'});
    }
  }

  confirmPhoneNumber() {
    this.submittedConfirmNumber = true;

    if (this.confirmPhoneNumberForm.valid) {
      const token = this.confirmPhoneNumberForm.get('token')?.value;
      this.authService.verifyPhoneNumber(token).subscribe({
        next: any => {
          this.notificationService.showModalNotification(true, 'Phone number verified', 'Your phone number has been successfully verified.');
          this.confirmNumber = false;
        },
        error: error => {
          if (error.error instanceof Object && error.error.message) {
            const errorMessage = error.error.message;
            this.notificationService.addNotification({message: errorMessage, type: 'error'});

          } else {
            const errorMessage = typeof error.error === 'string' ? error.error : 'An unknown error occurred';
            this.notificationService.addNotification({message: errorMessage, type: 'error'});

          }
        }
      });
    }
  }

  sendVerificationCode() {
    this.confirmNumber = true;

    console.log('sendVerificationCode')
    this.authService.sendPhoneVerificationCode(this.loggedUserId).subscribe({
      next: any => {
        this.notificationService.addNotification({message: 'Verification code has been sent.', type: 'success'});
      },
      error: error => {
        if (error.error instanceof Object && error.error.message) {
          const errorMessage = error.error.message;
          this.notificationService.addNotification({message: errorMessage, type: 'error'});

        } else {
          const errorMessage = typeof error.error === 'string' ? error.error : 'An unknown error occurred';
          this.notificationService.addNotification({message: errorMessage, type: 'error'});
        }
      }
    });
  }

  toggle2FA() {
    this.sharedService.toggle2FA().subscribe({
      next: success => {
        this.confirmCode = true;
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
          this.is2FAEnabled = !this.is2FAEnabled;
          this.confirmCode = false;
        }
      });
    }
  }
}
