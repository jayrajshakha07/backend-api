/*
  Warnings:

  - You are about to drop the column `linkedinUrl` on the `Lead` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Lead` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Lead` table. All the data in the column will be lost.
  - Added the required column `country` to the `Lead` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullName` to the `Lead` table without a default value. This is not possible if the table is not empty.
  - Made the column `company` on table `Lead` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Lead" DROP COLUMN "linkedinUrl",
DROP COLUMN "location",
DROP COLUMN "name",
ADD COLUMN     "address" TEXT,
ADD COLUMN     "city" TEXT,
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "employees" TEXT,
ADD COLUMN     "fullName" TEXT NOT NULL,
ADD COLUMN     "industry" TEXT,
ADD COLUMN     "middleName" TEXT,
ADD COLUMN     "revenue" TEXT,
ADD COLUMN     "state" TEXT,
ADD COLUMN     "subIndustry" TEXT,
ADD COLUMN     "website" TEXT,
ADD COLUMN     "zipCode" TEXT,
ALTER COLUMN "company" SET NOT NULL;
