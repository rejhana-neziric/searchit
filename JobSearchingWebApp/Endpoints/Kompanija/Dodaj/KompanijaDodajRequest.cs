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
        public string slika { get; set; }
    }
}
