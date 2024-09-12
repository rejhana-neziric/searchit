using JobSearchingWebApp.Data;
using JobSearchingWebApp.Endpoints.Oglas.GetAll;
using JobSearchingWebApp.Helper;
using JobSearchingWebApp.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace JobSearchingWebApp.Endpoints.KandidatOglas.GetAll
{
    [Tags("Kandidat-Oglas")]
    [Route("kandidat-oglas-get")]
    public class KandidatOglasGetAllEndpoint : MyBaseEndpoint<KandidatOglasGetAllRequest, KandidatOglasGetAllResponse>
    {
        private readonly ApplicationDbContext dbContext;
        private readonly UserManager<Models.Korisnik> userManager;

        public KandidatOglasGetAllEndpoint(ApplicationDbContext dbContext, UserManager<Korisnik> userManager)
        {
            this.dbContext = dbContext;
            this.userManager = userManager;

        }


        [HttpGet]
        public override async Task<KandidatOglasGetAllResponse> MyAction([FromQuery] KandidatOglasGetAllRequest request, CancellationToken cancellationToken)
        {

            var userId = userManager.GetUserId(User);
            var user = await userManager.FindByIdAsync(userId);

            var kandidatOglasi = dbContext.KandidatiOglasi.Include(x => x.CV)
                                                            .ThenInclude(x => x.Kandidat)
                                                          .Include(x => x.Oglas)
                                                            .ThenInclude(x => x.Kompanija)
                                                          .AsQueryable();


            if (!string.IsNullOrEmpty(request.KandidatId))
            {
                kandidatOglasi = kandidatOglasi.Where(x => x.KandidatId == request.KandidatId);
            }

            if (!string.IsNullOrEmpty(request.KompanijaId))
            {
                kandidatOglasi = kandidatOglasi.Where(x => x.Oglas.KompanijaId == request.KompanijaId);
            }


            if (!string.IsNullOrEmpty(request.PretragaNaziv))
            {
                if(user.UlogaId == 3)
                {
                    kandidatOglasi = kandidatOglasi.Where(x => x.Kandidat.Ime.ToLower().Contains(request.PretragaNaziv.ToLower())
                                            || x.Kandidat.Prezime.ToLower().Contains(request.PretragaNaziv.ToLower())
                                            || x.Kandidat.Zvanje.ToLower().Contains(request.PretragaNaziv.ToLower()));
                }

                if(user.UlogaId == 2)
                {
                    kandidatOglasi = kandidatOglasi.Where(x => x.Oglas.NazivPozicije.ToLower().Contains(request.PretragaNaziv.ToLower())
                                           || x.Oglas.Kompanija.Naziv.ToLower().Contains(request.PretragaNaziv.ToLower()));
                }
            }

            if(request.Spasen != null) 
            {
                kandidatOglasi = kandidatOglasi.Where(x => x.Spasen == request.Spasen);
            }

            if(request.Status != null)
            {
                kandidatOglasi = kandidatOglasi.Where(x => x.Status == request.Status);
            }

            if (request.Otvoren != null)
            {
                if(request.Otvoren == true)
                    kandidatOglasi = kandidatOglasi.Where(x => x.Oglas.RokPrijave > DateTime.Now);


                else
                    kandidatOglasi = kandidatOglasi.Where(x => x.Oglas.RokPrijave < DateTime.Now);

            }

            var lista = kandidatOglasi.Select(oglas => new KandidatOglasGetAllResponseKandidatOglas
            {
                Id = oglas.Id,
                OglasId = oglas.OglasId,
                NazivKompanije = oglas.Oglas.Kompanija.Naziv,
                NazivPozicije = oglas.Oglas.NazivPozicije,
                Otvoren = oglas.Oglas.Otvoren, 
                RokPrijave = oglas.Oglas.RokPrijave, 
                KandidatId = oglas.KandidatId,
                Ime = oglas.CV.Kandidat.Ime,
                Prezime = oglas.CV.Kandidat.Prezime,
                Zvanje = oglas.CV.Kandidat.Zvanje,
                CVId = oglas.CVId,
                CVNaziv = oglas.CV.Naziv,
                DatumPrijave = oglas.DatumPrijave,  
                Status = oglas.Status,  
                Spasen = oglas.Spasen
            }).ToList();


            return new KandidatOglasGetAllResponse { KandidatOglasi = lista };
        }
    }
}

