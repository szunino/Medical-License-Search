/**
 * Comprehensive US state data for medical license lookups.
 * Includes all 50 states and Washington D.C.
 */
export interface StateInfo {
  name: string;
  abbr: string;           // Two-letter abbreviation used by the API
  slug: string;           // URL slug (lowercase, hyphenated)
  boardName: string;      // Official medical board name
  boardUrl: string;       // Official board website
  boardDescription: string; // Short description for SEO
  npiLookupNote?: string; // Any state-specific NPI/license guidance
}

export const US_STATES: StateInfo[] = [
  {
    name: "Alabama",
    abbr: "AL",
    slug: "alabama",
    boardName: "Alabama Board of Medical Examiners",
    boardUrl: "https://www.albme.gov",
    boardDescription:
      "The Alabama Board of Medical Examiners licenses and regulates physicians and other practitioners of the healing arts in Alabama.",
  },
  {
    name: "Alaska",
    abbr: "AK",
    slug: "alaska",
    boardName: "Alaska State Medical Board",
    boardUrl:
      "https://www.commerce.alaska.gov/web/cbpl/ProfessionalLicensing/StateMedicalBoard.aspx",
    boardDescription:
      "The Alaska State Medical Board regulates the practice of medicine in Alaska and ensures physicians meet licensure standards.",
  },
  {
    name: "Arizona",
    abbr: "AZ",
    slug: "arizona",
    boardName: "Arizona Medical Board",
    boardUrl: "https://www.azmd.gov",
    boardDescription:
      "The Arizona Medical Board protects the public from harmful, incompetent, or unprofessional practitioners of medicine.",
  },
  {
    name: "Arkansas",
    abbr: "AR",
    slug: "arkansas",
    boardName: "Arkansas State Medical Board",
    boardUrl: "https://www.armedicalboard.org",
    boardDescription:
      "The Arkansas State Medical Board licenses physicians and investigates complaints related to medical practice in Arkansas.",
  },
  {
    name: "California",
    abbr: "CA",
    slug: "california",
    boardName: "Medical Board of California",
    boardUrl: "https://www.mbc.ca.gov",
    boardDescription:
      "The Medical Board of California licenses and disciplines physicians and surgeons to protect consumers.",
  },
  {
    name: "Colorado",
    abbr: "CO",
    slug: "colorado",
    boardName: "Colorado Medical Board",
    boardUrl: "https://dpo.colorado.gov/MedicalBoard",
    boardDescription:
      "The Colorado Medical Board protects the public by setting standards for licensing, education, and professional conduct.",
  },
  {
    name: "Connecticut",
    abbr: "CT",
    slug: "connecticut",
    boardName: "Connecticut Medical Examining Board",
    boardUrl:
      "https://portal.ct.gov/DPH/Public-Health-Hearing-Office/Medical-Examining-Board/Connecticut-Medical-Examining-Board",
    boardDescription:
      "Connecticut's Medical Examining Board oversees physician licensure and discipline to safeguard patient welfare.",
  },
  {
    name: "Delaware",
    abbr: "DE",
    slug: "delaware",
    boardName: "Delaware Board of Medical Licensure and Discipline",
    boardUrl: "https://dpr.delaware.gov/boards/medicalpractice/",
    boardDescription:
      "Delaware's medical board licenses and disciplines physicians to protect public health and safety.",
  },
  {
    name: "Florida",
    abbr: "FL",
    slug: "florida",
    boardName: "Florida Board of Medicine",
    boardUrl: "https://flboardofmedicine.gov",
    boardDescription:
      "Florida's Board of Medicine regulates the practice of medicine and osteopathic medicine to protect the public.",
  },
  {
    name: "Georgia",
    abbr: "GA",
    slug: "georgia",
    boardName: "Georgia Composite Medical Board",
    boardUrl: "https://gcmb.georgia.gov",
    boardDescription:
      "The Georgia Composite Medical Board protects the public by licensing and regulating physicians and other healthcare professionals.",
  },
  {
    name: "Hawaii",
    abbr: "HI",
    slug: "hawaii",
    boardName: "Hawaii Medical Board",
    boardUrl: "https://cca.hawaii.gov/pvl/boards/medical/",
    boardDescription:
      "The Hawaii Medical Board oversees physician licensure and monitors the quality of medical practice statewide.",
  },
  {
    name: "Idaho",
    abbr: "ID",
    slug: "idaho",
    boardName: "Idaho State Board of Medicine",
    boardUrl: "https://bom.idaho.gov",
    boardDescription:
      "The Idaho State Board of Medicine licenses and regulates the practice of medicine in Idaho for public protection.",
  },
  {
    name: "Illinois",
    abbr: "IL",
    slug: "illinois",
    boardName: "Illinois Department of Professional Regulation",
    boardUrl: "https://idfpr.illinois.gov/profs/physician.asp",
    boardDescription:
      "Illinois licenses physicians through the IDFPR to ensure healthcare providers meet state standards.",
  },
  {
    name: "Indiana",
    abbr: "IN",
    slug: "indiana",
    boardName: "Indiana Medical Licensing Board",
    boardUrl: "https://www.in.gov/pla/divisions/indiana-medical-licensing-board-2/",
    boardDescription:
      "Indiana's Medical Licensing Board grants and regulates physician licenses to protect Hoosier patients.",
  },
  {
    name: "Iowa",
    abbr: "IA",
    slug: "iowa",
    boardName: "Iowa Board of Medicine",
    boardUrl: "https://medicalboard.iowa.gov",
    boardDescription:
      "The Iowa Board of Medicine licenses physicians and investigates complaints to ensure quality medical care.",
  },
  {
    name: "Kansas",
    abbr: "KS",
    slug: "kansas",
    boardName: "Kansas Board of Healing Arts",
    boardUrl: "https://www.ksbha.org",
    boardDescription:
      "The Kansas Board of Healing Arts regulates physicians and healing arts practitioners to safeguard Kansas residents.",
  },
  {
    name: "Kentucky",
    abbr: "KY",
    slug: "kentucky",
    boardName: "Kentucky Board of Medical Licensure",
    boardUrl: "https://kbml.ky.gov",
    boardDescription:
      "The Kentucky Board of Medical Licensure licenses and regulates physicians to protect Kentucky patients.",
  },
  {
    name: "Louisiana",
    abbr: "LA",
    slug: "louisiana",
    boardName: "Louisiana State Board of Medical Examiners",
    boardUrl: "https://www.lsbme.la.gov",
    boardDescription:
      "Louisiana's Board of Medical Examiners oversees physician licensing and discipline across the state.",
  },
  {
    name: "Maine",
    abbr: "ME",
    slug: "maine",
    boardName: "Maine Board of Licensure in Medicine",
    boardUrl: "https://www.maine.gov/md",
    boardDescription:
      "Maine's Board of Licensure in Medicine regulates physician practice to protect public health and safety.",
  },
  {
    name: "Maryland",
    abbr: "MD",
    slug: "maryland",
    boardName: "Maryland Board of Physicians",
    boardUrl: "https://www.mbp.state.md.us",
    boardDescription:
      "The Maryland Board of Physicians licenses and disciplines physicians to promote quality healthcare.",
  },
  {
    name: "Massachusetts",
    abbr: "MA",
    slug: "massachusetts",
    boardName: "Massachusetts Board of Registration in Medicine",
    boardUrl: "https://www.mass.gov/orgs/board-of-registration-in-medicine",
    boardDescription:
      "Massachusetts' Board of Registration in Medicine ensures safe and competent medical practice statewide.",
  },
  {
    name: "Michigan",
    abbr: "MI",
    slug: "michigan",
    boardName: "Michigan Board of Medicine",
    boardUrl: "https://www.michigan.gov/lara/bureau-list/bpl/occ/professions/medicine",
    boardDescription:
      "Michigan's Board of Medicine regulates physician licensure and discipline to protect Michigan residents.",
  },
  {
    name: "Minnesota",
    abbr: "MN",
    slug: "minnesota",
    boardName: "Minnesota Board of Medical Practice",
    boardUrl: "https://mn.gov/boards/medical-practice/",
    boardDescription:
      "Minnesota's Board of Medical Practice protects the public by ensuring physician competency and ethical conduct.",
  },
  {
    name: "Mississippi",
    abbr: "MS",
    slug: "mississippi",
    boardName: "Mississippi State Board of Medical Licensure",
    boardUrl: "https://msbml.ms.gov",
    boardDescription:
      "Mississippi's Board of Medical Licensure regulates the practice of medicine throughout the state.",
  },
  {
    name: "Missouri",
    abbr: "MO",
    slug: "missouri",
    boardName: "Missouri State Board of Registration for the Healing Arts",
    boardUrl: "https://pr.mo.gov/healingarts.asp",
    boardDescription:
      "Missouri regulates physicians through its Board of Registration for the Healing Arts for public protection.",
  },
  {
    name: "Montana",
    abbr: "MT",
    slug: "montana",
    boardName: "Montana Board of Medical Examiners",
    boardUrl: "https://boards.bsd.dli.mt.gov/med",
    boardDescription:
      "The Montana Board of Medical Examiners licenses and disciplines physicians practicing in Montana.",
  },
  {
    name: "Nebraska",
    abbr: "NE",
    slug: "nebraska",
    boardName: "Nebraska Department of Health and Human Services – Medicine",
    boardUrl: "https://dhhs.ne.gov/licensure/Pages/Medical-Doctor.aspx",
    boardDescription:
      "Nebraska issues medical licenses through DHHS to ensure quality healthcare for Nebraska residents.",
  },
  {
    name: "Nevada",
    abbr: "NV",
    slug: "nevada",
    boardName: "Nevada State Board of Medical Examiners",
    boardUrl: "https://medboard.nv.gov",
    boardDescription:
      "Nevada's Board of Medical Examiners licenses allopathic physicians and promotes high standards of care.",
  },
  {
    name: "New Hampshire",
    abbr: "NH",
    slug: "new-hampshire",
    boardName: "New Hampshire Board of Medicine",
    boardUrl: "https://www.oplc.nh.gov/medicine",
    boardDescription:
      "New Hampshire's Board of Medicine protects the public by licensing and regulating medical practitioners.",
  },
  {
    name: "New Jersey",
    abbr: "NJ",
    slug: "new-jersey",
    boardName: "New Jersey State Board of Medical Examiners",
    boardUrl: "https://www.njconsumeraffairs.gov/bme",
    boardDescription:
      "New Jersey's Board of Medical Examiners licenses physicians and upholds medical practice standards statewide.",
  },
  {
    name: "New Mexico",
    abbr: "NM",
    slug: "new-mexico",
    boardName: "New Mexico Medical Board",
    boardUrl: "https://www.nmmb.state.nm.us",
    boardDescription:
      "The New Mexico Medical Board licenses and regulates physicians to protect New Mexico patients.",
  },
  {
    name: "New York",
    abbr: "NY",
    slug: "new-york",
    boardName: "New York State Education Department – Office of the Professions",
    boardUrl: "https://www.op.nysed.gov/professions/doctors-medicine",
    boardDescription:
      "New York licenses physicians through the Office of the Professions to ensure patient safety statewide.",
  },
  {
    name: "North Carolina",
    abbr: "NC",
    slug: "north-carolina",
    boardName: "North Carolina Medical Board",
    boardUrl: "https://www.ncmedboard.org",
    boardDescription:
      "The North Carolina Medical Board licenses physicians and physician assistants to protect public health.",
  },
  {
    name: "North Dakota",
    abbr: "ND",
    slug: "north-dakota",
    boardName: "North Dakota Board of Medicine",
    boardUrl: "https://www.ndbomex.com",
    boardDescription:
      "North Dakota's Board of Medicine ensures that physicians and PAs are qualified to practice safely.",
  },
  {
    name: "Ohio",
    abbr: "OH",
    slug: "ohio",
    boardName: "State Medical Board of Ohio",
    boardUrl: "https://www.med.ohio.gov",
    boardDescription:
      "The State Medical Board of Ohio licenses and regulates physicians and other healthcare professionals.",
  },
  {
    name: "Oklahoma",
    abbr: "OK",
    slug: "oklahoma",
    boardName: "Oklahoma State Board of Medical Licensure and Supervision",
    boardUrl: "https://www.okmedicalboard.org",
    boardDescription:
      "Oklahoma's medical board licenses and supervises physicians to protect Oklahoma's patients.",
  },
  {
    name: "Oregon",
    abbr: "OR",
    slug: "oregon",
    boardName: "Oregon Medical Board",
    boardUrl: "https://www.oregon.gov/omb",
    boardDescription:
      "The Oregon Medical Board licenses physicians and ensures they meet standards for competent medical practice.",
  },
  {
    name: "Pennsylvania",
    abbr: "PA",
    slug: "pennsylvania",
    boardName: "Pennsylvania State Board of Medicine",
    boardUrl:
      "https://www.dos.pa.gov/ProfessionalLicensing/BoardsCommissions/Medicine/",
    boardDescription:
      "Pennsylvania's State Board of Medicine licenses MDs and ensures they uphold professional standards.",
  },
  {
    name: "Rhode Island",
    abbr: "RI",
    slug: "rhode-island",
    boardName: "Rhode Island Board of Medical Licensure and Discipline",
    boardUrl: "https://health.ri.gov/licenses/detail.php?id=231",
    boardDescription:
      "Rhode Island's Board of Medical Licensure protects patients by licensing and disciplining physicians.",
  },
  {
    name: "South Carolina",
    abbr: "SC",
    slug: "south-carolina",
    boardName: "South Carolina Board of Medical Examiners",
    boardUrl: "https://llr.sc.gov/med/",
    boardDescription:
      "South Carolina's Board of Medical Examiners licenses and regulates physician practice statewide.",
  },
  {
    name: "South Dakota",
    abbr: "SD",
    slug: "south-dakota",
    boardName: "South Dakota Board of Medical and Osteopathic Examiners",
    boardUrl: "https://doh.sd.gov/boards/medicine/",
    boardDescription:
      "South Dakota's medical board licenses MDs and DOs to ensure competent, ethical medical practice.",
  },
  {
    name: "Tennessee",
    abbr: "TN",
    slug: "tennessee",
    boardName: "Tennessee Board of Medical Examiners",
    boardUrl:
      "https://www.tn.gov/health/health-program-areas/health-professional-boards/bme-board.html",
    boardDescription:
      "Tennessee's Board of Medical Examiners protects public health by licensing and regulating physicians.",
  },
  {
    name: "Texas",
    abbr: "TX",
    slug: "texas",
    boardName: "Texas Medical Board",
    boardUrl: "https://www.tmb.state.tx.us",
    boardDescription:
      "The Texas Medical Board licenses and disciplines physicians and physician assistants in Texas.",
  },
  {
    name: "Utah",
    abbr: "UT",
    slug: "utah",
    boardName: "Utah Division of Professional Licensing – Medicine",
    boardUrl: "https://dopl.utah.gov/med/",
    boardDescription:
      "Utah licenses physicians through the Division of Professional Licensing to protect patient safety.",
  },
  {
    name: "Vermont",
    abbr: "VT",
    slug: "vermont",
    boardName: "Vermont Board of Medical Practice",
    boardUrl: "https://sos.vermont.gov/medical-practice/",
    boardDescription:
      "Vermont's Board of Medical Practice licenses and regulates medical professionals for public protection.",
  },
  {
    name: "Virginia",
    abbr: "VA",
    slug: "virginia",
    boardName: "Virginia Board of Medicine",
    boardUrl: "https://www.dhp.virginia.gov/medicine/",
    boardDescription:
      "Virginia's Board of Medicine licenses physicians and promotes safe, competent healthcare statewide.",
  },
  {
    name: "Washington",
    abbr: "WA",
    slug: "washington",
    boardName: "Washington State Medical Commission",
    boardUrl:
      "https://www.doh.wa.gov/LicensesPermitsandCertificates/MedicalCommission",
    boardDescription:
      "The Washington State Medical Commission licenses and regulates MDs and physician assistants.",
  },
  {
    name: "West Virginia",
    abbr: "WV",
    slug: "west-virginia",
    boardName: "West Virginia Board of Medicine",
    boardUrl: "https://wvbom.wv.gov",
    boardDescription:
      "West Virginia's Board of Medicine licenses physicians and protects patients through regulatory oversight.",
  },
  {
    name: "Wisconsin",
    abbr: "WI",
    slug: "wisconsin",
    boardName: "Wisconsin Medical Examining Board",
    boardUrl:
      "https://dsps.wi.gov/Pages/Professions/PhysicianMedicalDoctor/Default.aspx",
    boardDescription:
      "Wisconsin's Medical Examining Board licenses physicians and upholds standards of medical practice.",
  },
  {
    name: "Wyoming",
    abbr: "WY",
    slug: "wyoming",
    boardName: "Wyoming Board of Medicine",
    boardUrl: "https://wyomingboard.com",
    boardDescription:
      "Wyoming's Board of Medicine licenses and regulates physician practice to protect Wyoming residents.",
  },
  {
    name: "Washington D.C.",
    abbr: "DC",
    slug: "washington-dc",
    boardName: "District of Columbia Board of Medicine",
    boardUrl: "https://dchealth.dc.gov/node/197462",
    boardDescription:
      "D.C.'s Board of Medicine licenses and regulates physicians practicing in the nation's capital.",
  },
];

/** Look up a state by its URL slug */
export function getStateBySlug(slug: string): StateInfo | undefined {
  return US_STATES.find((s) => s.slug === slug);
}

/** Look up a state by its two-letter abbreviation */
export function getStateByAbbr(abbr: string): StateInfo | undefined {
  return US_STATES.find(
    (s) => s.abbr.toLowerCase() === abbr.toLowerCase()
  );
}

/** Return all state slugs (used for static params generation) */
export function getAllStateSlugs(): string[] {
  return US_STATES.map((s) => s.slug);
}

/** Popular states shown as quick-links on the homepage */
export const FEATURED_STATES: string[] = [
  "california",
  "texas",
  "florida",
  "new-york",
  "pennsylvania",
  "illinois",
  "ohio",
  "georgia",
  "north-carolina",
  "michigan",
];
