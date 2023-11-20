using JobSearchingWebApp.Data;
using JobSearchingWebApp.Models;
using JobSearchingWebApp.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;

namespace JobSearchingWebApp.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class KompanijaController : Controller
    {
        private readonly ApplicationDbContext dbContext;

        public KompanijaController(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public ActionResult Get(int id)
        {
            return Ok(dbContext.Kompanije.FirstOrDefault(k =>k.Id ==id));
        }

    
        [HttpPost]
        public ActionResult Spremi([FromBody] KompanijaSpremiVM k)
        {
            Kompanija? kompanija;
            if(k.id==0)
            {
                kompanija = new Kompanija(); 
                dbContext.Add(kompanija);
               
            }
            else
            {
                kompanija = dbContext.Kompanije.FirstOrDefault(x => x.Id == k.id);
                if (kompanija == null)
                    return BadRequest("neispravan id");
            }

            kompanija.Id = k.id;
            kompanija.Slika = null;
            kompanija.Lokacija = k.lokacija;
            kompanija.GodinaOsnivanja = k.godina_osnivanja;
            kompanija.Naziv = k.naziv;

            dbContext.SaveChanges();
            return Ok();
        }

        [HttpPut]
        public ActionResult Update([FromBody] KompanijaUpdateVM k)
        {
            var kompanija = dbContext.Kompanije.Where(x => x.Id == k.id).FirstOrDefault();
            if (kompanija == null)
                return new NotFoundResult();

            kompanija.Id = k.id;
            kompanija.Slika = k.slika;
            kompanija.Lokacija = k.lokacija;
            kompanija.GodinaOsnivanja = k.godina_osnivanja;
            kompanija.Naziv = k.naziv;
            return Ok(kompanija);
        }

        [HttpDelete]
        public ActionResult Delete(int id)
        {
            var kompanija = dbContext.Kompanije.Where(x => x.Id == id).FirstOrDefault();
            if (kompanija == null)
                return new NotFoundResult();

            dbContext.Kompanije.Remove(kompanija);
            dbContext.SaveChanges();
            return Ok();
        }
    }

}
