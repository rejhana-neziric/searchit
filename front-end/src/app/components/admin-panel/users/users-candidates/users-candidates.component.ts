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
    FormsModule
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

  constructor(private authService:AuthService,
              private kandidatGetAllEndpoint:KandidatGetAllEndpoint,
              private notficationService:NotificationService,
              private router:Router) {
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
}
