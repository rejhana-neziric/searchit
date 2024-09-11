//OglasDodajRequest
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace JobSearchingWebApp.Endpoints.Oglas.Dodaj
{
    public class OglasDodajRequest
    {
        public string kompanija_id { get; set; }
        public string naziv_pozicije { get; set; }
        public string[] lokacija { get; set; }
        public DateTime datum_objave { get; set; }
        public string plata { get; set; }
        public string tip_posla { get; set; }
        public DateTime rok_prijave { get; set; }
        public string[] iskustvo { get; set; }
        public DateTime? datum_modificiranja { get; set; }
        public string opis_pozicije { get; set; }
        public int? minimum_godina_iskustva { get; set; }
        public int? preferirane_godine_iskustva { get; set; }
        public string? kvalifikacija { get; set; }
        public string? vjestine { get; set; }
        public string? benefiti { get; set; }
        public bool? objavljen { get; set; }
    }
}
