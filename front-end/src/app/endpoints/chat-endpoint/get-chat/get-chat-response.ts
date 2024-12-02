export interface PorukaGetChatResponse {
  poruke: PorukaGetChatResponsePoruka[];
  total_poruka: number;
  broj_neprocitanih: number;
}

export interface PorukaGetChatResponsePoruka {
  id: number;
  primatelj_id: string;
  primatelj_ime: string;
  posiljatelj_id: string;
  posiljatelj_ime: string;
  sadrzaj: string;
  vrijeme_slanja: string;
  is_seen: boolean;
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
