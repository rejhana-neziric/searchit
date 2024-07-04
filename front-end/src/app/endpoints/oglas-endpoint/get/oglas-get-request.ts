export class OglasGetRequest {
  constructor(
    public naziv?: string,
    public lokacija?: string[],
    public tipPosla?: string[],
    public iskustvo?: string[],
    public minimumGodinaIskustva?: number,
    public filters?: { [key: string]: any },
  ){}
}
