using JobSearchingWebApp.Data;
using JobSearchingWebApp.Helper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace JobSearchingWebApp.Endpoints.Poruka.GetChat
{
    [Route("chat")]
    [AllowAnonymous]
    public class PorukaGetChatEndpoint : MyBaseEndpoint<PorukaGetChatRequest, PorukaGetChatResponse>
    {
        private readonly Data.ApplicationDbContext _context;
        public PorukaGetChatEndpoint(Data.ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public override async Task<PorukaGetChatResponse> MyAction( [FromQuery]PorukaGetChatRequest request, CancellationToken cancellationToken)
        {
            var porukeKorisnici = _context.PorukeKorisnici.Include(p => p.Poruka)
                .Include(p => p.Posiljalac)
                .Include(k => k.Korisnik)
                .Where(x => (x.PosiljalacId == request.korisnik1_id && x.KorisnikId == request.korisnik2_id) 
                || (x.PosiljalacId == request.korisnik2_id && x.KorisnikId == request.korisnik1_id))
                .ToList();

            var responsePoruke = porukeKorisnici.Select(message => new PorukaGetChatResponsePoruka()
            {
                id = message.Id,
                posiljatelj_id = message.PosiljalacId,
                posiljatelj_ime = message.Posiljalac.UserName ?? "",
                primatelj_id = message.KorisnikId,
                primatelj_ime = message.Korisnik.UserName ?? "",
                is_seen = _context.Poruke.Where(x => x.Id == message.PorukaId).First().IsSeen,
                sadrzaj = _context.Poruke.Where(x => x.Id == message.PorukaId).FirstOrDefault().Sadrzaj ?? "",
                vrijeme_slanja = _context.Poruke.Where(x => x.Id == message.PorukaId).FirstOrDefault().VrijemeSlanja
            }).OrderBy(c => c.vrijeme_slanja).ToList();

            var totalMessages = responsePoruke.Count;
            var totalUnseenMessages = responsePoruke.Count(p => !p.is_seen);

            return new PorukaGetChatResponse ()
            {
                poruke = responsePoruke,
                broj_neprocitanih = totalUnseenMessages,
                total_poruka = totalMessages
            };
        }
    }
}
