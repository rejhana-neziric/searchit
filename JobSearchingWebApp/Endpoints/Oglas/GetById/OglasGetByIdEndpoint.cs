using JobSearchingWebApp.Data;
using JobSearchingWebApp.Helper;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace JobSearchingWebApp.Endpoints.Oglas.GetById
{
    [Tags("Oglas")]
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
            var oglas = dbContext.Oglasi.Where(x => x.Id == id).Include(kompanija => kompanija.Kompanija).FirstOrDefault();  
            var opis = dbContext.OpisOglas.Where(x => x.OglasId == id).FirstOrDefault();  

            if (oglas == null) 
                throw new Exception("Ne postoji oglas sa ID " + id);

            var oglasOpis = new OglasGetByIdResponse
            {
                Id = oglas.Id,
                KompanijaNaziv = oglas.Kompanija.Naziv,
                Logo = oglas.Kompanija!.Logo != null ? Convert.ToBase64String(oglas.Kompanija!.Logo) : null,
                KompanijaId = oglas.Kompanija.Id, 
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
                    MinimumGodinaIskustva = (int)(opis is null ? 1 :  opis.MinimumGodinaIskustva),
                    PrefiraneGodineIskstva = (int)(opis is null ? 1 : opis.PrefiraneGodineIskstva)
                }
            };

            return oglasOpis; 
        }
    }
}
