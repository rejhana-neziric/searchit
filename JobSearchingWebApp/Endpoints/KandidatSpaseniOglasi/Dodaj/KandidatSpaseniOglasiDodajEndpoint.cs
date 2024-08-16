using JobSearchingWebApp.Data;
using JobSearchingWebApp.Endpoints.Kandidat.Dodaj;
using JobSearchingWebApp.Helper;
using JobSearchingWebApp.Models;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace JobSearchingWebApp.Endpoints.KandidatSpaseniOglasi.Dodaj
{
    [Tags("Kandidat-Spaseni-Oglas")]
    [Route("kandidat-spaseni-oglas-dodaj")]
    public class KandidatSpaseniOglasiDodajEndpoint : MyBaseEndpoint<KandidatSpaseniOglasiDodajRequest, KandidatSpaseniOglasiDodajResponse>
    {
        private readonly ApplicationDbContext dbContext;

        public KandidatSpaseniOglasiDodajEndpoint(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpPost]
        public override async Task<KandidatSpaseniOglasiDodajResponse> MyAction(KandidatSpaseniOglasiDodajRequest request, CancellationToken cancellationToken)
        {
            var spaseni = dbContext.KandidatSpaseniOglasi.Where(spaseni => spaseni.KandidatId == request.kandidat_id && spaseni.OglasId == request.oglas_id).FirstOrDefault(); 
            var oglas = dbContext.Oglasi.Where(oglas => oglas.Id == request.oglas_id);
            var kandidat = dbContext.Kandidati.Where(kandidat => kandidat.Id == request.kandidat_id); 

            if (oglas is null)
            {
                throw new Exception($"Oglas sa ID {request.oglas_id} ne postoji.");
            }

            if (kandidat is null)
            {
                throw new Exception($"Kandidat sa ID {request.kandidat_id} ne postoji.");
            }

            var id = 0;

            if (spaseni != null && spaseni.Spasen == true)
            {
                throw new Exception($"Oglas sa ID {request.oglas_id} je vec spasen.");
            }

            else if (spaseni != null && spaseni.Spasen == false)
            {
                spaseni.Spasen = true;
            }

            else
            {
                var kandidat_oglas = new Models.KandidatSpaseniOglasi()
                {
                    KandidatId = request.kandidat_id,
                    OglasId = request.oglas_id,
                    Spasen = true
                };

                dbContext.KandidatSpaseniOglasi.Add(kandidat_oglas);

                id = kandidat_oglas.Id;
            }


            await dbContext.SaveChangesAsync();

            return new KandidatSpaseniOglasiDodajResponse { Id = id};
        }
    }
}
