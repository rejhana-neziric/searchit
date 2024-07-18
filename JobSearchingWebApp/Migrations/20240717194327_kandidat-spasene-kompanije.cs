using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace JobSearchingWebApp.Migrations
{
    /// <inheritdoc />
    public partial class kandidatspasenekompanije : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "KandidatSpaseneKompanije",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    KandidatId = table.Column<int>(type: "int", nullable: false),
                    KompanijaId = table.Column<int>(type: "int", nullable: false),
                    Spasen = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KandidatSpaseneKompanije", x => x.Id);
                    table.ForeignKey(
                        name: "FK_KandidatSpaseneKompanije_Kandidati_KandidatId",
                        column: x => x.KandidatId,
                        principalTable: "Kandidati",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_KandidatSpaseneKompanije_Kompanije_KompanijaId",
                        column: x => x.KompanijaId,
                        principalTable: "Kompanije",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_KandidatSpaseneKompanije_KandidatId",
                table: "KandidatSpaseneKompanije",
                column: "KandidatId");

            migrationBuilder.CreateIndex(
                name: "IX_KandidatSpaseneKompanije_KompanijaId",
                table: "KandidatSpaseneKompanije",
                column: "KompanijaId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "KandidatSpaseneKompanije");
        }
    }
}
