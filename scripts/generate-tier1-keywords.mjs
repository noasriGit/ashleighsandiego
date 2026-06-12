import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "..", "data", "keywords", "tier-1");
mkdirSync(outDir, { recursive: true });

const TIER_1 = [
  {
    slug: "la-jolla",
    name: "La Jolla",
    short: "la jolla",
    subareas: [
      "la jolla shores",
      "la jolla cove",
      "la jolla village",
      "bird rock",
      "muirlands",
      "mount soledad",
      "windansea",
      "torrey pines",
    ],
    landmarks: [
      "ucsd",
      "uc san diego",
      "scripps",
      "torrey pines state beach",
      "scripps pier",
      "la jolla beach",
    ],
    traits: ["coastal", "ocean view", "luxury", "beach", "upscale", "village"],
  },
  {
    slug: "pacific-beach",
    name: "Pacific Beach",
    short: "pacific beach",
    aliases: ["pb san diego", "pacific beach san diego"],
    subareas: ["crown point", "north pacific beach", "garnet avenue"],
    landmarks: ["mission bay", "boardwalk", "crystal pier", "kate sessions park"],
    traits: ["beach", "coastal", "boardwalk", "nightlife", "walkable"],
  },
  {
    slug: "university-city",
    name: "University City",
    short: "university city",
    aliases: ["utc san diego", "university city utc", "utc"],
    subareas: ["westfield utc", "governor drive", "la jolla village drive"],
    landmarks: ["ucsd", "uc san diego", "westfield utc", "biotech corridor", "genentech"],
    traits: ["central", "commute friendly", "family", "suburban"],
  },
  {
    slug: "clairemont",
    name: "Clairemont",
    short: "clairemont",
    aliases: ["clairemont san diego"],
    subareas: ["north clairemont", "south clairemont", "clairemont mesa"],
    landmarks: ["tecoleote canyon", "clairemont town square", "mesa college"],
    traits: ["central", "affordable", "family", "single family", "suburban"],
  },
  {
    slug: "mission-valley",
    name: "Mission Valley",
    short: "mission valley",
    aliases: ["mission valley san diego"],
    subareas: ["civita", "fashion valley", "hotel circle", "grantville"],
    landmarks: ["fashion valley mall", "mission valley mall", "trolley", "snapdragon stadium"],
    traits: ["central", "condo", "commute friendly", "affordable", "freeway access"],
  },
  {
    slug: "del-mar",
    name: "Del Mar",
    short: "del mar",
    aliases: ["del mar san diego"],
    subareas: ["del mar heights", "del mar village", "carmel valley border"],
    landmarks: ["del mar fairgrounds", "del mar racetrack", "del mar beach", "powerhouse park"],
    traits: ["coastal", "luxury", "upscale", "village", "family"],
  },
  {
    slug: "carmel-valley",
    name: "Carmel Valley",
    short: "carmel valley",
    aliases: ["carmel valley san diego"],
    subareas: ["torrey hills", "carmel country", "carmel creek"],
    landmarks: ["carmel valley road", "one place", "los peñasquitos canyon"],
    traits: ["family", "suburban", "schools", "master planned", "newer homes"],
  },
  {
    slug: "point-loma",
    name: "Point Loma",
    short: "point loma",
    aliases: ["point loma san diego"],
    subareas: ["point loma heights", "liberty station", "wooded area", "sports arena area"],
    landmarks: [
      "liberty station",
      "sunset cliffs",
      "naval base point loma",
      "cabrillo monument",
      "san diego airport",
    ],
    traits: ["coastal", "bay view", "peninsula", "military", "historic"],
  },
  {
    slug: "sorrento-valley",
    name: "Sorrento Valley",
    short: "sorrento valley",
    aliases: ["sorrento mesa", "sorrento valley sorrento mesa"],
    subareas: ["sorrento mesa", "mira mesa border", "carroll canyon"],
    landmarks: ["biotech corridor", "qualcomm", "illumina", "utc nearby", "ucsd nearby"],
    traits: ["biotech", "tech", "commute friendly", "condo", "office proximity"],
  },
];

const PROPERTY_TYPES = [
  "homes",
  "houses",
  "homes for sale",
  "houses for sale",
  "real estate",
  "property",
  "listings",
  "condos",
  "condos for sale",
  "condominiums",
  "townhomes",
  "townhomes for sale",
  "single family homes",
  "luxury homes",
  "beach homes",
  "waterfront homes",
  "ocean view homes",
  "new construction",
  "new homes",
  "starter homes",
  "investment property",
  "duplex",
  "multi family",
  "land",
  "lots",
];

