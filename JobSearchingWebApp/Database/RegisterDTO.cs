using System.ComponentModel.DataAnnotations;

namespace JobSearchingWebApp.Database.DTOs
{
    //za brisanje
    public class RegisterDTO
    {
        [Required]
        public string Email { get; set; }

        [Required]
        public string Username { get; set; }

        [Required]
        [MinLength(6)]
        public string Password { get; set; }

        [Required]
        public int TemaId { get; set; }

        [Required]
        public int JezikId { get; set; }

        [Required]
        public bool IsKandidat { get; set; }

        [Required]
        public bool IsKompanija { get; set; }
    }
}
