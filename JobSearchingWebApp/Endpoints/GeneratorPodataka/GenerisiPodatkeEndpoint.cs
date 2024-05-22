using JobSearchingWebApp.Data;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;

namespace JobSearchingWebApp.Endpoints.GeneratorPodataka
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class GenerisiPodatkeEndpoint : ControllerBase
    {
        private readonly ApplicationDbContext dbContext;

        public GenerisiPodatkeEndpoint(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpPost]
        public ActionResult Generisi()
        {
            var jezici = new List<Models.Jezik>
            {
                new Models.Jezik { Naziv = "Bosanski jezik" },
                new Models.Jezik { Naziv = "Engleski jezik" },
                new Models.Jezik { Naziv = "Arapski jezik" }
            };

            var teme = new List<Models.Tema>
            {
                new Models.Tema { Vrsta = "tema1" },
                new Models.Tema { Vrsta = "tema2" }
            };

            // Insert Jezici and Teme first to ensure they exist before referencing them
            dbContext.AddRange(jezici);
            dbContext.AddRange(teme);
            dbContext.SaveChanges();

            // Retrieve the inserted entities to get their IDs
            var bosanskiJezik = dbContext.Jezici.FirstOrDefault(j => j.Naziv == "Bosanski jezik");
            var engleskiJezik = dbContext.Jezici.FirstOrDefault(j => j.Naziv == "Engleski jezik");
            var arapskiJezik = dbContext.Jezici.FirstOrDefault(j => j.Naziv == "Arapski jezik");
            var tema1 = dbContext.Teme.FirstOrDefault(t => t.Vrsta == "tema1");
            var tema2 = dbContext.Teme.FirstOrDefault(t => t.Vrsta == "tema2");

            if (bosanskiJezik == null || engleskiJezik == null || arapskiJezik == null || tema1 == null || tema2 == null)
            {
                return StatusCode(500, "Error retrieving inserted reference data.");
            }

            var kompanije = new List<Models.Kompanija>
            {
                new Models.Kompanija { Naziv = "ByteMatrix Solutions", GodinaOsnivanja = 2012, Lokacija="Sarajevo", Slika = "slika...", Email = "ByteMatrix.Solutions@gmail.com", Username = "bytematrix", Password = "bytematrix", TemaId = tema1.Id, JezikId = bosanskiJezik.Id},
                new Models.Kompanija { Naziv = "TechVista Dynamics", GodinaOsnivanja = 2016, Lokacija = "Mostar", Slika = "slika...", Email = "TechVista Dynamics@gmail.com", Username = "techvista", Password = "techvista", TemaId = tema1.Id, JezikId = engleskiJezik.Id },
                new Models.Kompanija { Naziv = "CloudMesh", GodinaOsnivanja = 2010, Lokacija = "Jablanica", Slika = "slika...", Email = "CloudMesh@gmail.com", Username = "cloudmesh", Password = "cloudmesh", TemaId = tema1.Id, JezikId = arapskiJezik.Id },
                new Models.Kompanija { Naziv = "Insightify", GodinaOsnivanja = 2021, Lokacija = "Tuzla", Slika = "slika...", Email = "Insightify@gmail.com", Username = "insightify", Password = "insightify", TemaId = tema2.Id, JezikId = bosanskiJezik.Id }
            };

            dbContext.AddRange(kompanije);
            dbContext.SaveChanges();

            var oglasi = new List<Models.Oglas>
            {
                new Models.Oglas { NazivPozicije = "Software Engineer", Lokacija = "Remote", DatumObjave = DateTime.Now, Plata = 2000, TipPosla = "Full Time", RokPrijave = DateTime.MaxValue, Iskustvo = "Junior", OpisPosla = "opis.....", KompanijaId = kompanije[0].Id },
                new Models.Oglas { NazivPozicije = "DevOps Engineer", Lokacija = "Jablanica", DatumObjave = DateTime.Now, Plata = 3400, TipPosla = "Full Time", RokPrijave = DateTime.MaxValue, Iskustvo = "Senior", OpisPosla = "opis.....", KompanijaId = kompanije[1].Id },
                new Models.Oglas { NazivPozicije = "QA Engineer", Lokacija = "Remote", DatumObjave = DateTime.Now, Plata = 2500, TipPosla = "Full Time", RokPrijave = DateTime.MaxValue, Iskustvo = "Medior", OpisPosla = "opis.....", KompanijaId = kompanije[2].Id },
                new Models.Oglas { NazivPozicije = "Software Engineer", Lokacija = "Remote", DatumObjave = DateTime.Now, Plata = 2300, TipPosla = "Full Time", RokPrijave = DateTime.MaxValue, Iskustvo = "Junior", OpisPosla = "opis.....", KompanijaId = kompanije[3].Id },
                new Models.Oglas { NazivPozicije = "ML Engineer", Lokacija = "Remote", DatumObjave = DateTime.Now, Plata = 4000, TipPosla = "Full Time", RokPrijave = DateTime.MaxValue, Iskustvo = "Senior", OpisPosla = "opis.....", KompanijaId = kompanije[0].Id },
                new Models.Oglas { NazivPozicije = "UI/UX Designer", Lokacija = "Mostar", DatumObjave = DateTime.Now, Plata = 1000, TipPosla = "Part Time", RokPrijave = DateTime.MaxValue, Iskustvo = "Junior", OpisPosla = "opis.....", KompanijaId = kompanije[1].Id },
                new Models.Oglas { NazivPozicije = "Backend Developer", Lokacija = "Remote", DatumObjave = DateTime.Now, Plata = 2600, TipPosla = "Full Time", RokPrijave = DateTime.MaxValue, Iskustvo = "Junior", OpisPosla = "opis.....", KompanijaId = kompanije[2].Id },
                new Models.Oglas { NazivPozicije = "Frontend Developer", Lokacija = "Tuzla", DatumObjave = DateTime.Now, Plata = 2300, TipPosla = "Full Time", RokPrijave = DateTime.MaxValue, Iskustvo = "Junior", OpisPosla = "opis.....", KompanijaId = kompanije[3].Id },
                new Models.Oglas { NazivPozicije = "Graphical Designer", Lokacija = "Remote", DatumObjave = DateTime.Now, Plata = 1800, TipPosla = "Part Time", RokPrijave = DateTime.MaxValue, Iskustvo = "Medior", OpisPosla = "opis.....", KompanijaId = kompanije[0].Id }
            };

             dbContext.AddRange(oglasi);
             dbContext.SaveChanges();

            return Ok();
        }
    }
}
