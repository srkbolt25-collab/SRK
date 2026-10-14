// Comprehensive SRK Bolts product database

export interface SRKProduct {
  id: string
  name: string
  category: string
  image: string
  images?: string[]
  standard?: string
  equivalentStandard?: string
  material?: string
  grades?: string[]
  sizes?: string
  coating?: string[]
  description: string
  features: string[]
  uses: string[]
  specifications: {
    standard?: string
    equivalentStandard?: string
    material?: string
    grades?: string[]
    sizes?: string
    coating?: string[]
    tensileStrength?: string
    threadType?: string
    finish?: string[]
  }
}

// Helper function to get category route
export const getCategoryRoute = (category: string): string => {
  const routes: { [key: string]: string } = {
    "BOLTS": "/bolts",
    "NUTS": "/nuts",
    "WASHERS": "/washers",
    "SCREWS": "/screws",
    "HOOK & EYE": "/hook-eye",
    "RIVETS": "/rivets-pin-inserts",
    "ATTACHMENTS": "/heavy-load-attachments",
    "OTHER": "/products"
  }
  return routes[category] || "/products"
}

// All SRK Bolts products and SEO product records
export const srkProducts: SRKProduct[] = [
  // BOLTS
  {
    id: "bolt-1",
    name: "DIN 933 / 931 Hexagon Bolt",
    category: "BOLTS",
    image: "https://www.husainibrothers.com/cdn/images/200/5921504842_1635755736.jpg",
    standard: "DIN 933 / 931",
    material: "Steel / Stainless Steel",
    grades: ["Grade 4.6", "Grade 8.8", "Grade 10.9"],
    sizes: "M6 to M42",
    coating: ["Zinc Plated", "Hot Dip Galvanized", "Black"],
    description: "Premium quality DIN 933/931 Hexagon Bolts suitable for industrial and construction applications. These bolts meet international standards and are available in multiple grades and coatings.",
    features: [
      "Precision engineered for perfect fit",
      "Meets international DIN standards",
      "Available in multiple grades (4.6, 8.8, 10.9)",
      "Corrosion resistant coating options",
      "Bulk quantities available",
      "Fast delivery"
    ],
    uses: [
      "Construction & Structural Steel",
      "Industrial Manufacturing",
      "Oil & Petrochemical",
      "Automotive Industry",
      "Infrastructure Projects"
    ],
    specifications: {
      standard: "DIN 933 / 931",
      material: "Steel / Stainless Steel",
      grades: ["Grade 4.6", "Grade 8.8", "Grade 10.9"],
      sizes: "M6 to M42",
      coating: ["Zinc Plated", "Hot Dip Galvanized", "Black"],
      tensileStrength: "High Strength"
    }
  },
  {
    id: "bolt-2",
    name: "ASTM A325M Heavy Hexagon Bolt",
    category: "BOLTS",
    image: "https://www.husainibrothers.com/cdn/images/200/5921504842_1635755736.jpg",
    standard: "ASTM A325M",
    material: "Carbon Steel",
    grades: ["ASTM A325"],
    sizes: "M12 to M36",
    coating: ["Black", "Hot Dip Galvanized"],
    description: "High tensile steel Heavy Hexagon Bolts conforming to ASTM A325M standard. Ideal for structural steel connections.",
    features: [
      "ASTM A325M compliant",
      "Heavy hexagon head design",
      "Structural grade quality",
      "Available in Black and HDG",
      "Suitable for friction grip applications"
    ],
    uses: [
      "Construction & Structural Steel",
      "Bridge Construction",
      "Heavy Industrial Applications",
      "Steel Frame Buildings"
    ],
    specifications: {
      standard: "ASTM A325M",
      material: "Carbon Steel",
      grades: ["ASTM A325"],
      sizes: "M12 to M36",
      coating: ["Black", "Hot Dip Galvanized"],
      tensileStrength: "High Tensile"
    }
  },
  {
    id: "bolt-3",
    name: "ASTM A490M Heavy Hexagon Bolt Friction Grip",
    category: "BOLTS",
    image: "https://www.husainibrothers.com/cdn/images/200/5921504842_1635755736.jpg",
    standard: "ASTM A490M",
    material: "Alloy Steel",
    grades: ["ASTM A490"],
    sizes: "M12 to M36",
    coating: ["Black", "Hot Dip Galvanized"],
    description: "High Strength Friction Grip (H.S.F.G.) bolts meeting ASTM A490M standard. Used for critical structural connections.",
    features: [
      "ASTM A490M compliant",
      "Friction grip design",
      "Highest tensile strength",
      "Available with matching nut and washer",
      "Critical structural applications"
    ],
    uses: [
      "Structural Steel Connections",
      "Critical Load Applications",
      "Seismic Resistant Structures",
      "High-Rise Buildings"
    ],
    specifications: {
      standard: "ASTM A490M",
      material: "Alloy Steel",
      grades: ["ASTM A490"],
      sizes: "M12 to M36",
      coating: ["Black", "Hot Dip Galvanized"],
      tensileStrength: "Ultra High Strength"
    }
  },
  {
    id: "bolt-4",
    name: "DIN 975/976-1 Threaded Rods",
    category: "BOLTS",
    image: "https://www.husainibrothers.com/cdn/images/200/5921504842_1635755736.jpg",
    standard: "DIN 975/976-1",
    material: "Steel / Stainless Steel",
    grades: ["Grade 4.6", "Grade 8.8", "Grade 10.9"],
    sizes: "M6 to M42",
    coating: ["Zinc Plated", "Hot Dip Galvanized", "Black"],
    description: "Threaded rods (studs) for various applications. Available in various lengths and thread types.",
    features: [
      "Full length threading",
      "Available in various grades",
      "Custom lengths available",
      "Multiple coating options"
    ],
    uses: [
      "Anchor Applications",
      "Suspension Systems",
      "Structural Applications",
      "Industrial Machinery"
    ],
    specifications: {
      standard: "DIN 975/976-1",
      material: "Steel / Stainless Steel",
      grades: ["Grade 4.6", "Grade 8.8", "Grade 10.9"],
      sizes: "M6 to M42",
      coating: ["Zinc Plated", "Hot Dip Galvanized", "Black"],
      threadType: "Full Thread"
    }
  },
  {
    id: "bolt-5",
    name: "DIN 912 Allen Bolt",
    category: "BOLTS",
    image: "https://www.husainibrothers.com/cdn/images/200/5921504842_1635755736.jpg",
    standard: "DIN 912",
    material: "Steel / Stainless Steel",
    grades: ["Grade 8.8", "Grade 10.9", "Grade 12.9"],
    sizes: "M3 to M24",
    coating: ["Black", "Zinc Plated", "Stainless Steel"],
    description: "Socket head cap screws (Allen bolts) with internal hex drive. Ideal for applications requiring flush or recessed heads.",
    features: [
      "Internal hex drive",
      "Socket head design",
      "High strength grades available",
      "Precision manufactured",
      "Used in precision applications"
    ],
    uses: [
      "Precision Machinery",
      "Automotive Applications",
      "Electronics",
      "General Industrial Use"
    ],
    specifications: {
      standard: "DIN 912",
      material: "Steel / Stainless Steel",
      grades: ["Grade 8.8", "Grade 10.9", "Grade 12.9"],
      sizes: "M3 to M24",
      coating: ["Black", "Zinc Plated", "Stainless Steel"],
      tensileStrength: "High Strength"
    }
  },
  {
    id: "bolt-6",
    name: "DIN 7991 Allen CSK Bolt",
    category: "BOLTS",
    image: "https://www.husainibrothers.com/cdn/images/200/5921504842_1635755736.jpg",
    standard: "DIN 7991",
    material: "Steel / Stainless Steel",
    grades: ["Grade 8.8", "Grade 10.9", "Grade 12.9"],
    sizes: "M3 to M16",
    coating: ["Black", "Zinc Plated", "Stainless Steel"],
    description: "Socket head cap screws with countersunk head. Provides flush surface finish.",
    features: [
      "Countersunk head",
      "Flush mounting",
      "Internal hex drive",
      "High strength options",
      "Precision grade"
    ],
    uses: [
      "Sheet Metal Applications",
      "Automotive Body Work",
      "Aerospace",
      "Precision Assemblies"
    ],
    specifications: {
      standard: "DIN 7991",
      material: "Steel / Stainless Steel",
      grades: ["Grade 8.8", "Grade 10.9", "Grade 12.9"],
      sizes: "M3 to M16",
      coating: ["Black", "Zinc Plated", "Stainless Steel"]
    }
  },
  {
    id: "bolt-7",
    name: "Eye Bolt With 2washer Nut",
    category: "BOLTS",
    image: "https://www.husainibrothers.com/cdn/images/200/5921504842_1635755736.jpg",
    standard: "Custom",
    material: "Carbon Steel / Stainless Steel",
    grades: ["Grade 4.6", "Grade 8.8"],
    sizes: "M6 to M36",
    coating: ["Hot Dip Galvanized", "Stainless Steel", "Black"],
    description: "Eye bolts with two washers and nut for lifting and rigging applications. Rated for overhead lifting.",
    features: [
      "Rated for lifting",
      "Includes washers and nut",
      "Safety rated",
      "Multiple sizes available",
      "Used in lifting applications"
    ],
    uses: [
      "Lifting Applications",
      "Rigging",
      "Overhead Cranes",
      "Material Handling"
    ],
    specifications: {
      standard: "Custom",
      material: "Carbon Steel / Stainless Steel",
      grades: ["Grade 4.6", "Grade 8.8"],
      sizes: "M6 to M36",
      coating: ["Hot Dip Galvanized", "Stainless Steel", "Black"]
    }
  },
  {
    id: "bolt-8",
    name: "DIN 186B T Bolt",
    category: "BOLTS",
    image: "https://www.husainibrothers.com/cdn/images/200/5921504842_1635755736.jpg",
    standard: "DIN 186B",
    material: "Steel",
    grades: ["Grade 8.8"],
    sizes: "M6 to M20",
    coating: ["Zinc Plated", "Black"],
    description: "T-bolts with T-shaped head for use with T-slots in machine tables and fixtures.",
    features: [
      "T-shaped head",
      "For T-slot applications",
      "Machine tool applications",
      "Secure clamping"
    ],
    uses: [
      "Machine Tool Tables",
      "Workholding Fixtures",
      "Manufacturing Equipment",
      "Jig and Fixture Applications"
    ],
    specifications: {
      standard: "DIN 186B",
      material: "Steel",
      grades: ["Grade 8.8"],
      sizes: "M6 to M20",
      coating: ["Zinc Plated", "Black"]
    }
  },
  {
    id: "bolt-9",
    name: "Track Shoe Bolt",
    category: "BOLTS",
    image: "https://www.husainibrothers.com/cdn/images/200/5921504842_1635755736.jpg",
    standard: "Custom",
    material: "Carbon Steel",
    grades: ["Grade 8.8", "Grade 10.9"],
    sizes: "Custom",
    coating: ["Hard Chrome", "Black"],
    description: "Specialized bolts for track shoe applications in heavy machinery and excavators.",
    features: [
      "Heavy duty design",
      "Custom sizes",
      "High strength",
      "Hard wearing",
      "Mining and construction equipment"
    ],
    uses: [
      "Excavators",
      "Bulldozers",
      "Mining Equipment",
      "Construction Machinery"
    ],
    specifications: {
      standard: "Custom",
      material: "Carbon Steel",
      grades: ["Grade 8.8", "Grade 10.9"],
      sizes: "Custom",
      coating: ["Hard Chrome", "Black"]
    }
  },
  {
    id: "bolt-10",
    name: "DIN 939 1.25D Engineering Stud",
    category: "BOLTS",
    image: "https://www.husainibrothers.com/cdn/images/200/5921504842_1635755736.jpg",
    standard: "DIN 939",
    material: "Steel",
    grades: ["Grade 8.8", "Grade 10.9"],
    sizes: "M6 to M42",
    coating: ["Zinc Plated", "Hot Dip Galvanized"],
    description: "Engineering studs with 1.25D thread length. Used in engineering applications.",
    features: [
      "1.25D thread length",
      "Engineering grade",
      "Multiple sizes",
      "Precision manufactured"
    ],
    uses: [
      "Engineering Applications",
      "Machinery Assembly",
      "Industrial Equipment",
      "Automotive Applications"
    ],
    specifications: {
      standard: "DIN 939",
      material: "Steel",
      grades: ["Grade 8.8", "Grade 10.9"],
      sizes: "M6 to M42",
      coating: ["Zinc Plated", "Hot Dip Galvanized"]
    }
  },
  {
    id: "bolt-11",
    name: "DIN 938 1D Engineering Stud",
    category: "BOLTS",
    image: "https://www.husainibrothers.com/cdn/images/200/5921504842_1635755736.jpg",
    standard: "DIN 938",
    material: "Steel",
    grades: ["Grade 8.8", "Grade 10.9"],
    sizes: "M6 to M42",
    coating: ["Zinc Plated", "Hot Dip Galvanized"],
    description: "Engineering studs with 1D thread length. Standard engineering applications.",
    features: [
      "1D thread length",
      "Engineering grade",
      "Standard applications",
      "Quality assured"
    ],
    uses: [
      "Engineering Applications",
      "General Industrial Use",
      "Machinery Assembly",
      "Equipment Manufacturing"
    ],
    specifications: {
      standard: "DIN 938",
      material: "Steel",
      grades: ["Grade 8.8", "Grade 10.9"],
      sizes: "M6 to M42",
      coating: ["Zinc Plated", "Hot Dip Galvanized"]
    }
  },
  {
    id: "bolt-12",
    name: "DIN 835 2D Engineering Stud",
    category: "BOLTS",
    image: "https://www.husainibrothers.com/cdn/images/200/5921504842_1635755736.jpg",
    standard: "DIN 835",
    material: "Steel",
    grades: ["Grade 8.8", "Grade 10.9"],
    sizes: "M6 to M42",
    coating: ["Zinc Plated", "Hot Dip Galvanized"],
    description: "Engineering studs with 2D thread length for extended thread engagement.",
    features: [
      "2D thread length",
      "Extended engagement",
      "Engineering applications",
      "High strength"
    ],
    uses: [
      "Heavy Engineering",
      "Structural Applications",
      "High Load Applications",
      "Industrial Equipment"
    ],
    specifications: {
      standard: "DIN 835",
      material: "Steel",
      grades: ["Grade 8.8", "Grade 10.9"],
      sizes: "M6 to M42",
      coating: ["Zinc Plated", "Hot Dip Galvanized"]
    }
  },
  // NUTS
  {
    id: "nut-1",
    name: "DIN 6331 Hex Nut With Collar",
    category: "NUTS",
    image: "https://www.husainibrothers.com/cdn/images/200/2234904239_1635767136.jpg",
    standard: "DIN 6331",
    material: "Steel",
    grades: ["Grade 4", "Grade 8", "Grade 10"],
    sizes: "M6 to M42",
    coating: ["Zinc Plated", "Hot Dip Galvanized", "Black"],
    description: "Hex nuts with collar for enhanced bearing surface. Provides better load distribution.",
    features: [
      "Collar design",
      "Enhanced bearing surface",
      "Better load distribution",
      "Standard hex drive"
    ],
    uses: [
      "Structural Applications",
      "General Fastening",
      "High Load Applications",
      "Industrial Use"
    ],
    specifications: {
      standard: "DIN 6331",
      material: "Steel",
      grades: ["Grade 4", "Grade 8", "Grade 10"],
      sizes: "M6 to M42",
      coating: ["Zinc Plated", "Hot Dip Galvanized", "Black"]
    }
  },
  {
    id: "nut-2",
    name: "DIN 985/982 Self Locking Nut",
    category: "NUTS",
    image: "https://www.husainibrothers.com/cdn/images/200/2234904239_1635767136.jpg",
    standard: "DIN 985/982",
    material: "Steel / Nylon Insert",
    grades: ["Grade 8", "Grade 10"],
    sizes: "M6 to M24",
    coating: ["Zinc Plated", "Stainless Steel"],
    description: "Self-locking nuts with nylon insert to prevent loosening under vibration.",
    features: [
      "Nylon insert",
      "Self-locking",
      "Vibration resistant",
      "Reusable",
      "Prevents loosening"
    ],
    uses: [
      "Vibration Applications",
      "Automotive",
      "Aerospace",
      "Machinery Subject to Vibration"
    ],
    specifications: {
      standard: "DIN 985/982",
      material: "Steel / Nylon Insert",
      grades: ["Grade 8", "Grade 10"],
      sizes: "M6 to M24",
      coating: ["Zinc Plated", "Stainless Steel"]
    }
  },
  {
    id: "nut-3",
    name: "DIN 6926 Self Locking Hexagon Flange Nut",
    category: "NUTS",
    image: "https://www.husainibrothers.com/cdn/images/200/2234904239_1635767136.jpg",
    standard: "DIN 6926",
    material: "Steel",
    grades: ["Grade 8", "Grade 10"],
    sizes: "M6 to M24",
    coating: ["Zinc Plated", "Hot Dip Galvanized"],
    description: "Self-locking flange nuts with built-in washer. Provides increased bearing surface and locking capability.",
    features: [
      "Integrated flange",
      "Self-locking",
      "Built-in washer",
      "Increased bearing surface",
      "Vibration resistant"
    ],
    uses: [
      "Automotive Applications",
      "Vibration Environments",
      "Sheet Metal Applications",
      "General Industrial Use"
    ],
    specifications: {
      standard: "DIN 6926",
      material: "Steel",
      grades: ["Grade 8", "Grade 10"],
      sizes: "M6 to M24",
      coating: ["Zinc Plated", "Hot Dip Galvanized"]
    }
  },
  {
    id: "nut-4",
    name: "DIN 917 Hexagon Cap Nut",
    category: "NUTS",
    image: "https://www.husainibrothers.com/cdn/images/200/2234904239_1635767136.jpg",
    standard: "DIN 917",
    material: "Steel / Stainless Steel",
    grades: ["Grade 4", "Grade 8"],
    sizes: "M6 to M24",
    coating: ["Zinc Plated", "Chrome Plated", "Stainless Steel"],
    description: "Hexagon cap nuts with closed end for decorative finish and thread protection.",
    features: [
      "Closed end",
      "Decorative finish",
      "Thread protection",
      "Clean appearance",
      "Multiple finishes"
    ],
    uses: [
      "Decorative Applications",
      "Furniture",
      "Consumer Products",
      "General Assembly"
    ],
    specifications: {
      standard: "DIN 917",
      material: "Steel / Stainless Steel",
      grades: ["Grade 4", "Grade 8"],
      sizes: "M6 to M24",
      coating: ["Zinc Plated", "Chrome Plated", "Stainless Steel"]
    }
  },
  {
    id: "nut-5",
    name: "DIN 928 Square Weld Nut",
    category: "NUTS",
    image: "https://www.husainibrothers.com/cdn/images/200/2234904239_1635767136.jpg",
    standard: "DIN 928",
    material: "Steel",
    grades: ["Grade 4", "Grade 8"],
    sizes: "M6 to M20",
    coating: ["Black", "Zinc Plated"],
    description: "Square weld nuts for permanent attachment to metal surfaces via welding.",
    features: [
      "Weldable",
      "Square shape",
      "Permanent attachment",
      "High strength",
      "Used in welding applications"
    ],
    uses: [
      "Welding Applications",
      "Sheet Metal",
      "Fabrication",
      "Structural Welding"
    ],
    specifications: {
      standard: "DIN 928",
      material: "Steel",
      grades: ["Grade 4", "Grade 8"],
      sizes: "M6 to M20",
      coating: ["Black", "Zinc Plated"]
    }
  },
  {
    id: "nut-6",
    name: "DIN 936 Hexagon Thin Nut, Medium",
    category: "NUTS",
    image: "https://www.husainibrothers.com/cdn/images/200/2234904239_1635767136.jpg",
    standard: "DIN 936",
    material: "Steel",
    grades: ["Grade 4", "Grade 8"],
    sizes: "M6 to M24",
    coating: ["Zinc Plated", "Hot Dip Galvanized", "Black"],
    description: "Thin hex nuts for applications with limited space. Medium height variant.",
    features: [
      "Reduced height",
      "Space saving",
      "Standard hex drive",
      "Weight reduction"
    ],
    uses: [
      "Limited Space Applications",
      "Compact Assemblies",
      "Lightweight Construction",
      "General Fastening"
    ],
    specifications: {
      standard: "DIN 936",
      material: "Steel",
      grades: ["Grade 4", "Grade 8"],
      sizes: "M6 to M24",
      coating: ["Zinc Plated", "Hot Dip Galvanized", "Black"]
    }
  },
  {
    id: "nut-7",
    name: "DIN 439 Hexagon Very Thin Nut",
    category: "NUTS",
    image: "https://www.husainibrothers.com/cdn/images/200/2234904239_1635767136.jpg",
    standard: "DIN 439",
    material: "Steel",
    grades: ["Grade 4", "Grade 8"],
    sizes: "M6 to M24",
    coating: ["Zinc Plated", "Hot Dip Galvanized", "Black"],
    description: "Very thin hex nuts for applications with very limited space constraints.",
    features: [
      "Ultra thin height",
      "Maximum space savings",
      "Weight optimized",
      "For tight spaces"
    ],
    uses: [
      "Extremely Tight Spaces",
      "Electronics",
      "Compact Design",
      "Minimal Profile Applications"
    ],
    specifications: {
      standard: "DIN 439",
      material: "Steel",
      grades: ["Grade 4", "Grade 8"],
      sizes: "M6 to M24",
      coating: ["Zinc Plated", "Hot Dip Galvanized", "Black"]
    }
  },
  {
    id: "nut-8",
    name: "Cage Nut",
    category: "NUTS",
    image: "https://www.husainibrothers.com/cdn/images/200/2234904239_1635767136.jpg",
    standard: "Custom",
    material: "Steel",
    grades: ["Grade 8"],
    sizes: "M6 to M12",
    coating: ["Zinc Plated", "Black"],
    description: "Cage nuts for use in square holes. Common in server racks and electronic enclosures.",
    features: [
      "Square hole compatible",
      "Spring loaded",
      "Easy installation",
      "Rack mount applications"
    ],
    uses: [
      "Server Racks",
      "Electronic Enclosures",
      "Equipment Racks",
      "Telecommunications"
    ],
    specifications: {
      standard: "Custom",
      material: "Steel",
      grades: ["Grade 8"],
      sizes: "M6 to M12",
      coating: ["Zinc Plated", "Black"]
    }
  },
  {
    id: "nut-9",
    name: "NUT Cylindrical Cage Nut",
    category: "NUTS",
    image: "https://www.husainibrothers.com/cdn/images/200/2234904239_1635767136.jpg",
    standard: "Custom",
    material: "Steel",
    grades: ["Grade 8"],
    sizes: "M6 to M12",
    coating: ["Zinc Plated", "Black"],
    description: "Cylindrical cage nuts for round hole applications in panels and enclosures.",
    features: [
      "Round hole compatible",
      "Cylindrical design",
      "Spring retention",
      "Panel mounting"
    ],
    uses: [
      "Panel Mounting",
      "Enclosures",
      "Electrical Panels",
      "Industrial Equipment"
    ],
    specifications: {
      standard: "Custom",
      material: "Steel",
      grades: ["Grade 8"],
      sizes: "M6 to M12",
      coating: ["Zinc Plated", "Black"]
    }
  },
  {
    id: "nut-10",
    name: "DIN 937 Castle Nut",
    category: "NUTS",
    image: "https://www.husainibrothers.com/cdn/images/200/2234904239_1635767136.jpg",
    standard: "DIN 937",
    material: "Steel",
    grades: ["Grade 4", "Grade 8"],
    sizes: "M6 to M24",
    coating: ["Zinc Plated", "Black"],
    description: "Castle nuts with slots for cotter pin insertion. Used in critical applications requiring positive locking.",
    features: [
      "Slotted design",
      "Cotter pin compatible",
      "Positive locking",
      "Safety critical applications"
    ],
    uses: [
      "Automotive Suspension",
      "Aircraft Applications",
      "Safety Critical Assemblies",
      "Heavy Machinery"
    ],
    specifications: {
      standard: "DIN 937",
      material: "Steel",
      grades: ["Grade 4", "Grade 8"],
      sizes: "M6 to M24",
      coating: ["Zinc Plated", "Black"]
    }
  },
  {
    id: "nut-11",
    name: "DIN 979 Castle Nut",
    category: "NUTS",
    image: "https://www.husainibrothers.com/cdn/images/200/2234904239_1635767136.jpg",
    standard: "DIN 979",
    material: "Steel",
    grades: ["Grade 4", "Grade 8"],
    sizes: "M6 to M24",
    coating: ["Zinc Plated", "Black"],
    description: "Castle nuts meeting DIN 979 standard. Alternative specification for slotted nuts.",
    features: [
      "DIN 979 compliant",
      "Slotted design",
      "Cotter pin compatible",
      "High strength option"
    ],
    uses: [
      "Safety Applications",
      "Critical Fastening",
      "Automotive",
      "Aerospace"
    ],
    specifications: {
      standard: "DIN 979",
      material: "Steel",
      grades: ["Grade 4", "Grade 8"],
      sizes: "M6 to M24",
      coating: ["Zinc Plated", "Black"]
    }
  },
  {
    id: "nut-12",
    name: "NUT Speed Nut",
    category: "NUTS",
    image: "https://www.husainibrothers.com/cdn/images/200/2234904239_1635767136.jpg",
    standard: "Custom",
    material: "Spring Steel",
    grades: ["Custom"],
    sizes: "M3 to M8",
    coating: ["Zinc Plated", "Phosphate"],
    description: "Speed nuts (spring nuts) for quick installation without tools in certain applications.",
    features: [
      "Quick installation",
      "No tools required",
      "Spring steel",
      "Light duty applications",
      "Cost effective"
    ],
    uses: [
      "Light Duty Applications",
      "Automotive Trim",
      "Consumer Products",
      "Quick Assembly"
    ],
    specifications: {
      standard: "Custom",
      material: "Spring Steel",
      grades: ["Custom"],
      sizes: "M3 to M8",
      coating: ["Zinc Plated", "Phosphate"]
    }
  },
  // Continue with WASHERS, SCREWS, HOOK & EYE, RIVETS, ATTACHMENTS, OTHER...
  // Note: Adding key products for brevity, but the pattern is the same
  {
    id: "washer-1",
    name: "DIN 6796 Conical Spring Washer",
    category: "WASHERS",
    image: "https://www.husainibrothers.com/cdn/images/200/4239323714_1635767753.jpg",
    standard: "DIN 6796",
    material: "Spring Steel",
    grades: ["Standard"],
    sizes: "M3 to M24",
    coating: ["Zinc Plated", "Phosphated", "Black"],
    description: "Conical spring washers providing spring tension to prevent loosening under vibration.",
    features: [
      "Spring tension",
      "Vibration resistant",
      "Conical design",
      "Prevents loosening"
    ],
    uses: [
      "Vibration Applications",
      "General Fastening",
      "Preventing Loosening",
      "Industrial Equipment"
    ],
    specifications: {
      standard: "DIN 6796",
      material: "Spring Steel",
      sizes: "M3 to M24",
      coating: ["Zinc Plated", "Phosphated", "Black"]
    }
  },
  {
    id: "screw-1",
    name: "DIN 86 Roundhead Machine Screw",
    category: "SCREWS",
    image: "https://www.husainibrothers.com/cdn/images/200/roundhead-machine-screw.jpg",
    standard: "DIN 86",
    material: "Steel / Stainless Steel",
    grades: ["Grade 4.6", "Grade 8.8"],
    sizes: "M3 to M12",
    coating: ["Zinc Plated", "Stainless Steel", "Black"],
    description: "Roundhead machine screws with pan head for general purpose fastening applications.",
    features: [
      "Round head",
      "Machine thread",
      "General purpose",
      "Multiple finishes"
    ],
    uses: [
      "General Assembly",
      "Electronics",
      "Furniture",
      "Light Manufacturing"
    ],
    specifications: {
      standard: "DIN 86",
      material: "Steel / Stainless Steel",
      grades: ["Grade 4.6", "Grade 8.8"],
      sizes: "M3 to M12",
      coating: ["Zinc Plated", "Stainless Steel", "Black"]
    }
  },
  {
    id: "hook-1",
    name: "D Shackle",
    category: "HOOK & EYE",
    image: "https://www.husainibrothers.com/cdn/images/200/4226372436_1635929365.jpg",
    standard: "Custom",
    material: "Carbon Steel / Stainless Steel",
    grades: ["Grade 8", "Stainless 316"],
    sizes: "3mm to 32mm",
    coating: ["Hot Dip Galvanized", "Stainless Steel", "Black"],
    description: "D-shackles for lifting and rigging applications. Rated for overhead lifting.",
    features: [
      "Lifting rated",
      "Safety pin",
      "Multiple sizes",
      "Professional grade"
    ],
    uses: [
      "Lifting Applications",
      "Rigging",
      "Marine Applications",
      "Construction"
    ],
    specifications: {
      standard: "Custom",
      material: "Carbon Steel / Stainless Steel",
      grades: ["Grade 8", "Stainless 316"],
      sizes: "3mm to 32mm",
      coating: ["Hot Dip Galvanized", "Stainless Steel", "Black"]
    }
  },
  {
    id: "rivet-1",
    name: "DIN 472 Retaining Rings Internal Circlip",
    category: "RIVETS",
    image: "https://www.husainibrothers.com/cdn/images/200/7698225208_1635930464.jpg",
    standard: "DIN 472",
    material: "Spring Steel",
    grades: ["Standard"],
    sizes: "5mm to 200mm",
    coating: ["Zinc Plated", "Phosphated"],
    description: "Internal circlips (retaining rings) for securing components in bores.",
    features: [
      "Internal mounting",
      "Spring retention",
      "Precision fit",
      "Multiple sizes"
    ],
    uses: [
      "Shaft Retention",
      "Bearing Retention",
      "General Assembly",
      "Automotive"
    ],
    specifications: {
      standard: "DIN 472",
      material: "Spring Steel",
      sizes: "5mm to 200mm",
      coating: ["Zinc Plated", "Phosphated"]
    }
  },
  {
    id: "attach-1",
    name: "Anchor Bolt",
    category: "ATTACHMENTS",
    image: "https://www.husainibrothers.com/cdn/images/200/5921504842_1635755736.jpg",
    standard: "Custom",
    material: "Carbon Steel",
    grades: ["Grade 4.6", "Grade 8.8"],
    sizes: "M12 to M42",
    coating: ["Hot Dip Galvanized", "Black"],
    description: "Anchor bolts for securing structures to concrete foundations.",
    features: [
      "Concrete anchoring",
      "Heavy duty",
      "Foundation applications",
      "Multiple sizes"
    ],
    uses: [
      "Foundation Anchoring",
      "Structural Attachment",
      "Building Construction",
      "Heavy Equipment Mounting"
    ],
    specifications: {
      standard: "Custom",
      material: "Carbon Steel",
      grades: ["Grade 4.6", "Grade 8.8"],
      sizes: "M12 to M42",
      coating: ["Hot Dip Galvanized", "Black"]
    }
  },
  // SRK SEO product pages added for stainless steel, threaded bar, washer, anchor and project fastener searches
  {
    id: "seo-ss316-hex-bolt",
    name: "SS316 Hex Bolt",
    category: "BOLTS",
    image: "https://www.husainibrothers.com/cdn/images/200/5921504842_1635755736.jpg",
    standard: "DIN 933 / DIN 931",
    material: "Stainless Steel 316",
    grades: ["SS316", "A4 Stainless Steel"],
    sizes: "M6 to M42 or as per project requirement",
    coating: ["Natural stainless finish", "Passivated finish on request"],
    description: "SS316 hex bolts are corrosion-resistant stainless steel fasteners used for marine, chemical, outdoor, construction and industrial assemblies where better corrosion resistance is required than standard carbon steel fasteners.",
    features: ["Stainless Steel 316 material", "Hex head design for standard tooling", "Suitable for marine and outdoor environments", "Available with matching nuts and washers", "Bulk RFQ and project supply support", "DIN 933 fully threaded and DIN 931 partially threaded options"],
    uses: ["marine structures", "outdoor steel work", "chemical plants", "food-grade equipment", "construction and maintenance", "industrial assemblies"],
    specifications: { standard: "DIN 933 / DIN 931", material: "Stainless Steel 316", grades: ["SS316", "A4 Stainless Steel"], sizes: "M6 to M42 or as per project requirement", coating: ["Natural stainless finish", "Passivated finish on request"], threadType: "Metric coarse thread" }
  },
  {
    id: "seo-ss316-csk-allen-bolt",
    name: "SS316 CSK Allen Bolt",
    category: "BOLTS",
    image: "https://www.husainibrothers.com/cdn/images/200/5921504842_1635755736.jpg",
    standard: "DIN 7991",
    material: "Stainless Steel 316",
    grades: ["SS316", "A4 Stainless Steel"],
    sizes: "M3 to M24 or as per requirement",
    coating: ["Natural stainless finish"],
    description: "SS316 CSK Allen bolts are countersunk socket fasteners used where a flush surface finish is required together with corrosion resistance for outdoor, marine and industrial assemblies.",
    features: ["Countersunk head for flush mounting", "Internal hex socket drive", "SS316 corrosion resistance", "Suitable for exposed and marine applications", "Clean finish for equipment and panel assemblies"],
    uses: ["machinery covers", "panels and plates", "marine hardware", "fabrication", "architectural metal work", "equipment assembly"],
    specifications: { standard: "DIN 7991", material: "Stainless Steel 316", grades: ["SS316", "A4 Stainless Steel"], sizes: "M3 to M24 or as per requirement", coating: ["Natural stainless finish"], threadType: "Metric thread" }
  },
  {
    id: "seo-ss316-socket-head-allen-bolt",
    name: "SS316 Socket Head Allen Bolt",
    category: "BOLTS",
    image: "https://www.husainibrothers.com/cdn/images/200/5921504842_1635755736.jpg",
    standard: "DIN 912",
    material: "Stainless Steel 316",
    grades: ["SS316", "A4 Stainless Steel"],
    sizes: "M3 to M24 or as per project requirement",
    coating: ["Natural stainless finish"],
    description: "SS316 socket head Allen bolts are stainless steel cap screws with internal hex drive, suitable for compact machinery, marine equipment, precision assemblies and corrosion-prone environments.",
    features: ["Socket head cap screw design", "Internal hex drive", "SS316 stainless material", "Suitable for compact assemblies", "Available in project quantities"],
    uses: ["precision machinery", "marine equipment", "pump and valve assemblies", "equipment maintenance", "industrial fabrication"],
    specifications: { standard: "DIN 912", material: "Stainless Steel 316", grades: ["SS316", "A4 Stainless Steel"], sizes: "M3 to M24 or as per project requirement", coating: ["Natural stainless finish"], threadType: "Metric thread" }
  },
  {
    id: "seo-ss316-flange-head-bolt",
    name: "SS316 Flange Head Bolt",
    category: "BOLTS",
    image: "https://www.husainibrothers.com/cdn/images/200/5921504842_1635755736.jpg",
    standard: "DIN 6921 or equivalent",
    material: "Stainless Steel 316",
    grades: ["SS316", "A4 Stainless Steel"],
    sizes: "M6 to M24 or as per requirement",
    coating: ["Natural stainless finish"],
    description: "SS316 flange head bolts combine a hex head with an integrated washer-style flange for improved load distribution in corrosion-prone industrial and outdoor applications.",
    features: ["Integrated flange head", "Improved bearing surface", "SS316 stainless steel", "Good for vibration-prone assemblies", "Bulk quotation support"],
    uses: ["machinery assembly", "equipment frames", "outdoor fabrication", "marine and industrial work", "maintenance projects"],
    specifications: { standard: "DIN 6921 or equivalent", material: "Stainless Steel 316", grades: ["SS316", "A4 Stainless Steel"], sizes: "M6 to M24 or as per requirement", coating: ["Natural stainless finish"], threadType: "Metric thread" }
  },
  {
    id: "seo-ss316-threaded-bars",
    name: "SS316 Threaded Bars",
    category: "BOLTS",
    image: "https://www.husainibrothers.com/cdn/images/200/5921504842_1635755736.jpg",
    standard: "DIN 975 / DIN 976",
    material: "Stainless Steel 316",
    grades: ["SS316", "A4 Stainless Steel"],
    sizes: "M6 to M42, custom cut lengths on request",
    coating: ["Natural stainless finish"],
    description: "SS316 threaded bars are fully threaded stainless steel rods used for suspension, anchoring, supports, long assemblies and outdoor or marine installations requiring corrosion resistance.",
    features: ["Fully threaded bar", "Can be cut to length", "SS316 corrosion resistance", "Suitable for support and anchoring work", "Available with matching nuts and washers"],
    uses: ["MEP supports", "anchor applications", "pipe supports", "marine installations", "fabrication and maintenance"],
    specifications: { standard: "DIN 975 / DIN 976", material: "Stainless Steel 316", grades: ["SS316", "A4 Stainless Steel"], sizes: "M6 to M42, custom cut lengths on request", coating: ["Natural stainless finish"], threadType: "Full metric thread" }
  },
  {
    id: "seo-ss316-stud-bolts",
    name: "SS316 Stud Bolts",
    category: "BOLTS",
    image: "https://www.husainibrothers.com/cdn/images/200/5921504842_1635755736.jpg",
    standard: "DIN 939 / DIN 938 / project specification",
    material: "Stainless Steel 316",
    grades: ["SS316", "A4 Stainless Steel"],
    sizes: "M6 to M42 or as per drawing",
    coating: ["Natural stainless finish"],
    description: "SS316 stud bolts are stainless steel threaded fasteners used for flange joints, machinery, pump assemblies and project applications exposed to moisture or corrosion.",
    features: ["Available in full or partial thread", "SS316 stainless material", "Suitable for flange and equipment joints", "Can be supplied with nuts and washers", "Drawing-based supply available"],
    uses: ["flange joints", "pump and valve assemblies", "marine equipment", "industrial maintenance", "fabrication"],
    specifications: { standard: "DIN 939 / DIN 938 / project specification", material: "Stainless Steel 316", grades: ["SS316", "A4 Stainless Steel"], sizes: "M6 to M42 or as per drawing", coating: ["Natural stainless finish"], threadType: "Metric thread" }
  },
  {
    id: "seo-ss316-flat-washer",
    name: "SS316 Flat Washer",
    category: "WASHERS",
    image: "https://www.husainibrothers.com/cdn/images/200/4239323714_1635767753.jpg",
    standard: "DIN 125 / ISO 7089 or equivalent",
    material: "Stainless Steel 316",
    grades: ["SS316", "A4 Stainless Steel"],
    sizes: "M3 to M42 or as per requirement",
    coating: ["Natural stainless finish"],
    description: "SS316 flat washers distribute load under bolt heads and nuts while providing stainless steel corrosion resistance for outdoor, marine and industrial fastening assemblies.",
    features: ["Load distribution", "Surface protection", "SS316 corrosion resistance", "Suitable with stainless bolts and nuts", "Bulk pack supply available"],
    uses: ["bolt and nut assemblies", "marine fastening", "outdoor steel work", "equipment installation", "maintenance stock"],
    specifications: { standard: "DIN 125 / ISO 7089 or equivalent", material: "Stainless Steel 316", grades: ["SS316", "A4 Stainless Steel"], sizes: "M3 to M42 or as per requirement", coating: ["Natural stainless finish"] }
  },
  {
    id: "seo-ss316-nord-lock-washer",
    name: "SS316 Nord Lock Washer",
    category: "WASHERS",
    image: "https://www.husainibrothers.com/cdn/images/200/4239323714_1635767753.jpg",
    standard: "Wedge-locking washer type",
    material: "Stainless Steel 316",
    grades: ["SS316"],
    sizes: "M3 to M36 or as per availability",
    coating: ["Natural stainless finish"],
    description: "SS316 Nord Lock style washers are wedge-locking washers used to reduce bolt loosening in vibration-prone assemblies where stainless steel corrosion resistance is required.",
    features: ["Wedge-locking function", "Helps resist vibration loosening", "SS316 stainless steel option", "Suitable for critical bolted joints", "Used with matching bolt sizes"],
    uses: ["rotating equipment", "marine assemblies", "heavy machinery", "pumps and motors", "maintenance shutdowns"],
    specifications: { standard: "Wedge-locking washer type", material: "Stainless Steel 316", grades: ["SS316"], sizes: "M3 to M36 or as per availability", coating: ["Natural stainless finish"] }
  },
  {
    id: "seo-ss316-wing-bolt",
    name: "SS316 Wing Bolt",
    category: "BOLTS",
    image: "https://www.husainibrothers.com/cdn/images/200/5921504842_1635755736.jpg",
    standard: "DIN 316 style / project requirement",
    material: "Stainless Steel 316",
    grades: ["SS316", "A4 Stainless Steel"],
    sizes: "M4 to M16 or as per requirement",
    coating: ["Natural stainless finish"],
    description: "SS316 wing bolts are hand-tightened stainless fasteners used where frequent adjustment, quick removal or tool-free fastening is required in corrosion-prone areas.",
    features: ["Tool-free hand tightening", "Wing head design", "SS316 stainless steel", "Good for removable panels", "Suitable for outdoor and marine use"],
    uses: ["access panels", "light equipment fastening", "marine fittings", "temporary assemblies", "maintenance applications"],
    specifications: { standard: "DIN 316 style / project requirement", material: "Stainless Steel 316", grades: ["SS316", "A4 Stainless Steel"], sizes: "M4 to M16 or as per requirement", coating: ["Natural stainless finish"], threadType: "Metric thread" }
  },
  {
    id: "seo-ss316-screw-self-tapping",
    name: "SS316 Screw Self Tapping",
    category: "SCREWS",
    image: "https://www.husainibrothers.com/cdn/images/200/roundhead-machine-screw.jpg",
    standard: "DIN 7981 / DIN 7982 / equivalent",
    material: "Stainless Steel 316",
    grades: ["SS316", "A4 Stainless Steel"],
    sizes: "ST sizes and metric equivalents as per requirement",
    coating: ["Natural stainless finish"],
    description: "SS316 self tapping screws are stainless screws designed to form threads in sheet metal, light sections and panel assemblies while providing corrosion resistance.",
    features: ["Self tapping thread forming design", "SS316 stainless steel", "Pan head or countersunk options", "Useful for panels and light fabrication", "Corrosion-resistant finish"],
    uses: ["sheet metal work", "panels and covers", "marine fittings", "electrical enclosures", "outdoor equipment"],
    specifications: { standard: "DIN 7981 / DIN 7982 / equivalent", material: "Stainless Steel 316", grades: ["SS316", "A4 Stainless Steel"], sizes: "ST sizes and metric equivalents as per requirement", coating: ["Natural stainless finish"], threadType: "Self tapping thread" }
  },
  {
    id: "seo-ss316-screw-self-drilling",
    name: "SS316 Screw Self Drilling",
    category: "SCREWS",
    image: "https://www.husainibrothers.com/cdn/images/200/roundhead-machine-screw.jpg",
    standard: "DIN 7504 / equivalent",
    material: "Stainless Steel 316",
    grades: ["SS316", "A4 Stainless Steel"],
    sizes: "Common self drilling sizes as per project requirement",
    coating: ["Natural stainless finish"],
    description: "SS316 self drilling screws combine a drill point with screw threads for fastening sheet metal and light steel applications where corrosion resistance is important.",
    features: ["Integrated drill point", "SS316 stainless steel", "Fast installation in sheet materials", "Hex head, pan head or countersunk options", "Project quantity support"],
    uses: ["roofing and cladding", "sheet metal fixing", "outdoor equipment", "marine panels", "light steel assemblies"],
    specifications: { standard: "DIN 7504 / equivalent", material: "Stainless Steel 316", grades: ["SS316", "A4 Stainless Steel"], sizes: "Common self drilling sizes as per project requirement", coating: ["Natural stainless finish"], threadType: "Self drilling thread" }
  },
  {
    id: "seo-ss316-u-bolt",
    name: "SS316 U Bolt",
    category: "HOOK & EYE",
    image: "https://www.husainibrothers.com/cdn/images/200/4226372436_1635929365.jpg",
    standard: "DIN 3570 / custom drawing",
    material: "Stainless Steel 316",
    grades: ["SS316", "A4 Stainless Steel"],
    sizes: "Pipe-size and custom U dimensions available on request",
    coating: ["Natural stainless finish"],
    description: "SS316 U bolts are stainless steel U-shaped fasteners used for pipe supports, clamps, marine hardware and outdoor installations requiring corrosion resistance.",
    features: ["U-shaped clamp design", "SS316 stainless material", "Supplied with nuts and washers on request", "Custom leg length and inside width", "Suitable for pipe and round section fixing"],
    uses: ["pipe supports", "marine clamps", "structural fixing", "outdoor utilities", "maintenance and fabrication"],
    specifications: { standard: "DIN 3570 / custom drawing", material: "Stainless Steel 316", grades: ["SS316", "A4 Stainless Steel"], sizes: "Pipe-size and custom U dimensions available on request", coating: ["Natural stainless finish"], threadType: "Metric thread" }
  },
  {
    id: "seo-ss316-button-head-bolt",
    name: "SS316 Button Head Bolt",
    category: "BOLTS",
    image: "https://www.husainibrothers.com/cdn/images/200/5921504842_1635755736.jpg",
    standard: "ISO 7380 / equivalent",
    material: "Stainless Steel 316",
    grades: ["SS316", "A4 Stainless Steel"],
    sizes: "M3 to M20 or as per requirement",
    coating: ["Natural stainless finish"],
    description: "SS316 button head bolts provide a low-profile rounded head with internal hex drive for corrosion-resistant fastening in machinery, panels and exposed assemblies.",
    features: ["Low-profile button head", "Internal hex drive", "SS316 stainless steel", "Neat visible finish", "Suitable for exposed assemblies"],
    uses: ["machinery panels", "marine fittings", "equipment covers", "architectural assemblies", "general fastening"],
    specifications: { standard: "ISO 7380 / equivalent", material: "Stainless Steel 316", grades: ["SS316", "A4 Stainless Steel"], sizes: "M3 to M20 or as per requirement", coating: ["Natural stainless finish"], threadType: "Metric thread" }
  },
  {
    id: "seo-ss316-mushroom-head-bolt",
    name: "SS316 Mushroom Head Bolt",
    category: "BOLTS",
    image: "https://www.husainibrothers.com/cdn/images/200/5921504842_1635755736.jpg",
    standard: "DIN 603 / carriage bolt type",
    material: "Stainless Steel 316",
    grades: ["SS316", "A4 Stainless Steel"],
    sizes: "M6 to M20 or as per requirement",
    coating: ["Natural stainless finish"],
    description: "SS316 mushroom head bolts, also known as carriage bolts, are stainless steel fasteners with a rounded head used where a smooth visible surface and corrosion resistance are required.",
    features: ["Rounded mushroom head", "Carriage bolt style", "SS316 stainless steel", "Smooth exposed surface", "Suitable with matching nuts and washers"],
    uses: ["timber and steel assemblies", "marine structures", "outdoor fixtures", "guard rails", "fabrication"],
    specifications: { standard: "DIN 603 / carriage bolt type", material: "Stainless Steel 316", grades: ["SS316", "A4 Stainless Steel"], sizes: "M6 to M20 or as per requirement", coating: ["Natural stainless finish"], threadType: "Metric thread" }
  },
  {
    id: "seo-ss316-cup-washer",
    name: "SS316 Cup Washer",
    category: "WASHERS",
    image: "https://www.husainibrothers.com/cdn/images/200/4239323714_1635767753.jpg",
    standard: "Finishing cup washer type",
    material: "Stainless Steel 316",
    grades: ["SS316", "A4 Stainless Steel"],
    sizes: "Screw and bolt sizes as per requirement",
    coating: ["Natural stainless finish"],
    description: "SS316 cup washers provide a neat seating surface for countersunk screws and finishing applications where corrosion resistance and appearance are important.",
    features: ["Cup profile for countersunk fasteners", "Improves visible finish", "SS316 stainless steel", "Suitable for marine and exterior use", "Works with CSK screws and bolts"],
    uses: ["architectural fixing", "panel installation", "marine fittings", "decorative assemblies", "equipment covers"],
    specifications: { standard: "Finishing cup washer type", material: "Stainless Steel 316", grades: ["SS316", "A4 Stainless Steel"], sizes: "Screw and bolt sizes as per requirement", coating: ["Natural stainless finish"] }
  },
  {
    id: "seo-ss304-hex-bolt",
    name: "SS304 Hex Bolt",
    category: "BOLTS",
    image: "https://www.husainibrothers.com/cdn/images/200/5921504842_1635755736.jpg",
    standard: "DIN 933 / DIN 931",
    material: "Stainless Steel 304",
    grades: ["SS304", "A2 Stainless Steel"],
    sizes: "M6 to M42 or as per project requirement",
    coating: ["Natural stainless finish"],
    description: "SS304 hex bolts are stainless steel fasteners used for general industrial, indoor, outdoor and light corrosion environments where a clean stainless finish is required.",
    features: ["SS304 stainless steel", "Hex head design", "DIN 933/DIN 931 options", "Suitable for general stainless assemblies", "Available with matching nuts and washers"],
    uses: ["general fabrication", "equipment assembly", "construction support", "indoor and outdoor fixing", "maintenance stock"],
    specifications: { standard: "DIN 933 / DIN 931", material: "Stainless Steel 304", grades: ["SS304", "A2 Stainless Steel"], sizes: "M6 to M42 or as per project requirement", coating: ["Natural stainless finish"], threadType: "Metric thread" }
  },
  {
    id: "seo-ss304-csk-allen-bolt",
    name: "SS304 CSK Allen Bolt",
    category: "BOLTS",
    image: "https://www.husainibrothers.com/cdn/images/200/5921504842_1635755736.jpg",
    standard: "DIN 7991",
    material: "Stainless Steel 304",
    grades: ["SS304", "A2 Stainless Steel"],
    sizes: "M3 to M24 or as per requirement",
    coating: ["Natural stainless finish"],
    description: "SS304 CSK Allen bolts are countersunk socket fasteners used for flush mounting in panels, machinery covers, equipment assemblies and stainless steel fabrication.",
    features: ["Countersunk flush head", "Internal hex drive", "SS304 stainless steel", "Clean finish for exposed assemblies", "Suitable for panel fastening"],
    uses: ["panel fixing", "machine covers", "light fabrication", "equipment assembly", "architectural metal work"],
    specifications: { standard: "DIN 7991", material: "Stainless Steel 304", grades: ["SS304", "A2 Stainless Steel"], sizes: "M3 to M24 or as per requirement", coating: ["Natural stainless finish"], threadType: "Metric thread" }
  },
  {
    id: "seo-ss304-socket-head-allen-bolt",
    name: "SS304 Socket Head Allen Bolt",
    category: "BOLTS",
    image: "https://www.husainibrothers.com/cdn/images/200/5921504842_1635755736.jpg",
    standard: "DIN 912",
    material: "Stainless Steel 304",
    grades: ["SS304", "A2 Stainless Steel"],
    sizes: "M3 to M24 or as per project requirement",
    coating: ["Natural stainless finish"],
    description: "SS304 socket head Allen bolts are stainless steel cap screws for machinery, equipment, automotive and maintenance assemblies requiring a reliable internal hex drive.",
    features: ["Socket head cap screw", "Internal hex drive", "SS304 stainless steel", "Compact head design", "Suitable for general industrial use"],
    uses: ["machinery", "equipment frames", "maintenance work", "industrial assemblies", "general fabrication"],
    specifications: { standard: "DIN 912", material: "Stainless Steel 304", grades: ["SS304", "A2 Stainless Steel"], sizes: "M3 to M24 or as per project requirement", coating: ["Natural stainless finish"], threadType: "Metric thread" }
  },
  {
    id: "seo-ss304-flange-head-bolt",
    name: "SS304 Flange Head Bolt",
    category: "BOLTS",
    image: "https://www.husainibrothers.com/cdn/images/200/5921504842_1635755736.jpg",
    standard: "DIN 6921 or equivalent",
    material: "Stainless Steel 304",
    grades: ["SS304", "A2 Stainless Steel"],
    sizes: "M6 to M24 or as per requirement",
    coating: ["Natural stainless finish"],
    description: "SS304 flange head bolts provide a built-in washer style bearing surface for general stainless steel fastening, machinery and equipment assemblies.",
    features: ["Integrated flange bearing surface", "SS304 stainless steel", "Hex drive head", "Good load distribution", "Can reduce need for a separate washer in selected assemblies"],
    uses: ["equipment frames", "machinery assembly", "general fabrication", "maintenance applications", "construction support"],
    specifications: { standard: "DIN 6921 or equivalent", material: "Stainless Steel 304", grades: ["SS304", "A2 Stainless Steel"], sizes: "M6 to M24 or as per requirement", coating: ["Natural stainless finish"], threadType: "Metric thread" }
  },
  {
    id: "seo-ss304-threaded-bars",
    name: "SS304 Threaded Bars",
    category: "BOLTS",
    image: "https://www.husainibrothers.com/cdn/images/200/5921504842_1635755736.jpg",
    standard: "DIN 975 / DIN 976",
    material: "Stainless Steel 304",
    grades: ["SS304", "A2 Stainless Steel"],
    sizes: "M6 to M42, custom cut lengths on request",
    coating: ["Natural stainless finish"],
    description: "SS304 threaded bars are fully threaded stainless rods used for supports, suspension, anchoring, long assemblies and general industrial fastening requirements.",
    features: ["Full-length thread", "SS304 stainless steel", "Custom cut lengths available", "Suitable with stainless nuts and washers", "Bulk project supply support"],
    uses: ["MEP supports", "suspension systems", "general anchoring", "equipment installation", "fabrication"],
    specifications: { standard: "DIN 975 / DIN 976", material: "Stainless Steel 304", grades: ["SS304", "A2 Stainless Steel"], sizes: "M6 to M42, custom cut lengths on request", coating: ["Natural stainless finish"], threadType: "Full metric thread" }
  },
  {
    id: "seo-ss304-stud-bolts",
    name: "SS304 Stud Bolts",
    category: "BOLTS",
    image: "https://www.husainibrothers.com/cdn/images/200/5921504842_1635755736.jpg",
    standard: "DIN 939 / DIN 938 / project specification",
    material: "Stainless Steel 304",
    grades: ["SS304", "A2 Stainless Steel"],
    sizes: "M6 to M42 or as per drawing",
    coating: ["Natural stainless finish"],
    description: "SS304 stud bolts are stainless steel threaded fasteners used for machine assemblies, equipment joints, general flanges and project requirements.",
    features: ["SS304 stainless material", "Available full or partial thread", "Can be supplied with nuts and washers", "Suitable for general industrial fastening", "Drawing-based quantities available"],
    uses: ["equipment joints", "machine assemblies", "general flanges", "maintenance projects", "fabrication"],
    specifications: { standard: "DIN 939 / DIN 938 / project specification", material: "Stainless Steel 304", grades: ["SS304", "A2 Stainless Steel"], sizes: "M6 to M42 or as per drawing", coating: ["Natural stainless finish"], threadType: "Metric thread" }
  },
  {
    id: "seo-ss304-flat-washer",
    name: "SS304 Flat Washer",
    category: "WASHERS",
    image: "https://www.husainibrothers.com/cdn/images/200/4239323714_1635767753.jpg",
    standard: "DIN 125 / ISO 7089 or equivalent",
    material: "Stainless Steel 304",
    grades: ["SS304", "A2 Stainless Steel"],
    sizes: "M3 to M42 or as per requirement",
    coating: ["Natural stainless finish"],
    description: "SS304 flat washers provide load distribution and surface protection in stainless steel fastening assemblies for equipment, fabrication, construction and maintenance use.",
    features: ["Load distribution", "SS304 stainless steel", "Surface protection", "Works with bolts and nuts", "Bulk pack supply available"],
    uses: ["bolt and nut assemblies", "equipment installation", "fabrication", "general maintenance", "construction support"],
    specifications: { standard: "DIN 125 / ISO 7089 or equivalent", material: "Stainless Steel 304", grades: ["SS304", "A2 Stainless Steel"], sizes: "M3 to M42 or as per requirement", coating: ["Natural stainless finish"] }
  },
  {
    id: "seo-ss304-wing-bolt",
    name: "SS304 Wing Bolt",
    category: "BOLTS",
    image: "https://www.husainibrothers.com/cdn/images/200/5921504842_1635755736.jpg",
    standard: "DIN 316 style / project requirement",
    material: "Stainless Steel 304",
    grades: ["SS304", "A2 Stainless Steel"],
    sizes: "M4 to M16 or as per requirement",
    coating: ["Natural stainless finish"],
    description: "SS304 wing bolts are hand-operated stainless fasteners for panels, light fixtures and assemblies that need frequent opening, adjustment or tool-free tightening.",
    features: ["Wing head for hand operation", "SS304 stainless steel", "Tool-free fastening", "Suitable for removable panels", "Available in project quantities"],
    uses: ["access panels", "light equipment", "temporary fixtures", "maintenance use", "general assembly"],
    specifications: { standard: "DIN 316 style / project requirement", material: "Stainless Steel 304", grades: ["SS304", "A2 Stainless Steel"], sizes: "M4 to M16 or as per requirement", coating: ["Natural stainless finish"], threadType: "Metric thread" }
  },
  {
    id: "seo-ss304-screw-self-tapping",
    name: "SS304 Screw Self Tapping",
    category: "SCREWS",
    image: "https://www.husainibrothers.com/cdn/images/200/roundhead-machine-screw.jpg",
    standard: "DIN 7981 / DIN 7982 / equivalent",
    material: "Stainless Steel 304",
    grades: ["SS304", "A2 Stainless Steel"],
    sizes: "ST sizes and metric equivalents as per requirement",
    coating: ["Natural stainless finish"],
    description: "SS304 self tapping screws are stainless screws used for fastening into sheet metal, panels, covers and light assemblies where a clean stainless finish is required.",
    features: ["Self tapping design", "SS304 stainless steel", "Pan head and countersunk options", "Useful for sheet metal and panels", "Bulk project support"],
    uses: ["sheet metal panels", "electrical enclosures", "equipment covers", "general fabrication", "maintenance"],
    specifications: { standard: "DIN 7981 / DIN 7982 / equivalent", material: "Stainless Steel 304", grades: ["SS304", "A2 Stainless Steel"], sizes: "ST sizes and metric equivalents as per requirement", coating: ["Natural stainless finish"], threadType: "Self tapping thread" }
  },
  {
    id: "seo-ss304-screw-self-drilling",
    name: "SS304 Screw Self Drilling",
    category: "SCREWS",
    image: "https://www.husainibrothers.com/cdn/images/200/roundhead-machine-screw.jpg",
    standard: "DIN 7504 / equivalent",
    material: "Stainless Steel 304",
    grades: ["SS304", "A2 Stainless Steel"],
    sizes: "Common self drilling sizes as per project requirement",
    coating: ["Natural stainless finish"],
    description: "SS304 self drilling screws are stainless fasteners with an integrated drill point for light steel, sheet metal, cladding and panel fixing requirements.",
    features: ["Integrated drill point", "SS304 stainless steel", "Fast installation", "Head style options", "Suitable for sheet and light steel fastening"],
    uses: ["roofing and cladding", "sheet metal work", "panels", "light steel assembly", "maintenance projects"],
    specifications: { standard: "DIN 7504 / equivalent", material: "Stainless Steel 304", grades: ["SS304", "A2 Stainless Steel"], sizes: "Common self drilling sizes as per project requirement", coating: ["Natural stainless finish"], threadType: "Self drilling thread" }
  },
  {
    id: "seo-ss304-u-bolt",
    name: "SS304 U Bolt",
    category: "HOOK & EYE",
    image: "https://www.husainibrothers.com/cdn/images/200/4226372436_1635929365.jpg",
    standard: "DIN 3570 / custom drawing",
    material: "Stainless Steel 304",
    grades: ["SS304", "A2 Stainless Steel"],
    sizes: "Pipe-size and custom U dimensions available on request",
    coating: ["Natural stainless finish"],
    description: "SS304 U bolts are stainless U-shaped fasteners for pipe clamps, support brackets, general fixing and light outdoor or industrial applications.",
    features: ["U-shaped clamp design", "SS304 stainless steel", "Custom dimensions on request", "Supplied with nuts and washers if required", "Useful for pipe and round sections"],
    uses: ["pipe supports", "brackets", "light structural fixing", "equipment mounting", "maintenance"],
    specifications: { standard: "DIN 3570 / custom drawing", material: "Stainless Steel 304", grades: ["SS304", "A2 Stainless Steel"], sizes: "Pipe-size and custom U dimensions available on request", coating: ["Natural stainless finish"], threadType: "Metric thread" }
  },
  {
    id: "seo-ss304-button-head-bolt",
    name: "SS304 Button Head Bolt",
    category: "BOLTS",
    image: "https://www.husainibrothers.com/cdn/images/200/5921504842_1635755736.jpg",
    standard: "ISO 7380 / equivalent",
    material: "Stainless Steel 304",
    grades: ["SS304", "A2 Stainless Steel"],
    sizes: "M3 to M20 or as per requirement",
    coating: ["Natural stainless finish"],
    description: "SS304 button head bolts provide a rounded low-profile head with internal hex drive for clean visible fastening in panels, machinery and equipment assemblies.",
    features: ["Button head profile", "Internal hex drive", "SS304 stainless steel", "Neat visible finish", "Suitable for panel and equipment work"],
    uses: ["panel assemblies", "machine covers", "equipment frames", "general fabrication", "maintenance"],
    specifications: { standard: "ISO 7380 / equivalent", material: "Stainless Steel 304", grades: ["SS304", "A2 Stainless Steel"], sizes: "M3 to M20 or as per requirement", coating: ["Natural stainless finish"], threadType: "Metric thread" }
  },
  {
    id: "seo-ss304-mushroom-head-bolt",
    name: "SS304 Mushroom Head Bolt",
    category: "BOLTS",
    image: "https://www.husainibrothers.com/cdn/images/200/5921504842_1635755736.jpg",
    standard: "DIN 603 / carriage bolt type",
    material: "Stainless Steel 304",
    grades: ["SS304", "A2 Stainless Steel"],
    sizes: "M6 to M20 or as per requirement",
    coating: ["Natural stainless finish"],
    description: "SS304 mushroom head bolts are carriage-style stainless fasteners with a smooth rounded head used for timber, steel, panels and exposed assemblies.",
    features: ["Rounded mushroom head", "Carriage bolt style", "SS304 stainless steel", "Smooth visible head", "Works with nuts and washers"],
    uses: ["timber and steel assemblies", "guard rails", "outdoor fixtures", "light fabrication", "maintenance"],
    specifications: { standard: "DIN 603 / carriage bolt type", material: "Stainless Steel 304", grades: ["SS304", "A2 Stainless Steel"], sizes: "M6 to M20 or as per requirement", coating: ["Natural stainless finish"], threadType: "Metric thread" }
  },
  {
    id: "seo-ss304-cup-washer",
    name: "SS304 Cup Washer",
    category: "WASHERS",
    image: "https://www.husainibrothers.com/cdn/images/200/4239323714_1635767753.jpg",
    standard: "Finishing cup washer type",
    material: "Stainless Steel 304",
    grades: ["SS304", "A2 Stainless Steel"],
    sizes: "Screw and bolt sizes as per requirement",
    coating: ["Natural stainless finish"],
    description: "SS304 cup washers are finishing washers used with countersunk screws and bolts for a cleaner seating surface in panels, covers and visible fastening applications.",
    features: ["Cup profile", "SS304 stainless steel", "Neat finishing look", "Works with CSK fasteners", "Useful for panels and covers"],
    uses: ["panel fixing", "architectural hardware", "decorative assemblies", "equipment covers", "general fabrication"],
    specifications: { standard: "Finishing cup washer type", material: "Stainless Steel 304", grades: ["SS304", "A2 Stainless Steel"], sizes: "Screw and bolt sizes as per requirement", coating: ["Natural stainless finish"] }
  },
  {
    id: "seo-shear-studs-and-ferrules",
    name: "Shear Studs and Ferrules",
    category: "ATTACHMENTS",
    image: "https://www.husainibrothers.com/cdn/images/200/5921504842_1635755736.jpg",
    standard: "ISO 13918 / AWS style project requirement",
    material: "Carbon Steel / Stainless Steel options",
    grades: ["Project specification"],
    sizes: "Stud diameter and length as per drawing",
    coating: ["Plain", "Galvanized options on request"],
    description: "Shear studs and ceramic ferrules are used in stud welding and composite construction applications where steel members need mechanical connection to concrete slabs or structural components.",
    features: ["Stud welding application", "Ceramic ferrules available", "Project drawing supply", "Suitable for composite construction", "Bulk project quantities"],
    uses: ["steel deck construction", "composite beams", "bridge decks", "industrial structures", "structural welding"],
    specifications: { standard: "ISO 13918 / AWS style project requirement", material: "Carbon Steel / Stainless Steel options", grades: ["Project specification"], sizes: "Stud diameter and length as per drawing", coating: ["Plain", "Galvanized options on request"] }
  },
  {
    id: "seo-dti-washers-squirter",
    name: "DTI Washers Squirter",
    category: "WASHERS",
    image: "https://www.husainibrothers.com/cdn/images/200/4239323714_1635767753.jpg",
    standard: "DTI washer / project specification",
    material: "Carbon Steel / high strength washer material",
    grades: ["Project specification"],
    sizes: "Bolt sizes as per project requirement",
    coating: ["Plain", "Zinc Plated", "Hot Dip Galvanized options"],
    description: "DTI Squirter washers are direct tension indicating washers used to help confirm bolt tension in structural bolting applications through visual indication during tightening.",
    features: ["Direct tension indication", "Visual installation support", "Used in structural bolting", "Squirter type option", "Project specification supply"],
    uses: ["structural steel connections", "bridge work", "preloaded bolting", "steel frame buildings", "inspection-supported bolting"],
    specifications: { standard: "DTI washer / project specification", material: "Carbon Steel / high strength washer material", grades: ["Project specification"], sizes: "Bolt sizes as per project requirement", coating: ["Plain", "Zinc Plated", "Hot Dip Galvanized options"] }
  },
  {
    id: "seo-ms-threaded-bar",
    name: "MS Threaded Bar",
    category: "BOLTS",
    image: "https://www.husainibrothers.com/cdn/images/200/5921504842_1635755736.jpg",
    standard: "DIN 975 / DIN 976 or project specification",
    material: "Mild Steel",
    grades: ["MS", "Grade 4.6 / 8.8 options"],
    sizes: "M6 to M42, custom lengths on request",
    coating: ["Plain", "Zinc Plated", "Black"],
    description: "MS threaded bars are mild steel fully threaded rods used for supports, fabrication, anchoring, suspension and general industrial fastening requirements.",
    features: ["Mild steel threaded rod", "Full-length thread", "Cut-to-length options", "Economical general-purpose fastening", "Available with nuts and washers"],
    uses: ["MEP supports", "fabrication", "suspension rods", "anchor applications", "maintenance"],
    specifications: { standard: "DIN 975 / DIN 976 or project specification", material: "Mild Steel", grades: ["MS", "Grade 4.6 / 8.8 options"], sizes: "M6 to M42, custom lengths on request", coating: ["Plain", "Zinc Plated", "Black"], threadType: "Full metric thread" }
  },
  {
    id: "seo-gi-threaded-bar",
    name: "GI Threaded Bar",
    category: "BOLTS",
    image: "https://www.husainibrothers.com/cdn/images/200/5921504842_1635755736.jpg",
    standard: "DIN 975 / DIN 976 or project specification",
    material: "Galvanized Iron / galvanized steel",
    grades: ["GI", "Project grade"],
    sizes: "M6 to M42, custom lengths on request",
    coating: ["Galvanized finish"],
    description: "GI threaded bars are galvanized threaded rods used for support, hanging, bracing and general fastening where improved corrosion protection is required compared with plain mild steel.",
    features: ["Galvanized finish", "Fully threaded rod", "Cut-to-length support", "Suitable for support systems", "Bulk project supply"],
    uses: ["MEP supports", "pipe support systems", "outdoor fastening", "construction supports", "industrial maintenance"],
    specifications: { standard: "DIN 975 / DIN 976 or project specification", material: "Galvanized Iron / galvanized steel", grades: ["GI", "Project grade"], sizes: "M6 to M42, custom lengths on request", coating: ["Galvanized finish"], threadType: "Full metric thread" }
  },
  {
    id: "seo-hdg-threaded-bar",
    name: "HDG Threaded Bar",
    category: "BOLTS",
    image: "https://www.husainibrothers.com/cdn/images/200/5921504842_1635755736.jpg",
    standard: "DIN 975 / DIN 976 or project specification",
    material: "Steel with hot dip galvanized finish",
    grades: ["Grade 4.6", "Grade 8.8", "Project grade"],
    sizes: "M6 to M42, custom lengths on request",
    coating: ["Hot Dip Galvanized"],
    description: "HDG threaded bars are hot dip galvanized fully threaded rods used for outdoor, structural, utility and construction support applications that require stronger corrosion protection.",
    features: ["Hot dip galvanized coating", "Full thread along length", "Outdoor and exposed environment use", "Cut-to-length options", "Suitable with HDG nuts and washers"],
    uses: ["outdoor structures", "utility supports", "MEP supports", "construction bracing", "industrial projects"],
    specifications: { standard: "DIN 975 / DIN 976 or project specification", material: "Steel with hot dip galvanized finish", grades: ["Grade 4.6", "Grade 8.8", "Project grade"], sizes: "M6 to M42, custom lengths on request", coating: ["Hot Dip Galvanized"], threadType: "Full metric thread" }
  },
  {
    id: "seo-l-anchor-foundation-bolt",
    name: "L Anchor Foundation Bolt",
    category: "ATTACHMENTS",
    image: "https://www.husainibrothers.com/cdn/images/200/5921504842_1635755736.jpg",
    standard: "Foundation bolt / drawing-based supply",
    material: "Carbon Steel / Stainless Steel options",
    grades: ["Grade 4.6", "Grade 8.8", "Project grade"],
    sizes: "M12 to M42 or as per drawing",
    coating: ["Plain", "Zinc Plated", "Hot Dip Galvanized"],
    description: "L anchor foundation bolts are bent anchor bolts used for fixing base plates, columns, equipment and steel structures into concrete foundations.",
    features: ["L-shaped anchor profile", "Foundation fixing", "Drawing-based dimensions", "Available with nuts and washers", "HDG option for exposed conditions"],
    uses: ["base plate fixing", "steel columns", "equipment foundations", "warehouse structures", "industrial construction"],
    specifications: { standard: "Foundation bolt / drawing-based supply", material: "Carbon Steel / Stainless Steel options", grades: ["Grade 4.6", "Grade 8.8", "Project grade"], sizes: "M12 to M42 or as per drawing", coating: ["Plain", "Zinc Plated", "Hot Dip Galvanized"], threadType: "Metric thread" }
  },
  {
    id: "seo-straight-anchor-foundation-bolt",
    name: "Straight Anchor Foundation Bolt",
    category: "ATTACHMENTS",
    image: "https://www.husainibrothers.com/cdn/images/200/5921504842_1635755736.jpg",
    standard: "Foundation bolt / drawing-based supply",
    material: "Carbon Steel / Stainless Steel options",
    grades: ["Grade 4.6", "Grade 8.8", "Project grade"],
    sizes: "M12 to M42 or as per drawing",
    coating: ["Plain", "Zinc Plated", "Hot Dip Galvanized"],
    description: "Straight anchor foundation bolts are straight threaded anchors used for base plates, machinery foundations, structural connections and concrete fixing applications.",
    features: ["Straight anchor profile", "Threaded end for nut fixing", "Drawing-based supply", "Available with washers and nuts", "Bulk foundation bolt support"],
    uses: ["machinery foundations", "steel structures", "base plates", "equipment installation", "civil and industrial projects"],
    specifications: { standard: "Foundation bolt / drawing-based supply", material: "Carbon Steel / Stainless Steel options", grades: ["Grade 4.6", "Grade 8.8", "Project grade"], sizes: "M12 to M42 or as per drawing", coating: ["Plain", "Zinc Plated", "Hot Dip Galvanized"], threadType: "Metric thread" }
  },
  {
    id: "seo-nord-lock-zinc-flake",
    name: "Nord Lock Zinc Flake",
    category: "WASHERS",
    image: "https://www.husainibrothers.com/cdn/images/200/4239323714_1635767753.jpg",
    standard: "Wedge-locking washer type",
    material: "Steel with zinc flake coating",
    grades: ["Zinc flake coated"],
    sizes: "M3 to M36 or as per availability",
    coating: ["Zinc Flake"],
    description: "Nord Lock Zinc Flake type washers are wedge-locking washers with zinc flake coating, used to help secure bolted joints against loosening in vibration and dynamic-load conditions.",
    features: ["Wedge-locking washer design", "Zinc flake coating", "Helps resist vibration loosening", "Suitable for high-demand bolted joints", "Available for multiple bolt sizes"],
    uses: ["structural bolting", "heavy machinery", "transport equipment", "industrial maintenance", "dynamic-load assemblies"],
    specifications: { standard: "Wedge-locking washer type", material: "Steel with zinc flake coating", grades: ["Zinc flake coated"], sizes: "M3 to M36 or as per availability", coating: ["Zinc Flake"] }
  },

  {
    id: "seo-ms-hex-bolt",
    name: "MS Hex Bolt",
    category: "BOLTS",
    image: "https://www.husainibrothers.com/cdn/images/200/5921504842_1635755736.jpg",
    standard: "DIN 933 / DIN 931 / ISO equivalent",
    material: "Mild Steel",
    grades: ['Grade 4.6', 'Grade 8.8', 'Project grade'],
    sizes: "M6 to M42 or as per requirement",
    coating: ['Plain', 'Black Oxide', 'Zinc Plated on request'],
    description: "MS Hex Bolt is supplied by SRK Bolts for UAE and GCC project requirements. This hex bolt option is suitable for cost-effective general fabrication, machinery, steel structure and indoor construction fastening, with quotation support for standard, grade, size, finish and quantity.",
    features: ['Mild Steel material option', 'DIN 933 / DIN 931 / ISO equivalent supply support', 'Standard and drawing-based RFQ support', 'Bulk project quantities available', 'Can be quoted with matching nuts or washers where applicable'],
    uses: ['bolted joints', 'steel fabrication', 'machinery', 'structural assembly and general project fastening'],
    specifications: { standard: "DIN 933 / DIN 931 / ISO equivalent", material: "Mild Steel", grades: ['Grade 4.6', 'Grade 8.8', 'Project grade'], sizes: "M6 to M42 or as per requirement", coating: ['Plain', 'Black Oxide', 'Zinc Plated on request'], threadType: "Metric thread" }
  },

  {
    id: "seo-gi-hex-bolt",
    name: "GI Hex Bolt",
    category: "BOLTS",
    image: "https://www.husainibrothers.com/cdn/images/200/5921504842_1635755736.jpg",
    standard: "DIN 933 / DIN 931 / ISO equivalent",
    material: "Galvanized Iron / Zinc Plated Steel",
    grades: ['Grade 4.6', 'Grade 8.8', 'Project grade'],
    sizes: "M6 to M42 or as per requirement",
    coating: ['Zinc Plated', 'Galvanized'],
    description: "GI Hex Bolt is supplied by SRK Bolts for UAE and GCC project requirements. This hex bolt option is suitable for construction, MEP, maintenance and moderate corrosion protection requirements, with quotation support for standard, grade, size, finish and quantity.",
    features: ['Galvanized Iron / Zinc Plated Steel material option', 'DIN 933 / DIN 931 / ISO equivalent supply support', 'Standard and drawing-based RFQ support', 'Bulk project quantities available', 'Can be quoted with matching nuts or washers where applicable'],
    uses: ['bolted joints', 'steel fabrication', 'machinery', 'structural assembly and general project fastening'],
    specifications: { standard: "DIN 933 / DIN 931 / ISO equivalent", material: "Galvanized Iron / Zinc Plated Steel", grades: ['Grade 4.6', 'Grade 8.8', 'Project grade'], sizes: "M6 to M42 or as per requirement", coating: ['Zinc Plated', 'Galvanized'], threadType: "Metric thread" }
  },

  {
    id: "seo-hdg-hex-bolt",
    name: "HDG Hex Bolt",
    category: "BOLTS",
    image: "https://www.husainibrothers.com/cdn/images/200/5921504842_1635755736.jpg",
    standard: "DIN 933 / DIN 931 / ISO equivalent",
    material: "Hot Dip Galvanized Steel",
    grades: ['Grade 4.6', 'Grade 8.8', 'Project grade'],
    sizes: "M6 to M42 or as per requirement",
    coating: ['Hot Dip Galvanized'],
    description: "HDG Hex Bolt is supplied by SRK Bolts for UAE and GCC project requirements. This hex bolt option is suitable for outdoor, infrastructure, exposed steel, base plate and heavy-duty project applications, with quotation support for standard, grade, size, finish and quantity.",
    features: ['Hot Dip Galvanized Steel material option', 'DIN 933 / DIN 931 / ISO equivalent supply support', 'Standard and drawing-based RFQ support', 'Bulk project quantities available', 'Can be quoted with matching nuts or washers where applicable'],
    uses: ['bolted joints', 'steel fabrication', 'machinery', 'structural assembly and general project fastening'],
    specifications: { standard: "DIN 933 / DIN 931 / ISO equivalent", material: "Hot Dip Galvanized Steel", grades: ['Grade 4.6', 'Grade 8.8', 'Project grade'], sizes: "M6 to M42 or as per requirement", coating: ['Hot Dip Galvanized'], threadType: "Metric thread" }
  },

  {
    id: "seo-ms-csk-allen-bolt",
    name: "MS CSK Allen Bolt",
    category: "BOLTS",
    image: "https://www.husainibrothers.com/cdn/images/200/5921504842_1635755736.jpg",
    standard: "DIN 7991 / ISO 10642 or equivalent",
    material: "Mild Steel",
    grades: ['Grade 4.6', 'Grade 8.8', 'Project grade'],
    sizes: "M3 to M24 or as per requirement",
    coating: ['Plain', 'Black Oxide', 'Zinc Plated on request'],
    description: "MS CSK Allen Bolt is supplied by SRK Bolts for UAE and GCC project requirements. This csk allen bolt option is suitable for cost-effective general fabrication, machinery, steel structure and indoor construction fastening, with quotation support for standard, grade, size, finish and quantity.",
    features: ['Mild Steel material option', 'DIN 7991 / ISO 10642 or equivalent supply support', 'Standard and drawing-based RFQ support', 'Bulk project quantities available', 'Can be quoted with matching nuts or washers where applicable'],
    uses: ['flush surface fastening', 'machinery', 'countersunk holes', 'panels and equipment assemblies'],
    specifications: { standard: "DIN 7991 / ISO 10642 or equivalent", material: "Mild Steel", grades: ['Grade 4.6', 'Grade 8.8', 'Project grade'], sizes: "M3 to M24 or as per requirement", coating: ['Plain', 'Black Oxide', 'Zinc Plated on request'], threadType: "Metric thread" }
  },

  {
    id: "seo-gi-csk-allen-bolt",
    name: "GI CSK Allen Bolt",
    category: "BOLTS",
    image: "https://www.husainibrothers.com/cdn/images/200/5921504842_1635755736.jpg",
    standard: "DIN 7991 / ISO 10642 or equivalent",
    material: "Galvanized Iron / Zinc Plated Steel",
    grades: ['Grade 4.6', 'Grade 8.8', 'Project grade'],
    sizes: "M3 to M24 or as per requirement",
    coating: ['Zinc Plated', 'Galvanized'],
    description: "GI CSK Allen Bolt is supplied by SRK Bolts for UAE and GCC project requirements. This csk allen bolt option is suitable for construction, MEP, maintenance and moderate corrosion protection requirements, with quotation support for standard, grade, size, finish and quantity.",
    features: ['Galvanized Iron / Zinc Plated Steel material option', 'DIN 7991 / ISO 10642 or equivalent supply support', 'Standard and drawing-based RFQ support', 'Bulk project quantities available', 'Can be quoted with matching nuts or washers where applicable'],
    uses: ['flush surface fastening', 'machinery', 'countersunk holes', 'panels and equipment assemblies'],
    specifications: { standard: "DIN 7991 / ISO 10642 or equivalent", material: "Galvanized Iron / Zinc Plated Steel", grades: ['Grade 4.6', 'Grade 8.8', 'Project grade'], sizes: "M3 to M24 or as per requirement", coating: ['Zinc Plated', 'Galvanized'], threadType: "Metric thread" }
  },

  {
    id: "seo-ms-socket-head-allen-bolt",
    name: "MS Socket Head Allen Bolt",
    category: "BOLTS",
    image: "https://www.husainibrothers.com/cdn/images/200/5921504842_1635755736.jpg",
    standard: "DIN 912 / ISO 4762 or equivalent",
    material: "Mild Steel",
    grades: ['Grade 4.6', 'Grade 8.8', 'Project grade'],
    sizes: "M3 to M30 or as per requirement",
    coating: ['Plain', 'Black Oxide', 'Zinc Plated on request'],
    description: "MS Socket Head Allen Bolt is supplied by SRK Bolts for UAE and GCC project requirements. This socket head allen bolt option is suitable for cost-effective general fabrication, machinery, steel structure and indoor construction fastening, with quotation support for standard, grade, size, finish and quantity.",
    features: ['Mild Steel material option', 'DIN 912 / ISO 4762 or equivalent supply support', 'Standard and drawing-based RFQ support', 'Bulk project quantities available', 'Can be quoted with matching nuts or washers where applicable'],
    uses: ['machine assembly', 'precision equipment', 'recessed fastening and high-strength bolted joints'],
    specifications: { standard: "DIN 912 / ISO 4762 or equivalent", material: "Mild Steel", grades: ['Grade 4.6', 'Grade 8.8', 'Project grade'], sizes: "M3 to M30 or as per requirement", coating: ['Plain', 'Black Oxide', 'Zinc Plated on request'], threadType: "Metric thread" }
  },

  {
    id: "seo-gi-socket-head-allen-bolt",
    name: "GI Socket Head Allen Bolt",
    category: "BOLTS",
    image: "https://www.husainibrothers.com/cdn/images/200/5921504842_1635755736.jpg",
    standard: "DIN 912 / ISO 4762 or equivalent",
    material: "Galvanized Iron / Zinc Plated Steel",
    grades: ['Grade 4.6', 'Grade 8.8', 'Project grade'],
    sizes: "M3 to M30 or as per requirement",
    coating: ['Zinc Plated', 'Galvanized'],
    description: "GI Socket Head Allen Bolt is supplied by SRK Bolts for UAE and GCC project requirements. This socket head allen bolt option is suitable for construction, MEP, maintenance and moderate corrosion protection requirements, with quotation support for standard, grade, size, finish and quantity.",
    features: ['Galvanized Iron / Zinc Plated Steel material option', 'DIN 912 / ISO 4762 or equivalent supply support', 'Standard and drawing-based RFQ support', 'Bulk project quantities available', 'Can be quoted with matching nuts or washers where applicable'],
    uses: ['machine assembly', 'precision equipment', 'recessed fastening and high-strength bolted joints'],
    specifications: { standard: "DIN 912 / ISO 4762 or equivalent", material: "Galvanized Iron / Zinc Plated Steel", grades: ['Grade 4.6', 'Grade 8.8', 'Project grade'], sizes: "M3 to M30 or as per requirement", coating: ['Zinc Plated', 'Galvanized'], threadType: "Metric thread" }
  },

  {
    id: "seo-ms-flange-head-bolt",
    name: "MS Flange Head Bolt",
    category: "BOLTS",
    image: "https://www.husainibrothers.com/cdn/images/200/5921504842_1635755736.jpg",
    standard: "DIN 6921 / ISO 4162 or equivalent",
    material: "Mild Steel",
    grades: ['Grade 4.6', 'Grade 8.8', 'Project grade'],
    sizes: "M5 to M24 or as per requirement",
    coating: ['Plain', 'Black Oxide', 'Zinc Plated on request'],
    description: "MS Flange Head Bolt is supplied by SRK Bolts for UAE and GCC project requirements. This flange head bolt option is suitable for cost-effective general fabrication, machinery, steel structure and indoor construction fastening, with quotation support for standard, grade, size, finish and quantity.",
    features: ['Mild Steel material option', 'DIN 6921 / ISO 4162 or equivalent supply support', 'Standard and drawing-based RFQ support', 'Bulk project quantities available', 'Can be quoted with matching nuts or washers where applicable'],
    uses: ['automotive', 'machinery', 'fabrication', 'support brackets and assemblies where integrated bearing area is useful'],
    specifications: { standard: "DIN 6921 / ISO 4162 or equivalent", material: "Mild Steel", grades: ['Grade 4.6', 'Grade 8.8', 'Project grade'], sizes: "M5 to M24 or as per requirement", coating: ['Plain', 'Black Oxide', 'Zinc Plated on request'], threadType: "Metric thread" }
  },

  {
    id: "seo-gi-flange-head-bolt",
    name: "GI Flange Head Bolt",
    category: "BOLTS",
    image: "https://www.husainibrothers.com/cdn/images/200/5921504842_1635755736.jpg",
    standard: "DIN 6921 / ISO 4162 or equivalent",
    material: "Galvanized Iron / Zinc Plated Steel",
    grades: ['Grade 4.6', 'Grade 8.8', 'Project grade'],
    sizes: "M5 to M24 or as per requirement",
    coating: ['Zinc Plated', 'Galvanized'],
    description: "GI Flange Head Bolt is supplied by SRK Bolts for UAE and GCC project requirements. This flange head bolt option is suitable for construction, MEP, maintenance and moderate corrosion protection requirements, with quotation support for standard, grade, size, finish and quantity.",
    features: ['Galvanized Iron / Zinc Plated Steel material option', 'DIN 6921 / ISO 4162 or equivalent supply support', 'Standard and drawing-based RFQ support', 'Bulk project quantities available', 'Can be quoted with matching nuts or washers where applicable'],
    uses: ['automotive', 'machinery', 'fabrication', 'support brackets and assemblies where integrated bearing area is useful'],
    specifications: { standard: "DIN 6921 / ISO 4162 or equivalent", material: "Galvanized Iron / Zinc Plated Steel", grades: ['Grade 4.6', 'Grade 8.8', 'Project grade'], sizes: "M5 to M24 or as per requirement", coating: ['Zinc Plated', 'Galvanized'], threadType: "Metric thread" }
  },

  {
    id: "seo-hdg-flange-head-bolt",
    name: "HDG Flange Head Bolt",
    category: "BOLTS",
    image: "https://www.husainibrothers.com/cdn/images/200/5921504842_1635755736.jpg",
    standard: "DIN 6921 / ISO 4162 or equivalent",
    material: "Hot Dip Galvanized Steel",
    grades: ['Grade 4.6', 'Grade 8.8', 'Project grade'],
    sizes: "M5 to M24 or as per requirement",
    coating: ['Hot Dip Galvanized'],
    description: "HDG Flange Head Bolt is supplied by SRK Bolts for UAE and GCC project requirements. This flange head bolt option is suitable for outdoor, infrastructure, exposed steel, base plate and heavy-duty project applications, with quotation support for standard, grade, size, finish and quantity.",
    features: ['Hot Dip Galvanized Steel material option', 'DIN 6921 / ISO 4162 or equivalent supply support', 'Standard and drawing-based RFQ support', 'Bulk project quantities available', 'Can be quoted with matching nuts or washers where applicable'],
    uses: ['automotive', 'machinery', 'fabrication', 'support brackets and assemblies where integrated bearing area is useful'],
    specifications: { standard: "DIN 6921 / ISO 4162 or equivalent", material: "Hot Dip Galvanized Steel", grades: ['Grade 4.6', 'Grade 8.8', 'Project grade'], sizes: "M5 to M24 or as per requirement", coating: ['Hot Dip Galvanized'], threadType: "Metric thread" }
  },

  {
    id: "seo-ms-stud-bolts",
    name: "MS Stud Bolts",
    category: "BOLTS",
    image: "https://www.husainibrothers.com/cdn/images/200/5921504842_1635755736.jpg",
    standard: "DIN 938 / DIN 939 / ASTM A193 or drawing-based",
    material: "Mild Steel",
    grades: ['Grade 4.6', 'Grade 8.8', 'Project grade'],
    sizes: "M8 to M42 or as per drawing",
    coating: ['Plain', 'Black Oxide', 'Zinc Plated on request'],
    description: "MS Stud Bolts is supplied by SRK Bolts for UAE and GCC project requirements. This stud bolts option is suitable for cost-effective general fabrication, machinery, steel structure and indoor construction fastening, with quotation support for standard, grade, size, finish and quantity.",
    features: ['Mild Steel material option', 'DIN 938 / DIN 939 / ASTM A193 or drawing-based supply support', 'Standard and drawing-based RFQ support', 'Bulk project quantities available', 'Can be quoted with matching nuts or washers where applicable'],
    uses: ['flange joints', 'pipe fittings', 'oil and gas', 'machinery', 'structural and industrial assembly'],
    specifications: { standard: "DIN 938 / DIN 939 / ASTM A193 or drawing-based", material: "Mild Steel", grades: ['Grade 4.6', 'Grade 8.8', 'Project grade'], sizes: "M8 to M42 or as per drawing", coating: ['Plain', 'Black Oxide', 'Zinc Plated on request'], threadType: "Metric thread" }
  },

  {
    id: "seo-gi-stud-bolts",
    name: "GI Stud Bolts",
    category: "BOLTS",
    image: "https://www.husainibrothers.com/cdn/images/200/5921504842_1635755736.jpg",
    standard: "DIN 938 / DIN 939 / ASTM A193 or drawing-based",
    material: "Galvanized Iron / Zinc Plated Steel",
    grades: ['Grade 4.6', 'Grade 8.8', 'Project grade'],
    sizes: "M8 to M42 or as per drawing",
    coating: ['Zinc Plated', 'Galvanized'],
    description: "GI Stud Bolts is supplied by SRK Bolts for UAE and GCC project requirements. This stud bolts option is suitable for construction, MEP, maintenance and moderate corrosion protection requirements, with quotation support for standard, grade, size, finish and quantity.",
    features: ['Galvanized Iron / Zinc Plated Steel material option', 'DIN 938 / DIN 939 / ASTM A193 or drawing-based supply support', 'Standard and drawing-based RFQ support', 'Bulk project quantities available', 'Can be quoted with matching nuts or washers where applicable'],
    uses: ['flange joints', 'pipe fittings', 'oil and gas', 'machinery', 'structural and industrial assembly'],
    specifications: { standard: "DIN 938 / DIN 939 / ASTM A193 or drawing-based", material: "Galvanized Iron / Zinc Plated Steel", grades: ['Grade 4.6', 'Grade 8.8', 'Project grade'], sizes: "M8 to M42 or as per drawing", coating: ['Zinc Plated', 'Galvanized'], threadType: "Metric thread" }
  },

  {
    id: "seo-hdg-stud-bolts",
    name: "HDG Stud Bolts",
    category: "BOLTS",
    image: "https://www.husainibrothers.com/cdn/images/200/5921504842_1635755736.jpg",
    standard: "DIN 938 / DIN 939 / ASTM A193 or drawing-based",
    material: "Hot Dip Galvanized Steel",
    grades: ['Grade 4.6', 'Grade 8.8', 'Project grade'],
    sizes: "M8 to M42 or as per drawing",
    coating: ['Hot Dip Galvanized'],
    description: "HDG Stud Bolts is supplied by SRK Bolts for UAE and GCC project requirements. This stud bolts option is suitable for outdoor, infrastructure, exposed steel, base plate and heavy-duty project applications, with quotation support for standard, grade, size, finish and quantity.",
    features: ['Hot Dip Galvanized Steel material option', 'DIN 938 / DIN 939 / ASTM A193 or drawing-based supply support', 'Standard and drawing-based RFQ support', 'Bulk project quantities available', 'Can be quoted with matching nuts or washers where applicable'],
    uses: ['flange joints', 'pipe fittings', 'oil and gas', 'machinery', 'structural and industrial assembly'],
    specifications: { standard: "DIN 938 / DIN 939 / ASTM A193 or drawing-based", material: "Hot Dip Galvanized Steel", grades: ['Grade 4.6', 'Grade 8.8', 'Project grade'], sizes: "M8 to M42 or as per drawing", coating: ['Hot Dip Galvanized'], threadType: "Metric thread" }
  },

  {
    id: "seo-ms-wing-bolt",
    name: "MS Wing Bolt",
    category: "BOLTS",
    image: "https://www.husainibrothers.com/cdn/images/200/5921504842_1635755736.jpg",
    standard: "DIN 316 style / project requirement",
    material: "Mild Steel",
    grades: ['Grade 4.6', 'Grade 8.8', 'Project grade'],
    sizes: "M4 to M16 or as per requirement",
    coating: ['Plain', 'Black Oxide', 'Zinc Plated on request'],
    description: "MS Wing Bolt is supplied by SRK Bolts for UAE and GCC project requirements. This wing bolt option is suitable for cost-effective general fabrication, machinery, steel structure and indoor construction fastening, with quotation support for standard, grade, size, finish and quantity.",
    features: ['Mild Steel material option', 'DIN 316 style / project requirement supply support', 'Standard and drawing-based RFQ support', 'Bulk project quantities available', 'Can be quoted with matching nuts or washers where applicable'],
    uses: ['tool-free fastening', 'removable covers', 'light panels', 'access doors and maintenance assemblies'],
    specifications: { standard: "DIN 316 style / project requirement", material: "Mild Steel", grades: ['Grade 4.6', 'Grade 8.8', 'Project grade'], sizes: "M4 to M16 or as per requirement", coating: ['Plain', 'Black Oxide', 'Zinc Plated on request'], threadType: "Metric thread" }
  },

  {
    id: "seo-gi-wing-bolt",
    name: "GI Wing Bolt",
    category: "BOLTS",
    image: "https://www.husainibrothers.com/cdn/images/200/5921504842_1635755736.jpg",
    standard: "DIN 316 style / project requirement",
    material: "Galvanized Iron / Zinc Plated Steel",
    grades: ['Grade 4.6', 'Grade 8.8', 'Project grade'],
    sizes: "M4 to M16 or as per requirement",
    coating: ['Zinc Plated', 'Galvanized'],
    description: "GI Wing Bolt is supplied by SRK Bolts for UAE and GCC project requirements. This wing bolt option is suitable for construction, MEP, maintenance and moderate corrosion protection requirements, with quotation support for standard, grade, size, finish and quantity.",
    features: ['Galvanized Iron / Zinc Plated Steel material option', 'DIN 316 style / project requirement supply support', 'Standard and drawing-based RFQ support', 'Bulk project quantities available', 'Can be quoted with matching nuts or washers where applicable'],
    uses: ['tool-free fastening', 'removable covers', 'light panels', 'access doors and maintenance assemblies'],
    specifications: { standard: "DIN 316 style / project requirement", material: "Galvanized Iron / Zinc Plated Steel", grades: ['Grade 4.6', 'Grade 8.8', 'Project grade'], sizes: "M4 to M16 or as per requirement", coating: ['Zinc Plated', 'Galvanized'], threadType: "Metric thread" }
  },

  {
    id: "seo-ms-u-bolt",
    name: "MS U Bolt",
    category: "HOOK & EYE",
    image: "https://www.husainibrothers.com/cdn/images/200/4226372436_1635929365.jpg",
    standard: "DIN 3570 / pipe clamp / custom drawing",
    material: "Mild Steel",
    grades: ['Grade 4.6', 'Grade 8.8', 'Project grade'],
    sizes: "Pipe-size and custom U dimensions available on request",
    coating: ['Plain', 'Black Oxide', 'Zinc Plated on request'],
    description: "MS U Bolt is supplied by SRK Bolts for UAE and GCC project requirements. This u bolt option is suitable for cost-effective general fabrication, machinery, steel structure and indoor construction fastening, with quotation support for standard, grade, size, finish and quantity.",
    features: ['Mild Steel material option', 'DIN 3570 / pipe clamp / custom drawing supply support', 'Standard and drawing-based RFQ support', 'Bulk project quantities available', 'Can be quoted with matching nuts or washers where applicable'],
    uses: ['pipe supports', 'brackets', 'round section clamping', 'equipment mounting and maintenance projects'],
    specifications: { standard: "DIN 3570 / pipe clamp / custom drawing", material: "Mild Steel", grades: ['Grade 4.6', 'Grade 8.8', 'Project grade'], sizes: "Pipe-size and custom U dimensions available on request", coating: ['Plain', 'Black Oxide', 'Zinc Plated on request'], threadType: "Metric thread" }
  },

  {
    id: "seo-gi-u-bolt",
    name: "GI U Bolt",
    category: "HOOK & EYE",
    image: "https://www.husainibrothers.com/cdn/images/200/4226372436_1635929365.jpg",
    standard: "DIN 3570 / pipe clamp / custom drawing",
    material: "Galvanized Iron / Zinc Plated Steel",
    grades: ['Grade 4.6', 'Grade 8.8', 'Project grade'],
    sizes: "Pipe-size and custom U dimensions available on request",
    coating: ['Zinc Plated', 'Galvanized'],
    description: "GI U Bolt is supplied by SRK Bolts for UAE and GCC project requirements. This u bolt option is suitable for construction, MEP, maintenance and moderate corrosion protection requirements, with quotation support for standard, grade, size, finish and quantity.",
    features: ['Galvanized Iron / Zinc Plated Steel material option', 'DIN 3570 / pipe clamp / custom drawing supply support', 'Standard and drawing-based RFQ support', 'Bulk project quantities available', 'Can be quoted with matching nuts or washers where applicable'],
    uses: ['pipe supports', 'brackets', 'round section clamping', 'equipment mounting and maintenance projects'],
    specifications: { standard: "DIN 3570 / pipe clamp / custom drawing", material: "Galvanized Iron / Zinc Plated Steel", grades: ['Grade 4.6', 'Grade 8.8', 'Project grade'], sizes: "Pipe-size and custom U dimensions available on request", coating: ['Zinc Plated', 'Galvanized'], threadType: "Metric thread" }
  },

  {
    id: "seo-hdg-u-bolt",
    name: "HDG U Bolt",
    category: "HOOK & EYE",
    image: "https://www.husainibrothers.com/cdn/images/200/4226372436_1635929365.jpg",
    standard: "DIN 3570 / pipe clamp / custom drawing",
    material: "Hot Dip Galvanized Steel",
    grades: ['Grade 4.6', 'Grade 8.8', 'Project grade'],
    sizes: "Pipe-size and custom U dimensions available on request",
    coating: ['Hot Dip Galvanized'],
    description: "HDG U Bolt is supplied by SRK Bolts for UAE and GCC project requirements. This u bolt option is suitable for outdoor, infrastructure, exposed steel, base plate and heavy-duty project applications, with quotation support for standard, grade, size, finish and quantity.",
    features: ['Hot Dip Galvanized Steel material option', 'DIN 3570 / pipe clamp / custom drawing supply support', 'Standard and drawing-based RFQ support', 'Bulk project quantities available', 'Can be quoted with matching nuts or washers where applicable'],
    uses: ['pipe supports', 'brackets', 'round section clamping', 'equipment mounting and maintenance projects'],
    specifications: { standard: "DIN 3570 / pipe clamp / custom drawing", material: "Hot Dip Galvanized Steel", grades: ['Grade 4.6', 'Grade 8.8', 'Project grade'], sizes: "Pipe-size and custom U dimensions available on request", coating: ['Hot Dip Galvanized'], threadType: "Metric thread" }
  },

  {
    id: "seo-ms-button-head-bolt",
    name: "MS Button Head Bolt",
    category: "BOLTS",
    image: "https://www.husainibrothers.com/cdn/images/200/5921504842_1635755736.jpg",
    standard: "ISO 7380 / equivalent",
    material: "Mild Steel",
    grades: ['Grade 4.6', 'Grade 8.8', 'Project grade'],
    sizes: "M3 to M20 or as per requirement",
    coating: ['Plain', 'Black Oxide', 'Zinc Plated on request'],
    description: "MS Button Head Bolt is supplied by SRK Bolts for UAE and GCC project requirements. This button head bolt option is suitable for cost-effective general fabrication, machinery, steel structure and indoor construction fastening, with quotation support for standard, grade, size, finish and quantity.",
    features: ['Mild Steel material option', 'ISO 7380 / equivalent supply support', 'Standard and drawing-based RFQ support', 'Bulk project quantities available', 'Can be quoted with matching nuts or washers where applicable'],
    uses: ['low-profile visible fastening', 'panels', 'machinery covers', 'equipment frames and clean assemblies'],
    specifications: { standard: "ISO 7380 / equivalent", material: "Mild Steel", grades: ['Grade 4.6', 'Grade 8.8', 'Project grade'], sizes: "M3 to M20 or as per requirement", coating: ['Plain', 'Black Oxide', 'Zinc Plated on request'], threadType: "Metric thread" }
  },

  {
    id: "seo-gi-button-head-bolt",
    name: "GI Button Head Bolt",
    category: "BOLTS",
    image: "https://www.husainibrothers.com/cdn/images/200/5921504842_1635755736.jpg",
    standard: "ISO 7380 / equivalent",
    material: "Galvanized Iron / Zinc Plated Steel",
    grades: ['Grade 4.6', 'Grade 8.8', 'Project grade'],
    sizes: "M3 to M20 or as per requirement",
    coating: ['Zinc Plated', 'Galvanized'],
    description: "GI Button Head Bolt is supplied by SRK Bolts for UAE and GCC project requirements. This button head bolt option is suitable for construction, MEP, maintenance and moderate corrosion protection requirements, with quotation support for standard, grade, size, finish and quantity.",
    features: ['Galvanized Iron / Zinc Plated Steel material option', 'ISO 7380 / equivalent supply support', 'Standard and drawing-based RFQ support', 'Bulk project quantities available', 'Can be quoted with matching nuts or washers where applicable'],
    uses: ['low-profile visible fastening', 'panels', 'machinery covers', 'equipment frames and clean assemblies'],
    specifications: { standard: "ISO 7380 / equivalent", material: "Galvanized Iron / Zinc Plated Steel", grades: ['Grade 4.6', 'Grade 8.8', 'Project grade'], sizes: "M3 to M20 or as per requirement", coating: ['Zinc Plated', 'Galvanized'], threadType: "Metric thread" }
  },

  {
    id: "seo-ms-mushroom-head-bolt",
    name: "MS Mushroom Head Bolt",
    category: "BOLTS",
    image: "https://www.husainibrothers.com/cdn/images/200/5921504842_1635755736.jpg",
    standard: "DIN 603 / carriage bolt type",
    material: "Mild Steel",
    grades: ['Grade 4.6', 'Grade 8.8', 'Project grade'],
    sizes: "M6 to M20 or as per requirement",
    coating: ['Plain', 'Black Oxide', 'Zinc Plated on request'],
    description: "MS Mushroom Head Bolt is supplied by SRK Bolts for UAE and GCC project requirements. This mushroom head bolt option is suitable for cost-effective general fabrication, machinery, steel structure and indoor construction fastening, with quotation support for standard, grade, size, finish and quantity.",
    features: ['Mild Steel material option', 'DIN 603 / carriage bolt type supply support', 'Standard and drawing-based RFQ support', 'Bulk project quantities available', 'Can be quoted with matching nuts or washers where applicable'],
    uses: ['timber-to-steel', 'guard rails', 'panels', 'exposed heads and light structural fastening'],
    specifications: { standard: "DIN 603 / carriage bolt type", material: "Mild Steel", grades: ['Grade 4.6', 'Grade 8.8', 'Project grade'], sizes: "M6 to M20 or as per requirement", coating: ['Plain', 'Black Oxide', 'Zinc Plated on request'], threadType: "Metric thread" }
  },

  {
    id: "seo-gi-mushroom-head-bolt",
    name: "GI Mushroom Head Bolt",
    category: "BOLTS",
    image: "https://www.husainibrothers.com/cdn/images/200/5921504842_1635755736.jpg",
    standard: "DIN 603 / carriage bolt type",
    material: "Galvanized Iron / Zinc Plated Steel",
    grades: ['Grade 4.6', 'Grade 8.8', 'Project grade'],
    sizes: "M6 to M20 or as per requirement",
    coating: ['Zinc Plated', 'Galvanized'],
    description: "GI Mushroom Head Bolt is supplied by SRK Bolts for UAE and GCC project requirements. This mushroom head bolt option is suitable for construction, MEP, maintenance and moderate corrosion protection requirements, with quotation support for standard, grade, size, finish and quantity.",
    features: ['Galvanized Iron / Zinc Plated Steel material option', 'DIN 603 / carriage bolt type supply support', 'Standard and drawing-based RFQ support', 'Bulk project quantities available', 'Can be quoted with matching nuts or washers where applicable'],
    uses: ['timber-to-steel', 'guard rails', 'panels', 'exposed heads and light structural fastening'],
    specifications: { standard: "DIN 603 / carriage bolt type", material: "Galvanized Iron / Zinc Plated Steel", grades: ['Grade 4.6', 'Grade 8.8', 'Project grade'], sizes: "M6 to M20 or as per requirement", coating: ['Zinc Plated', 'Galvanized'], threadType: "Metric thread" }
  },

  {
    id: "seo-hdg-mushroom-head-bolt",
    name: "HDG Mushroom Head Bolt",
    category: "BOLTS",
    image: "https://www.husainibrothers.com/cdn/images/200/5921504842_1635755736.jpg",
    standard: "DIN 603 / carriage bolt type",
    material: "Hot Dip Galvanized Steel",
    grades: ['Grade 4.6', 'Grade 8.8', 'Project grade'],
    sizes: "M6 to M20 or as per requirement",
    coating: ['Hot Dip Galvanized'],
    description: "HDG Mushroom Head Bolt is supplied by SRK Bolts for UAE and GCC project requirements. This mushroom head bolt option is suitable for outdoor, infrastructure, exposed steel, base plate and heavy-duty project applications, with quotation support for standard, grade, size, finish and quantity.",
    features: ['Hot Dip Galvanized Steel material option', 'DIN 603 / carriage bolt type supply support', 'Standard and drawing-based RFQ support', 'Bulk project quantities available', 'Can be quoted with matching nuts or washers where applicable'],
    uses: ['timber-to-steel', 'guard rails', 'panels', 'exposed heads and light structural fastening'],
    specifications: { standard: "DIN 603 / carriage bolt type", material: "Hot Dip Galvanized Steel", grades: ['Grade 4.6', 'Grade 8.8', 'Project grade'], sizes: "M6 to M20 or as per requirement", coating: ['Hot Dip Galvanized'], threadType: "Metric thread" }
  },

  {
    id: "seo-ms-screw-self-tapping",
    name: "MS Screw Self Tapping",
    category: "SCREWS",
    image: "https://www.husainibrothers.com/cdn/images/200/roundhead-machine-screw.jpg",
    standard: "DIN 7981 / DIN 7982 / equivalent",
    material: "Mild Steel",
    grades: ['Grade 4.6', 'Grade 8.8', 'Project grade'],
    sizes: "ST sizes and metric equivalents as per requirement",
    coating: ['Plain', 'Black Oxide', 'Zinc Plated on request'],
    description: "MS Screw Self Tapping is supplied by SRK Bolts for UAE and GCC project requirements. This screw self tapping option is suitable for cost-effective general fabrication, machinery, steel structure and indoor construction fastening, with quotation support for standard, grade, size, finish and quantity.",
    features: ['Mild Steel material option', 'DIN 7981 / DIN 7982 / equivalent supply support', 'Standard and drawing-based RFQ support', 'Bulk project quantities available', 'Can be quoted with matching nuts or washers where applicable'],
    uses: ['sheet metal', 'panels', 'enclosures', 'covers and light assembly work'],
    specifications: { standard: "DIN 7981 / DIN 7982 / equivalent", material: "Mild Steel", grades: ['Grade 4.6', 'Grade 8.8', 'Project grade'], sizes: "ST sizes and metric equivalents as per requirement", coating: ['Plain', 'Black Oxide', 'Zinc Plated on request'], threadType: "Metric thread" }
  },

  {
    id: "seo-gi-screw-self-tapping",
    name: "GI Screw Self Tapping",
    category: "SCREWS",
    image: "https://www.husainibrothers.com/cdn/images/200/roundhead-machine-screw.jpg",
    standard: "DIN 7981 / DIN 7982 / equivalent",
    material: "Galvanized Iron / Zinc Plated Steel",
    grades: ['Grade 4.6', 'Grade 8.8', 'Project grade'],
    sizes: "ST sizes and metric equivalents as per requirement",
    coating: ['Zinc Plated', 'Galvanized'],
    description: "GI Screw Self Tapping is supplied by SRK Bolts for UAE and GCC project requirements. This screw self tapping option is suitable for construction, MEP, maintenance and moderate corrosion protection requirements, with quotation support for standard, grade, size, finish and quantity.",
    features: ['Galvanized Iron / Zinc Plated Steel material option', 'DIN 7981 / DIN 7982 / equivalent supply support', 'Standard and drawing-based RFQ support', 'Bulk project quantities available', 'Can be quoted with matching nuts or washers where applicable'],
    uses: ['sheet metal', 'panels', 'enclosures', 'covers and light assembly work'],
    specifications: { standard: "DIN 7981 / DIN 7982 / equivalent", material: "Galvanized Iron / Zinc Plated Steel", grades: ['Grade 4.6', 'Grade 8.8', 'Project grade'], sizes: "ST sizes and metric equivalents as per requirement", coating: ['Zinc Plated', 'Galvanized'], threadType: "Metric thread" }
  },

  {
    id: "seo-ms-screw-self-drilling",
    name: "MS Screw Self Drilling",
    category: "SCREWS",
    image: "https://www.husainibrothers.com/cdn/images/200/roundhead-machine-screw.jpg",
    standard: "DIN 7504 / equivalent",
    material: "Mild Steel",
    grades: ['Grade 4.6', 'Grade 8.8', 'Project grade'],
    sizes: "Common self-drilling sizes as per project requirement",
    coating: ['Plain', 'Black Oxide', 'Zinc Plated on request'],
    description: "MS Screw Self Drilling is supplied by SRK Bolts for UAE and GCC project requirements. This screw self drilling option is suitable for cost-effective general fabrication, machinery, steel structure and indoor construction fastening, with quotation support for standard, grade, size, finish and quantity.",
    features: ['Mild Steel material option', 'DIN 7504 / equivalent supply support', 'Standard and drawing-based RFQ support', 'Bulk project quantities available', 'Can be quoted with matching nuts or washers where applicable'],
    uses: ['roofing', 'cladding', 'sheet metal', 'light steel and panel fixing'],
    specifications: { standard: "DIN 7504 / equivalent", material: "Mild Steel", grades: ['Grade 4.6', 'Grade 8.8', 'Project grade'], sizes: "Common self-drilling sizes as per project requirement", coating: ['Plain', 'Black Oxide', 'Zinc Plated on request'], threadType: "Metric thread" }
  },

  {
    id: "seo-gi-screw-self-drilling",
    name: "GI Screw Self Drilling",
    category: "SCREWS",
    image: "https://www.husainibrothers.com/cdn/images/200/roundhead-machine-screw.jpg",
    standard: "DIN 7504 / equivalent",
    material: "Galvanized Iron / Zinc Plated Steel",
    grades: ['Grade 4.6', 'Grade 8.8', 'Project grade'],
    sizes: "Common self-drilling sizes as per project requirement",
    coating: ['Zinc Plated', 'Galvanized'],
    description: "GI Screw Self Drilling is supplied by SRK Bolts for UAE and GCC project requirements. This screw self drilling option is suitable for construction, MEP, maintenance and moderate corrosion protection requirements, with quotation support for standard, grade, size, finish and quantity.",
    features: ['Galvanized Iron / Zinc Plated Steel material option', 'DIN 7504 / equivalent supply support', 'Standard and drawing-based RFQ support', 'Bulk project quantities available', 'Can be quoted with matching nuts or washers where applicable'],
    uses: ['roofing', 'cladding', 'sheet metal', 'light steel and panel fixing'],
    specifications: { standard: "DIN 7504 / equivalent", material: "Galvanized Iron / Zinc Plated Steel", grades: ['Grade 4.6', 'Grade 8.8', 'Project grade'], sizes: "Common self-drilling sizes as per project requirement", coating: ['Zinc Plated', 'Galvanized'], threadType: "Metric thread" }
  },

  {
    id: "seo-ms-flat-washer",
    name: "MS Flat Washer",
    category: "WASHERS",
    image: "https://www.husainibrothers.com/cdn/images/200/4239323714_1635767753.jpg",
    standard: "DIN 125 / ISO 7089 or equivalent",
    material: "Mild Steel",
    grades: ['Grade 4.6', 'Grade 8.8', 'Project grade'],
    sizes: "M3 to M42 or as per requirement",
    coating: ['Plain', 'Black Oxide', 'Zinc Plated on request'],
    description: "MS Flat Washer is supplied by SRK Bolts for UAE and GCC project requirements. This flat washer option is suitable for cost-effective general fabrication, machinery, steel structure and indoor construction fastening, with quotation support for standard, grade, size, finish and quantity.",
    features: ['Mild Steel material option', 'DIN 125 / ISO 7089 or equivalent supply support', 'Standard and drawing-based RFQ support', 'Bulk project quantities available', 'Can be quoted with matching nuts or washers where applicable'],
    uses: ['load distribution', 'surface protection', 'bolt and nut assemblies and general project fastening'],
    specifications: { standard: "DIN 125 / ISO 7089 or equivalent", material: "Mild Steel", grades: ['Grade 4.6', 'Grade 8.8', 'Project grade'], sizes: "M3 to M42 or as per requirement", coating: ['Plain', 'Black Oxide', 'Zinc Plated on request'], threadType: "Metric thread" }
  },

  {
    id: "seo-gi-flat-washer",
    name: "GI Flat Washer",
    category: "WASHERS",
    image: "https://www.husainibrothers.com/cdn/images/200/4239323714_1635767753.jpg",
    standard: "DIN 125 / ISO 7089 or equivalent",
    material: "Galvanized Iron / Zinc Plated Steel",
    grades: ['Grade 4.6', 'Grade 8.8', 'Project grade'],
    sizes: "M3 to M42 or as per requirement",
    coating: ['Zinc Plated', 'Galvanized'],
    description: "GI Flat Washer is supplied by SRK Bolts for UAE and GCC project requirements. This flat washer option is suitable for construction, MEP, maintenance and moderate corrosion protection requirements, with quotation support for standard, grade, size, finish and quantity.",
    features: ['Galvanized Iron / Zinc Plated Steel material option', 'DIN 125 / ISO 7089 or equivalent supply support', 'Standard and drawing-based RFQ support', 'Bulk project quantities available', 'Can be quoted with matching nuts or washers where applicable'],
    uses: ['load distribution', 'surface protection', 'bolt and nut assemblies and general project fastening'],
    specifications: { standard: "DIN 125 / ISO 7089 or equivalent", material: "Galvanized Iron / Zinc Plated Steel", grades: ['Grade 4.6', 'Grade 8.8', 'Project grade'], sizes: "M3 to M42 or as per requirement", coating: ['Zinc Plated', 'Galvanized'], threadType: "Metric thread" }
  },

  {
    id: "seo-hdg-flat-washer",
    name: "HDG Flat Washer",
    category: "WASHERS",
    image: "https://www.husainibrothers.com/cdn/images/200/4239323714_1635767753.jpg",
    standard: "DIN 125 / ISO 7089 or equivalent",
    material: "Hot Dip Galvanized Steel",
    grades: ['Grade 4.6', 'Grade 8.8', 'Project grade'],
    sizes: "M3 to M42 or as per requirement",
    coating: ['Hot Dip Galvanized'],
    description: "HDG Flat Washer is supplied by SRK Bolts for UAE and GCC project requirements. This flat washer option is suitable for outdoor, infrastructure, exposed steel, base plate and heavy-duty project applications, with quotation support for standard, grade, size, finish and quantity.",
    features: ['Hot Dip Galvanized Steel material option', 'DIN 125 / ISO 7089 or equivalent supply support', 'Standard and drawing-based RFQ support', 'Bulk project quantities available', 'Can be quoted with matching nuts or washers where applicable'],
    uses: ['load distribution', 'surface protection', 'bolt and nut assemblies and general project fastening'],
    specifications: { standard: "DIN 125 / ISO 7089 or equivalent", material: "Hot Dip Galvanized Steel", grades: ['Grade 4.6', 'Grade 8.8', 'Project grade'], sizes: "M3 to M42 or as per requirement", coating: ['Hot Dip Galvanized'], threadType: "Metric thread" }
  },

  {
    id: "seo-ss304-nord-lock-washer",
    name: "SS304 Nord Lock Washer",
    category: "WASHERS",
    image: "https://www.husainibrothers.com/cdn/images/200/4239323714_1635767753.jpg",
    standard: "Wedge-locking washer type",
    material: "Stainless Steel 304",
    grades: ['SS304', 'A2 Stainless Steel'],
    sizes: "M3 to M36 or as per availability",
    coating: ['Natural stainless finish'],
    description: "SS304 Nord Lock Washer is supplied by SRK Bolts for UAE and GCC project requirements. This nord lock washer option is suitable for general corrosion resistance, fabrication, equipment, food-grade environments and clean indoor/outdoor fastening, with quotation support for standard, grade, size, finish and quantity.",
    features: ['Stainless Steel 304 material option', 'Wedge-locking washer type supply support', 'Standard and drawing-based RFQ support', 'Bulk project quantities available', 'Can be quoted with matching nuts or washers where applicable'],
    uses: ['vibration resistance', 'dynamic-load bolted joints', 'machinery and structural fastening'],
    specifications: { standard: "Wedge-locking washer type", material: "Stainless Steel 304", grades: ['SS304', 'A2 Stainless Steel'], sizes: "M3 to M36 or as per availability", coating: ['Natural stainless finish'], threadType: "Metric thread" }
  },

  {
    id: "seo-ms-cup-washer",
    name: "MS Cup Washer",
    category: "WASHERS",
    image: "https://www.husainibrothers.com/cdn/images/200/4239323714_1635767753.jpg",
    standard: "Finishing cup washer type",
    material: "Mild Steel",
    grades: ['Grade 4.6', 'Grade 8.8', 'Project grade'],
    sizes: "Screw and bolt sizes as per requirement",
    coating: ['Plain', 'Black Oxide', 'Zinc Plated on request'],
    description: "MS Cup Washer is supplied by SRK Bolts for UAE and GCC project requirements. This cup washer option is suitable for cost-effective general fabrication, machinery, steel structure and indoor construction fastening, with quotation support for standard, grade, size, finish and quantity.",
    features: ['Mild Steel material option', 'Finishing cup washer type supply support', 'Standard and drawing-based RFQ support', 'Bulk project quantities available', 'Can be quoted with matching nuts or washers where applicable'],
    uses: ['countersunk screw seating', 'panels', 'decorative hardware and visible fastening'],
    specifications: { standard: "Finishing cup washer type", material: "Mild Steel", grades: ['Grade 4.6', 'Grade 8.8', 'Project grade'], sizes: "Screw and bolt sizes as per requirement", coating: ['Plain', 'Black Oxide', 'Zinc Plated on request'], threadType: "Metric thread" }
  },

  {
    id: "seo-gi-cup-washer",
    name: "GI Cup Washer",
    category: "WASHERS",
    image: "https://www.husainibrothers.com/cdn/images/200/4239323714_1635767753.jpg",
    standard: "Finishing cup washer type",
    material: "Galvanized Iron / Zinc Plated Steel",
    grades: ['Grade 4.6', 'Grade 8.8', 'Project grade'],
    sizes: "Screw and bolt sizes as per requirement",
    coating: ['Zinc Plated', 'Galvanized'],
    description: "GI Cup Washer is supplied by SRK Bolts for UAE and GCC project requirements. This cup washer option is suitable for construction, MEP, maintenance and moderate corrosion protection requirements, with quotation support for standard, grade, size, finish and quantity.",
    features: ['Galvanized Iron / Zinc Plated Steel material option', 'Finishing cup washer type supply support', 'Standard and drawing-based RFQ support', 'Bulk project quantities available', 'Can be quoted with matching nuts or washers where applicable'],
    uses: ['countersunk screw seating', 'panels', 'decorative hardware and visible fastening'],
    specifications: { standard: "Finishing cup washer type", material: "Galvanized Iron / Zinc Plated Steel", grades: ['Grade 4.6', 'Grade 8.8', 'Project grade'], sizes: "Screw and bolt sizes as per requirement", coating: ['Zinc Plated', 'Galvanized'], threadType: "Metric thread" }
  },

  {
    id: "seo-ms-l-anchor-foundation-bolt",
    name: "MS L Anchor Foundation Bolt",
    category: "ATTACHMENTS",
    image: "https://www.husainibrothers.com/cdn/images/200/5921504842_1635755736.jpg",
    standard: "Foundation bolt / drawing-based supply",
    material: "Mild Steel",
    grades: ['Grade 4.6', 'Grade 8.8', 'Project grade'],
    sizes: "M12 to M42 or as per drawing",
    coating: ['Plain', 'Black Oxide', 'Zinc Plated on request'],
    description: "MS L Anchor Foundation Bolt is supplied by SRK Bolts for UAE and GCC project requirements. This l anchor foundation bolt option is suitable for cost-effective general fabrication, machinery, steel structure and indoor construction fastening, with quotation support for standard, grade, size, finish and quantity.",
    features: ['Mild Steel material option', 'Foundation bolt / drawing-based supply supply support', 'Standard and drawing-based RFQ support', 'Bulk project quantities available', 'Can be quoted with matching nuts or washers where applicable'],
    uses: ['base plates', 'steel columns', 'equipment foundations and concrete fixing'],
    specifications: { standard: "Foundation bolt / drawing-based supply", material: "Mild Steel", grades: ['Grade 4.6', 'Grade 8.8', 'Project grade'], sizes: "M12 to M42 or as per drawing", coating: ['Plain', 'Black Oxide', 'Zinc Plated on request'], threadType: "Metric thread" }
  },

  {
    id: "seo-gi-l-anchor-foundation-bolt",
    name: "GI L Anchor Foundation Bolt",
    category: "ATTACHMENTS",
    image: "https://www.husainibrothers.com/cdn/images/200/5921504842_1635755736.jpg",
    standard: "Foundation bolt / drawing-based supply",
    material: "Galvanized Iron / Zinc Plated Steel",
    grades: ['Grade 4.6', 'Grade 8.8', 'Project grade'],
    sizes: "M12 to M42 or as per drawing",
    coating: ['Zinc Plated', 'Galvanized'],
    description: "GI L Anchor Foundation Bolt is supplied by SRK Bolts for UAE and GCC project requirements. This l anchor foundation bolt option is suitable for construction, MEP, maintenance and moderate corrosion protection requirements, with quotation support for standard, grade, size, finish and quantity.",
    features: ['Galvanized Iron / Zinc Plated Steel material option', 'Foundation bolt / drawing-based supply supply support', 'Standard and drawing-based RFQ support', 'Bulk project quantities available', 'Can be quoted with matching nuts or washers where applicable'],
    uses: ['base plates', 'steel columns', 'equipment foundations and concrete fixing'],
    specifications: { standard: "Foundation bolt / drawing-based supply", material: "Galvanized Iron / Zinc Plated Steel", grades: ['Grade 4.6', 'Grade 8.8', 'Project grade'], sizes: "M12 to M42 or as per drawing", coating: ['Zinc Plated', 'Galvanized'], threadType: "Metric thread" }
  },

  {
    id: "seo-hdg-l-anchor-foundation-bolt",
    name: "HDG L Anchor Foundation Bolt",
    category: "ATTACHMENTS",
    image: "https://www.husainibrothers.com/cdn/images/200/5921504842_1635755736.jpg",
    standard: "Foundation bolt / drawing-based supply",
    material: "Hot Dip Galvanized Steel",
    grades: ['Grade 4.6', 'Grade 8.8', 'Project grade'],
    sizes: "M12 to M42 or as per drawing",
    coating: ['Hot Dip Galvanized'],
    description: "HDG L Anchor Foundation Bolt is supplied by SRK Bolts for UAE and GCC project requirements. This l anchor foundation bolt option is suitable for outdoor, infrastructure, exposed steel, base plate and heavy-duty project applications, with quotation support for standard, grade, size, finish and quantity.",
    features: ['Hot Dip Galvanized Steel material option', 'Foundation bolt / drawing-based supply supply support', 'Standard and drawing-based RFQ support', 'Bulk project quantities available', 'Can be quoted with matching nuts or washers where applicable'],
    uses: ['base plates', 'steel columns', 'equipment foundations and concrete fixing'],
    specifications: { standard: "Foundation bolt / drawing-based supply", material: "Hot Dip Galvanized Steel", grades: ['Grade 4.6', 'Grade 8.8', 'Project grade'], sizes: "M12 to M42 or as per drawing", coating: ['Hot Dip Galvanized'], threadType: "Metric thread" }
  },

  {
    id: "seo-ms-straight-anchor-foundation-bolt",
    name: "MS Straight Anchor Foundation Bolt",
    category: "ATTACHMENTS",
    image: "https://www.husainibrothers.com/cdn/images/200/5921504842_1635755736.jpg",
    standard: "Foundation bolt / drawing-based supply",
    material: "Mild Steel",
    grades: ['Grade 4.6', 'Grade 8.8', 'Project grade'],
    sizes: "M12 to M42 or as per drawing",
    coating: ['Plain', 'Black Oxide', 'Zinc Plated on request'],
    description: "MS Straight Anchor Foundation Bolt is supplied by SRK Bolts for UAE and GCC project requirements. This straight anchor foundation bolt option is suitable for cost-effective general fabrication, machinery, steel structure and indoor construction fastening, with quotation support for standard, grade, size, finish and quantity.",
    features: ['Mild Steel material option', 'Foundation bolt / drawing-based supply supply support', 'Standard and drawing-based RFQ support', 'Bulk project quantities available', 'Can be quoted with matching nuts or washers where applicable'],
    uses: ['machinery foundations', 'steel structures', 'base plates and concrete fixing'],
    specifications: { standard: "Foundation bolt / drawing-based supply", material: "Mild Steel", grades: ['Grade 4.6', 'Grade 8.8', 'Project grade'], sizes: "M12 to M42 or as per drawing", coating: ['Plain', 'Black Oxide', 'Zinc Plated on request'], threadType: "Metric thread" }
  },

  {
    id: "seo-gi-straight-anchor-foundation-bolt",
    name: "GI Straight Anchor Foundation Bolt",
    category: "ATTACHMENTS",
    image: "https://www.husainibrothers.com/cdn/images/200/5921504842_1635755736.jpg",
    standard: "Foundation bolt / drawing-based supply",
    material: "Galvanized Iron / Zinc Plated Steel",
    grades: ['Grade 4.6', 'Grade 8.8', 'Project grade'],
    sizes: "M12 to M42 or as per drawing",
    coating: ['Zinc Plated', 'Galvanized'],
    description: "GI Straight Anchor Foundation Bolt is supplied by SRK Bolts for UAE and GCC project requirements. This straight anchor foundation bolt option is suitable for construction, MEP, maintenance and moderate corrosion protection requirements, with quotation support for standard, grade, size, finish and quantity.",
    features: ['Galvanized Iron / Zinc Plated Steel material option', 'Foundation bolt / drawing-based supply supply support', 'Standard and drawing-based RFQ support', 'Bulk project quantities available', 'Can be quoted with matching nuts or washers where applicable'],
    uses: ['machinery foundations', 'steel structures', 'base plates and concrete fixing'],
    specifications: { standard: "Foundation bolt / drawing-based supply", material: "Galvanized Iron / Zinc Plated Steel", grades: ['Grade 4.6', 'Grade 8.8', 'Project grade'], sizes: "M12 to M42 or as per drawing", coating: ['Zinc Plated', 'Galvanized'], threadType: "Metric thread" }
  },

  {
    id: "seo-hdg-straight-anchor-foundation-bolt",
    name: "HDG Straight Anchor Foundation Bolt",
    category: "ATTACHMENTS",
    image: "https://www.husainibrothers.com/cdn/images/200/5921504842_1635755736.jpg",
    standard: "Foundation bolt / drawing-based supply",
    material: "Hot Dip Galvanized Steel",
    grades: ['Grade 4.6', 'Grade 8.8', 'Project grade'],
    sizes: "M12 to M42 or as per drawing",
    coating: ['Hot Dip Galvanized'],
    description: "HDG Straight Anchor Foundation Bolt is supplied by SRK Bolts for UAE and GCC project requirements. This straight anchor foundation bolt option is suitable for outdoor, infrastructure, exposed steel, base plate and heavy-duty project applications, with quotation support for standard, grade, size, finish and quantity.",
    features: ['Hot Dip Galvanized Steel material option', 'Foundation bolt / drawing-based supply supply support', 'Standard and drawing-based RFQ support', 'Bulk project quantities available', 'Can be quoted with matching nuts or washers where applicable'],
    uses: ['machinery foundations', 'steel structures', 'base plates and concrete fixing'],
    specifications: { standard: "Foundation bolt / drawing-based supply", material: "Hot Dip Galvanized Steel", grades: ['Grade 4.6', 'Grade 8.8', 'Project grade'], sizes: "M12 to M42 or as per drawing", coating: ['Hot Dip Galvanized'], threadType: "Metric thread" }
  },

]

// Helper function to find product by name
export const findProductByName = (name: string, category?: string): SRKProduct | undefined => {
  if (category) {
    return srkProducts.find(p => p.name === name && p.category === category)
  }
  return srkProducts.find(p => p.name === name)
}

// Helper function to find product by ID
export const findProductById = (id: string): SRKProduct | undefined => {
  return srkProducts.find(p => p.id === id)
}

// Helper function to get products by category
export const getProductsByCategory = (category: string): SRKProduct[] => {
  return srkProducts.filter(p => p.category === category)
}
