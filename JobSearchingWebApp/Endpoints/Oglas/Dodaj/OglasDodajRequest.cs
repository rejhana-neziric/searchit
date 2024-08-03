using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace JobSearchingWebApp.Endpoints.Oglas.Dodaj
{
    public class OglasDodajRequest
    {
        public string kompanija_id { get; set; }
        public string naziv_pozicije { get; set; }
        public string lokacija { get; set; }
        public DateTime datum_objave { get; set; }
        public double plata { get; set; }
        public string tip_posla { get; set; }
        public DateTime rok_prijave { get; set; }
        public string iskustvo { get; set; }
        public DateTime? datum_modificiranja { get; set; }
    }
}
