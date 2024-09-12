using System.ComponentModel.DataAnnotations.Schema;

namespace JobSearchingWebApp.Endpoints.KandidatOglas.Dodaj
{
    public class KandidatOglasDodajRequest
    {
        public string KandidatId { get; set; }

        public int OglasId { get; set; }

        public int CVId { get; set; }

        public DateTime DatumPrijave { get; set; }
    }
}
