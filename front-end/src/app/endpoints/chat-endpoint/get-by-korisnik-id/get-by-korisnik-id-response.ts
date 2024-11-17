export interface PorukaGetResponse {
  poruke: PorukaGetResponsePoruka[];
}

export interface PorukaGetResponsePoruka {
    id: number;
    korisnik_id: string;
    poruka_id: string;
    is_primljena: boolean;
    posiljatelj_id: string;
    ime_posiljatelja: string;
    vrijeme_slanja: Date;
    is_seen:boolean;
    sadrzaj: string;
}

export interface GroupedMessage {
  posiljalacIme: string;
  posiljalacId: string | null;
  messages: {
    id: number;
    korisnik_id: string;
    sadrzaj: string;
    vrijeme_slanja: Date;
    is_seen: boolean;
  }[];
}
