using System.ComponentModel.DataAnnotations.Schema;

namespace JobSearchingWebApp.Endpoints.CVTehnologije.Dodaj
{
    public class CVTehnologijaDodajRequest
    {
        public int cv_id { get; set; }
        public int tehnologija_id { get; set; }
    }
}
