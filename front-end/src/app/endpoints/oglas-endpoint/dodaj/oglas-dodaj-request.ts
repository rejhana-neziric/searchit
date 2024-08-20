export interface OglasDodajRequest {
  kompanija_id: number;
  naziv_pozicije: string;
  lokacija: string;
  datum_objave: string;
  plata: string;
  tip_posla: string;
  rok_prijave: string;
  iskustvo: string[];
  datum_modificiranja: string | null;
  opis_pozicije: string;
  minimum_godina_iskustva:number|null;
  preferirane_godine_iskustva:number|null;
  kvalifikacija:string|null;
  vjestine:string|null;
  benefiti:string|null;
  objavljen:boolean;
}
