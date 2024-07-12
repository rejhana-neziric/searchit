export class OglasUpdateRequest {
  constructor(
    public oglas_id: number,
    public naziv_pozicije: string | null,
    public rok_prijave: Date | null,
  ) {}
}
