import {Component, OnInit} from '@angular/core';
import {NavbarComponent} from "../../../layout/navbar/navbar.component";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {KandidatGetByIdResponse} from "../../../../endpoints/kandidat-endpoint/get-by-id/kandidat-get-by-id-response";
import {KandidatUpdateRequest} from "../../../../endpoints/kandidat-endpoint/update/kandidat-update-request";
import {KandidatGetByIdEndpoint} from "../../../../endpoints/kandidat-endpoint/get-by-id/kandidat-get-by-id-endpoint";
import {FormsModule} from "@angular/forms";
import {KandidatUpdateEndpoint} from "../../../../endpoints/kandidat-endpoint/update/kandidat-update-endpoint";
import {NotificationService} from "../../../../services/notification-service";
import {NotificationToastComponent} from "../../../notifications/notification-toast/notification-toast.component";

@Component({
  selector: 'app-user-candidates-edit',
  standalone: true,
  imports: [
    NavbarComponent,
    RouterLink,
    FormsModule
  ],
  templateUrl: './user-candidates-edit.component.html',
  styleUrl: './user-candidates-edit.component.css'
})
export class UserCandidatesEditComponent implements OnInit{

  kandidatId!:string;
  kandidat: KandidatGetByIdResponse | undefined = undefined;
  form: KandidatUpdateRequest = {
    id: this.kandidatId,
    username: null,
    ime: null,
    prezime: null,
    mjestoPrebivalista: null,
    phoneNumber: null,
    zvanje: null
  };

  constructor(private route:ActivatedRoute,
              private kandidatGetById: KandidatGetByIdEndpoint,
              private kandidatEdit: KandidatUpdateEndpoint,
              private notificationService:NotificationService) {
  }
  ngOnInit() {
    //this.kandidatId = this.route.snapshot.paramMap.get('id')!;
    this.route.paramMap.subscribe(params => {
      this.kandidatId = params.get('id')!;
      console.log(this.kandidatId);
    })

    this.getKandidatById(this.kandidatId);
  }

  getKandidatById(id: string)
  {
    this.kandidatGetById.obradi(id).subscribe(x => {
      this.form.ime = x.ime;
      this.form.prezime = x.prezime;
      this.form.username = x.userName;
      this.form.mjestoPrebivalista = x.mjestoPrebivalista;
      this.form.zvanje= x.zvanje;
      this.form.phoneNumber = x.phoneNumber;
      this.form.id = this.kandidatId;
    });

    console.log(this.form);
  }

  edit() {
    this.kandidatEdit.obradi(this.form).subscribe(x => {
      this.notificationService.showModalNotification(true, "Edit korisnika","Uspješno ste editovali korisnika");
    });
  }

}
