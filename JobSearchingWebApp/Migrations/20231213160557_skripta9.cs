using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace JobSearchingWebApp.Migrations
{
    public partial class skripta9 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "OsobaNotifikacije",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OsobaId = table.Column<int>(type: "int", nullable: false),
                    NotifikacijaId = table.Column<int>(type: "int", nullable: false),
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
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OsobaNotifikacije_Osobe_OsobaId",
                        column: x => x.OsobaId,
                        principalTable: "Osobe",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_OsobaNotifikacije_NotifikacijaId",
                table: "OsobaNotifikacije",
                column: "NotifikacijaId");

            migrationBuilder.CreateIndex(
                name: "IX_OsobaNotifikacije_OsobaId",
                table: "OsobaNotifikacije",
                column: "OsobaId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "OsobaNotifikacije");
        }
    }
}
