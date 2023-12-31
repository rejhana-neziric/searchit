using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace JobSearchingWebApp.Migrations
{
    /// <inheritdoc />
    public partial class zripta3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "isKandidat",
                table: "Korisnici",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "isKompanija",
                table: "Korisnici",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "isKandidat",
                table: "Korisnici");

            migrationBuilder.DropColumn(
                name: "isKompanija",
                table: "Korisnici");
        }
    }
}
