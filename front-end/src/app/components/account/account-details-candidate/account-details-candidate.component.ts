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
import {ModalComponent} from "../../modal/modal.component";
import {CVGetResponseCV} from "../../../endpoints/cv-endpoint/get/cv-get-response";
import {ModalService} from "../../../services/modal-service";

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

  deleteButtons = [
    { text: 'Cancel', class: 'btn-cancel', action: () => this.closeDeleteModal() },
    { text: 'Delete', class: 'btn-danger', action: () => this.confirmDelete() }
  ];

  saveButtons = [
    { text: 'Cancel', class: 'btn-cancel', action: () => this.closeSaveModal() },
    { text: 'Save', class: 'btn-confirm', action: () => this.confirmSave() }
  ];


  constructor(private formBuilder: FormBuilder,
              private kandidatGetByIdEndpoint: KandidatGetByIdEndpoint,
              private kandidatUpdateEndpoint: KandidatUpdateEndpoint,
              private authService: AuthService,
              private notificationService: NotificationService,
              private kandidatDeleteEndpoint: KandidatDeleteEndpoint,
              private modalService: ModalService,
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
    } else {
      this.notificationService.addNotification({message: 'Invalid data', type: 'error'});
    }
  }
}
