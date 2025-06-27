export interface LokacijaGetResponse {
  lokacije: {
    $values: LokacijaGetResponseLokacija [];
  }
}

export interface LokacijaGetResponseLokacija {
  id: number
  naziv: string
}
