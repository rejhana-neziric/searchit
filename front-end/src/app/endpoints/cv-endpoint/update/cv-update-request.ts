export class CvUpdateRequest {
  constructor(
    public id: number,
    public objavljen: boolean | null,
    public kandidatId: string | null,
    public naziv: string | null,
    public ime: string | null,
    public prezime: string | null,
    public email: string | null,
    public brojTelefona: string | null,
    public drzava: string | null,
    public grad: string | null,
    public profesionalniSazetak: string | null,
    public vjestine: string[] | null,
    public tehnickeVjestine: string[] | null,
    public kursevi: string[] | null,
    public edukacija: EdukacijaUpdateRequest[] | null,
    public zaposlenje: ZaposlenjeUpdateRequest[] | null,
    public url: UrlUpdateRequest[] | null,) {}
}

export interface EdukacijaUpdateRequest {
  id: number;
  nazivSkole: string | null;
  datumPocetka: Date | null;
  datumZavrsetka: Date | null;
  grad: string | null;
  opis: string | null;
}

export interface ZaposlenjeUpdateRequest {
  id: number;
  nazivKompanije: string | null;
  nazivPozicije: string | null;
  datumPocetka: string | null;
  datumZavrsetka: string | null;
  opis: string | null;
}

export interface UrlUpdateRequest {
  id: number;
  naziv: string | null;
  putanja: string | null;
}

