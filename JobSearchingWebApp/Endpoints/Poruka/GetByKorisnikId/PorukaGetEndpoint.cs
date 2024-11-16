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
            var messagesDb = await _applicationDbContext.Poruke
                .Where(x => x.KorisnikId == id)
                .ToListAsync(cancellationToken);

            var messages = messagesDb.Select(message => new PorukaGetResponsePoruka
            {
                id = message.Id,
                korisnik_id = message.KorisnikId,
                sadrzaj = message.Sadrzaj,
                vrijeme_slanja = message.VrijemeSlanja
            }).ToList();

            var response = new PorukaGetResponse
            {
                Poruke = messages
            };

            return response;
        }
    }
}
