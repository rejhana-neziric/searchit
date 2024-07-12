using System.ComponentModel.DataAnnotations.Schema;

namespace JobSearchingWebApp.Endpoints.KandidatSpaseniOglasi.Dodaj
{
    public class KandidatSpaseniOglasiDodajRequest
    {
        public int kandidat_id { get; set; }
        public int oglas_id { get; set; }
    }
}
