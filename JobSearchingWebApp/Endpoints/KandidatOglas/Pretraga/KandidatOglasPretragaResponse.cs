using System.ComponentModel.DataAnnotations.Schema;

namespace JobSearchingWebApp.Endpoints.KandidatOglas.Pretraga
{
    public class KandidatOglasPretragaResponse
    {
        public List<KandidatiOglasiPretragaResponse> KandidatiOglasi { get; set; } 
    }
    public class KandidatiOglasiPretragaResponse
    {
        public int KandidatId { get; set; }
        public int OglasId { get; set; }
        public DateTime DatumPrijave { get; set; }
        public string Status { get; set; }
    }
}
