using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace JobSearchingWebApp.Migrations
{
    public partial class skripta8 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "KompanijeKandidati",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    KompanijaId = table.Column<int>(type: "int", nullable: false),
                    KandidatId = table.Column<int>(type: "int", nullable: false),
                    DatumRazgovora = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KompanijeKandidati", x => x.Id);
                    table.ForeignKey(
                        name: "FK_KompanijeKandidati_Kandidati_KandidatId",
                        column: x => x.KandidatId,
                        principalTable: "Kandidati",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_KompanijeKandidati_Kompanije_KompanijaId",
                        column: x => x.KompanijaId,
                        principalTable: "Kompanije",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_KompanijeKandidati_KandidatId",
                table: "KompanijeKandidati",
                column: "KandidatId");

            migrationBuilder.CreateIndex(
                name: "IX_KompanijeKandidati_KompanijaId",
                table: "KompanijeKandidati",
                column: "KompanijaId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "KompanijeKandidati");
        }
    }
}
