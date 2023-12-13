using System.ComponentModel.DataAnnotations.Schema;

namespace JobSearchingWebApp.Endpoints.KandidatOglas.Pretraga
{
    public class KandidatOglasPretragaRequest
    {
        public int? kandidat_id { get; set; }
        public int? oglas_id { get; set; }
        public DateTime? datum_prijave { get; set; }
        public string? status { get; set; }
    }
}
