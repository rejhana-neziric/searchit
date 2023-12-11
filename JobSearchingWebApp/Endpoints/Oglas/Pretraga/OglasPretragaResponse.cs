using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace JobSearchingWebApp.Endpoints.Oglas.Pretraga
{
    public class OglasPretragaResponse
    {
        public List<OglasiPretragaResponse> Oglasi { get; set; }   
    }

    public class OglasiPretragaResponse
    {
        public int Id { get; set; }
        public int KompanijaId { get; set; }
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
