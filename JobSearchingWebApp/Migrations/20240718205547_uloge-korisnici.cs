using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace JobSearchingWebApp.Migrations
{
    /// <inheritdoc />
    public partial class ulogekorisnici : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UlogaId",
                table: "Korisnici",
                type: "int",
                nullable: false,
                defaultValue: 1);

            migrationBuilder.CreateIndex(
                name: "IX_Korisnici_UlogaId",
                table: "Korisnici",
                column: "UlogaId");

            migrationBuilder.AddForeignKey(
                name: "FK_Korisnici_Uloge_UlogaId",
                table: "Korisnici",
                column: "UlogaId",
                principalTable: "Uloge",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Korisnici_Uloge_UlogaId",
                table: "Korisnici");

            migrationBuilder.DropIndex(
                name: "IX_Korisnici_UlogaId",
                table: "Korisnici");

            migrationBuilder.DropColumn(
                name: "UlogaId",
                table: "Korisnici");
        }
    }
}
