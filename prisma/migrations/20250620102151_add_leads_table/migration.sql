/*
  Warnings:

  - You are about to drop the column `address` on the `Lead` table. All the data in the column will be lost.
  - You are about to drop the column `fullName` on the `Lead` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Lead` table. All the data in the column will be lost.
  - You are about to drop the column `middleName` on the `Lead` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `Lead` table. All the data in the column will be lost.
  - You are about to drop the column `zipCode` on the `Lead` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Lead" DROP COLUMN "address",
DROP COLUMN "fullName",
DROP COLUMN "lastName",
DROP COLUMN "middleName",
DROP COLUMN "state",
DROP COLUMN "zipCode";
