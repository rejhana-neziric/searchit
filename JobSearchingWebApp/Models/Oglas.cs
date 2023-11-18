using System.ComponentModel.DataAnnotations.Schema;

namespace JobSearchingWebApp.Models
{
    public class Oglas
    {
        public int Id { get; set; }
        [ForeignKey(nameof(Kompanija))]
        public int KompanijaId { get; set; }
        public Kompanija Kompanija { get; set; }
        public string NazivPozicije { get; set; }
        public string Lokacija { get; set; }
        public DateTime DatumObjave { get; set; }
        public double Plata { get; set; }
        public string TipPosla { get; set; }
        public DateTime RokPrijave { get; set; }
        public string Iskustvo { get; set; }
        public string OpisPosla { get; set; }
        public DateTime? DatumModificiranja { get; set; }
    }
}
