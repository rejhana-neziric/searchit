export interface KandidatGetAllResponse {
  kandidati:{
    $values: KandidatGetAllResponseKandidat[];
    $id: number;
  }
}

export interface KandidatGetAllResponseKandidat {
  id: number
  email: string
  username: string
  ime: string
  prezime: string
  datumRodjenja: string
  mjestoPrebivalista: string
  zvanje: string
  phoneNumber: string
}
