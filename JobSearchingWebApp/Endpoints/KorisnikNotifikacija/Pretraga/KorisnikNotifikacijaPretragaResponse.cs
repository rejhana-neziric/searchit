using JobSearchingWebApp.Database;
using System.ComponentModel.DataAnnotations.Schema;

namespace JobSearchingWebApp.Endpoints.KorisnikNotifikacija.Pretraga
{
    public class KorisnikNotifikacijaPretragaResponse
    {
        public List<KorisniciNotifikacijePretragaResponse> KorisniciNotifikacije { get; set; }
    }

    public class KorisniciNotifikacijePretragaResponse
    {
        public string KorisnikId { get; set; }
        public int NotifikacijaId { get; set; }
        public DateTime DatumPrimanja { get; set; }
        public bool Pogledano { get; set; }
    }
}
