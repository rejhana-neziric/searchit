export interface KompanijeGetResponse {
  kompanije: {
    $values: KompanijeGetResponseKomapanija [];
  }
}

export interface KompanijeGetResponseKomapanija {
  id: string
  naziv: string
  godinaOsnivanja: number
  lokacija: string
  logo: string | null
  brojZaposlenih: string
  kratkiOpis: string
  opis: string
  website: string | null
  linkedIn: string | null
  twitter: string | null
  brojOtvorenihPozicija: number | null,
  spasen: boolean
}
