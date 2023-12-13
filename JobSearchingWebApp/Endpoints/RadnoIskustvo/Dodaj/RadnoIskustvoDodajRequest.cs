namespace JobSearchingWebApp.Endpoints.RadnoIskustvo.Dodaj
{
    public class RadnoIskustvoDodajRequest
    {
        public string naziv_pozicije { get; set; }
        public DateTime datum_pocetka { get; set; }
        public DateTime datum_zavrsetka { get; set; }
        public string naziv_kompanije { get; set; }
        public string opis { get; set; }
        public int cv_id { get; set; }
    }
}
