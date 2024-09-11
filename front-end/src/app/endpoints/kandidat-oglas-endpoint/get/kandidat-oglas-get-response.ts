export interface KandidatOglasGetResponse {
  kandidatOglasi: {
    $values: KandidatOglasGetResponseKandidatOglas [];
  }
}


export interface KandidatOglasGetResponseKandidatOglas {
  id: number
  kandidatId: string
  oglasId: number
  cvId: number
  cvNaziv: string
  datumPrijave: Date
  status: string
  nazivPozicije: string
  nazivKompanije: string
  rokPrijave: Date
  otvoren: boolean
  ime: string
  prezime: string
  zvanje: string
  spasen: boolean
}
