using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace JobSearchingWebApp.Migrations
{
    /// <inheritdoc />
    public partial class migracija5 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Slika",
                table: "Kompanije",
                newName: "Website");

            migrationBuilder.AddColumn<string>(
                name: "BrojZaposlenih",
                table: "Kompanije",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "KratkiOpis",
                table: "Kompanije",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "LinkedIn",
                table: "Kompanije",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Logo",
                table: "Kompanije",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Opis",
                table: "Kompanije",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Twitter",
                table: "Kompanije",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateTable(
                name: "KompanijaLokacija",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    KompanijaId = table.Column<int>(type: "int", nullable: false),
                    LokacijaId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KompanijaLokacija", x => x.Id);
                    table.ForeignKey(
                        name: "FK_KompanijaLokacija_Kompanije_KompanijaId",
                        column: x => x.KompanijaId,
                        principalTable: "Kompanije",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_KompanijaLokacija_Lokacija_LokacijaId",
                        column: x => x.LokacijaId,
                        principalTable: "Lokacija",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_KompanijaLokacija_KompanijaId",
                table: "KompanijaLokacija",
                column: "KompanijaId");

            migrationBuilder.CreateIndex(
                name: "IX_KompanijaLokacija_LokacijaId",
                table: "KompanijaLokacija",
                column: "LokacijaId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "KompanijaLokacija");

            migrationBuilder.DropColumn(
                name: "BrojZaposlenih",
                table: "Kompanije");

            migrationBuilder.DropColumn(
                name: "KratkiOpis",
                table: "Kompanije");

            migrationBuilder.DropColumn(
                name: "LinkedIn",
                table: "Kompanije");

            migrationBuilder.DropColumn(
                name: "Logo",
                table: "Kompanije");

            migrationBuilder.DropColumn(
                name: "Opis",
                table: "Kompanije");

            migrationBuilder.DropColumn(
                name: "Twitter",
                table: "Kompanije");

            migrationBuilder.RenameColumn(
                name: "Website",
                table: "Kompanije",
                newName: "Slika");
        }
    }
}
