using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace JobSearchingWebApp.Migrations
{
    public partial class skripta16 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CVVjestine",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    VjestinaId = table.Column<int>(type: "int", nullable: false),
                    CVId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CVVjestine", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CVVjestine_CV_CVId",
                        column: x => x.CVId,
                        principalTable: "CV",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_CVVjestine_Vjestine_VjestinaId",
                        column: x => x.VjestinaId,
                        principalTable: "Vjestine",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_CVVjestine_CVId",
                table: "CVVjestine",
                column: "CVId");

            migrationBuilder.CreateIndex(
                name: "IX_CVVjestine_VjestinaId",
                table: "CVVjestine",
                column: "VjestinaId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CVVjestine");
        }
    }
}
