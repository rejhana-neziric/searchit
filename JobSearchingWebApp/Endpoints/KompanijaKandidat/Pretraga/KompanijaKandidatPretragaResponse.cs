using System.ComponentModel.DataAnnotations.Schema;

namespace JobSearchingWebApp.Endpoints.KompanijaKandidat.Pretraga
{
    public class KompanijaKandidatPretragaResponse
    {
        public List<KompanijeKandidatiPretragaResponse> KompanijeKandidati {  get; set; }    
    }

    public class KompanijeKandidatiPretragaResponse
    {
        public int KompanijaId { get; set; }
        public int KandidatId { get; set; }
        public DateTime DatumRazgovora { get; set; }
    }
}
