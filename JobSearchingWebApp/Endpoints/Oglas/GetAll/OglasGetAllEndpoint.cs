using JobSearchingWebApp.Data;
using JobSearchingWebApp.Helper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Runtime.CompilerServices;

namespace JobSearchingWebApp.Endpoints.Oglas.GetAll
{
    [Tags("Oglas")]
    [Route("oglas-get-all")]
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
           var oglasi = await dbContext.Oglasi
                .OrderByDescending(x => x.Id)
                .Select(x => new OglasGetAllResponseOglas()
                {
                    Id = x.Id,
                    KompanijaNaziv = x.Kompanija.Naziv, 
                    NazivPozicije = x.NazivPozicije, 
                    Lokacija = x.Lokacija, 
                    DatumObjave = x.DatumObjave,    
                    TipPosla = x.TipPosla,
                    RokPrijave = x.RokPrijave,
                    Iskustvo = x.Iskustvo, 
                })
                .ToListAsync(cancellationToken: cancellationToken);


            return new OglasGetAllResponse { Oglasi = oglasi };
        }
    }
}
