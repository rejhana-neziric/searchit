export interface CVGetByIdResponse {
  id: number
  kandidatId: string,
  naziv: string,
  objavljen: boolean,
  ime: string;
  prezime: string;
  email:string;
  brojTelefona: string | null;
  drzava: string | null;
  grad: string | null;
  datumModificiranja: Date,
  profesionalniSazetak: string | null;
  vjestine:  {
    $values: string[]
  }
  tehnickeVjestine: {
    $values: string[]
  }
  kursevi: {
    $values: string[]
  }
  edukacija:  {
   $values: EdukacijaResponse[]
}
  zaposlenje:  {
    $values: ZaposlenjeResponse[]
  }
  url:  {
    $values: UrlResponse[]
  }
}

export interface EdukacijaResponse{
  id: number;
  nazivSkole: string;
  datumPocetka: Date | null;
  datumZavrsetka: Date | null;
  grad: string | null;
  opis: string | null;
}

export interface ZaposlenjeResponse {
  id: number;
  nazivKompanije: string;
  nazivPozicije: string;
  datumPocetka: string;
  datumZavrsetka: string | null;
  opis: string | null;
}

export interface UrlResponse {
  id: number;
  naziv: string;
  putanja: string;
}
