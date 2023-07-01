/*
  Warnings:

  - Added the required column `commenterName` to the `SnippetComment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SnippetComment" ADD COLUMN     "commenterName" TEXT NOT NULL;
