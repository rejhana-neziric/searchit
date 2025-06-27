
export interface CVGetResponse {
  cv: {
    $values: CVGetResponseCV [];
  }
}

export interface CVGetResponseCV {
  id: number
  objavljen: boolean
  naziv: string
  korisnikId:string
  ime: string
  prezime: string
  email: string
  phoneNumber: string | null
  drzava: string | null
  grad: string | null
  zvanje: string
  profesionalniSazetak: string | null
  datumModificiranja: Date
}
