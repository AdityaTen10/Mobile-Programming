// Shared government-service info (real Nepal rules, simplified).
// Both the Book page and the Services info pages read from here,
// so there is only ONE place to update when rules change.

export type GovService = {
  id: string; // "birth" | "citizenship" | ...
  name: string; // shown in lists
  icon: string; // emoji shown in lists
  shortTime: string; // short meta for the Book list, e.g. "Same day"
  shortDocs: string; // short meta for the Book list, e.g. "4 documents"
  office: string; // WHERE to go
  law: string; // LAW / rule behind it
  fee: string; // FEE
  time: string; // TIME it takes
  docs: string[]; // DOCUMENTS to carry
  steps: string[]; // STEPS in order
};

export const GOV_SERVICES: GovService[] = [
  {
    id: "birth",
    name: "Birth Certificate Registration",
    icon: "📄",
    shortTime: "Same day",
    shortDocs: "4 documents",
    office: "Your local Ward Office (where the child was born or parents live)",
    law: "Birth, Death & Other Personal Events Registration Act 2033 (amended 2019) — apply in Schedule-2 format, certificate issued in Annex-10 format",
    fee: "Free if registered within 35 days of birth; late fee applies after that",
    time: "Same day when all papers are complete",
    docs: [
      "Hospital birth record / discharge slip",
      "Citizenship certificates of both parents",
      "Parents' marriage registration certificate",
      "Filled Schedule-2 / Annex-10 form (available at the ward office)",
    ],
    steps: [
      "Collect the hospital birth record",
      "Fill the Schedule-2 form at the ward office",
      "Submit with parents' citizenship + marriage certificate",
      "Collect the birth certificate the same day",
    ],
  },
  {
    id: "citizenship",
    name: "Citizenship Certificate",
    icon: "👥",
    shortTime: "Same day / few days",
    shortDocs: "5 documents",
    office: "District Administration Office (DAO) of your home district",
    law: "Nepal Citizenship Act 2063 — application in Schedule-1 format, age 16+",
    fee: "Rs. 10 hulak ticket (postal ticket) on the form",
    time: "Usually same day; a few days in busy districts",
    docs: [
      "Completed 16 years of age (age proof)",
      "Ward recommendation (sifaris) — now issued ONLINE",
      "13-digit birth registration number",
      "2 passport-size photos",
      "Parents' citizenship certificates (if available)",
    ],
    steps: [
      "Get the ward sifaris (online recommendation)",
      "Fill the Schedule-1 citizenship form",
      "Submit at the DAO with photos + Rs. 10 ticket",
      "Collect your citizenship certificate",
    ],
  },
  {
    id: "passport",
    name: "Passport",
    icon: "🛂",
    shortTime: "15–20 days",
    shortDocs: "4 documents",
    office: "Department of Passport (DoP), Tripureshwor, Kathmandu — or DAO / Nepali missions abroad",
    law: "Passport Act 2076 — online pre-enrollment with barcode form + National ID (NID)",
    fee: "Normal: Rs. 5,000 (34-page) / Rs. 10,000 (66-page) — Fast track: Rs. 12,000 / Rs. 15,000",
    time: "Normal 15–20 days; fast track 2–3 days",
    docs: [
      "Online pre-enrollment form with barcode print",
      "Citizenship certificate",
      "National ID (NID)",
      "45x35mm photo (white background)",
    ],
    steps: [
      "Fill the online pre-enrollment form and print the barcode page",
      "Book an appointment slot at DoP Tripureshwor",
      "Submit biometrics + documents and pay the fee",
      "Collect the passport on the given date",
    ],
  },
  {
    id: "business",
    name: "Business Registration",
    icon: "💼",
    shortTime: "Few days",
    shortDocs: "4 documents",
    office: "Ward office (sifaris) → Office of Company Registrar, OCR (firm/company) → Inland Revenue Office (PAN)",
    law: "Firm/company registration at OCR, then PAN from the Inland Revenue Department",
    fee: "Varies by capital and business type (ward sifaris + OCR + PAN fees)",
    time: "A few working days across the 3 offices",
    docs: [
      "Citizenship certificate",
      "Ward sifaris (recommendation)",
      "2 passport-size photos",
      "Office/shop rent agreement (if rented)",
    ],
    steps: [
      "Get ward sifaris for the business address",
      "Register the firm/company at OCR",
      "Get PAN from the Inland Revenue Office",
      "Renew at the ward every fiscal year",
    ],
  },
  {
    id: "marriage",
    name: "Marriage Registration",
    icon: "💍",
    shortTime: "Same day",
    shortDocs: "4 documents",
    office: "Ward office (of either spouse) — both parties must be present",
    law: "Personal events registration — Schedule-4 application, certificate in Schedule-9/14 format",
    fee: "Small ward service fee (receipt given)",
    time: "Same day",
    docs: [
      "Citizenship certificates of both spouses",
      "2 passport-size photos of each",
      "2 witnesses with their citizenships",
      "Filled Schedule-4 application form",
    ],
    steps: [
      "Both spouses visit the ward office with 2 witnesses",
      "Fill the Schedule-4 application form",
      "Staff verify documents and record statements",
      "Collect the marriage certificate (Schedule-9/14)",
    ],
  },
  {
    id: "land",
    name: "Land Ownership Transfer",
    icon: "🏠",
    shortTime: "Few days",
    shortDocs: "5 documents",
    office: "Malpot (Land Revenue) Office of the district + Lalpurja (land ownership certificate)",
    law: "Land transfer (rajinama) registered at Malpot; new Lalpurja issued to the buyer",
    fee: "Registration + service fee based on government valuation (maalpot rates)",
    time: "A few working days after deed submission",
    docs: [
      "Original Lalpurja (land ownership certificate)",
      "Citizenships of buyer and seller",
      "Passport-size photos of both sides",
      "Land tax (maalpot) paid receipts",
      "Rajinama deed prepared by a लेखापढी writer",
    ],
    steps: [
      "Clear all land tax dues and get receipts",
      "Prepare the rajinama deed with a certified writer",
      "Both sides appear at Malpot with Lalpurja + citizenships",
      "Pay the fee and collect the new Lalpurja",
    ],
  },
];

// Helper: find a service by the ?id= passed in the URL.
export function getService(id: string | string[] | undefined): GovService | undefined {
  const key = Array.isArray(id) ? id[0] : id;
  return GOV_SERVICES.find((s) => s.id === key);
}
