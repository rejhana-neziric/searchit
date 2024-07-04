namespace JobSearchingWebApp.Endpoints
{
    public class PagedResult <T>
    {
        public int? Count { get; set; }

        public List<T> ResultList { get; set; }
    }
}
