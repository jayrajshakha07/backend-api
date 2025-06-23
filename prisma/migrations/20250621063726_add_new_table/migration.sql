-- CreateTable
CREATE TABLE "Backup" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "city" TEXT,
    "country" TEXT NOT NULL,
    "phone" TEXT,
    "website" TEXT,
    "email" TEXT NOT NULL,
    "revenue" TEXT,
    "employees" TEXT,
    "industry" TEXT,
    "subIndustry" TEXT,
    "linkedinUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Backup_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Backup_email_key" ON "Backup"("email");

-- CreateIndex
CREATE INDEX "Backup_email_idx" ON "Backup"("email");

-- CreateIndex
CREATE INDEX "Backup_country_idx" ON "Backup"("country");

-- CreateIndex
CREATE INDEX "Backup_revenue_idx" ON "Backup"("revenue");

-- CreateIndex
CREATE INDEX "Backup_employees_idx" ON "Backup"("employees");

-- CreateIndex
CREATE INDEX "Backup_industry_idx" ON "Backup"("industry");

-- CreateIndex
CREATE INDEX "Backup_subIndustry_idx" ON "Backup"("subIndustry");

-- CreateIndex
CREATE INDEX "Backup_title_idx" ON "Backup"("title");

-- CreateIndex
CREATE INDEX "Backup_name_idx" ON "Backup"("name");

-- CreateIndex
CREATE INDEX "Backup_company_idx" ON "Backup"("company");
