using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Appdoon.Presistence.Migrations
{
    public partial class User_And_Homework_Changed : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_ChildSteps_HomeworkId",
                table: "ChildSteps");

            migrationBuilder.AddColumn<int>(
                name: "CreatorId",
                table: "Homeworks",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Title",
                table: "Homeworks",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 1,
                column: "InsertTime",
                value: new DateTime(2022, 7, 10, 3, 5, 30, 150, DateTimeKind.Local).AddTicks(9583));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 2,
                column: "InsertTime",
                value: new DateTime(2022, 7, 10, 3, 5, 30, 153, DateTimeKind.Local).AddTicks(5258));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 3,
                column: "InsertTime",
                value: new DateTime(2022, 7, 10, 3, 5, 30, 153, DateTimeKind.Local).AddTicks(5380));

            migrationBuilder.CreateIndex(
                name: "IX_Homeworks_CreatorId",
                table: "Homeworks",
                column: "CreatorId");

            migrationBuilder.CreateIndex(
                name: "IX_ChildSteps_HomeworkId",
                table: "ChildSteps",
                column: "HomeworkId");

            migrationBuilder.AddForeignKey(
                name: "FK_Homeworks_Users_CreatorId",
                table: "Homeworks",
                column: "CreatorId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Homeworks_Users_CreatorId",
                table: "Homeworks");

            migrationBuilder.DropIndex(
                name: "IX_Homeworks_CreatorId",
                table: "Homeworks");

            migrationBuilder.DropIndex(
                name: "IX_ChildSteps_HomeworkId",
                table: "ChildSteps");

            migrationBuilder.DropColumn(
                name: "CreatorId",
                table: "Homeworks");

            migrationBuilder.DropColumn(
                name: "Title",
                table: "Homeworks");

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 1,
                column: "InsertTime",
                value: new DateTime(2022, 7, 6, 20, 49, 15, 257, DateTimeKind.Local).AddTicks(6159));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 2,
                column: "InsertTime",
                value: new DateTime(2022, 7, 6, 20, 49, 15, 264, DateTimeKind.Local).AddTicks(1140));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 3,
                column: "InsertTime",
                value: new DateTime(2022, 7, 6, 20, 49, 15, 264, DateTimeKind.Local).AddTicks(1457));

            migrationBuilder.CreateIndex(
                name: "IX_ChildSteps_HomeworkId",
                table: "ChildSteps",
                column: "HomeworkId",
                unique: true,
                filter: "[HomeworkId] IS NOT NULL");
        }
    }
}
