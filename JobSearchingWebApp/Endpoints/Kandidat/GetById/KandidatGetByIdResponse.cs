using JobSearchingWebApp.Database;

namespace JobSearchingWebApp.Endpoints.Kandidat.GetById
{
    public class KandidatGetByIdResponse : Korisnik
    {
        public string Ime { get; set; }

        public string Prezime { get; set; }

        public DateTime DatumRodjenja { get; set; }

        public string MjestoPrebivalista { get; set; }

        public string Zvanje { get; set; }
    }
}
