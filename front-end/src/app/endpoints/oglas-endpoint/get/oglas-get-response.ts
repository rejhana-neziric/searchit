export interface OglasGetResponse {
  oglasi: OglasGetResponseOglasi []
}

export interface OglasGetResponseOglasi {
  id: number
  kompanijaNaziv: string
  nazivPozicije: string
  lokacija: OglasGetResponseOglasLokacija[]
  datumObjave: Date
  tipPosla: string
  rokPrijave: Date
  iskustvo: OglasGetResponseOglasIskustvo[]
  opisOglasa: OglasGetResponseOpisOglas
}

export interface OglasGetResponseOglasIskustvo {
  id: number
  naziv: string
}

export interface OglasGetResponseOglasLokacija {
  id: number
  naziv: string
}

export interface OglasGetResponseOpisOglas {
  id: number
  minimumGodinaIskustva: number
  prefiraneGodineIskstva: number
}
