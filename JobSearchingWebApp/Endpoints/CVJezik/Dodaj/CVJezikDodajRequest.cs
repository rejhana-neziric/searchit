using System.ComponentModel.DataAnnotations.Schema;

namespace JobSearchingWebApp.Endpoints.CVJezik.Dodaj
{
    public class CVJezikDodajRequest
    {
        public int cv_id { get; set; }
        public int jezik_id { get; set; }
    }
}
