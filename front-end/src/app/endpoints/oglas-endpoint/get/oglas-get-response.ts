
export interface OglasGetResponse {
  oglasi: {
    $values: OglasGetResponseOglasi [];
  }
}

export interface OglasGetResponseOglasi {
  id: number
  kompanijaNaziv: string
  logo: string | null
  nazivPozicije: string
  lokacija: {
    $values: OglasGetResponseOglasLokacija [];
  }
  datumObjave: Date
  tipPosla: string
  rokPrijave: Date
  iskustvo: {
    $values:OglasGetResponseOglasIskustvo[]
  }

  opisOglasa: OglasGetResponseOpisOglas
  razlikaDana: number
  spasen: boolean
  objavljen: boolean
  isObrisan: boolean
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
