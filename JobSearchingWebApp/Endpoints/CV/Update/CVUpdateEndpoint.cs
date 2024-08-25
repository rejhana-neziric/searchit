using JobSearchingWebApp.Data;
using JobSearchingWebApp.Endpoints.Oglas.Update;
using JobSearchingWebApp.Helper;
using JobSearchingWebApp.Models;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace JobSearchingWebApp.Endpoints.CV.Update
{
    [Tags("CV")]
    [Route("cv-update")]
    public class CVUpdateEndpoint : MyBaseEndpoint<CVUpdateRequest, CVUpdateResponse>
    {
        private readonly ApplicationDbContext dbContext;

        public CVUpdateEndpoint(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpPost]
        public override async Task<CVUpdateResponse> MyAction(CVUpdateRequest request, CancellationToken cancellationToken)
        {
            var cv = dbContext.CV.FirstOrDefault(x => x.Id == request.cv_id);

            if (cv == null)
            {
                throw new Exception("Nije pronađen CV sa ID " + request.cv_id);
            }

            cv.Ime = request.ime; 
            cv.Prezime = request.prezime;   
            cv.Email = request.email;
            cv.BrojTelefona = request.broj_telefona; 
            //cv.OpisProfila = request.opis_profila;
            //cv.Slika = request.slika;

            await dbContext.SaveChangesAsync();

            return new CVUpdateResponse { Id = cv.Id };
        }
    }
}
