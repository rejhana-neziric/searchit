using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace JobSearchingWebApp.Endpoints.Oglas.Pretraga
{
    public class OglasPretragaRequest
    {
        public string? naziv_pozicije { get; set; }
        public string? lokacija { get; set; }
        public double? plata { get; set; }
        public string? tip_posla { get; set; }
        public string? iskustvo { get; set; }
    }
}
