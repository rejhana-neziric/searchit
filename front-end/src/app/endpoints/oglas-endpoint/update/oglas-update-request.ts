export interface OglasUpdateRequest {
  oglas_id: number;
  naziv_pozicije: string | null;
  rok_prijave: string | null;
  opis_oglasa:OglasUpdateOpisOglasa;
  plata: string | null;
  lokacija: OglasUpdateOglasLokacija[];
  tip_posla: string | null;
  iskustvo: OglasUpdateOglasIskustvo[];
  datum_modificiranja: string | null;
  objavljen: boolean;
}

export interface OglasUpdateOpisOglasa  {
  opis_pozicije: string | null;
  minimum_godina_iskustva: number | null;
  preferirane_godine_iskustva: number | null;
  benefiti: string | null;
  vjestine: string | null;
  kvalifikacije: string | null;
}

export interface OglasUpdateOglasIskustvo {
  id: number
  naziv: string | null
}

export interface OglasUpdateOglasLokacija {
  id: number
  naziv: string | null
}
