using System.ComponentModel.DataAnnotations.Schema;

namespace JobSearchingWebApp.Endpoints.RadnoIskustvo.Pretraga
{
    public class RadnoIskustvoPretragaResponse
    {
        public List<RadnaIskustvaPretragaResponse> RadnaIskustva { get; set; }   
    }

    public class RadnaIskustvaPretragaResponse
    {
        public string NazivPozicija { get; set; }
        public DateTime DatumPocetka { get; set; }
        public DateTime DatumZavrsetka { get; set; }
        public string NazivKompanije { get; set; }
        public string Opis { get; set; }
        public int CVId { get; set; }
    }
}
