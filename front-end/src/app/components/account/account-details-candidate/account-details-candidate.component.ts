import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {NavbarComponent} from "../../navbar/navbar.component";
import {FooterComponent} from "../../footer/footer.component";
import {DatePipe, isPlatformBrowser, NgClass, NgForOf, NgIf} from "@angular/common";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
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

declare var bootstrap: any;

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
    NotificationToastComponent
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

  constructor(private formBuilder: FormBuilder,
              private kandidatGetByIdEndpoint: KandidatGetByIdEndpoint,
              private kandidatUpdateEndpoint: KandidatUpdateEndpoint,
              private authService: AuthService,
              private notificationService: NotificationService,
              private kandidatDeleteEndpoint: KandidatDeleteEndpoint,
              private router: Router,
              @Inject(PLATFORM_ID) private platformId: any) {
  }

  ngOnInit(): void {
    this.initializeForm();

    this.authService.user$.pipe(take(1)).subscribe({
      next: (user: User | null) => {
        if (user) {
          this.loggedUserId = user.id;
        }
      }
    })

    this.getUser();
  }

  initializeForm() {
    this.candidateForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.min(3), Validators.max(50)]],
      residence: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern("^\\+[0-9]{3}-[0-9]{3}-[0-9]{3}-[0-9]{3,4}$")]],
    })
  }

  getUser() {
    this.kandidatGetByIdEndpoint.obradi(this.loggedUserId).subscribe({
      next: (response: KandidatGetByIdResponse) => {
        this.loggedUser = response;
        this.candidateForm.patchValue({
          phoneNumber: this.loggedUser?.brojTelefona,
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
      console.log('pozvana save')
      this.updateUser = {
        id: this.loggedUserId,
        mjestoPrebivalista: this.candidateForm.get('residence')?.value,
        brojTelefona: this.candidateForm.get('phoneNumber')?.value,
        zvanje: this.candidateForm.get('title')?.value
      }

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

  confirm() {
    this.closeModal();

    if (this.candidateForm.valid) {
      this.save();
    } else {
      this.notificationService.addNotification({message: 'Invalid data', type: 'error'});
    }
  }

  openModal() {
    if (isPlatformBrowser(this.platformId)) {
      const modalElement = document.getElementById('confirmUnsaveModal');
      if (modalElement) {
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
      }
    }
  }

  closeModal() {
    if (isPlatformBrowser(this.platformId)) {
      const modalElement = document.getElementById('confirmUnsaveModal');
      if (modalElement) {
        const modal = bootstrap.Modal.getInstance(modalElement);
        if (modal) {
          modal.hide();
        }
      }
    }
  }

  confirmDelete() {
    this.closeDeleteModal();
    this.delete();
  }

  openDeleteModal() {
    if (isPlatformBrowser(this.platformId)) {
      const modalElement = document.getElementById('confirmDeleteModal');
      if (modalElement) {
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
      }
    }
  }

  closeDeleteModal() {
    if (isPlatformBrowser(this.platformId)) {
      const modalElement = document.getElementById('confirmDeleteModal');
      if (modalElement) {
        const modal = bootstrap.Modal.getInstance(modalElement);
        if (modal) {
          modal.hide();
        }
      }
    }
  }
}
