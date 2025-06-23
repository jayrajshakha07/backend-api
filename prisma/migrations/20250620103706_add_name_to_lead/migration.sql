/*
  Warnings:

  - Added the required column `lastName` to the `Lead` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Lead` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Lead" ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;
