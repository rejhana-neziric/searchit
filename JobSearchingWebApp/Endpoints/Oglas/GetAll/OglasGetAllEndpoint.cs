using JobSearchingWebApp.Data;
using JobSearchingWebApp.Helper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Azure;
using System.Runtime.CompilerServices;
using JobSearchingWebApp.Models;
using System.Linq;
using Microsoft.IdentityModel.Tokens;

namespace JobSearchingWebApp.Endpoints.Oglas.GetAll
{
    [Tags("Oglas")]
    [Route("oglas-get")]
    public class OglasGetAllEndpoint : MyBaseEndpoint<OglasGetAllRequest, OglasGetAllResponse>
    {
        private readonly ApplicationDbContext dbContext;

        public OglasGetAllEndpoint(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public override async Task<OglasGetAllResponse> MyAction([FromQuery] OglasGetAllRequest request, CancellationToken cancellationToken)
        {
            var oglasi = dbContext.Oglasi.AsQueryable();
            var lokacije = dbContext.OglasLokacija.Include(x => x.Lokacija).AsQueryable();
            var iskustva = dbContext.OglasIskustvo.Include(x => x.Iskustvo).AsQueryable();

            if (!string.IsNullOrEmpty(request.Naziv))
            {
                oglasi = oglasi.Where(x => x.NazivPozicije.ToLower().Contains(request.Naziv.ToLower()) 
                                        || x.Kompanija.Naziv.ToLower().Contains(request.Naziv.ToLower())); 
            }

            if (request?.Lokacija?.Count > 0)
            { 
                oglasi = oglasi
                        .Where(x => lokacije
                                    .Where(l => l.OglasId == x.Id)
                                    .Any(lokacija => request.Lokacija.Contains(lokacija.Lokacija.Naziv)) == true);
            }

            if (request?.Iskustvo?.Count() > 0)
            {
                oglasi = oglasi
                        .Where(x => iskustva
                                    .Where(l => l.OglasId == x.Id)
                                    .Any(iskustvo => request.Iskustvo.Contains(iskustvo.Iskustvo.Naziv)) == true);
            }

            if (request?.TipPosla?.Count() > 0)
            {
                oglasi = oglasi
                        .Where(x => request.TipPosla.Contains(x.TipPosla) == true);
            }

            if (request?.MinimumGodinaIskustva != null)
            {
                
                oglasi = oglasi.Where(x => x.OpisOglas.MinimumGodinaIskustva <= request.MinimumGodinaIskustva);
            }

             var result = oglasi.Select(x => new OglasGetAllResponseOglas 
             {
                 Id = x.Id,
                 KompanijaNaziv = x.Kompanija.Naziv,
                 NazivPozicije = x.NazivPozicije,
                 DatumObjave = x.DatumObjave,
                 TipPosla = x.TipPosla,
                 RokPrijave = x.RokPrijave,
                 Iskustvo = dbContext.OglasIskustvo
                                     .Where(i => i.OglasId == x.Id)
                                     .Select(i => new OglasGetAllResponseOglasIskustvo
                                                  {
                                                      Id = i.IskustvoId,
                                                      Naziv = i.Iskustvo.Naziv
                                                  })
                                     .ToList(),

                 Lokacija = dbContext.OglasLokacija
                                     .Where(l => l.OglasId == x.Id)
                                     .Select(l => new OglasGetAllResponseOglasLokacija
                                                  {
                                                      Id = l.LokacijaId,
                                                      Naziv = l.Lokacija.Naziv
                                                  })
                                     .ToList(),
                 OpisOglasa = dbContext.OpisOglas
                                       .Where(o => o.OglasId == x.Id)
                                       .Select(o => new OglasGetAllResponseOpisOglas
                                                    {
                                                        Id = o.Id,
                                                        MinimumGodinaIskustva = o.MinimumGodinaIskustva,
                                                        PrefiraneGodineIskstva = o.PrefiraneGodineIskstva
                                                    })
                                       .SingleOrDefault()!,
             }).ToList();   

            return new OglasGetAllResponse { Oglasi = result };
        }
    }
}
