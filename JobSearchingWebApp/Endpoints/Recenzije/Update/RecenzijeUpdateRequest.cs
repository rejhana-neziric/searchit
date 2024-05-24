namespace JobSearchingWebApp.Endpoints.Recenzije.Update
{
    public class RecenzijeUpdateRequest
    {
        public int recenzija_id { get; set; }
        public string tekst { get; set; }
        public DateTime datum_vrijeme_recenzije { get; set; }
        public int broj_zvijezdica { get; set; }
        public int korisnik_id { get; set; }
        public string pozicija { get; set; }
    }
}
