using JobSearchingWebApp.Data;
using JobSearchingWebApp.Models;
using JobSearchingWebApp.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace JobSearchingWebApp.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class OglasController : ControllerBase
    {
        private readonly ApplicationDbContext dbContext;

        public OglasController(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public ActionResult GetById(int id)
        {
            return Ok(dbContext.Oglasi.FirstOrDefault(o=> o.Id == id));
        }

        [HttpGet]
        public List<Oglas> GetAll()
        {
            var rezultat = dbContext.Oglasi.AsQueryable();
            return rezultat.ToList();
        }

        [HttpPost]
        public ActionResult Snimi([FromBody] OglasSpremiVM o)
        {
            Oglas? oglas;

            if (o.id == 0)
            {
                oglas = new Oglas();
                dbContext.Add(oglas);
            }
            else
            {
                oglas = dbContext.Oglasi.FirstOrDefault(x => x.Id == o.id);
                if (oglas == null)
                    return BadRequest("Pogresan id");
            }

            oglas.KompanijaId = o.kompanija_id; 
            oglas.NazivPozicije = o.naziv_pozicije;
            oglas.Lokacija = o.lokacija;
            oglas.Plata = o.plata;
            oglas.TipPosla = o.tip_posla;
            oglas.RokPrijave = o.rok_prijave;
            oglas.Iskustvo = o.iskustvo;
            oglas.OpisPosla = o.opis_posla;
            oglas.DatumModificiranja = o.datum_modificiranja; 

            dbContext.SaveChanges();
            return Ok(oglas);
        }

        [HttpPut]
        public ActionResult Update([FromBody] OglasSpremiVM o)
        {
            var oglas = dbContext.Oglasi.Where(x => x.Id == o.id).FirstOrDefault();

            if (oglas == null)
                return new NotFoundResult();

            oglas.KompanijaId = o.kompanija_id;
            oglas.NazivPozicije = o.naziv_pozicije;
            oglas.Lokacija = o.lokacija;
            oglas.Plata = o.plata;
            oglas.TipPosla = o.tip_posla;
            oglas.RokPrijave = o.rok_prijave;
            oglas.Iskustvo = o.iskustvo;
            oglas.OpisPosla = o.opis_posla;
            oglas.DatumModificiranja = o.datum_modificiranja;

            dbContext.SaveChanges();
            return Ok(oglas);
        }

        [HttpDelete]
        public ActionResult Delete(int id)
        {
            Oglas? oglas = dbContext.Oglasi.Find(id);

            if (oglas == null || id == 0)
                return BadRequest("Pogresan id!");

            dbContext.Remove(oglas);

            dbContext.SaveChanges();
            return Ok(oglas);
        }
    }
}
