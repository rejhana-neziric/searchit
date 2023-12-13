using JobSearchingWebApp.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace JobSearchingWebApp.Endpoints.OsobaNotifikacija.Pretraga
{
    public class OsobaNotifikacijaPretragaResponse
    {
        public List<OsobeNotifikacijePretragaResponse> OsobeNotifikacije { get; set; }
    }

    public class OsobeNotifikacijePretragaResponse
    {
        public int OsobaId { get; set; }
        public int NotifikacijaId { get; set; }
        public DateTime DatumPrimanja { get; set; }
        public bool Pogledano { get; set; }
    }
}
