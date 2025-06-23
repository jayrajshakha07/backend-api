import ExcelJS from "exceljs";
import express from "express";
import fs from "fs";
import multer from "multer";
import { prisma } from "../utils/prisma";
import Papa from "papaparse";

const router = express.Router();

const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 2 * 1024 * 1024 * 1024 },
});

const uploader = multer({ storage: multer.memoryStorage() });

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file || !req.file.path) {
      res.status(400).json({ error: "No file uploaded" });
      return;
    }

    const workbookReader = new ExcelJS.stream.xlsx.WorkbookReader(
      req.file.path,
      {}
    );
    let insertedCount = 0;
    const leadsBuffer = [];
    const CHUNK_SIZE = 1000;

    for await (const worksheet of workbookReader) {
      for await (const row of worksheet) {
        const values = row.values as any[];

        if (row.number === 1) continue;

        const firstName = String(values[1] || "").trim();
        const lastName = String(values[3] || "").trim();
        const title = String(values[4] || "").trim();
        const company = String(values[5] || "").trim();
        const city = String(values[7] || "").trim();
        const country = String(values[10] || "").trim();
        const phone = String(values[11] || "").trim();
        const website = String(values[12] || "").trim();
        const email = String(values[13] || "").trim();
        const revenue = String(values[14] || "").trim();
        const employees = String(values[15] || "").trim();
        const industry = String(values[16] || "").trim();
        const subIndustry = String(values[17] || "").trim();
        const name = `${firstName} ${lastName}`.trim();

        if (!firstName || !title || !company || !email) continue;

        leadsBuffer.push({
          name,
          firstName,
          lastName,
          title,
          company,
          city,
          country,
          phone,
          website,
          email,
          revenue,
          employees,
          industry,
          subIndustry,
        });

        if (leadsBuffer.length === CHUNK_SIZE) {
          await prisma.lead.createMany({
            data: leadsBuffer,
            skipDuplicates: true,
          });
          await prisma.backup.createMany({
            data: leadsBuffer,
            skipDuplicates: true,
          });
          insertedCount += leadsBuffer.length;
          leadsBuffer.length = 0;
        }
      }
    }

    if (leadsBuffer.length > 0) {
      await prisma.lead.createMany({ data: leadsBuffer, skipDuplicates: true });
      await prisma.backup.createMany({
        data: leadsBuffer,
        skipDuplicates: true,
      });
      insertedCount += leadsBuffer.length;
    }

    fs.unlinkSync(req.file.path);

    res.json({ success: true, inserted: insertedCount });
  } catch (err) {
    console.error("Upload failed:", err);
    res.status(500).json({ error: "Failed to process Excel file" });
  }
});

router.get("/clean", async (req, res) => {
  try {
    await prisma.lead.deleteMany({});
    res.json({ success: true, message: "clear" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get("/search", async (req, res) => {
  try {
    const {
      q,
      country,
      isMasterDb = false,
      revenue,
      employees,
      industry,
      subIndustry,
      page = 1,
      limit = 20,
    } = req.query;

    const take = parseInt(String(limit));
    const skip = (parseInt(String(page)) - 1) * take;
    const where: any = {
      AND: [
        q
          ? {
              OR: [
                { name: { contains: String(q), mode: "insensitive" } },
                { email: { contains: String(q), mode: "insensitive" } },
                { title: { contains: String(q), mode: "insensitive" } },
                { company: { contains: String(q), mode: "insensitive" } },
                { industry: { contains: String(q), mode: "insensitive" } },
                { subIndustry: { contains: String(q), mode: "insensitive" } },
                { country: { contains: String(q), mode: "insensitive" } },
                { revenue: { contains: String(q), mode: "insensitive" } },
                { employees: { contains: String(q), mode: "insensitive" } },
              ],
            }
          : undefined,

        country
          ? { country: { contains: String(country), mode: "insensitive" } }
          : undefined,
        revenue
          ? { revenue: { contains: String(revenue), mode: "insensitive" } }
          : undefined,
        employees
          ? { employees: { contains: String(employees), mode: "insensitive" } }
          : undefined,
        industry
          ? { industry: { contains: String(industry), mode: "insensitive" } }
          : undefined,
        subIndustry
          ? {
              subIndustry: {
                contains: String(subIndustry),
                mode: "insensitive",
              },
            }
          : undefined,
      ].filter(Boolean),
    };

    let leads, total;

    if (isMasterDb) {
      [leads, total] = await Promise.all([
        prisma.backup.findMany({
          where,
          skip,
          take,
          orderBy: { createdAt: "desc" },
          select: {
            id: true,
            name: true,
            email: true,
            title: true,
            company: true,
            city: true,
            country: true,
            revenue: true,
            employees: true,
            industry: true,
            subIndustry: true,
            website: true,
            linkedinUrl: true,
            createdAt: true,
          },
        }),
        prisma.backup.count({ where }),
      ]);
    } else {
      [leads, total] = await Promise.all([
        prisma.lead.findMany({
          where,
          skip,
          take,
          orderBy: { createdAt: "desc" },
          select: {
            id: true,
            name: true,
            email: true,
            title: true,
            company: true,
            city: true,
            country: true,
            revenue: true,
            employees: true,
            industry: true,
            subIndustry: true,
            website: true,
            linkedinUrl: true,
            createdAt: true,
          },
        }),
        prisma.lead.count({ where }),
      ]);
    }

    res.json({
      data: leads,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / take),
    });
  } catch (err) {
    console.error("Filter error:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.post("/upload-tsv", uploader.single("file"), (req, res, next) => {
  void (async () => {
    try {
      const file = req.file;
      if (!file) return res.status(400).json({ error: "No file uploaded" });

      const tsv = file.buffer.toString("utf-8");

      const result = Papa.parse(tsv, {
        header: true,
        delimiter: "\t",
        skipEmptyLines: true,
      });

      const rows = result.data as any[];

      const leads = rows.map((r) => ({
        name: r.person_name,
        firstName: r.person_first_name_unanalyzed,
        lastName: r.person_last_name_unanalyzed,
        email: r.person_email,
        linkedinUrl: r.person_linkedin_url,
        title: r.person_title,
        company: r.sanitized_organization_name_unanalyzed,
        country: r.person_location_country,
        phone: r.person_phone || null,
        city: r.person_location_state,
      }));

      const filtered = leads.filter((l) => l.email);

      await prisma.lead.createMany({ data: filtered, skipDuplicates: true });
      await prisma.backup.createMany({ data: filtered, skipDuplicates: true });

      res.json({ success: true, count: filtered.length });
    } catch (err) {
      next(err);
    }
  })();
});

export default router;
