/*
  Warnings:

  - Added the required column `comment` to the `SnippetComment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SnippetComment" ADD COLUMN     "comment" TEXT NOT NULL;