const LIVING_MODIFIERS = [
  "living in",
  "life in",
  "what is it like living in",
  "what is it like to live in",
  "pros and cons of living in",
  "is it worth living in",
  "moving to",
  "relocating to",
  "move to",
  "relocation to",
  "should i move to",
  "should i live in",
  "best neighborhoods in",
  "neighborhood guide",
  "area guide",
  "community guide",
  "buyers guide",
  "living guide",
  "relocating guide",
  "moving guide",
];

const BUYER_MODIFIERS = [
  "first time home buyer",
  "first time buyer",
  "relocating buyers",
  "relocation buyers",
  "out of state buyers",
  "out of area buyers",
  "military buyers",
  "va loan",
  "va home loan",
  "pcs",
  "military relocation",
  "biotech professionals",
  "healthcare professionals",
  "ucsd employees",
  "remote workers",
  "family buyers",
  "downsizing",
  "upsizing",
  "investment buyers",
  "second home",
  "vacation home",
];

const MARKET_MODIFIERS = [
  "home prices",
  "housing market",
  "market trends",
  "cost of living",
  "average home price",
  "median home price",
  "affordable",
  "expensive",
  "home values",
  "property values",
  "market update",
  "market report",
  "how much do homes cost in",
  "price per square foot",
  "hoa fees",
  "property tax",
  "competition",
  "bidding war",
  "days on market",
  "inventory",
  "new listings",
  "open houses",
  "off market",
  "pocket listings",
];

const FEATURE_MODIFIERS = [
  "schools",
  "best schools",
  "school district",
  "safe",
  "crime",
  "walkable",
  "walkability",
  "family friendly",
  "dog friendly",
  "pet friendly",
  "commute",
  "freeway access",
  "traffic",
  "parking",
  "hoa",
  "gated community",
  "view",
  "ocean view",
  "bay view",
  "sunset view",
  "pool",
  "yard",
  "garage",
  "renovated",
  "fixer upper",
  "new build",
  "master planned",
  "retirement",
  "55 plus",
  "senior living",
  "nightlife",
  "restaurants",
  "shopping",
  "parks",
  "trails",
  "beach access",
  "near beach",
];

const AGENT_MODIFIERS = [
  "realtor",
  "real estate agent",
  "real estate agent near",
  "buyers agent",
  "relocation realtor",
  "relocation agent",
  "relocation specialist",
  "help buying in",
  "help moving to",
];

const COMPARE_TARGETS = [
  "la jolla",
  "pacific beach",
  "university city",
  "utc",
  "clairemont",
  "mission valley",
  "del mar",
  "carmel valley",
  "point loma",
  "sorrento valley",
  "ocean beach",
  "hillcrest",
  "north park",
  "bay park",
  "kearny mesa",
  "mira mesa",
  "rancho penasquitos",
  "san diego",
  "coastal san diego",
  "inland san diego",
];

const SAN_DIEGO_SUFFIX = [
  "san diego",
  "san diego ca",
  "san diego california",
  "near la jolla",
  "near ucsd",
  "near beach",
  "coastal san diego",
  "san diego county",
];

function add(set, ...phrases) {
  for (const p of phrases) {
    const cleaned = p.toLowerCase().replace(/\s+/g, " ").trim();
    if (cleaned.length > 3 && cleaned.length < 120) set.add(cleaned);
  }
}

