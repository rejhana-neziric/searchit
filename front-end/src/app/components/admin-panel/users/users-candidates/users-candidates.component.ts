import {Component, OnInit} from '@angular/core';
import {NavbarComponent} from "../../../layout/navbar/navbar.component";
import {FooterComponent} from "../../../layout/footer/footer.component";
import {DatePipe, NgFor, NgIf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {NotificationToastComponent} from "../../../notifications/notification-toast/notification-toast.component";
import {NgxPaginationModule} from "ngx-pagination";
import {UserCompaniesComponent} from "../user-companies/user-companies.component";
import {MatButtonToggle, MatButtonToggleGroup} from "@angular/material/button-toggle";
import {
  KandidatGetAllResponse,
  KandidatGetAllResponseKandidat
} from "../../../../endpoints/kandidat-endpoint/get/kandidat-get-all-response";
import {User} from "@auth0/auth0-angular";
import {AuthService} from "../../../../services/auth-service";
import {KandidatGetAllEndpoint} from "../../../../endpoints/kandidat-endpoint/get/kandidat-get-all-endpoint";
import {NotificationService} from "../../../../services/notification-service";
import {FormsModule} from "@angular/forms";
import {KandidatDeleteEndpoint} from "../../../../endpoints/kandidat-endpoint/delete/kandidat-delete-endpoint";
import {ModalService} from "../../../../services/modal-service";
import {ModalComponent} from "../../../notifications/modal/modal.component";
import {TranslatePipe} from "@ngx-translate/core";

@Component({
  selector: 'app-users-candidates',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    NgFor,
    NgIf,
    RouterLink,
    NotificationToastComponent,
    NgxPaginationModule,
    DatePipe,
    UserCompaniesComponent,
    MatButtonToggle,
    MatButtonToggleGroup,
    FormsModule,
    ModalComponent,
    TranslatePipe
  ],
  templateUrl: './users-candidates.component.html',
  styleUrl: './users-candidates.component.css'
})
export class UsersCandidatesComponent implements OnInit{
  selectedValue:string ='Candidate';
  kandidati: KandidatGetAllResponseKandidat[] = []// | undefined = undefined;
  selektovaniKandidat: KandidatGetAllResponseKandidat | undefined = undefined;
  user: User = { id : "", role : "", jwt : ""};
  total: number = 0;
  currentPage : number = 1;
  itemsPerPage : number = 10;
  selectedCandidateId: string = '';
  deleteButtons = [
    { text: 'Cancel', class: 'btn-cancel', action: () => this.closeDeleteModal() },
    { text: 'Delete', class: 'btn-confirm', action: () => this.delete(this.selectedCandidateId) }
  ];
  constructor(private authService:AuthService,
              private kandidatGetAllEndpoint:KandidatGetAllEndpoint,
              private kandidatDeleteEndpoint: KandidatDeleteEndpoint,
              private notificationService:NotificationService,
              private router:Router,
              private modalService: ModalService) {
  }
    ngOnInit(): void {
        this.user = this.authService.getLoggedUser();
        this.getAll();
        this.setTotal();
    }

  async getAll() {
    this.kandidatGetAllEndpoint.obradi().subscribe({
      next: (x) => {
        this.kandidati = x.kandidati.$values;
        console.log(this.kandidati);
      },
      error: (error) => {
        this.kandidati = [];
        console.error("Error fetching candidates:", error);
      }
    });
  }

    private setTotal(){
     this.total = this.kandidati.length;
    }

  delete(id: string){
    this.kandidatDeleteEndpoint.obradi(id).subscribe({
      next:(x)=>{
        this.notificationService.addNotification({message:'Candidate deleted', type:'success'});
        this.getAll();
      },
      error:(error)=>{
        this.notificationService.addNotification({message:'Candidate not deleted', type:'error'});
      }
    });
  }
  openDeleteModal(id: string) {
    this.selectedCandidateId = id;
    this.openModal();
  }
  async closeDeleteModal() {
    await this.modalService.closeModal('deleteModal');
  }

  private openModal() {
    this.modalService.openModal('deleteModal', 'Confirm Delete', 'Are you sure you want to delete this user?', []);

  }
}
