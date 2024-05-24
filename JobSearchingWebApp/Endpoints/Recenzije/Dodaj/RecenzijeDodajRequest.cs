namespace JobSearchingWebApp.Endpoints.Recenzije.Dodaj
{
    public class RecenzijeDodajRequest
    {
        public string tekst { get; set; }
        public DateTime datum_vrijeme_recenzije { get; set; }
        public int broj_zvijezdica { get; set; }
        public int korisnik_id { get; set; }
        public string pozicija { get; set; }
    }
}
