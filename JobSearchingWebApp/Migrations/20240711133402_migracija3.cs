using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace JobSearchingWebApp.Migrations
{
    /// <inheritdoc />
    public partial class migracija3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Spasen",
                table: "Oglasi");

            migrationBuilder.CreateTable(
                name: "KandidatSpaseniOglasi",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    KandidatId = table.Column<int>(type: "int", nullable: false),
                    OglasId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KandidatSpaseniOglasi", x => x.Id);
                    table.ForeignKey(
                        name: "FK_KandidatSpaseniOglasi_Kandidati_KandidatId",
                        column: x => x.KandidatId,
                        principalTable: "Kandidati",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_KandidatSpaseniOglasi_Oglasi_OglasId",
                        column: x => x.OglasId,
                        principalTable: "Oglasi",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_KandidatSpaseniOglasi_KandidatId",
                table: "KandidatSpaseniOglasi",
                column: "KandidatId");

            migrationBuilder.CreateIndex(
                name: "IX_KandidatSpaseniOglasi_OglasId",
                table: "KandidatSpaseniOglasi",
                column: "OglasId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "KandidatSpaseniOglasi");

            migrationBuilder.AddColumn<bool>(
                name: "Spasen",
                table: "Oglasi",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}
