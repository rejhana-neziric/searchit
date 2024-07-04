using JobSearchingWebApp.Data;
using JobSearchingWebApp.Helper;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace JobSearchingWebApp.Endpoints.Oglas.GetById
{
    [Route("oglas/get-by-id")]
    public class OglasGetByIdEndpoint : MyBaseEndpoint<int, OglasGetByIdResponse>
    {
        private readonly ApplicationDbContext dbContext;

        public OglasGetByIdEndpoint(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet("{id}")]
        public override async Task<OglasGetByIdResponse> MyAction(int id, CancellationToken cancellationToken)
        {
            var oglas = dbContext.Oglasi.Where(x => x.Id == id).FirstOrDefault();  
            var opis = dbContext.OpisOglas.Where(x => x.OglasId == id).FirstOrDefault();  

            if (oglas == null) 
                throw new Exception("Ne postoji oglas sa ID " + id);

            var oglasOpis = new OglasGetByIdResponse
            {
                Id = oglas.Id,
                //KompanijaNaziv = oglas.Kompanija.Naziv,
                //KompanijaID = oglas.Kompanija.Id, SKONTAT
                NazivPozicije = oglas.NazivPozicije,
                DatumObjave = oglas.DatumObjave,
                Plata = oglas.Plata,
                TipPosla = oglas.TipPosla,
                RokPrijave = oglas.RokPrijave,
                DatumModificiranja = oglas.DatumModificiranja,
                Lokacija = dbContext.OglasLokacija.Where(x => x.OglasId == id).Select(l => new OglasGetByIdResponseOglasLokacija
                {
                    Id = l.LokacijaId,
                    Naziv = l.Lokacija.Naziv,
                }).ToList(),
                Iskustvo = dbContext.OglasIskustvo.Where(x => x.OglasId == id).Select(l => new OglasGetByIdResponseOglasIskustvo
                {
                    Id = l.IskustvoId,
                    Naziv = l.Iskustvo.Naziv,
                }).ToList(),
                OpisOglasa = new OglasGetByIdResponseOpisOglasa
                {
                    OpisPozicije = opis is null ?  " ": opis.OpisPozicije,
                    Kvalifikacija = opis is null ? " " : opis.Kvalifikacija,
                    Vjestine = opis is null ? " " : opis.Vjestine,
                    Benefiti = opis is null ? " " : opis.Benefiti,
                    MinimumGodinaIskustva = opis is null ? 1 :  opis.MinimumGodinaIskustva,
                    PrefiraneGodineIskstva = opis is null ? 1 : opis.PrefiraneGodineIskstva
                }
            };

            return oglasOpis; 
        }
    }
}
