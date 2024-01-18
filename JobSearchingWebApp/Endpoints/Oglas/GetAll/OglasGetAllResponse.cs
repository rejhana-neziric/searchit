using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace JobSearchingWebApp.Endpoints.Oglas.GetAll
{
    public class OglasGetAllResponse
    {
        public List<OglasGetAllResponseOglas> Oglasi {  get; set; } 
    }

    public class OglasGetAllResponseOglas
    {
        public int Id { get; set; }
        public string KompanijaNaziv { get; set; }
        public string NazivPozicije { get; set; }
        public string Lokacija { get; set; }
        public DateTime DatumObjave { get; set; }
        public string TipPosla { get; set; }
        public DateTime RokPrijave { get; set; }
        public string Iskustvo { get; set; }
    }
}
