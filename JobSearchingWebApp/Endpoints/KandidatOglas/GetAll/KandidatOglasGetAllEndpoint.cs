using JobSearchingWebApp.Data;
using JobSearchingWebApp.Endpoints.Oglas.GetAll;
using JobSearchingWebApp.Helper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace JobSearchingWebApp.Endpoints.KandidatOglas.GetAll
{
    [Tags("Kandidat-Oglas")]
    [Route("kandidat-oglas-get")]
    public class KandidatOglasGetAllEndpoint : MyBaseEndpoint<KandidatOglasGetAllRequest, KandidatOglasGetAllResponse>
    {
        private readonly ApplicationDbContext dbContext;

        public KandidatOglasGetAllEndpoint(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public string NazivPozicije { get; set; }

        public string NazivKompanije { get; set; }

        public DateTime RokPrijave { get; set; }

        public bool Otvoren { get; set; }


        [HttpGet]
        public override async Task<KandidatOglasGetAllResponse> MyAction([FromQuery] KandidatOglasGetAllRequest request, CancellationToken cancellationToken)
        {
            var kandidatOglasi = dbContext.KandidatiOglasi.Where(x => x.KandidatId == request.KandidatId)
                                                          .Include(x => x.CV)
                                                          .Include(x => x.Oglas)
                                                            .ThenInclude(x => x.Kompanija)
                                                          .AsQueryable();

            var lista = kandidatOglasi.Select(oglas => new KandidatOglasGetAllResponseKandidatOglas
            {
                Id = oglas.Id,
                OglasId = oglas.OglasId,
                NazivKompanije = oglas.Oglas.Kompanija.Naziv,
                NazivPozicije = oglas.Oglas.NazivPozicije,
                Otvoren = oglas.Oglas.Otvoren, 
                RokPrijave = oglas.Oglas.RokPrijave, 
                KandidatId = oglas.KandidatId,
                CVId = oglas.CVId,
                CVNaziv = oglas.CV.Naziv,
                DatumPrijave = oglas.DatumPrijave,  
                Status = oglas.Status,  
            }).ToList();


            return new KandidatOglasGetAllResponse { KandidatOglasi = lista };
        }
    }
}

