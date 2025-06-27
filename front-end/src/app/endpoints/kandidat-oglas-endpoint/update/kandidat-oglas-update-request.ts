export class KandidatOglasUpdateRequest {
  constructor(
    public id: number,
    public kandidatId: string,
    public kompanijaId: string,
    public status: string | null,
    public spasen: boolean | null) {
  }
}
