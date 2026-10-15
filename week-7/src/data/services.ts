// Shared Nepal government service info.
// Used by services list + detail page. One place to edit.
export type GovService = {
  id: string;
  name: string;
  icon: string;
  office: string;
  law: string;
  fee: string;
  time: string;
  docs: string[];
  steps: string[];
};

export const GOV_SERVICES: GovService[] = [
  {
    id: "1",
    name: "Birth Certificate Registration",
    icon: "📄",
    office: "Ward office where child was born / family lives. Within 35 days (60 days if abroad).",
    law: "Birth, Death & Personal Events Act 2033 + National ID & Civil Registration Act 2019",
    fee: "Free on time, Rs.5-110 for copy/reissue",
    time: "Same day if docs complete",
    docs: [
      "Application form (Schedule-2 / Annex-10)",
      "Hospital birth record",
      "Father + Mother citizenship copy",
      "Marriage certificate",
      "Informant ID if not parent",
    ],
    steps: [
      "Fill form + parents sign + thumbprint",
      "Registrar enters in register book",
      "Ward secretary/chair signs + stamps",
      "You get certificate",
    ],
  },
  {
    id: "2",
    name: "Citizenship Registration",
    icon: "👥",
    office: "District Administration Office (DAO/CDO) of permanent address. Age 16+.",
    law: "Nepal Citizenship Act 2063 + Rules 2063 Schedule-1",
    fee: "Rs.10 postal ticket",
    time: "Same day if file complete",
    docs: [
      "Ward ONLINE recommendation Schedule-1 with photo certified",
      "13-digit online birth registration",
      "Father/mother OR 3-generation relative citizenship + relation certificate",
      "SEE/SLC or birth-date proof",
      "Married woman: marriage certificate + husband citizenship",
      "2 auto-size photos (both ears seen, light bg)",
      "Identifier person with original citizenship present",
    ],
    steps: [
      "Get ward sifaris with photo certified",
      "Submit file at DAO citizenship section",
      "Identifier confirms you",
      "CDO signs, you get citizenship",
    ],
  },
  {
    id: "3",
    name: "Passport Registration",
    icon: "🛂",
    office: "Dept. of Passport Tripureshwor / DAO / Nepal Mission abroad",
    law: "Passport Act 2076. Pre-enroll at nepalpassport.gov.np",
    fee: "General Rs.5000, Fast Rs.10000, Speedy Rs.12000, Emergency Rs.15000",
    time: "Same day enrollment, collect after SMS",
    docs: [
      "Barcode/QR form print (not screenshot)",
      "Original citizenship + copy (NID number mandatory)",
      "Old passport if renewal",
      "Bank voucher receipt",
      "Minor: minor ID + parents citizenship + guardian must come",
      "Photo 45x35mm, light bg, 70-80% face",
    ],
    steps: [
      "Online pre-enrollment + appointment",
      "Visit office with originals on date",
      "Biometrics + photo taken",
      "Collect when SMS/email comes",
    ],
  },
  {
    id: "4",
    name: "Business Registration",
    icon: "💼",
    office: "Ward → Cottage & Small Industry / Company Registrar (OCR) → Inland Revenue (PAN)",
    law: "Company Act + Firm Registration + Local Government Operation Act",
    fee: "Varies by capital + local tax",
    time: "1-3 days",
    docs: [
      "Citizenship copy + 2 passport photos",
      "Rent agreement / electricity bill (address proof)",
      "Firm/company name + objective + capital",
      "Company: Memorandum + Articles",
    ],
    steps: [
      "Ward business sifaris",
      "Register firm/company",
      "Get PAN/VAT",
      "Ward business approval",
    ],
  },
  {
    id: "5",
    name: "Marriage Registration",
    icon: "💍",
    office: "Ward office where husband OR wife lives. Within 35 days. Both must come.",
    law: "Civil Registration - Schedule-4 notice, Schedule-9 register, Schedule-14 certificate",
    fee: "Minimal / free on time",
    time: "Same day",
    docs: [
      "Both citizenship original + copy",
      "Photos of both",
      "Witnesses with citizenship",
      "If remarriage: divorce / death certificate",
    ],
    steps: [
      "Fill form together",
      "Registrar verifies",
      "Entry in register",
      "Certificate stamped/signed",
    ],
  },
  {
    id: "6",
    name: "Land Ownership Transfer",
    icon: "🏠",
    office: "Land Revenue Office (Malpot) of land district + Ward sifaris",
    law: "Land Act + Land Revenue Rules",
    fee: "Registration tax % by area + service fee",
    time: "1-7 days",
    docs: [
      "Original Lalpurja",
      "Buyer + seller citizenship original + copy",
      "Land tax receipt paid",
      "Family details + photos",
      "If address changed: migration certificate",
    ],
    steps: [
      "Ward family/detail sifaris",
      "Malpot check + valuation",
      "Rajinama deed signing",
      "Pay tax → New Lalpurja",
    ],
  },
];
