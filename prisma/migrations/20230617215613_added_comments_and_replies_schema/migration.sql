/*
  Warnings:

  - You are about to drop the column `userId` on the `CodeSnippet` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `CommentReplies` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `SnippetComment` table. All the data in the column will be lost.
  - Added the required column `posterId` to the `CodeSnippet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `replierId` to the `CommentReplies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `codeSnippetId` to the `SnippetComment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `commenterId` to the `SnippetComment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CodeSnippet" DROP CONSTRAINT "CodeSnippet_userId_fkey";

-- DropForeignKey
ALTER TABLE "CommentReplies" DROP CONSTRAINT "CommentReplies_userId_fkey";

-- DropForeignKey
ALTER TABLE "SnippetComment" DROP CONSTRAINT "SnippetComment_userId_fkey";

-- AlterTable
ALTER TABLE "CodeSnippet" DROP COLUMN "userId",
ADD COLUMN     "posterId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "CommentReplies" DROP COLUMN "userId",
ADD COLUMN     "replierId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SnippetComment" DROP COLUMN "userId",
ADD COLUMN     "codeSnippetId" TEXT NOT NULL,
ADD COLUMN     "commenterId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "CodeSnippet" ADD CONSTRAINT "CodeSnippet_posterId_fkey" FOREIGN KEY ("posterId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SnippetComment" ADD CONSTRAINT "SnippetComment_commenterId_fkey" FOREIGN KEY ("commenterId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SnippetComment" ADD CONSTRAINT "SnippetComment_codeSnippetId_fkey" FOREIGN KEY ("codeSnippetId") REFERENCES "CodeSnippet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentReplies" ADD CONSTRAINT "CommentReplies_replierId_fkey" FOREIGN KEY ("replierId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
