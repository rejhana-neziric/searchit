using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace JobSearchingWebApp.Migrations
{
    public partial class skripta11 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CVJezici",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CVId = table.Column<int>(type: "int", nullable: false),
                    JezikId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CVJezici", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CVJezici_CV_CVId",
                        column: x => x.CVId,
                        principalTable: "CV",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_CVJezici_Jezici_JezikId",
                        column: x => x.JezikId,
                        principalTable: "Jezici",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_CVJezici_CVId",
                table: "CVJezici",
                column: "CVId");

            migrationBuilder.CreateIndex(
                name: "IX_CVJezici_JezikId",
                table: "CVJezici",
                column: "JezikId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CVJezici");
        }
    }
}
