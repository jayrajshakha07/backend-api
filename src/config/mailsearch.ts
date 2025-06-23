// import { MeiliSearch } from "meilisearch";
// import { prisma } from "../utils/prisma";

// const client = new MeiliSearch({
//   host: "http://127.0.0.1:7700",
//   apiKey: "mySecretKey",
// });

// const index = client.index("leads");

// async function syncLeads() {
//   const leads = await prisma.lead.findMany();

//   const documents = leads.map((lead) => ({
//     id: lead.id,
//     name: lead.name,
//     title: lead.title,
//     company: lead.company,
//     email: lead.email,
//     country: lead.country,
//     revenue: lead.revenue,
//     employees: lead.employees,
//     website: lead.website,
//     linkedinUrl: lead.linkedinUrl,
//   }));

//   await index.addDocuments(documents);
//   console.log("Indexed successfully.");
// }

// syncLeads();
