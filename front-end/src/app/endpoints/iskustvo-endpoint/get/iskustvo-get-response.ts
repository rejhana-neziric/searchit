export interface IskustvoGetResponse {
  iskustva: {
    $values: IskustvoGetResponseIskustvo [];
  }
}

export interface IskustvoGetResponseIskustvo {
  id: number
  naziv: string
}
