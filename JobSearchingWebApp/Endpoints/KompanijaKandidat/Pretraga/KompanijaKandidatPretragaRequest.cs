using System.ComponentModel.DataAnnotations.Schema;

namespace JobSearchingWebApp.Endpoints.KompanijaKandidat.Pretraga
{
    public class KompanijaKandidatPretragaRequest
    {
        public string? kompanija_id { get; set; }
        public string? kandidat_id { get; set; }
        public DateTime? datum_razgovora { get; set; }
    }
}
