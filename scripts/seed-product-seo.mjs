import fs from "fs"
import { MongoClient } from "mongodb"

function loadEnv() {
  const text = fs.readFileSync(new URL("../.env", import.meta.url), "utf8")
  const env = {}

  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith("#")) continue
    const idx = trimmed.indexOf("=")
    if (idx === -1) continue
    env[trimmed.slice(0, idx).trim()] = trimmed.slice(idx + 1).trim()
  }

  return env
}

function createSlug(name) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[\/\\]/g, " ")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "")
}

const updates = [
  {
    name: "DIN 603 Carriage Bolt/ Mushroom Head Bolt",
    title: "DIN 603 Carriage Bolt and Mushroom Head Bolt - SRK BOLT",
    description:
      "High-quality DIN 603 Carriage Bolts Mushroom Head Bolts designed for secure fastening in wood, metal, and construction applications. Manufactured from durable steel with a smooth rounded head and square neck to prevent rotation, these mushroom head bolts. Contact us for more +971 58 871 3064",
    keywords:
      "DIN 603 Carriage Bolt and Mushroom Head Bolt, DIN 603 Carriage Bolt, Mushroom Head Bolt, Square Neck Bolt, Heavy-Duty Fastener, Steel Carriage Bolt.",
  },
  {
    name: "DIN 933 / 931 Hexagon Bolt",
    title: "DIN 933 or 931 Hexagon Bolt - SRK BOLT",
    description:
      "Premium DIN 933 and DIN 931 Hexagon Bolts engineered for strength, durability, and precision fastening. These high-quality hex bolts are available in fully threaded (DIN 933) and partially threaded (DIN 931) designs, making them ideal for machinery, construction, automotive, and industrial applications.",
    keywords:
      "DIN 933 or 931 Hexagon Bolt, DIN 933 Hexagon Bolt, DIN 931 Hexagon Bolt, Fully Threaded Hex Bolt, Partially Threaded Hex Bolt, Industrial Fasteners, Heavy-Duty Steel Bolts.",
  },
  {
    name: "Roofing Bolt",
    title: "Roofing Bolt in Dubai - SRK BOLT",
    description:
      "High-quality roofing bolts in Dubai designed for secure and durable installation in residential, commercial, and industrial roofing projects. Made from premium steel with corrosion-resistant coatings, these roofing fasteners in Dubai ensure long-lasting performance in all weather conditions.",
    keywords:
      "Roofing bolts Dubai, Roof fasteners Dubai, Steel roofing bolts, Durable roof bolts, Construction fasteners Dubai.",
  },
  {
    name: "DIN 7380 Button Head Allen Bolt",
    title: "DIN 7380 Button Head Allen Bolt - SRK BOLT",
    description:
      "Premium DIN 7380 Button Head Allen Bolts designed for precise and secure fastening in machinery, automotive, and industrial applications. Featuring a smooth button head and hex socket drive, these bolts provide a sleek appearance and strong holding power. Contact us for more +971 58 871 3064",
    keywords:
      "DIN 7380 Button Head Allen Bolt, Button Head Hex Socket Bolt, Allen Bolt for Machinery, High Strength Allen Bolts, Industrial Fasteners.",
  },
  {
    name: "DIN 7984 Low Head Allen Bolt",
    title: "DIN 7984 Low Head Allen Bolt - SRK BOLT",
    description:
      "High-quality DIN 7984 Low Head Allen Bolts for secure and compact fastening in machinery, automotive, and industrial projects. Made from durable steel with corrosion-resistant coating, these low-profile Allen bolts offer easy installation, strong holding power, and a sleek, flush finish. Available in multiple sizes and grades.",
    keywords:
      "DIN 7984 Low Head Allen Bolt, Low Profile Allen Bolt, Hex Socket Bolt, Industrial Fasteners, Machinery Bolts.",
  },
  {
    name: "DIN 7991 Allen CSK Bolt/Hexagon socket countersunk ",
    title: "DIN 7991 Allen CSK Bolt or Hexagon socket countersunk",
    description:
      "Premium DIN 7991 Allen Countersunk Bolts for flush, secure fastening in machinery, automotive, and industrial applications. Made from high-strength steel, these hex socket CSK bolts provide corrosion resistance, durability, and precise installation. Available in multiple sizes and grades.",
    keywords:
      "DIN 7991 Allen CSK Bolt or Hexagon socket countersunk, Hexagon Socket Countersunk Bolt, Countersunk Allen Bolt, Flush Mount Fasteners, Industrial Hex Socket Bolts.",
  },
  {
    name: "ASTM A325M Heavy Hexagon Bolt",
    title: "ASTM A325M Heavy Hexagon Bolt - SRK BOLT",
    description:
      "High-strength ASTM A325M Heavy Hexagon Bolts for structural, industrial, and construction applications. Made from premium steel, these heavy hex bolts ensure durability, corrosion resistance, and reliable fastening for critical projects. Available in multiple sizes and grades.",
    keywords:
      "ASTM A325M Heavy Hexagon Bolt, Structural Hex Bolt, High-Strength Hex Bolt, Industrial Fasteners, Construction Bolts.",
  },
  {
    name: "DIN 975 / 976-1 Threaded Rods",
    title: "DIN 975 or 976-1 Threaded Rods - SRK BOLT",
    description:
      "High-quality DIN 975 and DIN 976-1 Threaded Rods for industrial, construction, and mechanical applications. Made from durable steel, these fully threaded rods provide strength, corrosion resistance, and versatile fastening solutions. Available in multiple sizes and grades.",
    keywords:
      "DIN 975 or 976-1 Threaded Rods, DIN 975 Threaded Rod, DIN 975 Threaded Rod, DIN 976-1 Threaded Rod, Fully Threaded Rod, Industrial Fasteners, Steel Threaded Rods.",
  },
  {
    name: "ASTM A490M Heavy Hexagon Bolt Friction Grip Type",
    title: "ASTM A490M Heavy Hexagon Bolt Friction Grip Type - SRK BOLT",
    description:
      "High-strength ASTM A490M Heavy Hexagon Friction Grip Bolts designed for structural and industrial applications. Made from premium steel, these heavy hex bolts offer superior durability, corrosion resistance, and reliable fastening for critical construction projects. Available in multiple sizes and grades.",
    keywords:
      "ASTM A490M Heavy Hexagon Bolt Friction Grip Type, ASTM A490M Heavy Hexagon Bolt, Friction Grip Hex Bolt, Structural Hex Bolt, High-Strength Industrial Bolt, Construction Fasteners.",
  },
  {
    name: "DIN 912 Allen Bolt / Socket Head Cap Screw",
    title: "DIN 912 Allen Bolt or Socket Head Cap Screw - SRK BOLT",
    description:
      "High-quality DIN 912 Allen Bolts (Socket Head Cap Screws) for machinery, automotive, and industrial applications. Made from durable steel, these hex socket bolts ensure precise fastening, corrosion resistance, and long-lasting performance. Available in multiple sizes and grades.",
    keywords:
      "DIN 912 Allen Bolt or Socket Head Cap Screw, DIN 912 Allen Bolt, Socket Head Cap Screw, Hex Socket Bolt, Industrial Fasteners, High-Strength Machine Bolt.",
  },
  {
    name: "DIN 186 T Head Bolt",
    title: "DIN 186 T Head Bolt - SRK BOLT",
    description:
      "Durable DIN 186 T-Head Bolts for industrial, machinery, and construction applications. Made from high-strength steel, these T-slot bolts provide secure fastening, corrosion resistance, and precise installation. Available in multiple sizes and grades.",
    keywords:
      "DIN 186 T Head Bolt, T-Slot Bolt, Industrial Fasteners, Machine Bolts, High-Strength Steel Bolts.",
  },
  {
    name: "DIN 6921 Flange Bolt",
    title: "DIN 6921 Flange Bolt - SRK BOLT",
    description:
      "High-quality DIN 6921 Flange Bolts for industrial, machinery, and construction applications. Made from durable steel, these flanged hex bolts provide superior strength, corrosion resistance, and reliable fastening. Available in multiple sizes and grades.",
    keywords:
      "DIN 6921 Flange Bolt, Flanged Hex Bolt, Industrial Fasteners, High-Strength Bolts, Machinery Bolts",
  },
  {
    name: "DIN 939 1.25D Engineering Stud",
    title: "DIN 939 1.25D Engineering Stud - SRK BOLT",
    description:
      "High-strength DIN 939 1.25D Engineering Studs for industrial, construction, and machinery applications. Made from premium steel, these fully threaded studs provide superior durability, corrosion resistance, and reliable fastening.",
    keywords:
      "DIN 939 1.25D Engineering Stud, Fully Threaded Stud Bolt, Industrial Fasteners, High-Strength Steel Studs, Machinery Bolts.",
  },
  {
    name: "DIN 3570 U BOLT",
    title: "DIN 3570 U BOLT - SRK BOLT",
    description:
      "Durable DIN 3570 U-Bolts for industrial, automotive, and construction applications. Made from high-strength steel, these U-shaped bolts provide secure fastening, corrosion resistance, and reliable performance.",
    keywords:
      "DIN 3570 U BOLT, U-Shaped Bolt, Industrial Fasteners, High-Strength Steel U-Bolt, Automotive and Construction Bolt.",
  },
  {
    name: "ISO 13918 Welding Shear Studs and ceramic ferrules",
    title: "ISO 13918 Welding Shear Studs and ceramic ferrules - SRK BOLT",
    description:
      "ISO 13918 Welding Shear Studs and Ceramic Ferrules for steel construction and industrial welding applications. Designed for superior strength, reliable shear performance, and corrosion resistance.",
    keywords:
      "ISO 13918 Welding Shear Studs and ceramic ferrules, Ceramic Ferrules, Structural Welding Fasteners, High-Strength Shear Studs, Industrial Welding Components.",
  },
  {
    name: "DIN 935 - Hexagon slotted castle nuts",
    title: "DIN 935 Hexagon slotted castle nuts - SRK BOLT",
    description:
      "DIN 935 hexagon slotted castle nuts are designed for secure fastening with cotter pins. Ideal for automotive, machinery, and industrial applications requiring vibration resistance.",
    keywords:
      "DIN 935 - Hexagon slotted castle nuts, hexagon slotted castle nuts, DIN 935 hex nuts, castle nuts with cotter pin, slotted hex nuts DIN 935.",
  },
  {
    name: "Shear Nut",
    title: "Shear Nut in Dubai - SRK BOLT",
    description:
      "Shear nuts are tamper-proof fasteners designed to break off during installation, ensuring permanent and secure fixing for anti-theft and safety applications.",
    keywords:
      "Shear Nut, tamper proof nuts, breakaway nuts, security shear nuts, anti-theft nuts.",
  },
  {
    name: "DIN 980 Cone Lock Nut",
    title: "DIN 980 Cone Lock Nut - SRK BOLT",
    description:
      "DIN 980 cone lock nuts provide strong, vibration-resistant fastening with a conical locking feature. Ideal for automotive and industrial applications.",
    keywords:
      "DIN 980 Cone Lock Nut, cone lock nuts DIN 980, DIN 980 locking nuts, conical lock nuts, DIN 980 hex lock nuts.",
  },
  {
    name: "Anco Lock Nut",
    title: "Anco Lock Nut - SRK BOLT",
    description:
      "Anco lock nuts are engineered for enhanced locking efficiency, offering resistance to vibration and loosening. Available in various sizes and materials for multiple applications.",
    keywords:
      "Anco Lock Nut, Anco lock nuts, Anco locking nuts, Anco fasteners, industrial lock nuts.",
  },
  {
    name: "Teeth Nut",
    title: "Teeth Nut - SRK BOLT",
    description:
      "Teeth nuts, also known as serrated nuts, provide strong locking by gripping the surface to prevent loosening. Ideal for vibration-resistant fastening applications.",
    keywords:
      "Teeth Nut, serrated nuts, anti-slip lock nuts, serrated flange nuts, vibration resistant nuts, industrial serrated fasteners, teeth nuts supplier India.",
  },
  {
    name: "Clinch Nut",
    title: "Clinch Nut - SRK BOLT",
    description:
      "Clinch nuts offer a permanent fastening solution by mechanically locking into sheet metal, ensuring high torque resistance and durability in demanding environments.",
    keywords:
      "Clinch Nut, clinch nuts, self-clinching nuts, press fit nuts, sheet metal clinch nuts.",
  },
  {
    name: "Spring Nut",
    title: "Spring Nut - SRK BOLT",
    description:
      "Spring nuts feature integrated springs for easy positioning and secure locking in channel rails, ensuring efficient and vibration-resistant fastening in various applications.",
    keywords:
      "Spring Nut, spring nuts, channel spring nuts, strut channel nuts, spring channel nuts.",
  },
  {
    name: "Speed Nut",
    title: "Speed Nut - SRK BOLT",
    description:
      "Speed nuts offer efficient fastening with a self-retaining design, ensuring strong grip and easy installation in panel, sheet metal, and electrical applications.",
    keywords:
      "Speed Nut, sheet metal speed nuts, self-locking speed nuts, U clip speed nuts, fastener speed nuts, automotive speed nuts, speed nuts supplier Dubai.",
  },
  {
    name: "DIN 439 Thin/Jam Nut",
    title: "DIN 439 Thin or Jam Nut - SRK BOLT",
    description:
      "DIN 439 thin or jam nuts are used to lock standard nuts in place or for applications with limited space, ensuring stability and resistance to loosening.",
    keywords:
      "DIN 439 Thin or Jam Nut, DIN 439 thin nuts, DIN 439 jam nuts, thin hex nuts DIN 439, jam nuts DIN 439, DIN 439 lock nuts.",
  },
  {
    name: "DIN 315 Wing Nut",
    title: "DIN 315 Wing Nut - SRK BOLT",
    description:
      "DIN 315 wing nuts are designed with extended wings for hand-tightening, enabling quick and secure fastening in low-torque applications across automotive, industrial, and mechanical projects.",
    keywords:
      "DIN 315 Wing Nut, DIN 315 wing nut, tool-free wing nuts, hand tightening wing nuts, industrial wing nuts, stainless steel wing nuts, DIN 315 fasteners.",
  },
  {
    name: "DIN 6334 Hexagon Coupling / Long Nut",
    title: "DIN 6334 Hexagon Coupling or Long Nut - SRK BOLT",
    description:
      "DIN 6334 hexagon coupling nuts, also called long nuts, allow secure joining of threaded rods, ensuring reliable load transfer and stability in industrial, mechanical, and construction applications.",
    keywords:
      "DIN 6334 Hexagon Coupling or Long Nut, DIN 6334 long nut, hex coupling nut DIN 6334, coupling nuts for threaded rods, long hex nuts DIN 6334.",
  },
  {
    name: "DIN 6923 Flange Nut",
    title: "DIN 6923 Flange Nut - SRK BOLT",
    description:
      "DIN 6923 flange nuts are engineered with a wide flange to distribute load evenly, ensuring secure and long-lasting fastening in machinery, automotive, and industrial projects.",
    keywords:
      "DIN 6923 Flange Nut, flange nuts DIN 6923, DIN 6923 hex flange nuts, heavy duty flange nuts, automotive flange nuts.",
  },
  {
    name: "Cage Nut",
    title: "Cage Nut - SRK BOLT",
    description:
      "Cage nuts offer a versatile solution for mounting hardware in square-holed racks, providing strong, vibration-resistant fastening and easy replacement in IT, networking, and industrial enclosures.",
    keywords:
      "Cage Nut, cage nuts, rack cage nuts, square hole cage nuts, server rack cage nuts.",
  },
  {
    name: "DIN 929 Weld Nut",
    title: "DIN 929 Weld Nut - SRK BOLT",
    description:
      "DIN 929 weld nuts provide reliable, permanent fastening on metal surfaces. Engineered for welding installation, they deliver excellent strength, stability, and resistance to loosening under vibration in industrial and mechanical projects.",
    keywords:
      "DIN 929 Weld Nut, weld nuts DIN 929, hex weld nuts, permanent welding nuts, industrial weld nuts.",
  },
  {
    name: "DIN 928 square weld nut",
    title: "DIN 928 square weld nut - SRK BOLT",
    description:
      "DIN 928 square weld nuts feature a robust square design for secure welding to metal surfaces, delivering reliable, vibration-resistant fastening in mechanical, industrial, and structural projects.",
    keywords:
      "DIN 928 square weld nut, square weld nuts DIN 928, welding nuts DIN 928, industrial square weld nuts, metal weld nuts.",
  },
  {
    name: "DIN 7967 Pal Lock Nut",
    title: "DIN 7967 Pal Lock Nut - SRK BOLT",
    description:
      "DIN 7967 Pal lock nuts are engineered for superior locking performance, preventing loosening under dynamic loads. Available in multiple sizes and materials for industrial and mechanical uses.",
    keywords:
      "DIN 7967 Pal Lock Nut, Pal lock nuts DIN 7967, self-locking nuts DIN 7967, anti-loosening lock nuts, vibration resistant nuts.",
  },
  {
    name: "DIN 6926 – Self Locking Hexagon Flange Nut with Serration",
    title: "DIN 6926 Self Locking Hexagon Flange Nut with Serration- SRK BOLT",
    description:
      "DIN 6926 self-locking hexagon flange nuts with serration deliver high-strength, vibration-resistant fastening. The serrated flange distributes load evenly and prevents loosening in heavy-duty machinery and industrial equipment.",
    keywords:
      "DIN 6926 – Self Locking Hexagon Flange Nut with Serration, DIN 6926 self-locking flange nut, serrated flange nut DIN 6926, vibration-resistant flange nuts, DIN 6926 locking nuts.",
  },
  {
    name: "DIN 1587 Dome Cap Nut",
    title: "DIN 1587 Dome Cap Nut - SRK BOLT",
    description:
      "DIN 1587 dome cap nuts are designed with a rounded top to protect exposed threads while providing secure, vibration-resistant fastening. Suitable for industrial, automotive, and machinery applications.",
    keywords:
      "DIN 1587 Dome Cap Nut, dome nuts DIN 1587, hex dome cap nuts, protective cap nuts, rounded top nuts.",
  },
  {
    name: "DIN 985 Prevailing Lock Nut",
    title: "DIN 985 Prevailing Lock Nut- SRK BOLT",
    description:
      "DIN 985 prevailing lock nuts feature a nylon insert that maintains tension and prevents loosening under dynamic loads, offering secure, vibration-resistant fastening for machinery, automotive, and industrial projects.",
    keywords:
      "DIN 985 Prevailing Lock Nut, prevailing torque nut DIN 985, nylon lock nut DIN 985, vibration-resistant lock nuts, DIN 985 self-locking nuts.",
  },
  {
    name: "DIN 917 Hexagon Cap Nut",
    title: "DIN 917 Hexagon Cap Nut- SRK BOLT",
    description:
      "DIN 917 hexagon cap nuts are designed with a closed-end to protect threaded rods while providing secure fastening. Suitable for machinery, automotive, and industrial projects requiring safe and reliable connections.",
    keywords:
      "DIN 917 Hexagon Cap Nut, hex cap nuts DIN 917, closed end hex nuts, protective hex nuts, industrial hex cap nuts.",
  },
  {
    name: "DIN 934 Hexagon Nut",
    title: "DIN 934 Hexagon Nut - SRK BOLT",
    description:
      "DIN 934 hexagon nuts are standard fasteners designed for strong, vibration-resistant connections. Suitable for bolts and threaded rods in machinery, automotive, and industrial applications.",
    keywords:
      "DIN 934 Hexagon Nut, hex nuts DIN 934, standard hexagon nuts, industrial hex nuts, mechanical fastening nuts.",
  },
  {
    name: "DIN 6331 Hex Nut With Collar",
    title: "DIN 6331 Hex Nut with Collar - SRK BOLT",
    description:
      "DIN 6331 hex nuts with collar are engineered to provide enhanced load distribution and secure fastening. Suitable for automotive, industrial, and mechanical applications requiring vibration resistance and reliable performance.",
    keywords:
      "DIN 6331 Hex Nut with Collar, hex nuts with collar DIN 6331, collar hex nuts, industrial hex nuts with collar, automotive hex nuts DIN 6331.",
  },
  {
    name: "DIN 985 / 982 Self Locking Nut",
    title: "DIN 985 or 982 Self Locking Nut- SRK BOLT",
    description:
      "DIN 985 and DIN 982 self-locking nuts provide superior locking performance using nylon inserts or prevailing torque, preventing loosening under dynamic loads. Ideal for automotive, industrial, and mechanical projects requiring secure fastening.",
    keywords:
      "DIN 985 or 982 Self Locking Nut, DIN 982 self-locking nut, nylon insert lock nut, prevailing torque nut, vibration-resistant lock nuts.",
  },
  {
    name: "EPDM bonded sealing washer",
    title: "EPDM bonded sealing washer- SRK BOLT",
    description:
      "EPDM bonded sealing washers combine durable metal and EPDM rubber to provide leak-proof, vibration-resistant sealing for bolts, screws, and fasteners. Ideal for industrial, automotive, and plumbing projects.",
    keywords:
      "EPDM bonded sealing washer, bonded sealing washers, EPDM washers, leak-proof washers, industrial sealing washers.",
  },
  {
    name: "DIN 6796 Belleville Conical Spring Washer",
    title: "DIN 6796 Belleville Conical Spring Washer- SRK BOLT",
    description:
      "DIN 6796 Belleville conical spring washers are designed to provide tension, absorb shock, and prevent loosening in bolted connections. Ideal for heavy-duty machinery, automotive, and industrial projects.",
    keywords:
      "DIN 6796 Belleville Conical Spring Washer, Belleville conical spring washer, vibration-resistant washers, high-load spring washers.",
  },
  {
    name: "DIN 7349 Heavy Thick Washer",
    title: "DIN 7349 Heavy Thick Washer - SRK BOLT",
    description:
      "DIN 7349 heavy thick washers are engineered for heavy-duty applications, providing excellent load distribution, vibration resistance, and protection for bolted joints in industrial and mechanical projects.",
    keywords:
      "DIN 7349 Heavy Thick Washer, heavy thick washers DIN 7349, industrial thick washers, load-bearing washers, DIN 7349 flat washer.",
  },
  {
    name: "Dowty Seal Washer",
    title: "Dowty Seal Washer - SRK BOLT",
    description:
      "Dowty seal washers combine metal and elastomer to provide secure, leak-resistant sealing for bolts and fittings. Ideal for high-pressure hydraulic, automotive, and industrial applications requiring vibration-resistant performance.",
    keywords:
      "Dowty Seal Washer, bonded seal washer, leak-proof washers, hydraulic sealing washers.",
  },
  {
    name: "DIN 6799  Retaining washers for shafts",
    title: "DIN 6799 Retaining washers for shaft - SRK BOLT",
    description:
      "DIN 6799 retaining washers provide durable axial retention for shafts, preventing movement of components while ensuring vibration-resistant and reliable performance in industrial, automotive, and mechanical applications.",
    keywords:
      "DIN 6799 Retaining washers for shaft, retaining washers for shaft DIN 6799, shaft retaining washers, axial retention washers, industrial shaft washers.",
  },
  {
    name: "DIN 9021 Plain washer with outside diameter ≈ 3 x nominal thread diameter",
    title: "DIN 9021 Plain washer with outside diameter - SRK BOLT",
    description:
      "DIN 9021 plain washers with outside diameter are designed to provide maximum load distribution, reduce stress on surfaces, and improve bolt connection stability. Suitable for industrial, mechanical, and automotive projects.",
    keywords:
      "DIN 9021 Plain washer with outside diameter, DIN 9021 washer with outside diameter, large OD washers DIN 9021, industrial plain washers, mechanical flat washers.",
  },
  {
    name: "DIN 125 Plain Washers",
    title: "DIN 125 Plain Washers- SRK BOLT",
    description:
      "DIN 125 plain washers are standard flat washers that enhance fastening performance by distributing load and protecting surfaces, ensuring secure and stable connections in industrial and mechanical applications.",
    keywords:
      "DIN 125 Plain Washers, DIN 125 flat washers, standard flat washers, industrial plain washers, mechanical flat washers.",
  },
  {
    name: "DIN 472 Internal Retaining Ring",
    title: "DIN 472 Internal Retaining Ring - SRK BOLT",
    description:
      "DIN 472 internal retaining rings are engineered for use in bores to hold components securely in place, offering excellent load-bearing capacity and vibration resistance in industrial and mechanical systems.",
    keywords:
      "DIN 472 Internal Retaining Ring, internal circlip DIN 472, bore retaining rings, internal snap rings, DIN 472 circlips.",
  },
  {
    name: "DIN 471 External Retaining Ring",
    title: "DIN 471 External Retaining Ring - SRK BOLT",
    description:
      "DIN 471 external retaining rings are engineered for use on shafts to hold components firmly in place, offering excellent load-bearing capacity and vibration resistance in industrial and mechanical systems.",
    keywords:
      "DIN 471 External Retaining Ring, external circlip DIN 471, shaft retaining rings, external snap rings, DIN 471 circlips.",
  },
  {
    name: "Snap rings for bores",
    title: "Snap rings for bores - SRK BOLT",
    description:
      "Snap rings for bores are engineered to fit inside grooves in housings, holding components firmly in place and offering excellent load-bearing capacity and vibration resistance in industrial systems.",
    keywords:
      "Snap rings for bores, internal snap rings, bore retaining rings, internal circlips, retaining rings for bore.",
  },
  {
    name: "Schnorr Safety Washer",
    title: "Schnorr Safety Washer- SRK BOLT",
    description:
      "Schnorr safety washers are engineered to provide strong locking performance, combining serration and spring action to prevent loosening in high-vibration environments across industrial and mechanical applications.",
    keywords:
      "Schnorr Safety Washer, Schnorr washers, safety locking washers, conical serrated washers, vibration-resistant washers.",
  },
  {
    name: "DIN 13912 Countersunk Cup Washer",
    title: "DIN 13912 Countersunk Cup Washer- SRK BOLT",
    description:
      "DIN 13912 countersunk cup washers are engineered to provide a clean finish and improved load distribution for countersunk screws, ensuring stable and reliable fastening in industrial, construction, and decorative applications.",
    keywords:
      "DIN 13912 Countersunk Cup Washer, countersunk cup washers DIN 13912, cup washers for countersunk screws, finishing washers, decorative cup washers.",
  },
  {
    name: "O-Ring Rubber",
    title: "O-Ring Rubber- SRK BOLT",
    description:
      "Rubber O-rings are versatile sealing components used to prevent leakage in fluid and gas systems, ensuring reliable performance in automotive, industrial, and mechanical applications.",
    keywords:
      "O-Ring Rubber, rubber O-rings, sealing O-rings, industrial O-rings, rubber sealing rings.",
  },
  {
    name: "Teflon/ Nylon Washers",
    title: "Teflon or Nylon Washers - SRK BOLT",
    description:
      "Teflon (PTFE) and nylon washers are designed for low friction, chemical resistance, and electrical insulation, making them ideal for precision, industrial, and high-performance applications.",
    keywords:
      "Teflon or Nylon Washers, PTFE washers, nylon washers, plastic washers, insulating washers.",
  },
  {
    name: "DTI Washer",
    title: "DTI Washer - SRK BOLT",
    description:
      "DTI washers provide visual and measurable indication of bolt preload, improving safety and performance in structural, industrial, and high-load bolted connections.",
    keywords:
      "DTI Washer, direct tension indicator washer, tension control washers, preload indicator washers.",
  },
  {
    name: "DIN 436 Square Washer",
    title: "DIN 436 Square Washer - SRK BOLT",
    description:
      "DIN 436 square washers are engineered to distribute load evenly over a larger surface area, ensuring secure fastening and reducing material stress in construction, timber, and industrial projects.",
    keywords:
      "DIN 436 Square Washer, square washers DIN 436, structural square washers, heavy-duty square washers, construction square washers.",
  },
  {
    name: "DIN 434 Square Taper Washer",
    title: "DIN 434 Square Taper Washer - SRK BOLT",
    description:
      "DIN 434 square taper washers are engineered to provide even load distribution on sloped surfaces, improving bolt performance and preventing pull-through in structural, timber, and industrial projects.",
    keywords:
      "DIN 434 Square Taper Washer, square taper washers DIN 434, angled surface washers, structural taper washers, heavy-duty taper washers.",
  },
  {
    name: "DIN 5406 TAB WASHER",
    title: "DIN 5406 TAB WASHER - SRK BOLT",
    description:
      "DIN 5406-tab washers are engineered to provide positive bolt locking, preventing rotation and loosening in high-vibration and heavy-duty industrial, automotive, and mechanical assemblies.",
    keywords:
      "DIN 5406 TAB WASHER, tab washers DIN 5406, bolt locking washers, industrial tab washers, mechanical locking washers.",
  },
  {
    name: "DIN 137B Wave Spring Washer",
    title: "DIN 137B Wave Spring Washer - SRK BOLT",
    description:
      "DIN 137B wave spring washers are engineered to maintain bolt preload, compensate for material compression, and reduce vibration in industrial, automotive, and mechanical applications, improving joint reliability and longevity.",
    keywords:
      "DIN 137B Wave Spring Washer, wave spring washers DIN 137B, spring washers, load-maintaining washers, vibration-resistant washers.",
  },
  {
    name: "DIN6798 Internal Serrated Lock Washer",
    title: "DIN6798 Internal Serrated Lock Washer - SRK BOLT",
    description:
      "DIN 6798 internal serrated lock washers are engineered to maintain bolt tension and prevent loosening in high-vibration environments, providing durable and secure fastening for industrial, automotive, and mechanical applications.",
    keywords:
      "DIN6798 Internal Serrated Lock Washer, internal lock washers DIN 6798, serrated lock washers, anti-loosening washers, vibration-resistant lock washers.",
  },
  {
    name: "Nord Wedge Lock Washer",
    title: "Nord Wedge Lock Washer - SRK BOLT",
    description:
      "Nord Wedge Lock Washers are engineered to lock bolts firmly under vibration and dynamic loads, offering durable, anti-loosening performance for industrial, automotive, and structural applications.",
    keywords:
      "Nord Wedge Lock Washer, wedge lock washer, Nord washers, anti-loosening washers, vibration-resistant washers.",
  },
  {
    name: "DIN 6795 Contact Washer",
    title: "DIN 6795 Contact Washer - SRK BOLT",
    description:
      "DIN 6795 contact washers are engineered to provide superior anti-loosening performance, combining serration and spring action to maintain bolt tension in high-vibration industrial, automotive, and mechanical assemblies.",
    keywords:
      "DIN 6795 Contact Washer, contact washers DIN 6795, serrated lock washers, anti-loosening washers, vibration-resistant washers.",
  },
  {
    name: "DIN 6798 External Serrated Lock Washer",
    title: "DIN 6798 External Serrated Lock Washer - SRK BOLT",
    description:
      "DIN 6798 external serrated lock washers are engineered to maintain bolt tension and prevent loosening in high-vibration environments, providing durable and secure fastening for industrial, automotive, and machinery applications.",
    keywords:
      "DIN 6798 External Serrated Lock Washer, external lock washers DIN 6798, serrated lock washers, anti-loosening washers, vibration-resistant washers.",
  },
  {
    name: "DIN 127 B Spring Lock Washer",
    title: "DIN 127 B Spring Lock Washer - SRK BOLT",
    description:
      "DIN 127 B spring lock washers are engineered to maintain bolt tension, prevent loosening under dynamic loads, and provide reliable fastening in automotive, industrial, and mechanical applications.",
    keywords:
      "DIN 127 B Spring Lock Washer, spring lock washers DIN 127 B, anti-loosening washers, vibration-resistant washers, bolt tension washers.",
  },
  {
    name: "DIN 965 Counter Sunk Philips Machine Screw",
    title: "DIN 965 Counter Sunk Philips Machine Screw -SRK BOLT",
    description:
      "DIN 965 countersunk Philips machine screws are engineered for flush mounting and reliable fastening, suitable for machinery, automotive, furniture, and industrial applications where strong, precise assembly is required.",
    keywords:
      "DIN 965 Counter Sunk Philips Machine Screw, countersunk Philips screws DIN 965, flush head machine screws, Phillips head screws, precision fastening screws.",
  },
  {
    name: "DIN 7985 Pan head Machine Screw",
    title: "DIN 7985 Pan head Machine Screw - SRK BOLT",
    description:
      "DIN 7985 pan head machine screws feature a rounded head and Phillips drive, providing secure, high-performance fastening in machinery, automotive, furniture, and industrial projects.",
    keywords:
      "DIN 7985 Pan head Machine Screw, pan head screws DIN 7985, Phillips head machine screws, industrial pan head screws, mechanical fastening screws.",
  },
  {
    name: "DIN 7982 CSK Self Tapping Screw",
    title: "DIN 7982 CSK Self Tapping Screw - SRK BOLT",
    description:
      "DIN 7982 countersunk self-tapping screws are engineered for flush mounting and secure fastening in metal, wood, and plastic components, providing durability, precision, and high-performance in industrial and construction applications.",
    keywords:
      "DIN 7982 CSK Self Tapping Screw, countersunk self-tapping screws DIN 7982, CSK self-tapping screws, flush head self-tapping screws, industrial self-tapping screws.",
  },
  {
    name: "DIN 7981 Pan Head Self Tapping Screw",
    title: "DIN 7981 Pan Head Self Tapping Screw - SRK BOLT",
    description:
      "DIN 7981 pan head self-tapping screws are engineered for versatile fastening in metal, wood, and plastic, offering durability, precision, and high-performance for industrial, automotive, and construction projects.",
    keywords:
      "DIN 7981 Pan Head Self Tapping Screw, pan head self-tapping screws DIN 7981, self-tapping screws, rounded head self-tapping screws, industrial self-tapping screws.",
  },
  {
    name: "ISO 7380-2 Hexagon socket button head screw with flange",
    title: "ISO 7380-2 Hexagon socket button head screw with flange- SRK BOLT",
    description:
      "ISO 7380-2 hexagon socket button head screws with flange are engineered to provide secure fastening, even load distribution, and a sleek low-profile design, ideal for industrial, automotive, and precision machinery assemblies.",
    keywords:
      "ISO 7380-2 Hexagon socket button head screw with flange, hex socket button head screw with flange, flange button head screws, low-profile socket screws, industrial button head screws.",
  },
]

async function main() {
  const env = loadEnv()
  const client = new MongoClient(env.MONGODB_URI)
  await client.connect()
  const collection = client.db(env.MONGODB_DB_NAME).collection("products")

  let matched = 0
  let modified = 0
  const missing = []

  for (const item of updates) {
    const slug = createSlug(item.name)
    const result = await collection.updateOne(
      { slug },
      {
        $set: {
          seoTitle: item.title,
          seoDescription: item.description,
          seoKeywords: item.keywords,
          updatedAt: new Date().toISOString(),
        },
      }
    )

    if (result.matchedCount === 0) {
      missing.push({ name: item.name, slug })
      continue
    }

    matched += result.matchedCount
    modified += result.modifiedCount
  }

  console.log(JSON.stringify({ matched, modified, missingCount: missing.length, missing }, null, 2))
  await client.close()
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
