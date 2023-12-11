namespace JobSearchingWebApp.Endpoints.Oglas.Update
{
    public class OglasUpdateRequest
    {
        public int oglas_id { get; set; }
        public string naziv_pozicije { get; set; }
        public string lokacija { get; set; }
        public double plata { get; set; }
        public string tip_posla { get; set; }
        public DateTime rok_prijave { get; set; }
        public string iskustvo { get; set; }
        public string opis_posla { get; set; }
    }
}
