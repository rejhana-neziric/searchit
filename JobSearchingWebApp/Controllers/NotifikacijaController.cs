using JobSearchingWebApp.Data;
using JobSearchingWebApp.Models;
using JobSearchingWebApp.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace JobSearchingWebApp.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class NotifikacijaController : ControllerBase
    {
        private readonly ApplicationDbContext dbContext;

        public NotifikacijaController(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet("{Id}")]
        public ActionResult Get(int id)
        {
            return Ok(dbContext.Notifikacije.FirstOrDefault(n => n.Id == id));
        }

        [HttpGet]
        public List<Notifikacija> GetAll()
        {
            var rezultat = dbContext.Notifikacije.AsQueryable();
            return rezultat.ToList();
        }

        [HttpPost]
        public ActionResult Snimi([FromBody] NotifikacijaSpremiVM n)
        {
            Notifikacija? notifikacija;

            if (n.id == 0)
            {
                notifikacija = new Notifikacija();
                dbContext.Add(notifikacija);
            }
            else
            {
                notifikacija = dbContext.Notifikacije.FirstOrDefault(x => x.Id == n.id);
                if (notifikacija == null)
                    return BadRequest("Pogresan id");
            }

            notifikacija.Naziv = n.naziv;
            notifikacija.Vrsta = n.vrsta;

            dbContext.SaveChanges();
            return Ok(notifikacija);
        }

        [HttpPut]
        public ActionResult Update([FromBody] NotifikacijaSpremiVM n)
        {
            var notifikacija = dbContext.Notifikacije.Where(x => x.Id == n.id).FirstOrDefault();

            if (notifikacija == null)
                return new NotFoundResult();

            notifikacija.Naziv = n.naziv;
            notifikacija.Vrsta = n.vrsta;

            dbContext.SaveChanges();
            return Ok(notifikacija);
        }

        [HttpDelete("{Id}")]
        public ActionResult Delete(int id)
        {
            Notifikacija? notifikacija = dbContext.Notifikacije.Find(id);

            if (notifikacija == null || id == 1)
                return BadRequest("Pogresan id!");

            dbContext.Remove(notifikacija);

            dbContext.SaveChanges();
            return Ok(notifikacija);
        }
    }
}
