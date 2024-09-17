using JobSearchingWebApp.Database;
using System.ComponentModel.DataAnnotations.Schema;

namespace JobSearchingWebApp.Endpoints.KorisnikNotifikacija.Update
{
    public class KorisnikNotifikacijaUpdateRequest
    {
        public int korisnik_notifikacija_id { get; set; }
        public bool pogledano { get; set; }
    }
}
