import {SortParametar} from "../../SortParametar";

export class KompanijeGetRequest{
  constructor(
    public naziv?: string,
    public lokacija?: string[],
    public brojZaposlenih?: string [],
    public imaOtvorenePozicije?: string,
    public spasen?: boolean,
    public kandidatId?: number,
    public filters?: { [key: string]: any },
    public sortParametri?: SortParametar[]
  ) {}
}
