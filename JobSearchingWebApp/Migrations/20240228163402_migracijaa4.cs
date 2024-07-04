using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace JobSearchingWebApp.Migrations
{
    /// <inheritdoc />
    public partial class migracijaa4 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "OpisPosla",
                table: "Oglasi");

            migrationBuilder.CreateTable(
                name: "OpisOglas",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OpisPozicije = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MinimumGodinaIskustva = table.Column<int>(type: "int", nullable: false),
                    PrefiraneGodineIskstva = table.Column<int>(type: "int", nullable: false),
                    Kvalifikacija = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Vjestine = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Benefiti = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    OglasId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OpisOglas", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OpisOglas_Oglasi_OglasId",
                        column: x => x.OglasId,
                        principalTable: "Oglasi",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_OpisOglas_OglasId",
                table: "OpisOglas",
                column: "OglasId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "OpisOglas");

            migrationBuilder.AddColumn<string>(
                name: "OpisPosla",
                table: "Oglasi",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
