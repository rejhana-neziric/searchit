using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace JobSearchingWebApp.Migrations
{
    /// <inheritdoc />
    public partial class migracija1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Korisnici_Tema_TemaId",
                table: "Korisnici");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Tema",
                table: "Tema");

            migrationBuilder.RenameTable(
                name: "Tema",
                newName: "Teme");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Teme",
                table: "Teme",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "AutentifikacijaToken",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Vrijednost = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    KorisnikId = table.Column<int>(type: "int", nullable: false),
                    VrijemeEvidentiranja = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IPAdresa = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AutentifikacijaToken", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AutentifikacijaToken_Korisnici_KorisnikId",
                        column: x => x.KorisnikId,
                        principalTable: "Korisnici",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Recenzije",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Tekst = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    KorisnikId = table.Column<int>(type: "int", nullable: false),
                    BrojZvijezdica = table.Column<int>(type: "int", nullable: false),
                    DatumVrijemeRecenzije = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Pozicija = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Recenzije", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Recenzije_Korisnici_KorisnikId",
                        column: x => x.KorisnikId,
                        principalTable: "Korisnici",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_AutentifikacijaToken_KorisnikId",
                table: "AutentifikacijaToken",
                column: "KorisnikId");

            migrationBuilder.CreateIndex(
                name: "IX_Recenzije_KorisnikId",
                table: "Recenzije",
                column: "KorisnikId");

            migrationBuilder.AddForeignKey(
                name: "FK_Korisnici_Teme_TemaId",
                table: "Korisnici",
                column: "TemaId",
                principalTable: "Teme",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Korisnici_Teme_TemaId",
                table: "Korisnici");

            migrationBuilder.DropTable(
                name: "AutentifikacijaToken");

            migrationBuilder.DropTable(
                name: "Recenzije");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Teme",
                table: "Teme");

            migrationBuilder.RenameTable(
                name: "Teme",
                newName: "Tema");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Tema",
                table: "Tema",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Korisnici_Tema_TemaId",
                table: "Korisnici",
                column: "TemaId",
                principalTable: "Tema",
                principalColumn: "Id");
        }
    }
}
