using System.ComponentModel.DataAnnotations.Schema;

namespace JobSearchingWebApp.Endpoints.KandidatOglas.Dodaj
{
    public class KandidatOglasDodajRequest
    {
        public string kandidat_id { get; set; }
        public int oglas_id { get; set; }
        public DateTime datum_prijave { get; set; }
        public string status { get; set; }
    }
}
