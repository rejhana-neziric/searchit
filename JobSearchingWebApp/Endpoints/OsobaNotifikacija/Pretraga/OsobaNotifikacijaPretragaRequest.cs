using JobSearchingWebApp.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace JobSearchingWebApp.Endpoints.OsobaNotifikacija.Pretraga
{
    public class OsobaNotifikacijaPretragaRequest
    {
        public int? osoba_id { get; set; }
        public int? notifikacija_id { get; set; }
        public DateTime? datum_primanja { get; set; }
        public bool? pogledano { get; set; }
    }
}
