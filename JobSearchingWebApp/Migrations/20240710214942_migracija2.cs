using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace JobSearchingWebApp.Migrations
{
    /// <inheritdoc />
    public partial class migracija2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_OpisOglas_OglasId",
                table: "OpisOglas");

            migrationBuilder.AddColumn<bool>(
                name: "Spasen",
                table: "Oglasi",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateIndex(
                name: "IX_OpisOglas_OglasId",
                table: "OpisOglas",
                column: "OglasId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_OpisOglas_OglasId",
                table: "OpisOglas");

            migrationBuilder.DropColumn(
                name: "Spasen",
                table: "Oglasi");

            migrationBuilder.CreateIndex(
                name: "IX_OpisOglas_OglasId",
                table: "OpisOglas",
                column: "OglasId");
        }
    }
}
