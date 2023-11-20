using JobSearchingWebApp.Data;
using JobSearchingWebApp.Models;
using Microsoft.AspNetCore.Mvc;

namespace JobSearchingWebApp.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class PodaciController
    {
        private readonly ApplicationDbContext dbContext;

        public PodaciController(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpPost]
        public string Generisi ()
        {
            var jezici = new List<Jezik>();
            var teme = new List<Tema>();
            var kompanije = new List<Kompanija>(); 

            jezici.Add(new Jezik { Naziv = "bosanksi" });
            jezici.Add(new Jezik { Naziv = "engleski" });

            teme.Add(new Tema { Vrsta = "tema1" });
            teme.Add(new Tema { Vrsta = "tema2" });

            dbContext.AddRange(teme);
            dbContext.AddRange(jezici); 
            dbContext.SaveChanges();

            return "dodano"; 
        }
    }
}
