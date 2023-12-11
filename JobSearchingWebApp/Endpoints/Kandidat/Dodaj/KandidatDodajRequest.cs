namespace JobSearchingWebApp.Endpoints.Kandidat.Dodaj
{
    public class KandidatDodajRequest
    {
        public string email { get; set; }
        public string username { get; set; }
        public string password { get; set; }
        public int tema_id { get; set; }
        public int jezik_id { get; set; }
        public string ime { get; set; }
        public string prezime { get; set; }
        public DateTime datum_rodjenja { get; set; }
        public string mjesto_prebivalista { get; set; }
        public string zvanje { get; set; }
        public string broj_telefona { get; set; }
    }
}
