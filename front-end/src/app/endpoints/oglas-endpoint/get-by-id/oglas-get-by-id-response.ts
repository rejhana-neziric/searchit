import {OglasGetResponseOglasIskustvo, OglasGetResponseOglasLokacija} from "../get/oglas-get-response";

export interface OglasGetByIdResponse {
  id: number
  nazivPozicije: string
  kompanijaNaziv: string
  logo: string | null
  datumObjave: Date
  plata: string
  tipPosla: string
  rokPrijave: Date
  datumModificiranja: Date
  iskustvo: {
    $values:OglasGetByIdResponseOglasIskustvo[]
  }
  lokacija: {
    $values: OglasGetByIdResponseOglasLokacija [];
  }
  opisOglasa: OglasGetByIdResponseOpisOglasa | null
}

export interface OglasGetByIdResponseOpisOglasa  {
  opisPozicije: string
  minimumGodinaIskustva: number
  prefiraneGodineIskstva: number
  kvalifikacija: string
  vjestine: string
  benefiti: string
}

export interface OglasGetByIdResponseOglasIskustvo {
  id: number
  naziv: string
}

export interface OglasGetByIdResponseOglasLokacija {
  id: number
  naziv: string
}
