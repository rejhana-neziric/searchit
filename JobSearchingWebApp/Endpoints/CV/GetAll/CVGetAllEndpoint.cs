using JobSearchingWebApp.Data;
using JobSearchingWebApp.Endpoints.Oglas.GetAll;
using JobSearchingWebApp.Helper;
using Microsoft.AspNetCore.Mvc;

namespace JobSearchingWebApp.Endpoints.CV.GetAll
{

    [Tags("CV")]
    [Route("cv-get")]
    public class CVGetAllEndpoint : MyBaseEndpoint<CVGetAllRequest, CVGetAllResponse>
    {
        private readonly ApplicationDbContext dbContext;

        public CVGetAllEndpoint(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public override async Task<CVGetAllResponse> MyAction([FromQuery] CVGetAllRequest request, CancellationToken cancellationToken)
        {
            var cv = dbContext.CV.AsQueryable();
            //var lokacije = dbContext.OglasLokacija.Include(lokacija => lokacija.Lokacija).AsQueryable();
            //var iskustva = dbContext.OglasIskustvo.Include(iskustvo => iskustvo.Iskustvo).AsQueryable();
            //var spaseni = dbContext.KandidatSpaseniOglasi.Include(spaseni => spaseni.Oglas).AsQueryable();

            if (!string.IsNullOrEmpty(request.KandidatId))
            {
                cv = cv.Where(cv => cv.KandidatId == request.KandidatId);
            }

            //if (request?.Lokacija?.Count > 0)
            //{
            //    oglasi = oglasi
            //            .Where(oglas => lokacije
            //                        .Where(l => l.OglasId == oglas.Id)
            //                        .Any(lokacija => request.Lokacija.Contains(lokacija.Lokacija.Naziv)) == true);
            //}

            //if (request?.Iskustvo?.Count() > 0)
            //{
            //    oglasi = oglasi
            //            .Where(oglas => iskustva
            //                        .Where(l => l.OglasId == oglas.Id)
            //                        .Any(iskustvo => request.Iskustvo.Contains(iskustvo.Iskustvo.Naziv)) == true);
            //}

            //if (request?.TipPosla?.Count() > 0)
            //{
            //    oglasi = oglasi
            //            .Where(oglas => request.TipPosla.Contains(oglas.TipPosla) == true);
            //}

            //if (request?.MinimumGodinaIskustva != null)
            //{

            //    oglasi = oglasi.Where(oglas => oglas.OpisOglas.MinimumGodinaIskustva <= request.MinimumGodinaIskustva);
            //}

            //if (request?.KompanijaId != null)
            //{

            //    oglasi = oglasi.Where(oglas => oglas.KompanijaId == request.KompanijaId);
            //}

            //if (request?.Otvoren != null)
            //{
            //    if (request?.Otvoren == true)
            //        oglasi = oglasi.Where(oglas => oglas.RokPrijave > DateTime.Now);

            //    else
            //        oglasi = oglasi.Where(oglas => oglas.RokPrijave < DateTime.Now);
            //}

            //if (request?.Spasen != null)
            //{
            //    oglasi = oglasi.Where(oglas => oglas.KandidatSpaseniOglasi.Any(spaseni => spaseni.KandidatId == request.KandidatId && spaseni.Spasen == true));
            //}

            //if (request?.Objavljen != null)
            //{
            //    oglasi = oglasi.Where(oglas => oglas.Objavljen == request.Objavljen);
            //}

            var lista = cv.Select(cv => new CVGetAllResponseCV
            {
                Id = cv.Id,
                Naziv = cv.Naziv,
                Objavljen = cv.Objavljen,
                Ime = cv.Ime,
                Prezime = cv.Prezime,
                Email = cv.Email,
                BrojTelefona = cv.BrojTelefona,
                Grad = cv.Grad,
                Drzava = cv.Drzava,
            }).ToList();

            //if (request?.SortParametri != null && request?.SortParametri.Count() > 0)
            //{
            //    foreach (var parametar in request.SortParametri)
            //    {
            //        if (!string.IsNullOrEmpty(parametar.Naziv))
            //        {
            //            if (parametar.Redoslijed == "asc")
            //                lista = HelperMethods.SortByProperty(lista, parametar.Naziv, true).ToList();

            //            else if (parametar.Redoslijed == "desc")
            //                lista = HelperMethods.SortByProperty(lista, parametar.Naziv, false).ToList();
            //        }
            //    }
            //}

            return new CVGetAllResponse { CV = lista };
        }
    }
}
