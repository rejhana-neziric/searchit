export class KandidatSpaseneKompanijeUpdateRequest{
  constructor(
    public kandidat_id: string,
    public kompanija_id: string,
    public spasen: boolean
  ) {}
}
