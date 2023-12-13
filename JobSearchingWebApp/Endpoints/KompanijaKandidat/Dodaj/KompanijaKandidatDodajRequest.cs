using System.ComponentModel.DataAnnotations.Schema;

namespace JobSearchingWebApp.Endpoints.KompanijaKandidat.Dodaj
{
    public class KompanijaKandidatDodajRequest
    {
        public int kompanija_id { get; set; }
        public int kandidat_id { get; set; }
        public DateTime datum_razgovora { get; set; }
    }
}
