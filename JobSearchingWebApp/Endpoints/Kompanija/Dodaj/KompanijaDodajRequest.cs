using JobSearchingWebApp.Models;

namespace JobSearchingWebApp.Endpoints.Kompanija.Dodaj
{
    public class KompanijaDodajRequest
    {
        public string email { get; set; }
        public string username { get; set; }
        public string password { get; set; }
        public int tema_id { get; set; }
        public int jezik_id { get; set; }
        public string naziv { get; set; }
        public int godina_osnivanja { get; set; }
        public string lokacija { get; set; }
        public string? logo { get; set; }
        public string broj_zaposlenih { get; set; }
        public string kratki_opis { get; set; }
        public string opis { get; set; }
        public string? Website { get; set; }
        public string? LinkedIn { get; set; }
        public string? Twitter { get; set; }
    }
}
