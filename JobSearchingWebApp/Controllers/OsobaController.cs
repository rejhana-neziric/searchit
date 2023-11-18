using JobSearchingWebApp.Data;
using JobSearchingWebApp.Models;
using JobSearchingWebApp.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace JobSearchingWebApp.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class OsobaController : Controller
    {
        private readonly ApplicationDbContext dbContext;

        public OsobaController(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public ActionResult Get(int id)
        {
            return Ok(dbContext.Osobe.FirstOrDefault(x=>x.Id==id));
        }

        [HttpPost]
        public ActionResult Spremi([FromBody] OsobaSpremiVM osoba)
        {
            Osoba? o;
            if(osoba.id == 0)
            {
                o = new Osoba();
                dbContext.Add(o);
            }
            else
            {
                o = dbContext.Osobe.Include(x => x.Jezik.Naziv).Include(y => y.Tema.Vrsta)
                    .FirstOrDefault(z => z.Id == osoba.id);
                if (o == null)
                    return BadRequest("pogresan id");
            }
            o.Id = osoba.id;
            o.Email = osoba.email;
            o.Username = osoba.username;
            o.Password = osoba.password;
            o.JezikId = osoba.jezik_id;
            o.TemaId = osoba.tema_id;

            dbContext.SaveChanges();
            return Ok();
        }

        [HttpPut]
        public ActionResult Update([FromBody] OsobaUpdateRequest podaci)
        {
            var osoba = dbContext.Osobe.Where(x => x.Id == podaci.id).FirstOrDefault();
            if (osoba == null)
                return new NotFoundResult();

            osoba.Id = podaci.id;
            osoba.Email = podaci.email;
            osoba.Username = podaci.username;
            osoba.Password = podaci.password;
            osoba.JezikId = podaci.jezik_id;
            osoba.TemaId = podaci.tema_id;
            dbContext.SaveChanges();
            return Ok(osoba);
        }

        [HttpDelete]
        public ActionResult Delete(int id)
        {
            var osoba = dbContext.Osobe.Where(x => x.Id == id).FirstOrDefault();
            if (osoba == null)
                return new NotFoundResult();

            dbContext.Osobe.Remove(osoba);
            dbContext.SaveChanges();
            return Ok();
        }
    }
}
