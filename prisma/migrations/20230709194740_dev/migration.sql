/*
  Warnings:

  - The primary key for the `cart_item` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `sessionId` on the `cart_item` table. All the data in the column will be lost.
  - You are about to drop the column `userShopId` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `shopping_session` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[id]` on the table `cart_item` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `categoryId` to the `cart_item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `cart_item` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "cart_item" DROP CONSTRAINT "cart_item_sessionId_fkey";

-- DropForeignKey
ALTER TABLE "shopping_session" DROP CONSTRAINT "shopping_session_userId_fkey";

-- DropIndex
DROP INDEX "cart_item_productId_key";

-- DropIndex
DROP INDEX "cart_item_sessionId_key";

-- DropIndex
DROP INDEX "user_userShopId_key";

-- AlterTable
ALTER TABLE "cart_item" DROP CONSTRAINT "cart_item_pkey",
DROP COLUMN "sessionId",
ADD COLUMN     "categoryId" INTEGER NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL,
ADD CONSTRAINT "cart_item_pkey" PRIMARY KEY ("userId", "productId");

-- AlterTable
ALTER TABLE "post" ADD COLUMN     "audience" INTEGER;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "userShopId";

-- DropTable
DROP TABLE "shopping_session";

-- CreateTable
CREATE TABLE "follow" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "followerId" INTEGER NOT NULL,
    "status" INTEGER NOT NULL,

    CONSTRAINT "follow_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "cart_item_id_key" ON "cart_item"("id");

-- AddForeignKey
ALTER TABLE "follow" ADD CONSTRAINT "follow_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follow" ADD CONSTRAINT "follow_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart_item" ADD CONSTRAINT "cart_item_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart_item" ADD CONSTRAINT "cart_item_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
