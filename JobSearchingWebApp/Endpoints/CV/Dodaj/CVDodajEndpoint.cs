using JobSearchingWebApp.Data;
using JobSearchingWebApp.Endpoints.Oglas.Dodaj;
using JobSearchingWebApp.Helper;
using JobSearchingWebApp.Models;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace JobSearchingWebApp.Endpoints.CV.Dodaj
{
    [Tags("CV")]
    [Route("cv-dodaj")]
    public class CVDodajEndpoint : MyBaseEndpoint<CVDodajRequest, CVDodajResponse>
    {
        private readonly ApplicationDbContext dbContext;

        public CVDodajEndpoint(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpPost]
        public override async Task<CVDodajResponse> MyAction(CVDodajRequest request, CancellationToken cancellationToken)
        {
            var cv = new Models.CV()
            {
                Ime = request.ime,
                Prezime = request.prezime,
                Email = request.email,
                BrojTelefona = request.broj_telefona,
                OpisProfila = request.opis_profila,
                Slika = request.slika
            };

            dbContext.CV.Add(cv);
            await dbContext.SaveChangesAsync();

            return new CVDodajResponse { Id = cv.Id};
        }
    }
}
