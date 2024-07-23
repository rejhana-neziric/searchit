using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace JobSearchingWebApp.Migrations
{
    /// <inheritdoc />
    public partial class migracija13 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Korisnici_Jezici_JezikId",
                table: "Korisnici");

            migrationBuilder.DropForeignKey(
                name: "FK_Korisnici_Teme_TemaId",
                table: "Korisnici");

            migrationBuilder.DropIndex(
                name: "IX_Korisnici_JezikId",
                table: "Korisnici");

            migrationBuilder.DropIndex(
                name: "IX_Korisnici_TemaId",
                table: "Korisnici");

            migrationBuilder.DropColumn(
                name: "JezikId",
                table: "Korisnici");

            migrationBuilder.DropColumn(
                name: "TemaId",
                table: "Korisnici");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "JezikId",
                table: "Korisnici",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "TemaId",
                table: "Korisnici",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Korisnici_JezikId",
                table: "Korisnici",
                column: "JezikId");

            migrationBuilder.CreateIndex(
                name: "IX_Korisnici_TemaId",
                table: "Korisnici",
                column: "TemaId");

            migrationBuilder.AddForeignKey(
                name: "FK_Korisnici_Jezici_JezikId",
                table: "Korisnici",
                column: "JezikId",
                principalTable: "Jezici",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Korisnici_Teme_TemaId",
                table: "Korisnici",
                column: "TemaId",
                principalTable: "Teme",
                principalColumn: "Id");
        }
    }
}
