/*
  Warnings:

  - You are about to drop the column `content` on the `CodeSnippet` table. All the data in the column will be lost.
  - Added the required column `description` to the `CodeSnippet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `language` to the `CodeSnippet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `public` to the `CodeSnippet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `snippet` to the `CodeSnippet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `CodeSnippet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CodeSnippet" DROP COLUMN "content",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "language" TEXT NOT NULL,
ADD COLUMN     "public" BOOLEAN NOT NULL,
ADD COLUMN     "snippet" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;
