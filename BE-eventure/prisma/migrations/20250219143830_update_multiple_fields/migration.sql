/*
  Warnings:

  - You are about to alter the column `transactionId` on the `Attendee` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(250)`.

*/
-- DropForeignKey
ALTER TABLE "Attendee" DROP CONSTRAINT "Attendee_transactionId_fkey";

-- AlterTable
ALTER TABLE "Attendee" ALTER COLUMN "transactionId" DROP NOT NULL,
ALTER COLUMN "transactionId" SET DATA TYPE VARCHAR(250);

-- AddForeignKey
ALTER TABLE "Attendee" ADD CONSTRAINT "Attendee_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE SET NULL ON UPDATE CASCADE;
