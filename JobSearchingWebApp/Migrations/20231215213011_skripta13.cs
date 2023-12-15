using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace JobSearchingWebApp.Migrations
{
    public partial class skripta13 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CVTehnologije",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CVId = table.Column<int>(type: "int", nullable: false),
                    TehnologijaId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CVTehnologije", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CVTehnologije_CV_CVId",
                        column: x => x.CVId,
                        principalTable: "CV",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_CVTehnologije_Tehnologije_TehnologijaId",
                        column: x => x.TehnologijaId,
                        principalTable: "Tehnologije",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_CVTehnologije_CVId",
                table: "CVTehnologije",
                column: "CVId");

            migrationBuilder.CreateIndex(
                name: "IX_CVTehnologije_TehnologijaId",
                table: "CVTehnologije",
                column: "TehnologijaId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CVTehnologije");
        }
    }
}
