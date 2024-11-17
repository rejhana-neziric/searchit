export interface PorukaGetResponse {
  poruke: PorukaGetResponsePoruka[];
}

export interface PorukaGetResponsePoruka {
  id: number;
  korisnik_id: string;
  poruka_id: string;
  is_primljena: boolean;
  ime_posiljatelja: string;
  sadrzaj: string;
  vrijeme_slanja: string;
  posiljalac_id:string;
  posiljalacIme:string;
}
