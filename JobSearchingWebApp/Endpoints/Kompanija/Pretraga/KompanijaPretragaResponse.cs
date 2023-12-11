using JobSearchingWebApp.Endpoints.Kandidat.Pretraga;

namespace JobSearchingWebApp.Endpoints.Kompanija.Pretraga
{
    public class KompanijaPretragaResponse
    {
        public List<KompanijePretragaResponse> Kompanije { get; set; }
    }

    public class KompanijePretragaResponse
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Naziv { get; set; }
        public int GodinaOsnivanja { get; set; }
        public string Lokacija { get; set; }
        public string Slika { get; set; }
    }
}
