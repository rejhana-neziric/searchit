import {Component, OnInit} from '@angular/core';
import {NavbarComponent} from "../../layout/navbar/navbar.component";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {FooterComponent} from "../../layout/footer/footer.component";
import {ModalComponent} from "../../notifications/modal/modal.component";
import {NotificationToastComponent} from "../../notifications/notification-toast/notification-toast.component";
import {NgxPaginationModule} from "ngx-pagination";
import {FormsModule} from "@angular/forms";
import {KorisnikGetAllResponseKorisnik} from "../../../endpoints/korisnik-endpoint/get-all/korisnik-get-all-response";
import {KorisnikGetAllEndpoint} from "../../../endpoints/korisnik-endpoint/get-all/korisnik-get-all-endpoint";
import {NotificationService} from "../../../services/notification-service";
import {User} from "../../../modals/user";
import {AuthService} from "../../../services/auth-service";
import {FavoritesKompanijeComponent} from "../../saved/favorites-kompanije/favorites-kompanije.component";
import {FavoritesOglasiComponent} from "../../saved/favorites-oglasi/favorites-oglasi.component";
import {MatButtonToggle, MatButtonToggleGroup} from "@angular/material/button-toggle";
import {UsersCandidatesComponent} from "./users-candidates/users-candidates.component";
import {UserCompaniesComponent} from "./user-companies/user-companies.component";

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    NavbarComponent,
    NgForOf,
    NgIf,
    RouterLink,
    FooterComponent,
    ModalComponent,
    NotificationToastComponent,
    NgxPaginationModule,
    FormsModule,
    DatePipe,
    FavoritesKompanijeComponent,
    FavoritesOglasiComponent,
    MatButtonToggle,
    MatButtonToggleGroup,
    UsersCandidatesComponent,
    UserCompaniesComponent
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit{
  selectedValue: string = '';
  korisnici :KorisnikGetAllResponseKorisnik[]=[];
  selektovaniKorisnik: KorisnikGetAllResponseKorisnik | undefined = undefined;
  user: User ={id:"", role:"",jwt:""}
  total:number = 0;
  currentPage :number= 1;
  itemsPerPage: number = 10;


  constructor(private authService:AuthService,
              private korisnikGetAllEndpoint: KorisnikGetAllEndpoint,
              private notificationService:NotificationService,
              private router:Router) {
  }
  ngOnInit() {
    this.user = this.authService.getLoggedUser();
    this.getAll();
    this.setTotal();
  }

  async getAll(){
    try {
      this.korisnikGetAllEndpoint.obradi().subscribe(x=>{
        this.korisnici = x.korisnici.$values;
        console.log(this.korisnici);
      })
    }catch (error){
      this.korisnici = [];
      console.log("Error: ",error);
    }
  }

  private setTotal(){
    this.total = this.korisnici.length;
  }

}
