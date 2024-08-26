export interface CvDodajRequest {
    kandidatId: string,
    naziv: string,
    objavljen: boolean,
    ime: string;
    prezime: string;
    email:string;
    brojTelefona: string | null;
    drzava: string | null;
    grad: string | null;
    profesionalniSazetak: string | null;
    vjestine: string[];
    tehnickeVjestine: string[];
    kursevi: string[];
    edukacija: EdukacijaRequest[];
    zaposlenje: ZaposlenjeRequest[];
    url: UrlRequest[];
}

export interface EdukacijaRequest {
  nazivSkole: string;
  datumPocetka: Date | null;
  datumZavrsetka: Date | null;
  grad: string | null;
  opis: string | null;
}

export interface ZaposlenjeRequest {
  nazivKompanije: string;
  nazivPozicije: string;
  datumPocetka: string;
  datumZavrsetka: string | null;
  opis: string | null;
}

export interface UrlRequest {
  naziv: string;
  putanja: string;
}


