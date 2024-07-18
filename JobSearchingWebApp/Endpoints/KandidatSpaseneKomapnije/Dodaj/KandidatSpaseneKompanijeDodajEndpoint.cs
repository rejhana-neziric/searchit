using JobSearchingWebApp.Data;
using JobSearchingWebApp.Endpoints.KandidatSpaseniOglasi.Dodaj;
using JobSearchingWebApp.Helper;
using Microsoft.AspNetCore.Mvc;

namespace JobSearchingWebApp.Endpoints.KandidatSpaseneKomapnije.Dodaj
{
    [Tags("Kandidat-Spasene-Kompanije")]
    [Route("kandidat-spasene-kompanije-dodaj")]
    public class KandidatSpaseneKompanijeDodajEndpoint : MyBaseEndpoint<KandidatSpaseneKompanijeDodajRequest, KandidatSpaseneKompanijeDodajResponse>
    {
        private readonly ApplicationDbContext dbContext;

        public KandidatSpaseneKompanijeDodajEndpoint(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpPost]
        public override async Task<KandidatSpaseneKompanijeDodajResponse> MyAction(KandidatSpaseneKompanijeDodajRequest request, CancellationToken cancellationToken)
        {
            var spaseni = dbContext.KandidatSpaseneKompanije.Where(spaseni => spaseni.KandidatId == request.kandidat_id && spaseni.KompanijaId == request.kompanija_id).FirstOrDefault();
            var kompanija = dbContext.Kompanije.Where(kompanija => kompanija.Id == request.kompanija_id);
            var kandidat = dbContext.Kandidati.Where(kandidat => kandidat.Id == request.kandidat_id);

            if (kompanija is null)
            {
                throw new Exception($"Kompanija sa ID {request.kompanija_id} ne postoji.");
            }

            if (kandidat is null)
            {
                throw new Exception($"Kandidat sa ID {request.kandidat_id} ne postoji.");
            }

            var id = 0;

            if (spaseni != null && spaseni.Spasen == true)
            {
                throw new Exception($"Kompanija sa ID {request.kompanija_id} je vec spasen.");
            }

            else if (spaseni != null && spaseni.Spasen == false)
            {
                spaseni.Spasen = true;
                id = spaseni.Id; 
            }


            else
            {
                var kandidat_kompanija = new Models.KandidatSpaseneKompanije()
                {
                    KandidatId = request.kandidat_id,
                    KompanijaId = request.kompanija_id,
                    Spasen = true
                };

                dbContext.KandidatSpaseneKompanije.Add(kandidat_kompanija);

                id = kandidat_kompanija.Id;
            }


            await dbContext.SaveChangesAsync();

            return new KandidatSpaseneKompanijeDodajResponse { Id = id };
        }
    }
}
