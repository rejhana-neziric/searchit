using System.ComponentModel.DataAnnotations.Schema;

namespace JobSearchingWebApp.Endpoints.KompanijaKandidat.Pretraga
{
    public class KompanijaKandidatPretragaRequest
    {
        public int? kompanija_id { get; set; }
        public int? kandidat_id { get; set; }
        public DateTime? datum_razgovora { get; set; }
    }
}
