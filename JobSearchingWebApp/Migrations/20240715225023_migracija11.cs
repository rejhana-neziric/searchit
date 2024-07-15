using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace JobSearchingWebApp.Migrations
{
    /// <inheritdoc />
    public partial class migracija11 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Otvoren",
                table: "Oglasi");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Otvoren",
                table: "Oglasi",
                type: "bit",
                nullable: false,
                computedColumnSql: "CASE WHEN RokPrijave > GETDATE() THEN 1 ELSE 0 END");
        }
    }
}
