export interface RecenzijaGetResponse{
  recenzije:RecenzijaGetResponseRecenzija[]
}

export interface RecenzijaGetResponseRecenzija{
  tekst: string
  datumVrijemeRecenzije: string
  brojZvijezdica: number
  korisnikId: number
  pozicija: string
}
