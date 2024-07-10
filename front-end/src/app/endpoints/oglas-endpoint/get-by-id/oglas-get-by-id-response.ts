export interface OglasGetByIdResponse {
  id: number
  nazivPozicije: string
  kompanijaNaziv: string
  datumObjave: Date
  plata: number
  tipPosla: string
  rokPrijave: Date
  datumModificiranja: Date
  iskustvo: OglasGetByIdResponseOglasIskustvo[]
  lokacija: OglasGetByIdResponseOglasLokacija[]
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
