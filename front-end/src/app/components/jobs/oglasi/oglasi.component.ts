import {Component, OnInit} from '@angular/core';
import {DatePipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {NgxPaginationModule} from "ngx-pagination";
import {OglasGetResponseOglasi} from "../../../endpoints/oglas-endpoint/get/oglas-get-response";
import {OglasGetEndpoint} from "../../../endpoints/oglas-endpoint/get/oglas-get-endpoint";
import {MatButtonToggle, MatButtonToggleGroup} from "@angular/material/button-toggle";
import {OglasGetByIdEndpoint} from "../../../endpoints/oglas-endpoint/get-by-id/oglas-get-by-id-endpoint";
import {OglasGetByIdResponse} from "../../../endpoints/oglas-endpoint/get-by-id/oglas-get-by-id-response";
import {FormsModule} from "@angular/forms";
import {OglasGetRequest} from "../../../endpoints/oglas-endpoint/get/oglas-get-request";
import {firstValueFrom} from 'rxjs';
import {NavbarComponent} from "../../layout/navbar/navbar.component";
import {RouterLink} from "@angular/router";
import {
  KandidatSpaseniOglasiDodajEndpoint
} from "../../../endpoints/kandidat-spaseni-oglasi-endpoint/dodaj/kandidat-spaseni-oglasi-dodaj-endpoint";
import {
  KanidatSpaseniOglasiDodajRequest
} from "../../../endpoints/kandidat-spaseni-oglasi-endpoint/dodaj/kanidat-spaseni-oglasi-dodaj-request";
import {NotificationService} from "../../../services/notification-service";
import {NotificationToastComponent} from "../../notifications/notification-toast/notification-toast.component";
import {HttpErrorResponse} from '@angular/common/http';
import {SortParametar} from "../../../modals/SortParametar";
import {
  KanidatSpaseniOglasiUpdateRequest
} from "../../../endpoints/kandidat-spaseni-oglasi-endpoint/update/kanidat-spaseni-oglasi-update-request";
import {
  KandidatSpaseniOglasiUpdateEndpoint
} from "../../../endpoints/kandidat-spaseni-oglasi-endpoint/update/kandidat-spaseni-oglasi-update-endpoint";
import {User} from "../../../modals/user";
import {AuthService} from "../../../services/auth-service";
import {KompanijeGetResponseKomapanija} from "../../../endpoints/kompanija-endpoint/get/kompanije-get-response";
import {KandidatOglasDodajEndpoint} from "../../../endpoints/kandidat-oglas-endpoint/dodaj/kandidat-oglas-dodaj-endpoint";
import {KandidatOglasDodajRequest} from "../../../endpoints/kandidat-oglas-endpoint/dodaj/kandidat-oglas-dodaj-request";
import {CVGetEndpoint} from "../../../endpoints/cv-endpoint/get/cv-get-endpoint";
import {CVGetRequest} from "../../../endpoints/cv-endpoint/get/cv-get-request";
import {CVGetResponse, CVGetResponseCV} from "../../../endpoints/cv-endpoint/get/cv-get-response";
import {FooterComponent} from "../../layout/footer/footer.component";
import {ModalService} from "../../../services/modal-service";
import {ModalComponent} from "../../notifications/modal/modal.component";
import {SharedService} from "../../../services/shared.service";
import {OglasiService} from "../../../services/oglasi.service";
import {
  LokacijaGetResponse,
  LokacijaGetResponseLokacija
} from "../../../endpoints/lokacija-endpoint/get/lokacija-get-response";
import {LokacijaGetEndpoint} from "../../../endpoints/lokacija-endpoint/get/lokacija-get-endpoint";
import {IskustvoGetResponseIskustvo} from "../../../endpoints/iskustvo-endpoint/get/iskustvo-get-response";
import {IskustvoGetEndpoint} from "../../../endpoints/iskustvo-endpoint/get/iskustvo-get-endpoint";
import {TranslatePipe} from "@ngx-translate/core";

@Component({
  selector: 'app-oglasi',
  standalone: true,
  imports: [
    NgForOf,
    NgxPaginationModule,
    DatePipe,
    NgIf,
    MatButtonToggleGroup,
    MatButtonToggle,
    FormsModule,
    NgClass,
    NavbarComponent,
    RouterLink,
    NotificationToastComponent,
    FooterComponent,
    ModalComponent,
    TranslatePipe,
  ],
  templateUrl: './oglasi.component.html',
  styleUrl: './oglasi.component.css'
})
export class OglasiComponent implements OnInit {

  oglasi: OglasGetResponseOglasi [] = [];
  isDaysChecked: boolean = false;
  rezultatiPretrage: any = this.oglasi;
  imaRezultataPretrage: boolean = true;
  odabaraniOglasId: number = 0;
  oglasZaPrikaz: OglasGetResponseOglasi | null = null;
  odabraniOglas: OglasGetByIdResponse | null = null;
  selektovaniGradovi: string[] = [];
  selektovaniJobType: string[] = [];
  selektovaniExperience: string[] = [];
  isDaysAscending: boolean = true;
  godineIskustva: number = 0;
  isGodineAscending: boolean = true;
  pretragaNaziv: string = "";
  searchObject: OglasGetRequest | null = null
  sortParametri: SortParametar[] | undefined = undefined
  itemsPerPage: number = 5;
  currentPage: number = 1;
  total: number = 10;
  noNextElement: boolean = false;
  noPreviousElement: boolean = true;
  selectedPost: any;
  user: User = {id: "", role: "", jwt: ""}
  oglasIdApply: number = 1;
  cv: CVGetResponseCV [] = [];
  cvIdApply: number | null = null;
  selectedCV: CVGetResponseCV | null = null;
  imageUrl: string | ArrayBuffer | null = '';
  lokacije: LokacijaGetResponseLokacija[] = [];
  iskustva: IskustvoGetResponseIskustvo[] = [];
  tipPosla: string[] = ['Full Time', 'Part Time','Internship']

  chooseCVButtons = [
    {text: 'Cancel', class: 'btn-cancel', action: () => this.closeCVChooseModal()},
    {text: 'Continue', class: 'btn-confirm', action: () => this.confirmCVChoose()}
  ]

  applyButtons = [
    {text: 'Cancel', class: 'btn-cancel', action: () => this.closeApplyModal()},
    {text: 'Change CV', class: 'btn-confirm w-auto', action: () => this.openCVChooseModal(this.oglasIdApply)},
    {text: 'Apply', class: 'btn-confirm', action: () => this.confirmApply()}
  ]

  constructor(private authService: AuthService,
              private sharedService: SharedService,
              private oglasiService: OglasiService,
              private modalService: ModalService,
              private notificationService: NotificationService,
              private cvGetEndpoint: CVGetEndpoint,
              private kandidatSpaseniOglasiUpdateEndpoint: KandidatSpaseniOglasiUpdateEndpoint,
              private lokacijaGetEndpoint: LokacijaGetEndpoint,
              private oglasGetByIdEndpoint: OglasGetByIdEndpoint,
              private iskustvoGetEndpoint: IskustvoGetEndpoint) {
  }

  async ngOnInit() {
    this.sortParametri = [];
    this.user = this.authService.getLoggedUser();
    await this.getAll();
    await this.getAllLokacije();
    await this.getAllIskustva();
    this.setTotal();
  }

  private setTotal() {
    this.total = this.sharedService.setTotal(this.rezultatiPretrage);
  }

  pageChangeEvent($event: number, isNewPage: boolean) {
    this.currentPage = $event;
    this.setTotal();
    if (isNewPage) {
      this.selektujPrviOglas();
    }
    this.sharedService.scrollToTop();
  }

  getCurrentPageItems(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.oglasi.slice(startIndex, endIndex);
  }

  getNumberOfElementsOnCurrentPage(): number {
    return this.getCurrentPageItems().length;
  }

  selektujPrviOglas() {
    const currentPosts = this.getCurrentPageItems();

    if (currentPosts != undefined && currentPosts.length > 0) {
      this.oglasZaPrikaz = currentPosts[0];
      this.odabaraniOglasId = currentPosts[0].id;
      this.currentElementIndex = this.oglasi.findIndex(item => item.id == this.odabaraniOglasId);
    }

    this.prikazDetalja(this.oglasZaPrikaz);
  }

  async getAll() {
    this.searchObject = {
      iskustvo: this.selektovaniExperience,
      lokacija: this.selektovaniGradovi,
      minimumGodinaIskustva: this.godineIskustva,
      naziv: this.pretragaNaziv,
      tipPosla: this.selektovaniJobType,
      sortParametri: this.sortParametri,
      kandidatId:  this.user == null ? undefined : this.user.id,
      otvoren: true,
      objavljen: true
    };

    this.oglasi = await this.oglasiService.getAll(this.searchObject);
    this.selektujPrviOglas();
  }

  async getAllLokacije() {
      try {
        const response = await firstValueFrom(this.lokacijaGetEndpoint.obradi());
        this.lokacije =  response.lokacije.$values;
      } catch (error) {
        this.lokacije = [];
      }
  }

  async getAllIskustva() {
    try {
      const response = await firstValueFrom(this.iskustvoGetEndpoint.obradi());
      this.iskustva =  response.iskustva.$values;
    } catch (error) {
      this.iskustva = [];
    }
  }

  dodajFilter<T>(lista: T[], item: T): T[] {
    if (lista.includes(item)) {
      return lista.filter(x => x != item);
    } else
      return [...lista, item];
  }

  async locationFilter(grad: string) {
    this.selektovaniGradovi = this.dodajFilter(this.selektovaniGradovi, grad);
    await this.getAll();
  }

  async jobTypeFilter(job_type: string) {
    this.selektovaniJobType = this.dodajFilter(this.selektovaniJobType, job_type);
    await this.getAll();
  }

  async experienceFilter(experience: string) {
    this.selektovaniExperience = this.dodajFilter(this.selektovaniExperience, experience);
    await this.getAll();
  }

  async dodajSortiranje(naziv: string, redoslijed: string) {
    var postoji = this.sortParametri?.some(parametar => parametar.naziv == naziv);

    if (postoji) {
      this.sortParametri = this.sortParametri?.filter(parametar => parametar.naziv != naziv);
    } else {
      this.sortParametri?.push(new SortParametar(naziv, redoslijed));
    }

    await this.getAll();
  }

  async sortirajPoPoziciji() {
    await this.dodajSortiranje("NazivPozicije", "asc");
  }

  async sortirajPoKompaniji() {
    await this.dodajSortiranje("KompanijaNaziv", "asc");
  }

  sortirajPoDanima() {
    if (this.isDaysChecked) {
      this.isDaysChecked = false;
      this.isDaysAscending = false;
    } else {
      this.isDaysChecked = true;
      this.isDaysAscending = true;
    }

    this.dodajSortiranjeDana();
  }

  dodajSortiranjeDana() {
    var vrstaRedoslijeda = "";
    this.isDaysAscending ? vrstaRedoslijeda = "desc" : vrstaRedoslijeda = "asc";
    this.dodajSortiranje("RazlikaDana", vrstaRedoslijeda);
  }

  promijeniSortiranjeZaDane() {
    this.isDaysAscending ? this.isDaysAscending = false : this.isDaysAscending = true;
    this.sortParametri = this.sortParametri?.filter(parametar => parametar.naziv != "RazlikaDana");
    this.dodajSortiranjeDana();
  }

  razlikaDatuma(odabraniOglas: OglasGetByIdResponse) {
    let danasnjiDatum = new Date();
    let datum = new Date(odabraniOglas?.rokPrijave);
    let dani = Math.floor((datum.getTime() - danasnjiDatum.getTime()) / 1000 / 60 / 60 / 24);
    return dani;
  }

  getOdabraniOglas() {
    this.oglasGetByIdEndpoint.obradi(this.odabaraniOglasId).subscribe({
      next: x => {
        this.odabraniOglas = x;
        this.odabaraniOglasId = x?.id;
      }
    })
  }

  filtriraniOglasi() {
    this.imaRezultataPretrage = this.oglasi?.length != 0;
    this.setTotal();

    return this.oglasi;
  }

  prikazDetalja(oglas: OglasGetResponseOglasi | null) {
    if (oglas != null) {
      this.odabaraniOglasId = oglas.id;
      this.oglasZaPrikaz = oglas;
      this.currentElementIndex = this.oglasi.findIndex(item => item.id == this.odabaraniOglasId) - 1;
      this.currentElementIndex == -1 ? this.noPreviousElement = true : this.noPreviousElement = false;
      this.getOdabraniOglas();
    }
  }

  currentElementIndex = 0;
  nextElement = this.getNextElement(this.currentElementIndex);
  previousElement = this.getPreviousElement(this.currentElementIndex);

  getNextElement(currentIndex: number) {
    if (currentIndex >= 0 && currentIndex < this.oglasi.length - 1) {
      return this.oglasi[currentIndex + 1];
    } else {
      return null;
    }
  }

  getPreviousElement(currentIndex: number) {
    if (currentIndex + 2 >= 0 && currentIndex < this.oglasi.length - 1) {
      return this.oglasi[currentIndex];
    } else {
      return null;
    }
  }

  ucitajSljedeciOglas() {
    const nextIndex = this.currentElementIndex + 1;

    if (nextIndex < this.oglasi.length - 1) {
      this.currentElementIndex = nextIndex;
      this.nextElement = this.getNextElement(this.currentElementIndex);

      if (this.mod(this.currentElementIndex, this.getNumberOfElementsOnCurrentPage()) + 2 - (this.itemsPerPage - this.getNumberOfElementsOnCurrentPage()) > this.getNumberOfElementsOnCurrentPage())
        this.pageChangeEvent(this.currentPage + 1, true);

      nextIndex + 1 == this.oglasi.length - 1 ? this.noNextElement = true : this.noNextElement = false;
      this.prikazDetalja(this.nextElement);
      this.noPreviousElement = false;
    } else {
      this.noNextElement = true;
      this.noPreviousElement = false;
    }
  }

  ucitajPrethodniOglas() {
    const previousIndex = this.currentElementIndex;

    if (previousIndex >= 0) {
      this.previousElement = this.getPreviousElement(this.currentElementIndex);
      this.prikazDetalja(this.previousElement);

      if (this.mod(previousIndex + 1 - (this.itemsPerPage - this.getNumberOfElementsOnCurrentPage()), this.getNumberOfElementsOnCurrentPage()) == 0 && previousIndex != 0)
        this.pageChangeEvent(this.currentPage - 1, false);

      previousIndex == 0 ? this.noPreviousElement = true : this.noPreviousElement = false;
      this.noNextElement = false;
    } else {
      this.noPreviousElement = true;
      this.noNextElement = false;
    }
  }

  mod(a: number, b: number): number {
    return a % b;
  }

  onSearchChange(pretraga: string) {
    this.pretragaNaziv = pretraga;
    this.getAll();
  }

  onYearsOfExperienceChange(godine: any) {
    this.godineIskustva = godine;
    this.sortirajPoGodinama();
  }

  promijeniSortiranjeZaGodine() {
    this.isGodineAscending ? this.isGodineAscending = false : this.isGodineAscending = true;
    this.sortirajPoGodinama();
  }

  sortirajPoGodinama() {
    this.sortParametri = this.sortParametri?.filter(parametar => parametar.naziv != "OpisOglasa.MinimumGodinaIskustva");

    if (this.godineIskustva > 0) {
      this.dodajSortiranje("OpisOglasa.MinimumGodinaIskustva", this.isGodineAscending ? "asc" : "desc")
    } else {
      this.sortParametri = this.sortParametri?.filter(parametar => parametar.naziv != "OpisOglasa.MinimumGodinaIskustva");
    }

    this.getAll();
  }

  promijeniStatus(oglas: OglasGetResponseOglasi) {
    if (!oglas.spasen) {
      this.saveOglas(oglas);
    } else {
      this.unsaveOglas(oglas);
    }
  }

  saveOglas(oglas: OglasGetResponseOglasi){
    this.oglasiService.save(oglas).subscribe({
      next: (success) => {
        if (success) {
          oglas.spasen = true;
        }
      },
      error: (errorMessage) => {
          oglas.spasen = false;
      }
    });
  }

  async unsaveOglas(oglas: OglasGetResponseOglasi) {
    var request: KanidatSpaseniOglasiUpdateRequest = {
      oglas_id: oglas.id,
      kandidat_id: this.user.id  //promijeniti kasnije u trenutno logiranog korisnika
    };

    try {
      const data = await firstValueFrom(this.kandidatSpaseniOglasiUpdateEndpoint.obradi(request));
      this.notificationService.addNotification({message: 'Post removed.', type: 'success'});
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        this.notificationService.addNotification({message: `Error: ${error.message}`, type: 'error'});
      } else {
        this.notificationService.addNotification({message: 'An unexpected error occurred.', type: 'error'});
      }
    }

    await this.getAll();
    this.filtriraniOglasi();
  }

  apply() {
    if (this.oglasIdApply && this.cvIdApply) {
      const request: KandidatOglasDodajRequest = {
        oglasId: this.oglasIdApply,
        kandidatId: this.user.id,
        cVId: this.cvIdApply,
        datumPrijave: new Date(),
      };

      this.oglasiService.apply(request);
      this.cvIdApply = null;
    }
  }

  openCVChooseModal(id: number) {
    this.getAllCV();
    this.oglasIdApply = id;
    this.modalService.openModal('chooseCVModal', 'Choose CV', 'Choose CV you want to apply to job with.', []);
  }

  async closeCVChooseModal() {
    await this.modalService.closeModal('chooseCVModal');
  }

  async confirmCVChoose() {
    await this.modalService.closeModal('chooseCVModal');
    this.openApplyModal();
  }

  openApplyModal() {
    this.modalService.openModal('applyModal', 'Confirm Application', "Are you sure you want to apply to this job with CV " + this.selectedCV?.naziv, []);
  }

  async closeApplyModal() {
    await this.modalService.closeModal('applyModal');
  }

  async confirmApply() {
    this.apply();
    await this.modalService.closeModal('applyModal');
  }

  async getAllCV() {
    var request: CVGetRequest = {
      kandidatId: this.user.id,
      objavljen: null,
      naziv: null
    };

    try {
      const response = await firstValueFrom(this.cvGetEndpoint.obradi(request));
      this.cv = response.cv.$values;
    } catch (error) {
      console.log(error);
      this.cv = [];
    }
  }

  selectCV(cv: CVGetResponseCV): void {
    this.selectedCV = cv;
    this.cvIdApply = cv.id;
  }

  ucitajLogo(logo: string | ArrayBuffer | null) {
    this.imageUrl = `data:image/jpeg;base64,${logo}`;
    return this.imageUrl;
  }


}
