namespace JobSearchingWebApp.Endpoints.OpisKompanije.Update
{
    public class OpisKompanijeUpdateRequest
    {
        public int opis_kompanije_id { get; set; }

        public string opis_poslovanja { get; set; }

        public int broj_otvorenih_pozicija { get; set; }

        public int broj_zaposlenika { get; set; }
    }
}
