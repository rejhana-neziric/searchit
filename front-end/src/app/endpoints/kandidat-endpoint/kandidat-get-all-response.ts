export interface KandidatGetAllResponse {
  kandidati:KandidatGetAllResponseKandidat[]
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
  brojTelefona: string
}
