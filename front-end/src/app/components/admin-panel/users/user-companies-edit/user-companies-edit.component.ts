import {Component, OnInit} from '@angular/core';
import {NavbarComponent} from "../../../layout/navbar/navbar.component";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {
  KompanijaGetByIdResponse
} from "../../../../endpoints/kompanija-endpoint/get-by-id/kompanija-get-by-id-response";
import {KompanijaUpdateRequest} from "../../../../endpoints/kompanija-endpoint/update/kompanija-update-request";
import {
  KompanijaGetByIdEndpoint
} from "../../../../endpoints/kompanija-endpoint/get-by-id/kompanija-get-by-id-endpoint";
import {KompanijaUpdateEndpoint} from "../../../../endpoints/kompanija-endpoint/update/kompanija-update-endpoint";
import {NotificationService} from "../../../../services/notification-service";
import {
  GetBrojZaposlenihEndpoint
} from "../../../../endpoints/kompanija-endpoint/get-broj-zaposlenih-range/get-broj-zaposlenih-endpoint";
import {
  GetBrojZaposlenihResponse
} from "../../../../endpoints/kompanija-endpoint/get-broj-zaposlenih-range/get-broj-zaposlenih-response";
import {NgForOf, NgIf} from "@angular/common";
import {FooterComponent} from "../../../layout/footer/footer.component";
import {TranslatePipe} from "@ngx-translate/core";

@Component({
  selector: 'app-user-companies-edit',
  standalone: true,
  imports: [
    NavbarComponent,
    RouterLink,
    FormsModule,
    NgForOf,
    FooterComponent,
    NgIf,
    TranslatePipe
  ],
  templateUrl: './user-companies-edit.component.html',
  styleUrl: './user-companies-edit.component.css'
})
export class UserCompaniesEditComponent implements OnInit{

  kompanijaId!:string;
  kompanija: KompanijaGetByIdResponse | undefined = undefined;
  listaBrojZaposlenih: string[] | null = null;
  form: KompanijaUpdateRequest = {
    id: this.kompanijaId,
    naziv:  null,
    lokacija: null,
    brojZaposlenih: null,
    website:  null,
    linkedIn: null,
    twitter: null,
    kratkiOpis: null,
    opis: null,
    logo: null
  }

  logo:string | ArrayBuffer| null = null;
  constructor(private route: ActivatedRoute,
              private kompanijaGetById: KompanijaGetByIdEndpoint,
              private kompanijaEdit: KompanijaUpdateEndpoint,
              private notificationService: NotificationService,
              private getBrojZaposlenihEndpoint: GetBrojZaposlenihEndpoint) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.kompanijaId = params.get('id')!;
      console.log(this.kompanijaId);
    });

    this.getKompanijaById(this.kompanijaId);
    this.getBrojZaposlenih();
  }

  getKompanijaById(id: string)
  {
    this.kompanijaGetById.obradi(id).subscribe(x =>{
      this.form.id = this.kompanijaId;
      this.form.lokacija = x.lokacija;
      this.form.linkedIn = x.linkedIn;
      this.form.opis = x.opis;
      this.form.logo = x.logo;
      this.form.kratkiOpis = x.kratkiOpis;
      this.form.brojZaposlenih = x.brojZaposlenih;
      this.form.naziv = x.naziv;
      this.form.twitter = x.twitter;
      this.form.website = x.website;
    });
    this.logo = this.form.logo;
  }

  edit(){
    this.kompanijaEdit.obradi(this.form).subscribe(x => {
      this.notificationService.showModalNotification(true, "Edit korisnika","Uspješno ste uredili odabranog korisnika");
    })
  }

  getBrojZaposlenih(){
    this.getBrojZaposlenihEndpoint.obradi().subscribe(x=>{
      this.listaBrojZaposlenih = x.lista.$values;
      console.log(this.listaBrojZaposlenih);
    })
  }

  onFileSelected(event:any)
  {
    // const file = event.target.files[0];
    // if(file)
    // {
    //   const reader = new FileReader();
    //   reader.readAsDataURL(file);
    //   reader.onload = () =>{
    //     this.form.logo = reader.result as string;
    //     this.logo = reader.result as string;
    //     console.log("Base64 string: ", this.form.logo);
    //   }
    // }
    const fileInput = event.target as HTMLInputElement;

    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.form.logo = reader.result?.toString().split(",")[1] || "";
      };

      reader.readAsDataURL(file);
    }
  }
}