function generateForCommunity(c) {
  const set = new Set();
  const names = [c.short, c.name.toLowerCase(), ...(c.aliases || [])];
  const allAreas = [...names, ...(c.subareas || [])];

  for (const name of names) {
    for (const prop of PROPERTY_TYPES) {
      add(set, `${name} ${prop}`, `${prop} in ${name}`, `${prop} ${name} san diego`);
    }

    for (const mod of LIVING_MODIFIERS) {
      add(set, `${mod} ${name}`, `${mod} ${name} san diego`);
    }

    for (const buyer of BUYER_MODIFIERS) {
      add(set, `${buyer} ${name}`, `${name} ${buyer}`, `${buyer} in ${name}`);
    }

    for (const market of MARKET_MODIFIERS) {
      add(set, `${name} ${market}`, `${market} in ${name}`, `${name} san diego ${market}`);
    }

    for (const feat of FEATURE_MODIFIERS) {
      add(set, `${name} ${feat}`, `${feat} in ${name}`, `${name} ${feat} san diego`);
    }

    for (const agent of AGENT_MODIFIERS) {
      add(set, `${name} ${agent}`, `${agent} ${name}`, `${agent} in ${name}`);
    }

    for (const suffix of SAN_DIEGO_SUFFIX) {
      add(set, `${name} ${suffix}`, `homes in ${name} ${suffix}`);
    }

    for (const other of COMPARE_TARGETS) {
      if (other !== name && !names.includes(other)) {
        add(set, `${name} vs ${other}`, `${name} or ${other}`, `${name} compared to ${other}`);
        add(set, `should i buy in ${name} or ${other}`, `${name} vs ${other} homes`);
        add(set, `living in ${name} vs ${other}`, `moving to ${name} or ${other}`);
      }
    }
  }

  for (const sub of c.subareas || []) {
    for (const prop of PROPERTY_TYPES) {
      add(set, `${sub} ${prop}`, `${prop} in ${sub}`, `${sub} san diego ${prop}`);
    }
    for (const mod of LIVING_MODIFIERS.slice(0, 12)) {
      add(set, `${mod} ${sub}`, `${sub} neighborhood guide`);
    }
    for (const feat of FEATURE_MODIFIERS.slice(0, 20)) {
      add(set, `${sub} ${feat}`, `${feat} near ${sub}`);
    }
    add(set, `${sub} near ${c.short}`, `homes near ${sub}`, `living near ${sub}`);
  }

  for (const landmark of c.landmarks || []) {
    add(set, `homes near ${landmark}`, `living near ${landmark}`, `${c.short} near ${landmark}`);
    add(set, `homes for sale near ${landmark}`, `condos near ${landmark}`, `commute from ${c.short} to ${landmark}`);
  }

  for (const trait of c.traits || []) {
    add(set, `${trait} homes in ${c.short}`, `${c.short} ${trait} real estate`, `${trait} neighborhood ${c.short}`);
  }

  // Cross combos for volume
  for (const sub of c.subareas || []) {
    for (const prop of ["homes for sale", "condos for sale", "real estate", "neighborhood"]) {
      for (const suffix of ["san diego", "guide", "living", "market"]) {
        add(set, `${sub} ${prop} ${suffix}`);
      }
    }
  }

  for (const name of names) {
    for (const prop of PROPERTY_TYPES) {
      for (const buyer of BUYER_MODIFIERS.slice(0, 10)) {
        add(set, `${buyer} ${prop} ${name}`, `${name} ${prop} for ${buyer}`);
      }
    }
  }

  for (const area of allAreas) {
    const templates = [
      `best place to live ${area}`,
      `best streets in ${area}`,
      `best blocks in ${area}`,
      `quiet streets ${area}`,
      `walkable parts of ${area}`,
      `family areas in ${area}`,
      `up and coming ${area}`,
      `gentrifying ${area}`,
      `rent vs buy ${area}`,
      `rental market ${area}`,
      `rent prices ${area}`,
      `buying a home in ${area}`,
      `how to buy a house in ${area}`,
      `home buying process ${area}`,
      `offer strategy ${area}`,
      `inspection tips ${area}`,
      `closing costs ${area}`,
      `property types ${area}`,
      `condo vs house ${area}`,
      `townhome vs single family ${area}`,
      `hoa communities ${area}`,
      `no hoa ${area}`,
      `new development ${area}`,
      `pre approval ${area}`,
      `mortgage ${area}`,
      `jumbo loan ${area}`,
      `conventional loan ${area}`,
      `fha loan ${area}`,
      `best time to buy ${area}`,
      `seasonal market ${area}`,
      `spring market ${area}`,
      `winter market ${area}`,
      `relocation timeline ${area}`,
      `moving checklist ${area}`,
      `virtual tour ${area}`,
      `video tour ${area}`,
      `map of ${area}`,
      `zip codes ${area}`,
      `demographics ${area}`,
      `population ${area}`,
      `things to do ${area}`,
      `restaurants ${area}`,
      `coffee shops ${area}`,
      `farmers market ${area}`,
      `farmers market near ${area}`,
      `gyms ${area}`,
      `yoga ${area}`,
      `surf ${area}`,
      `hiking ${area}`,
      `biking ${area}`,
      `golf ${area}`,
      `tennis ${area}`,
      `marina ${area}`,
      `fishing ${area}`,
      `kayak ${area}`,
      `paddleboard ${area}`,
      `dog beach near ${area}`,
      `farm to table ${area}`,
      `fine dining ${area}`,
      `casual dining ${area}`,
      `brunch ${area}`,
      `date night ${area}`,
      `kids activities ${area}`,
      `playgrounds ${area}`,
      `libraries ${area}`,
      `hospitals near ${area}`,
      `urgent care ${area}`,
      `medical center ${area}`,
      `dental ${area}`,
      `churches ${area}`,
      `synagogues ${area}`,
      `mosques ${area}`,
      `public transit ${area}`,
      `bus routes ${area}`,
      `trolley ${area}`,
      `bike lanes ${area}`,
      `ev charging ${area}`,
      `solar homes ${area}`,
      `adu ${area}`,
      `granny flat ${area}`,
      `short term rental ${area}`,
      `airbnb rules ${area}`,
      `noise ${area}`,
      `airplane noise ${area}`,
      `flood zone ${area}`,
      `fire risk ${area}`,
      `earthquake ${area}`,
      `mudslide ${area}`,
      `coastal commission ${area}`,
      `mello roos ${area}`,
      `special tax ${area}`,
      `covenants ${area}`,
      `architectural review ${area}`,
      `beach access ${area}`,
      `bluff top ${area}`,
      `canyon view ${area}`,
      `corner lot ${area}`,
      `cul de sac ${area}`,
      `single story ${area}`,
      `two story ${area}`,
      `split level ${area}`,
      `mid century ${area}`,
      `craftsman ${area}`,
      `spanish style ${area}`,
      `modern home ${area}`,
      `contemporary ${area}`,
      `ranch style ${area}`,
      `colonial ${area}`,
      `mediterranean ${area}`,
      `custom home ${area}`,
      `builder home ${area}`,
      `spec home ${area}`,
      `model home ${area}`,
      `move in ready ${area}`,
      `turnkey ${area}`,
      `as is ${area}`,
      `probate ${area}`,
      `trust sale ${area}`,
      `foreclosure ${area}`,
      `short sale ${area}`,
      `bank owned ${area}`,
      `reo ${area}`,
      `auction ${area}`,
      `fsbo ${area}`,
      `for sale by owner ${area}`,
      `coming soon ${area}`,
      `pending ${area}`,
      `contingent ${area}`,
      `price reduced ${area}`,
      `motivated seller ${area}`,
      `multiple offers ${area}`,
      `over asking ${area}`,
      `under asking ${area}`,
      `appraisal gap ${area}`,
      `inspection contingency ${area}`,
      `repair request ${area}`,
      `termite ${area}`,
      `sewer scope ${area}`,
      `roof inspection ${area}`,
      `foundation ${area}`,
      `slab foundation ${area}`,
      `raised foundation ${area}`,
      `septic ${area}`,
      `well water ${area}`,
      `municipal water ${area}`,
      `gas line ${area}`,
      `electrical panel ${area}`,
      `knob and tube ${area}`,
      `lead paint ${area}`,
      `asbestos ${area}`,
      `mold ${area}`,
      `radon ${area}`,
      `solar lease ${area}`,
      `solar owned ${area}`,
      `battery storage ${area}`,
      `smart home ${area}`,
      `security system ${area}`,
      `ring doorbell ${area}`,
      `nest thermostat ${area}`,
      `ev charger ${area}`,
      `garage conversion ${area}`,
      `home office ${area}`,
      `work from home ${area}`,
      `zoom room ${area}`,
      `guest house ${area}`,
      `pool maintenance ${area}`,
      `spa ${area}`,
      `hot tub ${area}`,
      `outdoor kitchen ${area}`,
      `fire pit ${area}`,
      `deck ${area}`,
      `patio ${area}`,
      `balcony ${area}`,
      `rooftop ${area}`,
      `fenced yard ${area}`,
      `artificial turf ${area}`,
      `drought tolerant ${area}`,
      `xeriscape ${area}`,
      `fruit trees ${area}`,
      `garden ${area}`,
      `community garden ${area}`,
      `community pool ${area}`,
      `tennis court ${area}`,
      `pickleball ${area}`,
      `clubhouse ${area}`,
      `fitness center ${area}`,
      `concierge ${area}`,
      `doorman ${area}`,
      `elevator ${area}`,
      `penthouse ${area}`,
      `ground floor ${area}`,
      `top floor ${area}`,
      `corner unit ${area}`,
      `end unit ${area}`,
      `detached condo ${area}`,
      `attached condo ${area}`,
      `stacked condo ${area}`,
      `low rise ${area}`,
      `mid rise ${area}`,
      `high rise ${area}`,
    ];
    for (const t of templates) add(set, t);
  }

  return [...set].slice(0, 2000);
}

for (const community of TIER_1) {
  const keywords = generateForCommunity(community);
  const path = join(outDir, `${community.slug}.txt`);
  writeFileSync(path, keywords.join("\n"), "utf8");
  console.log(`${community.slug}: ${keywords.length} keywords -> ${path}`);
}

console.log("Done.");
