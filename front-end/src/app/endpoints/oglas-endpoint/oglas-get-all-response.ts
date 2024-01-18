export interface OglasGetAllResponse {
  oglasi: OglasGetAllResponseOglasi []
}

export interface OglasGetAllResponseOglasi {
  id: number
  kompanijaNaziv: string
  nazivPozicije: string
  lokacija: string
  datumObjave: Date
  tipPosla: string
  rokPrijave: Date
  iskustvo: string
}
