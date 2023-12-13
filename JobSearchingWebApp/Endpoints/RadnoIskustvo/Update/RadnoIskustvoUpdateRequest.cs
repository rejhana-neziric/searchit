using System.ComponentModel.DataAnnotations.Schema;

namespace JobSearchingWebApp.Endpoints.RadnoIskustvo.Update
{
    public class RadnoIskustvoUpdateRequest
    {
        public int radno_iskustvo_id { get; set; }
        public string naziv_pozicije { get; set; }
        public DateTime datum_pocetka { get; set; }
        public DateTime datum_zavrsetka { get; set; }
        public string naziv_kompanije { get; set; }
        public string opis { get; set; }
    }
}
