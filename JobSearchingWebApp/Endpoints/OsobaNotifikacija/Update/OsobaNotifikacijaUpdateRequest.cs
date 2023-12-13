using JobSearchingWebApp.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace JobSearchingWebApp.Endpoints.OsobaNotifikacija.Update
{
    public class OsobaNotifikacijaUpdateRequest
    {
        public int osoba_notifikacija_id { get; set; }
        public bool pogledano { get; set; }
    }
}
