using JobSearchingWebApp.Data;
using JobSearchingWebApp.Helper;
using JobSearchingWebApp.Models;
using JobSearchingWebApp.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace JobSearchingWebApp.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class CVController : ControllerBase
    {
        private readonly ApplicationDbContext dbContext;

        public CVController(ApplicationDbContext dbContext)
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
        public ActionResult Snimi([FromBody] CVSpremiVM c)
        {
            CV? cv;

            if (c.id == 0)
            {
                cv = new CV();
                dbContext.Add(cv);

                cv.Slika = Config.SlikeURL + "empty.png"; 
            }
            else
            {
                cv = dbContext.CV.FirstOrDefault(x => x.Id == c.id);
                if (cv == null)
                    return BadRequest("Pogresan id");
            }

            cv.Ime = c.ime;
            cv.Prezime = c.prezime;
            cv.Email = c.email;
            cv.BrojTelefona = c.broj_telefona; 
            cv.OpisProfila = c.opis_profila; 

            dbContext.SaveChanges();
            return Ok(cv);
        }

        [HttpPut]
        public ActionResult Update([FromBody] CVUpdate c)
        {
            var cv = dbContext.CV.Where(x => x.Id == c.id).FirstOrDefault();

            if (cv == null)
                return new NotFoundResult();

            cv.Ime = c.ime;
            cv.Prezime = c.prezime;
            cv.Email = c.email;
            cv.BrojTelefona = c.broj_telefona;
            cv.OpisProfila = c.opis_profila;
            cv.Slika = c.slika; 

            dbContext.SaveChanges();
            return Ok(cv);
        }

        [HttpDelete("{Id}")]
        public ActionResult Delete(int id)
        {
            CV? cv = dbContext.CV.Find(id);

            if (cv == null || id == 1)
                return BadRequest("Pogresan id!");

            dbContext.Remove(cv);

            dbContext.SaveChanges();
            return Ok(cv);
        }

        [HttpPost("{Id}")]  
        public ActionResult AddCVImage (int id, [FromForm] CVImageAddVM x)
        {
            CV? cv = dbContext.CV.FirstOrDefault(c => c.Id == id);

            if (cv == null) 
                return BadRequest("Pogresan id!");

            string ekstenzija = Path.GetExtension(x.slika.FileName); 

            var filename = $"{Guid.NewGuid()}{ekstenzija}";

            x.slika.CopyTo(new FileStream(Config.SlikeFolder + filename, FileMode.Create));
            cv.Slika = Config.SlikeURL + filename;

            dbContext.SaveChanges(); 
            return Ok(cv);  
        }
    }
}
