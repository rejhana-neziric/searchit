using System.ComponentModel.DataAnnotations.Schema;

namespace JobSearchingWebApp.Endpoints.KompanijaKandidat.Pretraga
{
    public class KompanijaKandidatPretragaResponse
    {
        public List<KompanijeKandidatiPretragaResponse> KompanijeKandidati {  get; set; }    
    }

    public class KompanijeKandidatiPretragaResponse
    {
        public string KompanijaId { get; set; }
        public string KandidatId { get; set; }
        public DateTime DatumRazgovora { get; set; }
    }
}
