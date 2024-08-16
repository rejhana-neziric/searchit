import {SortParametar} from "../../SortParametar";

export class OglasGetRequest {
  constructor(
    public naziv?: string,
    public lokacija?: string[],
    public tipPosla?: string[],
    public iskustvo?: string[],
    public minimumGodinaIskustva?: number,
    public spasen?: boolean,
    public kandidatId?: string,
    public otvoren?: boolean,
    public kompanijaId?: string,
    public filters?: { [key: string]: any },
    public sortParametri?: SortParametar[]
  ){}
}
