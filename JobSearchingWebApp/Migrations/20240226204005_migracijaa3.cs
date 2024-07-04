using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace JobSearchingWebApp.Migrations
{
    /// <inheritdoc />
    public partial class migracijaa3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "OglasIskustvo",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OglasId = table.Column<int>(type: "int", nullable: false),
                    IskustvoId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OglasIskustvo", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OglasIskustvo_Iskustvo_IskustvoId",
                        column: x => x.IskustvoId,
                        principalTable: "Iskustvo",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_OglasIskustvo_Oglasi_OglasId",
                        column: x => x.OglasId,
                        principalTable: "Oglasi",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "OglasLokacija",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OglasId = table.Column<int>(type: "int", nullable: false),
                    LokacijaId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OglasLokacija", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OglasLokacija_Lokacija_LokacijaId",
                        column: x => x.LokacijaId,
                        principalTable: "Lokacija",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_OglasLokacija_Oglasi_OglasId",
                        column: x => x.OglasId,
                        principalTable: "Oglasi",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_OglasIskustvo_IskustvoId",
                table: "OglasIskustvo",
                column: "IskustvoId");

            migrationBuilder.CreateIndex(
                name: "IX_OglasIskustvo_OglasId",
                table: "OglasIskustvo",
                column: "OglasId");

            migrationBuilder.CreateIndex(
                name: "IX_OglasLokacija_LokacijaId",
                table: "OglasLokacija",
                column: "LokacijaId");

            migrationBuilder.CreateIndex(
                name: "IX_OglasLokacija_OglasId",
                table: "OglasLokacija",
                column: "OglasId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "OglasIskustvo");

            migrationBuilder.DropTable(
                name: "OglasLokacija");
        }
    }
}
