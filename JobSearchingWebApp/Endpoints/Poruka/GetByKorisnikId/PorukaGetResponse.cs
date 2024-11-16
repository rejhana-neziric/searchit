namespace JobSearchingWebApp.Endpoints.Poruka.GetByKorisnikId
{
    public class PorukaGetResponse
    {
        public List<PorukaGetResponsePoruka> Poruke { get; set; }
    }

    public class PorukaGetResponsePoruka
    {
        public int id { get; set; }
        public string korisnik_id { get; set; }
        public string sadrzaj { get; set; }
        public DateTime vrijeme_slanja { get; set; }
    }
}
