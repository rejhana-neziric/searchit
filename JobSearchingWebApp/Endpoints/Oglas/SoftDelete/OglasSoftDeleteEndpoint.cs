using JobSearchingWebApp.Data;
using JobSearchingWebApp.Endpoints.Oglas.Delete;
using JobSearchingWebApp.Helper;
using Microsoft.AspNetCore.Mvc;

namespace JobSearchingWebApp.Endpoints.Oglas.SoftDelete
{
    [Tags("Oglas")]
    [Route("oglas-soft-delete")]
    public class OglasSoftDeleteEndpoint:MyBaseEndpoint<OglasSoftDeleteRequest, OglasSoftDeleteResponse>
    {
        private readonly ApplicationDbContext dbContext;

        public OglasSoftDeleteEndpoint(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpPut]
        public override async Task<OglasSoftDeleteResponse> MyAction([FromQuery] OglasSoftDeleteRequest request, CancellationToken cancellationToken)
        {
            var oglas = dbContext.Oglasi.FirstOrDefault(x => x.Id == request.oglas_id);
            Console.WriteLine(request.oglas_id);
            if (oglas == null)
            {
                return new OglasSoftDeleteResponse
                {
                    Success = false,
                    Message = "Oglas not found with ID " + request.oglas_id
                };
            }

            // Mark the record as deleted
            oglas.IsObrisan = true;
            dbContext.Oglasi.Update(oglas);
            await dbContext.SaveChangesAsync(cancellationToken);

            return new OglasSoftDeleteResponse
            {
                Success = true,
                Message = "Oglas soft-deleted successfully"
            };
        }
    }
}
