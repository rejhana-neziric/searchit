using JobSearchingWebApp.Data;
using JobSearchingWebApp.Helper;
using JobSearchingWebApp.Models;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace JobSearchingWebApp.Endpoints.Kompanija.Update
{
    [Tags("Kompanija")]
    [Route("kompanija-update")]
    public class KompanijaUpdateEndpoint : MyBaseEndpoint<KompanijaUpdateRequest, KompanijaUpdateResponse>
    {
        private readonly ApplicationDbContext dbContext;

        public KompanijaUpdateEndpoint(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpPost]
        public override async Task<KompanijaUpdateResponse> MyAction(KompanijaUpdateRequest request, CancellationToken cancellationToken)
        {
            var kompanija = dbContext.Kompanije.FirstOrDefault(x => x.Id == request.kompanija_id);

            if (kompanija == null)
            {
                throw new Exception("Nije pronađen kompanija sa ID " + request.kompanija_id);
            }

            kompanija.Email = request.email;
            kompanija.Username = request.username;
            kompanija.Password = request.password;
            kompanija.TemaId = request.tema_id;
            kompanija.JezikId = request.jezik_id;
            kompanija.Naziv = request.naziv;
            kompanija.GodinaOsnivanja = request.godina_osnivanja; 
            kompanija.Lokacija = request.lokacija;  
            kompanija.Logo = request.slika;

            await dbContext.SaveChangesAsync();

            return new KompanijaUpdateResponse { Id = request.kompanija_id }; 
        }
    }
}
