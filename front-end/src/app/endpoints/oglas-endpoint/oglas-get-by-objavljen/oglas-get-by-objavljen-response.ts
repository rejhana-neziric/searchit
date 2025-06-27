export interface OglasGetByObjavljenResponse {
  id: number
  nazivPozicije: string
  kompanijaNaziv: string
  datumObjave: Date
  plata: number
  tipPosla: string
  rokPrijave: Date
  datumModificiranja: Date
  iskustvo: OglasGetByObjavljenResponseOglasIskustvo[]
  lokacija: OglasGetByObjavljenResponseOglasLokacija[]
  opisOglasa: OglasGetByObjavljenResponseOpisOglasa | null
}

export interface OglasGetByObjavljenResponseOpisOglasa  {
  opisPozicije: string
  minimumGodinaIskustva: number
  prefiraneGodineIskstva: number
  kvalifikacija: string
  vjestine: string
  benefiti: string
}

export interface OglasGetByObjavljenResponseOglasIskustvo {
  id: number
  naziv: string
}

export interface OglasGetByObjavljenResponseOglasLokacija {
  id: number
  naziv: string
}
