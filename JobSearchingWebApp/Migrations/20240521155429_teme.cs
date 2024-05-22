using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace JobSearchingWebApp.Migrations
{
    /// <inheritdoc />
    public partial class teme : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Korisnici_Tema_TemaId",
                table: "Korisnici");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Tema",
                table: "Tema");

            migrationBuilder.RenameTable(
                name: "Tema",
                newName: "Teme");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Teme",
                table: "Teme",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Korisnici_Teme_TemaId",
                table: "Korisnici",
                column: "TemaId",
                principalTable: "Teme",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Korisnici_Teme_TemaId",
                table: "Korisnici");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Teme",
                table: "Teme");

            migrationBuilder.RenameTable(
                name: "Teme",
                newName: "Tema");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Tema",
                table: "Tema",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Korisnici_Tema_TemaId",
                table: "Korisnici",
                column: "TemaId",
                principalTable: "Tema",
                principalColumn: "Id");
        }
    }
}
