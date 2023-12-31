using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace JobSearchingWebApp.Migrations
{
    /// <inheritdoc />
    public partial class skriptaa : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Kandidati_Osobe_Id",
                table: "Kandidati");

            migrationBuilder.DropForeignKey(
                name: "FK_Kompanije_Osobe_Id",
                table: "Kompanije");

            migrationBuilder.DropForeignKey(
                name: "FK_Osobe_Jezici_JezikId",
                table: "Osobe");

            migrationBuilder.DropForeignKey(
                name: "FK_Osobe_Tema_TemaId",
                table: "Osobe");

            migrationBuilder.DropTable(
                name: "OsobaNotifikacije");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Osobe",
                table: "Osobe");

            migrationBuilder.RenameTable(
                name: "Osobe",
                newName: "Korisnici");

            migrationBuilder.RenameIndex(
                name: "IX_Osobe_TemaId",
                table: "Korisnici",
                newName: "IX_Korisnici_TemaId");

            migrationBuilder.RenameIndex(
                name: "IX_Osobe_JezikId",
                table: "Korisnici",
                newName: "IX_Korisnici_JezikId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Korisnici",
                table: "Korisnici",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "KorisnikNotifikacije",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    KorisnikId = table.Column<int>(type: "int", nullable: false),
                    NotifikacijaId = table.Column<int>(type: "int", nullable: false),
                    DatumPrimanja = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Pogledano = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KorisnikNotifikacije", x => x.Id);
                    table.ForeignKey(
                        name: "FK_KorisnikNotifikacije_Korisnici_KorisnikId",
                        column: x => x.KorisnikId,
                        principalTable: "Korisnici",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_KorisnikNotifikacije_Notifikacije_NotifikacijaId",
                        column: x => x.NotifikacijaId,
                        principalTable: "Notifikacije",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_KorisnikNotifikacije_KorisnikId",
                table: "KorisnikNotifikacije",
                column: "KorisnikId");

            migrationBuilder.CreateIndex(
                name: "IX_KorisnikNotifikacije_NotifikacijaId",
                table: "KorisnikNotifikacije",
                column: "NotifikacijaId");

            migrationBuilder.AddForeignKey(
                name: "FK_Kandidati_Korisnici_Id",
                table: "Kandidati",
                column: "Id",
                principalTable: "Korisnici",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Kompanije_Korisnici_Id",
                table: "Kompanije",
                column: "Id",
                principalTable: "Korisnici",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Korisnici_Jezici_JezikId",
                table: "Korisnici",
                column: "JezikId",
                principalTable: "Jezici",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Korisnici_Tema_TemaId",
                table: "Korisnici",
                column: "TemaId",
                principalTable: "Tema",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Kandidati_Korisnici_Id",
                table: "Kandidati");

            migrationBuilder.DropForeignKey(
                name: "FK_Kompanije_Korisnici_Id",
                table: "Kompanije");

            migrationBuilder.DropForeignKey(
                name: "FK_Korisnici_Jezici_JezikId",
                table: "Korisnici");

            migrationBuilder.DropForeignKey(
                name: "FK_Korisnici_Tema_TemaId",
                table: "Korisnici");

            migrationBuilder.DropTable(
                name: "KorisnikNotifikacije");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Korisnici",
                table: "Korisnici");

            migrationBuilder.RenameTable(
                name: "Korisnici",
                newName: "Osobe");

            migrationBuilder.RenameIndex(
                name: "IX_Korisnici_TemaId",
                table: "Osobe",
                newName: "IX_Osobe_TemaId");

            migrationBuilder.RenameIndex(
                name: "IX_Korisnici_JezikId",
                table: "Osobe",
                newName: "IX_Osobe_JezikId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Osobe",
                table: "Osobe",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "OsobaNotifikacije",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NotifikacijaId = table.Column<int>(type: "int", nullable: false),
                    OsobaId = table.Column<int>(type: "int", nullable: false),
                    DatumPrimanja = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Pogledano = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OsobaNotifikacije", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OsobaNotifikacije_Notifikacije_NotifikacijaId",
                        column: x => x.NotifikacijaId,
                        principalTable: "Notifikacije",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_OsobaNotifikacije_Osobe_OsobaId",
                        column: x => x.OsobaId,
                        principalTable: "Osobe",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_OsobaNotifikacije_NotifikacijaId",
                table: "OsobaNotifikacije",
                column: "NotifikacijaId");

            migrationBuilder.CreateIndex(
                name: "IX_OsobaNotifikacije_OsobaId",
                table: "OsobaNotifikacije",
                column: "OsobaId");

            migrationBuilder.AddForeignKey(
                name: "FK_Kandidati_Osobe_Id",
                table: "Kandidati",
                column: "Id",
                principalTable: "Osobe",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Kompanije_Osobe_Id",
                table: "Kompanije",
                column: "Id",
                principalTable: "Osobe",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Osobe_Jezici_JezikId",
                table: "Osobe",
                column: "JezikId",
                principalTable: "Jezici",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Osobe_Tema_TemaId",
                table: "Osobe",
                column: "TemaId",
                principalTable: "Tema",
                principalColumn: "Id");
        }
    }
}
