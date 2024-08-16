export interface KompanijaUpdateRequest {
  id: string,
  naziv: string | null,
  lokacija: string | null,
  brojZaposlenih: string | null,
  website: string | null,
  linkedIn: string | null,
  twitter: string | null,
  kratkiOpis: string | null,
  opis: string | null,
  logo: string | ArrayBuffer | null
}
