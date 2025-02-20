export interface KorisnikGetAllResponse {
  korisnici: {
    $values: KorisnikGetAllResponseKorisnik [];
    $id: number;
  }
}

export interface KorisnikGetAllResponseKorisnik {
  isObrisan: boolean,
  uloga: string,
  username: string
}
