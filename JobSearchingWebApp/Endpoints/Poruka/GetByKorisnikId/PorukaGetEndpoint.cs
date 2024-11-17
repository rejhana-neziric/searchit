using JobSearchingWebApp.Helper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using JobSearchingWebApp.Data;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using JobSearchingWebApp.Migrations;

namespace JobSearchingWebApp.Endpoints.Poruka.GetByKorisnikId
{
    [AllowAnonymous]
    [Route("poruka-get")]
    [Tags("Poruka")]
    public class PorukaGetEndpoint : MyBaseEndpoint<string, PorukaGetResponse>
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public PorukaGetEndpoint(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }
        [HttpGet("{id}")]
        public override async Task<PorukaGetResponse> MyAction(string id, CancellationToken cancellationToken)
        {
            var messagesDb = await _applicationDbContext.PorukeKorisnici
                .Where(x=> x.KorisnikId == id)
                .ToListAsync();
            //var messagesDb = await _applicationDbContext.Poruke
            //    .Where(x => x.Ko == id)
            //    .ToListAsync(cancellationToken);

            //var messages = _applicationDbContext.PorukeKorisnici
            //.Include(pk => pk.Poruka) // Include Poruka for IsSeen, Sadrzaj, VrijemeSlanja
            //.Include(pk => pk.Korisnik) // Include Korisnik for UserName
            //.Where(pk => messagesDb.Select(m => m.PorukaId).Contains(pk.PorukaId)) // Filter relevant PorukaId
            //.AsEnumerable() // Process remaining logic in memory
            //.GroupBy(pk => pk.PorukaId) // Group by PorukaId for easier mapping
            //.Select(group => {
            //    var primaryMessage = group.First();
            //    return new PorukaGetResponsePoruka
            //    {
            //        id = primaryMessage.Poruka.Id,
            //        korisnik_id = primaryMessage.KorisnikId,
            //        is_primljena = primaryMessage.isPrimljena,
            //        poruka_id = primaryMessage.PorukaId,
            //        ime_posiljatelja = group.FirstOrDefault(pk => !pk.isPrimljena)?.Korisnik?.UserName ?? "", // Sender's UserName
            //        is_seen = primaryMessage.Poruka.IsSeen,
            //        sadrzaj = primaryMessage.Poruka.Sadrzaj ?? "",
            //        vrijeme_slanja = primaryMessage.Poruka.VrijemeSlanja
            //    };
            //}).ToList();

            var messages = messagesDb.Select(message => new PorukaGetResponsePoruka()
            {
                id = message.Id,
                korisnik_id = message.KorisnikId,
                is_primljena = message.isPrimljena,
                poruka_id = message.PorukaId,
                ime_posiljatelja = _applicationDbContext.PorukeKorisnici
                .Where(pk => pk.PorukaId == message.PorukaId)
                .Include(k => k.Korisnik)
                .Select(pk => pk.Posiljalac.UserName)
                .FirstOrDefault() ?? "NoName",
                is_seen = _applicationDbContext.PorukeKorisnici
                 .Where(pk => pk.PorukaId == message.PorukaId)
                 .Include(p => p.Poruka)
                 .Select(pk => pk.Poruka.IsSeen)
                 .FirstOrDefault(),
                sadrzaj = _applicationDbContext.PorukeKorisnici
                 .Where(pk => pk.PorukaId == message.PorukaId)
                 .Include(p => p.Poruka)
                 .Select(p => p.Poruka.Sadrzaj)
                 .FirstOrDefault() ?? "",
                vrijeme_slanja = _applicationDbContext.PorukeKorisnici
                 .Where(pk => pk.PorukaId == message.PorukaId)
                 .Include(p => p.Poruka)
                 .Select(p => p.Poruka.VrijemeSlanja)
                 .FirstOrDefault()
            }).ToList();
            //var messages = messagesDb.Select(message => new PorukaGetResponsePoruka
            //{
            //    id = message.Id,
            //    korisnik_id = message.KorisnikId,
            //    sadrzaj = message.Sadrzaj,
            //    vrijeme_slanja = message.VrijemeSlanja,
            //    posiljalac_id = message.PosiljalacId
            //}).ToList();

            var response = new PorukaGetResponse()
            {
                Poruke = messages
            };
            //var response = new PorukaGetResponse
            //{
            //    Poruke = messages
            //};

            return response;
        }
    }
}
