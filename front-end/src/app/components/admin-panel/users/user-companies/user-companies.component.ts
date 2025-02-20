import {Component, OnInit} from '@angular/core';
import {NavbarComponent} from "../../../layout/navbar/navbar.component";
import {FooterComponent} from "../../../layout/footer/footer.component";
import {DatePipe, NgFor, NgIf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {NotificationToastComponent} from "../../../notifications/notification-toast/notification-toast.component";
import {NgxPaginationModule} from "ngx-pagination";
import {MatButtonToggle, MatButtonToggleGroup} from "@angular/material/button-toggle";
import {FormsModule} from "@angular/forms";
import {UsersCandidatesComponent} from "../users-candidates/users-candidates.component";
import {KompanijeGetResponseKomapanija} from "../../../../endpoints/kompanija-endpoint/get/kompanije-get-response";
import {User} from "@auth0/auth0-angular";
import {AuthService} from "../../../../services/auth-service";
import {KompanijeGetEndpoint} from "../../../../endpoints/kompanija-endpoint/get/kompanije-get-endpoint";
import {NotificationService} from "../../../../services/notification-service";
import {KompanijeGetRequest} from "../../../../endpoints/kompanija-endpoint/get/kompanije-get-request";
import {KompanijaDeleteEndpoint} from "../../../../endpoints/kompanija-endpoint/delete/kompanija-delete-endpoint";

@Component({
  selector: 'app-user-companies',
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
    MatButtonToggle,
    MatButtonToggleGroup,
    FormsModule
  ],
  templateUrl: './user-companies.component.html',
  styleUrl: './user-companies.component.css'
})
export class UserCompaniesComponent implements OnInit{
  selectedValue:string = 'Company';
  kompanije: KompanijeGetResponseKomapanija[] = [];
  selektovanaKompanija:KompanijeGetResponseKomapanija | undefined = undefined;
  user:User = {id:"", role:"", jwt:""};
  total:number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 10;

  constructor(private authService: AuthService,
              private kompanijaGetEndpoint: KompanijeGetEndpoint,
              private kompanijaDeleteEndpoint: KompanijaDeleteEndpoint,
              private notificationService: NotificationService,
              private router: Router) {
  }

  ngOnInit() {
    this.user = this.authService.getLoggedUser();
    this.getAll();
    this.setTotal();
  }

  async getAll(){
    const emptyRequest = new KompanijeGetRequest();
    this.kompanijaGetEndpoint.obradi(emptyRequest).subscribe({
      next:(x)=>{
        this.kompanije = x.kompanije.$values;
        console.log(this.kompanije);
      },
      error: (error)=>{
        this.kompanije = [];
        console.error("Error fetching companies", error);
      }
    });
  }

  private setTotal(){
    this.total = this.kompanije.length;
  }

  delete(id: string){
    this.kompanijaDeleteEndpoint.obradi(id).subscribe({
      next:(x)=>{
        this.notificationService.addNotification({message:'Company deleted', type:'success'});
        console.log("Korisnik uspjesno obrisan!");
        this.getAll();
      },
      error:(error)=>{
        this.notificationService.addNotification({message:'Company not deleted', type:'error'});
    }
    });
  }
}
