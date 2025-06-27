export interface KorisnikGetResponse {
  korisnici: {
    $values: KorisnikGetResponseKorisnik [];
  }
}

export interface KorisnikGetResponseKorisnik {
  isObrisan: boolean,
  uloga: string
}
