using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace JobSearchingWebApp.Migrations
{
    /// <inheritdoc />
    public partial class migracijaa1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Iskustvo",
                table: "Oglasi");

            migrationBuilder.DropColumn(
                name: "Lokacija",
                table: "Oglasi");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Iskustvo",
                table: "Oglasi",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Lokacija",
                table: "Oglasi",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
