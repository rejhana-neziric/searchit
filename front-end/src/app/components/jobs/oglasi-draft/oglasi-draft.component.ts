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
import {AppRoutingModule} from "../../../app.routes";
import {OglasDeleteEndpoint} from "../../../endpoints/oglas-endpoint/delete/oglas-delete-endpoint";
import {OglasDeleteRequest} from "../../../endpoints/oglas-endpoint/delete/oglas-delete-request";
import {OglasSoftDeleteEndpoint} from "../../../endpoints/oglas-endpoint/soft-delete/oglas-soft-delete-endpoint";
import {OglasSoftDeleteRequest} from "../../../endpoints/oglas-endpoint/soft-delete/oglas-soft-delete-request"
import {NotificationModalComponent} from "../../notifications/notification-modal/notification-modal.component";
declare var bootstrap: any;

@Component({
  selector: 'app-oglasi-drafts',
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
    NotificationModalComponent,
  ],
  templateUrl: './oglasi-draft.component.html',
  styleUrl: './oglasi-draft.component.css'
})
export class OglasiDraftComponent implements OnInit {

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
  deleteObject: OglasSoftDeleteRequest | null = null

  constructor(private oglasGetAllEndpoint: OglasGetEndpoint,
              private oglasGetByIdEndpoint: OglasGetByIdEndpoint,
              private oglasDeleteEndpoint: OglasDeleteEndpoint,
              private oglasSoftDeleteEndpoint: OglasSoftDeleteEndpoint,
              private kandidatSpaseniOglasiDodajEndpoint: KandidatSpaseniOglasiDodajEndpoint,
              private kandidatSpaseniOglasiUpdateEndpoint: KandidatSpaseniOglasiUpdateEndpoint,
              private notificationService: NotificationService,
              private authService: AuthService) {
  }

  async ngOnInit() {
    this.sortParametri = [];
    this.user = this.authService.getLoggedUser();
    await this.getAll();
    this.setTotal();
  }

  private setTotal() {
    this.total = this.rezultatiPretrage.length;
  }

  pageChangeEvent($event: number, isNewPage: boolean) {
    this.currentPage = $event;
    this.setTotal();
    if (isNewPage) {
      this.selektujPrviOglas();
    }
    this.scrollToTop();
  }

  getCurrentPageItems(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.oglasi.slice(startIndex, endIndex);
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
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
      kandidatId: "603a72ed-f279-4f10-85f6-3a42c9d7e788",
      kompanijaId: "603a72ed-f279-4f10-85f6-3a42c9d7e788",
      otvoren: undefined,
      objavljen: false
    };


    try {
      const response = await firstValueFrom(this.oglasGetAllEndpoint.obradi(this.searchObject));
      this.oglasi = response.oglasi.$values;
      console.log(this.oglasi);
    } catch (error) {
      console.log(error);
      this.oglasi = [];
    }

    this.selektujPrviOglas();
  }

  dodajFilter<T>(lista: T[], item: T): T[] {
    if (lista.includes(item)) {
      return lista.filter(x => x != item);
    } else
      return [...lista, item];
  }

  locationFilter(grad: string) {
    this.selektovaniGradovi = this.dodajFilter(this.selektovaniGradovi, grad);
    this.getAll();
  }

  jobTypeFilter(job_type: string) {
    this.selektovaniJobType = this.dodajFilter(this.selektovaniJobType, job_type);
    this.getAll();
  }

  experienceFilter(experience: string) {
    this.selektovaniExperience = this.dodajFilter(this.selektovaniExperience, experience);
    this.getAll();
  }

  dodajSortiranje(naziv: string, redoslijed: string) {
    var postoji = this.sortParametri?.some(parametar => parametar.naziv == naziv);

    if (postoji) {
      this.sortParametri = this.sortParametri?.filter(parametar => parametar.naziv != naziv);
    } else {
      this.sortParametri?.push(new SortParametar(naziv, redoslijed));
    }

    this.getAll();
  }

  sortirajPoPoziciji() {
    this.dodajSortiranje("NazivPozicije", "asc");
  }

  sortirajPoKompaniji() {
    this.dodajSortiranje("KompanijaNaziv", "asc");
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
    this.isDaysAscending ? vrstaRedoslijeda = "asc" : vrstaRedoslijeda = "desc";
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
    if (oglas.spasen == false) {
      this.saveOglas(oglas);
    }
    else {
      this.unsaveOglas(oglas);
    }
  }

  saveOglas(oglas: OglasGetResponseOglasi) {
    var request: KanidatSpaseniOglasiDodajRequest = {
      oglas_id: oglas.id,
      kandidat_id: this.user.id //promijeniti kasnije u trenutno logiranog korisnika
    }

    this.kandidatSpaseniOglasiDodajEndpoint.obradi(request).subscribe(
      data => {
        this.notificationService.addNotification({message: 'Post saved.', type: 'success'});
        oglas.spasen = true;
      },
      (error: HttpErrorResponse) => {
        if (error.status === 500) {
          this.unsaveOglas(oglas);
        } else {
          this.notificationService.addNotification({message: `Error: ${error.message}`, type: 'error'});
        }
      }
    );
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

  confirmUnsave() {
    this.unsaveOglas(this.selectedPost);
    this.closeModal();
  }

  openUnsaveModal(post: any) {
    this.selectedPost = post;
    const modalElement = document.getElementById('confirmUnsaveModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  closeModal() {
    const modalElement = document.getElementById('confirmUnsaveModal');
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
      }
    }
  }

  deleteOglas(id: number | undefined) {
    if (id !== undefined) {
      this.deleteObject = {
        oglas_id : id
      }
      this.oglasSoftDeleteEndpoint.obradi(this.deleteObject).subscribe();
      console.log("Uspjesan delete za id ", id)
      console.log(this.deleteObject)
      this.getAll();
      this.notificationService.addNotification({message: 'Job deleted.', type: 'success'});
    } else {
      console.warn("Oglas ID is undefined, cannot perform delete");
    }
  }


}
