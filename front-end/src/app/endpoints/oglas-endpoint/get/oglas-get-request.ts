export class OglasGetRequest {
  constructor(
    public naziv?: string,
    public lokacija?: string[],
    public tipPosla?: string[],
    public iskustvo?: string[],
    public minimumGodinaIskustva?: number,
    public filters?: { [key: string]: any },
    public sortParametri?: SortParametar[]
  ){}
}

export class SortParametar {
  constructor(
    public naziv: string,
    public redoslijed: string
  ) {}
}
