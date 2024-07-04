using System.Reflection.Metadata.Ecma335;

namespace JobSearchingWebApp.Endpoints.Oglas.GetAll
{
    public class OglasGetAllRequest
    {
        public string? Naziv { get; set; }
        public List<string>? Lokacija { get; set; }
        public List<string>? TipPosla { get; set; }
        public List<string>? Iskustvo { get; set; }
        public int? MinimumGodinaIskustva { get; set; }
    }
}
