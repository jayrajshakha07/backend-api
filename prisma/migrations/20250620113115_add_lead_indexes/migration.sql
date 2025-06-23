-- CreateIndex
CREATE INDEX "Lead_email_idx" ON "Lead"("email");

-- CreateIndex
CREATE INDEX "Lead_country_idx" ON "Lead"("country");

-- CreateIndex
CREATE INDEX "Lead_revenue_idx" ON "Lead"("revenue");

-- CreateIndex
CREATE INDEX "Lead_employees_idx" ON "Lead"("employees");

-- CreateIndex
CREATE INDEX "Lead_industry_idx" ON "Lead"("industry");

-- CreateIndex
CREATE INDEX "Lead_subIndustry_idx" ON "Lead"("subIndustry");

-- CreateIndex
CREATE INDEX "Lead_title_idx" ON "Lead"("title");

-- CreateIndex
CREATE INDEX "Lead_name_idx" ON "Lead"("name");

-- CreateIndex
CREATE INDEX "Lead_company_idx" ON "Lead"("company");
