export type CountryMarket = {
  slug: string
  country: string
  shortName: string
  regionLabel: string
  cities: string[]
  industryFocus: string[]
  intro: string
  marketContext: string
  logistics: string
  procurementNote: string
}

export const countryMarkets: CountryMarket[] = [
  {
    slug: "uae",
    country: "United Arab Emirates",
    shortName: "UAE",
    regionLabel: "UAE",
    cities: ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Ras Al Khaimah"],
    industryFocus: ["construction", "structural steel", "oil & gas", "marine", "MEP", "manufacturing"],
    intro:
      "SRK Bolt is an industrial fasteners supplier serving the United Arab Emirates for construction, steel fabrication, oil & gas, marine, MEP, machinery and general engineering requirements. Buyers can source bolts, nuts, washers, screws, Hook & Eye products, Rivets & Inserts, Heavy Load attachments and Other Products against standards, drawings or project specifications.",
    marketContext:
      "From our Sharjah base, we support procurement teams, contractors, fabricators and industrial buyers across Dubai, Abu Dhabi, Sharjah and the Northern Emirates. Enquiries can be matched by DIN, ISO, ASTM or project specification, with support for grade, material, coating, thread, size and quantity selection.",
    logistics:
      "UAE orders are coordinated through our Sharjah sales team with support for project RFQs, repeat procurement and bulk requirements. Share the required standard, dimensions, grade, finish and quantity for availability and quotation.",
    procurementNote:
      "For UAE projects, fastener selection commonly depends on load requirements, corrosion exposure, project specifications and compatibility with the connected materials. Our team can help identify suitable options from the available catalogue.",
  },
  {
    slug: "saudi-arabia",
    country: "Saudi Arabia",
    shortName: "Saudi Arabia",
    regionLabel: "Saudi Arabia",
    cities: ["Riyadh", "Jeddah", "Dammam", "Jubail", "Khobar"],
    industryFocus: ["construction", "infrastructure", "oil & gas", "petrochemical", "steel fabrication", "manufacturing"],
    intro:
      "SRK Bolt is a UAE-based industrial fasteners supplier serving customers and projects in Saudi Arabia. Our catalogue covers bolts, nuts, washers, screws, Hook & Eye products, Rivets & Inserts, Heavy Load attachments and Other Products for construction, infrastructure, steel fabrication, energy, petrochemical and industrial maintenance requirements.",
    marketContext:
      "Procurement teams serving Riyadh, Jeddah, Dammam, Jubail, Khobar and other Saudi industrial centres can enquire by DIN, ISO, ASTM or project standard. Product selection can be matched to grade, material, coating, thread form, dimensions and service environment rather than relying on a one-size-fits-all specification.",
    logistics:
      "Saudi enquiries are handled through SRK Bolt's UAE sales team with regional supply support for project and bulk orders. RFQs can include BOQs, drawings or technical schedules so the required fastener standards, sizes, grades and finishes can be reviewed before quotation.",
    procurementNote:
      "For Saudi construction and industrial projects, buyers often need clear traceability to a standard or project specification, plus the correct mechanical grade and protective finish. Providing these details at RFQ stage helps reduce substitution and approval delays.",
  },
  {
    slug: "qatar",
    country: "Qatar",
    shortName: "Qatar",
    regionLabel: "Qatar",
    cities: ["Doha", "Ras Laffan", "Mesaieed", "Lusail"],
    industryFocus: ["construction", "infrastructure", "LNG & energy", "MEP", "steel fabrication", "industrial maintenance"],
    intro:
      "SRK Bolt is a UAE-based industrial fasteners supplier serving Qatar-focused procurement requirements. Our range includes bolts, nuts, washers, screws, Hook & Eye products, Rivets & Inserts, Heavy Load attachments and Other Products for construction, infrastructure, energy, MEP, steel fabrication and maintenance applications.",
    marketContext:
      "Buyers serving Doha, Ras Laffan, Mesaieed, Lusail and other project locations can source products by recognized standard, drawing or technical specification. We support enquiries across different materials, strength grades, coatings, thread types and dimensions to suit both general and project-specific fastening requirements.",
    logistics:
      "Qatar RFQs are coordinated by our UAE sales team for regional supply. Send the standard, size, grade, material, finish, quantity and delivery requirement so the team can review suitable options and prepare a quotation.",
    procurementNote:
      "Qatar projects frequently combine structural, MEP and energy-related specifications, so the correct standard and corrosion protection can be as important as the nominal fastener size. We recommend including the complete technical requirement in each RFQ.",
  },
  {
    slug: "kuwait",
    country: "Kuwait",
    shortName: "Kuwait",
    regionLabel: "Kuwait",
    cities: ["Kuwait City", "Shuaiba", "Ahmadi", "Mina Abdullah"],
    industryFocus: ["oil & gas", "petrochemical", "construction", "industrial maintenance", "power", "steel fabrication"],
    intro:
      "SRK Bolt is a UAE-based industrial fasteners supplier serving customers and projects in Kuwait. The product range covers bolts, nuts, washers, screws, Hook & Eye products, Rivets & Inserts, Heavy Load attachments and Other Products for oil & gas, petrochemical, construction, power, steel and maintenance requirements.",
    marketContext:
      "Procurement teams serving Kuwait City, Shuaiba, Ahmadi, Mina Abdullah and other industrial areas can enquire using DIN, ISO, ASTM or project-specific references. We help align products with the required size, mechanical grade, material, thread, coating and application conditions.",
    logistics:
      "Kuwait orders and project RFQs are handled through our UAE sales team with regional supply support. Buyers can submit BOQs, technical schedules and drawings for review alongside quantities and delivery requirements.",
    procurementNote:
      "In petrochemical and maintenance environments, material compatibility and corrosion protection can materially affect fastener performance. Where the project specifies a grade or coating, include it clearly in the RFQ to avoid unsuitable substitutions.",
  },
  {
    slug: "bahrain",
    country: "Bahrain",
    shortName: "Bahrain",
    regionLabel: "Bahrain",
    cities: ["Manama", "Hidd", "Sitra", "Askar"],
    industryFocus: ["construction", "aluminium & metals", "marine", "oil & gas", "industrial maintenance", "fabrication"],
    intro:
      "SRK Bolt is a UAE-based industrial fasteners supplier serving customers and projects in Bahrain. Buyers can source bolts, nuts, washers, screws, Hook & Eye products, Rivets & Inserts, Heavy Load attachments and Other Products for construction, metals, marine, oil & gas, fabrication and maintenance applications.",
    marketContext:
      "For requirements in Manama, Hidd, Sitra, Askar and other industrial locations, products can be specified by DIN, ISO, ASTM, drawing or project requirement. We support selection across multiple grades, materials, coatings, thread forms and dimensions for general as well as demanding service environments.",
    logistics:
      "Bahrain enquiries are coordinated by our UAE sales team for regional supply. Project buyers can share BOQs or technical schedules together with required standards, sizes, finishes, quantities and target delivery requirements.",
    procurementNote:
      "Bahrain's marine and metals-related applications can require particular attention to corrosion resistance and material compatibility. The operating environment should be considered alongside strength grade and dimensional standard when preparing an RFQ.",
  },
  {
    slug: "oman",
    country: "Oman",
    shortName: "Oman",
    regionLabel: "Oman",
    cities: ["Muscat", "Sohar", "Duqm", "Salalah"],
    industryFocus: ["oil & gas", "ports & marine", "construction", "industrial projects", "power", "steel fabrication"],
    intro:
      "SRK Bolt is a UAE-based industrial fasteners supplier serving industrial and project requirements in Oman. Our catalogue includes bolts, nuts, washers, screws, Hook & Eye products, Rivets & Inserts, Heavy Load attachments and Other Products for oil & gas, ports, marine, construction, power, fabrication and general industrial projects.",
    marketContext:
      "Procurement teams serving Muscat, Sohar, Duqm, Salalah and other Omani project locations can source against DIN, ISO, ASTM or project specifications. Enquiries can be matched by size, grade, material, thread, coating and application environment, including requirements exposed to heat, humidity or coastal conditions.",
    logistics:
      "Oman RFQs are managed through our UAE sales team with regional supply support. Share drawings, BOQs or product standards together with quantity and delivery needs so suitable catalogue options can be reviewed before quotation.",
    procurementNote:
      "For coastal, port and industrial projects in Oman, the protective finish and base material should be selected with the service environment in mind. Providing environmental or coating requirements at RFQ stage helps narrow the correct fastener option.",
  },
  {
    slug: "iraq",
    country: "Iraq",
    shortName: "Iraq",
    regionLabel: "Iraq",
    cities: ["Baghdad", "Basra", "Erbil", "Kirkuk"],
    industryFocus: ["oil & gas", "power", "infrastructure", "construction", "industrial maintenance", "steel fabrication"],
    intro:
      "SRK Bolt is a UAE-based industrial fasteners supplier serving customers and projects in Iraq. Our range includes bolts, nuts, washers, screws, Hook & Eye products, Rivets & Inserts, Heavy Load attachments and Other Products for oil & gas, power, infrastructure, construction, maintenance and fabrication requirements.",
    marketContext:
      "For procurement serving Baghdad, Basra, Erbil, Kirkuk and other project locations, products can be identified by DIN, ISO, ASTM, drawing or technical specification. We support enquiries requiring defined grades, materials, coatings, thread forms, dimensions and quantities.",
    logistics:
      "Iraq enquiries are reviewed by our UAE sales team as regional supply requirements. For project RFQs, provide the complete technical schedule, BOQ or drawing together with required quantities and delivery information so availability and suitable options can be assessed.",
    procurementNote:
      "Infrastructure, power and oil & gas projects often use tightly specified fastener grades and finishes. Clear technical references are especially important when an alternative standard or equivalent product requires approval.",
  },
  {
    slug: "jordan",
    country: "Jordan",
    shortName: "Jordan",
    regionLabel: "Jordan",
    cities: ["Amman", "Zarqa", "Aqaba", "Irbid"],
    industryFocus: ["construction", "industrial maintenance", "MEP", "renewable energy", "steel fabrication", "infrastructure"],
    intro:
      "SRK Bolt is a UAE-based industrial fasteners supplier serving customers and projects in Jordan. The catalogue covers bolts, nuts, washers, screws, Hook & Eye products, Rivets & Inserts, Heavy Load attachments and Other Products for construction, MEP, renewable energy, steel fabrication, infrastructure and industrial maintenance.",
    marketContext:
      "Buyers serving Amman, Zarqa, Aqaba, Irbid and other Jordanian markets can enquire using DIN, ISO, ASTM or project-specific references. We support requirements across different materials, grades, coatings, thread types and dimensions for both recurring maintenance and project procurement.",
    logistics:
      "Jordan RFQs are coordinated through our UAE sales team for regional supply. Share the product standard or drawing, dimensions, grade, finish, quantity and delivery requirement for availability review and quotation.",
    procurementNote:
      "For construction, renewable energy and industrial maintenance, the correct fastener is determined by the joint design and service conditions rather than size alone. Include any specified grade, coating or material requirement when submitting an RFQ.",
  },
]

export const countryMarketBySlug = Object.fromEntries(
  countryMarkets.map((market) => [market.slug, market])
) as Record<string, CountryMarket>

export function getCountryMarket(slug: string) {
  return countryMarketBySlug[slug]
}
