using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace JobSearchingWebApp.Migrations
{
    public partial class skripta : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_KandidatiOglasi_Kandidati_KandidatId",
                table: "KandidatiOglasi");

            migrationBuilder.DropForeignKey(
                name: "FK_KandidatiOglasi_Oglasi_OglasId",
                table: "KandidatiOglasi");

            migrationBuilder.DropForeignKey(
                name: "FK_KompanijeKandidati_Kandidati_KandidatId",
                table: "KompanijeKandidati");

            migrationBuilder.DropForeignKey(
                name: "FK_KompanijeKandidati_Kompanije_KompanijaId",
                table: "KompanijeKandidati");

            migrationBuilder.DropForeignKey(
                name: "FK_Oglasi_Kompanije_KompanijaId",
                table: "Oglasi");

            migrationBuilder.DropForeignKey(
                name: "FK_OsobaNotifikacije_Notifikacije_NotifikacijaId",
                table: "OsobaNotifikacije");

            migrationBuilder.DropForeignKey(
                name: "FK_OsobaNotifikacije_Osobe_OsobaId",
                table: "OsobaNotifikacije");

            migrationBuilder.DropForeignKey(
                name: "FK_Osobe_Jezik_JezikId",
                table: "Osobe");

            migrationBuilder.DropForeignKey(
                name: "FK_Osobe_Tema_TemaId",
                table: "Osobe");

            migrationBuilder.DropForeignKey(
                name: "FK_RadnoIskustvo_CV_CVId",
                table: "RadnoIskustvo");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Jezik",
                table: "Jezik");

            migrationBuilder.RenameTable(
                name: "Jezik",
                newName: "Jezici");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Jezici",
                table: "Jezici",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_KandidatiOglasi_Kandidati_KandidatId",
                table: "KandidatiOglasi",
                column: "KandidatId",
                principalTable: "Kandidati",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_KandidatiOglasi_Oglasi_OglasId",
                table: "KandidatiOglasi",
                column: "OglasId",
                principalTable: "Oglasi",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_KompanijeKandidati_Kandidati_KandidatId",
                table: "KompanijeKandidati",
                column: "KandidatId",
                principalTable: "Kandidati",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_KompanijeKandidati_Kompanije_KompanijaId",
                table: "KompanijeKandidati",
                column: "KompanijaId",
                principalTable: "Kompanije",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Oglasi_Kompanije_KompanijaId",
                table: "Oglasi",
                column: "KompanijaId",
                principalTable: "Kompanije",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_OsobaNotifikacije_Notifikacije_NotifikacijaId",
                table: "OsobaNotifikacije",
                column: "NotifikacijaId",
                principalTable: "Notifikacije",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_OsobaNotifikacije_Osobe_OsobaId",
                table: "OsobaNotifikacije",
                column: "OsobaId",
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

            migrationBuilder.AddForeignKey(
                name: "FK_RadnoIskustvo_CV_CVId",
                table: "RadnoIskustvo",
                column: "CVId",
                principalTable: "CV",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_KandidatiOglasi_Kandidati_KandidatId",
                table: "KandidatiOglasi");

            migrationBuilder.DropForeignKey(
                name: "FK_KandidatiOglasi_Oglasi_OglasId",
                table: "KandidatiOglasi");

            migrationBuilder.DropForeignKey(
                name: "FK_KompanijeKandidati_Kandidati_KandidatId",
                table: "KompanijeKandidati");

            migrationBuilder.DropForeignKey(
                name: "FK_KompanijeKandidati_Kompanije_KompanijaId",
                table: "KompanijeKandidati");

            migrationBuilder.DropForeignKey(
                name: "FK_Oglasi_Kompanije_KompanijaId",
                table: "Oglasi");

            migrationBuilder.DropForeignKey(
                name: "FK_OsobaNotifikacije_Notifikacije_NotifikacijaId",
                table: "OsobaNotifikacije");

            migrationBuilder.DropForeignKey(
                name: "FK_OsobaNotifikacije_Osobe_OsobaId",
                table: "OsobaNotifikacije");

            migrationBuilder.DropForeignKey(
                name: "FK_Osobe_Jezici_JezikId",
                table: "Osobe");

            migrationBuilder.DropForeignKey(
                name: "FK_Osobe_Tema_TemaId",
                table: "Osobe");

            migrationBuilder.DropForeignKey(
                name: "FK_RadnoIskustvo_CV_CVId",
                table: "RadnoIskustvo");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Jezici",
                table: "Jezici");

            migrationBuilder.RenameTable(
                name: "Jezici",
                newName: "Jezik");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Jezik",
                table: "Jezik",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_KandidatiOglasi_Kandidati_KandidatId",
                table: "KandidatiOglasi",
                column: "KandidatId",
                principalTable: "Kandidati",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_KandidatiOglasi_Oglasi_OglasId",
                table: "KandidatiOglasi",
                column: "OglasId",
                principalTable: "Oglasi",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_KompanijeKandidati_Kandidati_KandidatId",
                table: "KompanijeKandidati",
                column: "KandidatId",
                principalTable: "Kandidati",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_KompanijeKandidati_Kompanije_KompanijaId",
                table: "KompanijeKandidati",
                column: "KompanijaId",
                principalTable: "Kompanije",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Oglasi_Kompanije_KompanijaId",
                table: "Oglasi",
                column: "KompanijaId",
                principalTable: "Kompanije",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_OsobaNotifikacije_Notifikacije_NotifikacijaId",
                table: "OsobaNotifikacije",
                column: "NotifikacijaId",
                principalTable: "Notifikacije",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_OsobaNotifikacije_Osobe_OsobaId",
                table: "OsobaNotifikacije",
                column: "OsobaId",
                principalTable: "Osobe",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Osobe_Jezik_JezikId",
                table: "Osobe",
                column: "JezikId",
                principalTable: "Jezik",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Osobe_Tema_TemaId",
                table: "Osobe",
                column: "TemaId",
                principalTable: "Tema",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_RadnoIskustvo_CV_CVId",
                table: "RadnoIskustvo",
                column: "CVId",
                principalTable: "CV",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
