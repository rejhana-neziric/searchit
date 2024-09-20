import {SortParametar} from "../../../modals/SortParametar";

export class KompanijeGetRequest{
  constructor(
    public naziv?: string,
    public lokacija?: string[],
    public brojZaposlenih?: string [],
    public imaOtvorenePozicije?: string,
    public spasen?: boolean,
    public kandidatId?: string,
    public filters?: { [key: string]: any },
    public sortParametri?: SortParametar[]
  ) {}
}
