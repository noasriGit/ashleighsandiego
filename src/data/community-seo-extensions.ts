import { siteConfig } from "@/data/site-config";

export type CommunitySubarea = {
  name: string;
  slug: string;
  description: string;
  buyingDistinction: string;
};

export type CommunitySeoExtension = {
  expertSummary?: string;
  differsFromParent?: string;
  bestFitBuyers?: string[];
  notIdealFor?: string[];
  housingStockNotes?: string;
  buyerMisunderstandings?: string[];
  considerations?: string[];
  subareas?: CommunitySubarea[];
  sources?: { label: string; url?: string }[];
  reviewedBy?: string;
  publishedAt?: string;
  lastSubstantialUpdate?: string;
};

const REVIEWER = siteConfig.agent.name;
const PUBLISHED = "2026-06-01";
const UPDATED = "2026-07-01";

export const communitySeoExtensions: Record<string, CommunitySeoExtension> = {
  "la-jolla": {
    expertSummary:
      "La Jolla rewards buyers who match the right subarea to their budget and daily routine. I often see relocating buyers fall in love with the Cove or Village before realizing that La Jolla Shores or Bird Rock offer more yard space and easier parking.",
    bestFitBuyers: [
      "Buyers who want a La Jolla address with clear subarea trade-offs",
      "Buyers comparing beach pockets vs hillside privacy",
      "UCSD, Scripps, or biotech commuters with flexible budgets",
    ],
    notIdealFor: [
      "Buyers needing walk-everywhere urban density on a tight budget",
      "Commuters who must reach downtown daily without freeway tolerance",
    ],
    housingStockNotes:
      "Expect condos and townhomes in the Village; larger single-family homes on Bird Rock, Shores, and hillside enclaves. View and bluff premiums apply on select streets.",
    buyerMisunderstandings: [
      "Assuming every La Jolla address has equal beach walkability",
      "Treating ZIP 92037 as one uniform price band",
      "Expecting plentiful condo inventory in every subarea",
    ],
    subareas: [
      {
        name: "La Jolla Shores",
        slug: "la-jolla-shores",
        description: "Flat beach pocket with calm water and residential streets.",
        buyingDistinction: "Best for buyers who want sandy beach access and neighborhood feel over bluff-top condo density.",
      },
      {
        name: "Bird Rock",
        slug: "bird-rock",
        description: "Quieter single-family pocket south of the Village with a local commercial strip.",
        buyingDistinction: "Strong choice for buyers who want La Jolla schools without Village tourist traffic.",
      },
      {
        name: "La Jolla Village",
        slug: "la-jolla-village",
        description: "Walkable dining and shopping hub with more condo inventory.",
        buyingDistinction: "Suits buyers prioritizing walkability and lock-and-leave housing over yard space.",
      },
      {
        name: "La Jolla Cove",
        slug: "la-jolla-cove",
        description: "Bluff-top coastal pocket above the iconic cove and sea lions.",
        buyingDistinction: "Ocean-view condos and townhomes; denser and more vertical than Shores.",
      },
      {
        name: "Windansea",
        slug: "windansea",
        description: "Surf-focused rocky coastline with cottage-style homes.",
        buyingDistinction: "Appeals to surf culture buyers; fewer on-site shops than the Village.",
      },
      {
        name: "Muirlands & Mount Soledad",
        slug: "muirlands",
        description: "Hillside enclaves with canyon and panoramic views.",
        buyingDistinction: "Privacy and views trade off against walkability to beaches and shops.",
      },
      {
        name: "Torrey Pines",
        slug: "torrey-pines",
        description: "Coastal bluffs near the reserve and golf course.",
        buyingDistinction: "More secluded than the Village; compare carefully with Del Mar and UC.",
      },
    ],
    sources: [
      { label: "City of San Diego community planning", url: "https://www.sandiego.gov/planning" },
      { label: "San Diego Association of Governments (SANDAG)" },
    ],
    reviewedBy: REVIEWER,
    publishedAt: PUBLISHED,
    lastSubstantialUpdate: UPDATED,
  },
  "pacific-beach": {
    expertSummary:
      "Pacific Beach is active, social, and beach-first. Buyers who want Garnet Avenue energy should compare Crown Point and north PB pockets if they need quieter blocks or bay access instead of boardwalk frontage.",
    bestFitBuyers: [
      "Beach-town buyers comfortable with weekend traffic",
      "Buyers prioritizing an active, walkable lifestyle",
      "Buyers comparing La Jolla who want lower coastal entry points",
    ],
    notIdealFor: [
      "Buyers seeking quiet, suburban streetscapes",
      "Buyers sensitive to nightlife noise near Garnet",
    ],
    housingStockNotes:
      "Mix of older single-family homes, duplexes, and beach-adjacent condos. Crown Point adds canal-front inventory within the same ZIP.",
    buyerMisunderstandings: [
      "Assuming all of 92109 feels like Garnet Avenue on a Saturday night",
      "Confusing Mission Beach boardwalk energy with north PB residential streets",
    ],
    subareas: [
      {
        name: "Crown Point",
        slug: "crown-point",
        description: "Canal-side peninsula on Mission Bay.",
        buyingDistinction: "Waterfront and bay recreation without leaving the PB area.",
      },
      {
        name: "Mission Beach",
        slug: "mission-beach",
        description: "Narrow ocean-to-bay strip with boardwalk frontage.",
        buyingDistinction: "Higher density and vacation-rental adjacency than Crown Point.",
      },
      {
        name: "Mission Bay",
        slug: "mission-bay",
        description: "Bay-front condos and recreation-focused housing.",
        buyingDistinction: "Calm water and boating over surf beach access.",
      },
    ],
    sources: [{ label: "City of San Diego Pacific Beach community planning" }],
    reviewedBy: REVIEWER,
    publishedAt: PUBLISHED,
    lastSubstantialUpdate: UPDATED,
  },
  "university-city": {
    expertSummary:
      "University City and UTC work best when commute anchors are clear—UCSD, Westfield UTC, or Sorrento Valley. I guide buyers to compare condo-heavy UTC blocks against single-family streets farther west.",
    bestFitBuyers: [
      "Biotech and UCSD-affiliated commuters",
      "Buyers wanting newer construction near major shopping",
      "Buyers prioritizing freeway access over beach weekends",
    ],
    notIdealFor: [
      "Buyers expecting village walkability or coastal character",
      "Commuters who must reach downtown daily without freeway use",
    ],
    housingStockNotes:
      "Condos and townhomes dominate near UTC; single-family pockets exist west of Genesee. Newer buildings often carry HOA fees that should be modeled early.",
    buyerMisunderstandings: [
      "Using UTC and University City interchangeably in search filters",
      "Underestimating HOA costs in newer UTC towers",
    ],
    sources: [{ label: "UC San Diego campus maps" }, { label: "Westfield UTC" }],
    reviewedBy: REVIEWER,
    publishedAt: PUBLISHED,
    lastSubstantialUpdate: UPDATED,
  },
  clairemont: {
    expertSummary:
      "Clairemont is the value-and-space play in central San Diego. Buyers who need yards and freeway flexibility often start here before deciding whether Bay Park views or coastal premiums are worth the step up.",
    bestFitBuyers: [
      "First-time buyers seeking single-family homes under coastal prices",
      "Buyers who prioritize lot size over walkability",
      "Commuters split between Mission Valley, Kearny Mesa, and downtown",
    ],
    notIdealFor: [
      "Buyers who need daily walkable dining and nightlife",
      "Beach-first lifestyles without a car",
    ],
    housingStockNotes:
      "Mid-century single-family homes on larger lots dominate. North Clairemont adds canyon views; condos are limited.",
    buyerMisunderstandings: [
      "Expecting uniform school boundaries across Clairemont mesas",
      "Assuming beach proximity without driving",
    ],
    subareas: [
      {
        name: "North Clairemont",
        slug: "north-clairemont",
        description: "Residential mesa with canyon views.",
        buyingDistinction: "More elevation and views than central Clairemont blocks.",
      },
      {
        name: "Kearny Mesa",
        slug: "kearny-mesa",
        description: "Commercial and residential hub with diverse dining.",
        buyingDistinction: "Better for buyers who want central access and restaurant density.",
      },
    ],
    sources: [{ label: "City of San Diego Clairemont Mesa community plan" }],
    reviewedBy: REVIEWER,
    publishedAt: PUBLISHED,
    lastSubstantialUpdate: UPDATED,
  },
  "mission-valley": {
    expertSummary:
      "Mission Valley is a commute hub first and a neighborhood second. I help buyers decide whether condo convenience near Fashion Valley fits—or whether Civita's master-planned streets justify a different price band.",
    bestFitBuyers: [
      "Central commuters needing I-8, I-805, and I-15 access",
      "Condo and townhome buyers on moderate budgets",
      "Buyers comparing Clairemont who want newer inventory",
    ],
    notIdealFor: [
      "Buyers seeking tree-lined village character",
      "Walkability-first urban lifestyles",
    ],
    housingStockNotes:
      "Condos and townhomes dominate the valley floor. Civita adds newer single-family and townhome product with HOA amenities.",
    buyerMisunderstandings: [
      "Expecting neighborhood charm similar to Hillcrest or North Park",
      "Treating Civita and legacy Mission Valley condos as identical lifestyle choices",
    ],
    subareas: [
      {
        name: "Civita",
        slug: "civita",
        description: "Master-planned community with parks and newer homes.",
        buyingDistinction: "Quieter residential streets vs older condo towers elsewhere in the valley.",
      },
      {
        name: "Linda Vista",
        slug: "linda-vista",
        description: "Central pocket near USD and freeway connectors.",
        buyingDistinction: "More residential character than mall-adjacent condo clusters.",
      },
      {
        name: "Serra Mesa",
        slug: "serra-mesa",
        description: "Residential area near SDSU and Mission Valley.",
        buyingDistinction: "Compare commute targets to Linda Vista before choosing.",
      },
    ],
    sources: [{ label: "San Diego Metropolitan Transit System (MTS) trolley maps" }],
    reviewedBy: REVIEWER,
    publishedAt: PUBLISHED,
    lastSubstantialUpdate: UPDATED,
  },
  "del-mar": {
    expertSummary:
      "Del Mar is village-coastal living with strong school demand and limited inventory. Buyers should compare Del Mar Heights hillside homes against flat village streets before anchoring on the Del Mar name alone.",
    bestFitBuyers: [
      "Upscale coastal buyers north of La Jolla",
      "Buyers prioritizing village scale and schools",
      "Remote or hybrid professionals with flexible commutes",
    ],
    notIdealFor: [
      "Buyers needing abundant condo inventory",
      "Daily biotech corridor commutes without freeway tolerance",
    ],
    housingStockNotes:
      "Luxury single-family homes dominate the village; Del Mar Heights adds hillside canyon and ocean-view product.",
    buyerMisunderstandings: [
      "Assuming Del Mar Fairgrounds events won't affect weekend traffic",
      "Expecting La Jolla-level UCSD proximity",
    ],
    subareas: [
      {
        name: "Del Mar Heights",
        slug: "del-mar-heights",
        description: "Hillside residential area above the village.",
        buyingDistinction: "Views and larger lots vs walkable village streets.",
      },
    ],
    sources: [{ label: "City of Del Mar community plan" }],
    reviewedBy: REVIEWER,
    publishedAt: PUBLISHED,
    lastSubstantialUpdate: UPDATED,
  },
  "carmel-valley": {
    expertSummary:
      "Carmel Valley is the default recommendation for biotech buyers who want newer schools and parks without Del Mar pricing. Torrey Hills offers a slightly different pocket feel closer to Torrey Pines.",
    bestFitBuyers: [
      "Biotech and UTC commuters with school-age children",
      "Buyers wanting master-planned amenities",
      "Buyers comparing Del Mar who need more space per dollar",
    ],
    notIdealFor: [
      "Buyers who need immediate beach access",
      "Urban walkability priorities",
    ],
    housingStockNotes:
      "Newer single-family and townhome tracts with HOA amenities. Torrey Hills is a popular sub-pocket with distinct school boundaries.",
    buyerMisunderstandings: [
      "Underestimating commute time to downtown",
      "Assuming all Carmel Valley streets have identical school assignments",
    ],
    subareas: [
      {
        name: "Torrey Hills",
        slug: "torrey-hills",
        description: "Family pocket between Carmel Valley and Torrey Pines.",
        buyingDistinction: "Closer to coastal bluffs; compare traffic patterns on Carmel Valley Road.",
      },
    ],
    sources: [{ label: "City of San Diego Carmel Valley community plan" }],
    reviewedBy: REVIEWER,
    publishedAt: PUBLISHED,
    lastSubstantialUpdate: UPDATED,
  },
  "point-loma": {
    expertSummary:
      "Point Loma combines peninsula privacy with military and airport adjacency. I warn buyers to tour at different times for aircraft noise and to separate Liberty Station condo living from hillside single-family blocks.",
    bestFitBuyers: [
      "Peninsula buyers wanting bay and ocean access",
      "Military families near Naval Base Point Loma",
      "Buyers who prefer OB's neighbor with more privacy",
    ],
    notIdealFor: [
      "Buyers sensitive to airport flight paths",
      "UTC or Sorrento Valley daily commuters",
    ],
    housingStockNotes:
      "Single-family homes on the peninsula; condos and townhomes concentrated at Liberty Station. Old Town is historic and tourism-adjacent at the base.",
    buyerMisunderstandings: [
      "Ignoring aircraft noise patterns near the airport",
      "Treating Old Town tourism energy as typical peninsula residential life",
    ],
    subareas: [
      {
        name: "Old Town",
        slug: "old-town",
        description: "Historic district with tourism and transit access.",
        buyingDistinction: "Urban heritage location vs quiet peninsula streets.",
      },
      {
        name: "Point Loma Heights",
        slug: "point-loma-heights",
        description: "Hillside residential above the peninsula.",
        buyingDistinction: "Views and elevation vs bay-level Liberty Station.",
      },
      {
        name: "Midway District",
        slug: "midway-district",
        description: "Redeveloping area near the sports arena and airport.",
        buyingDistinction: "Emerging inventory; evaluate noise and construction timelines.",
      },
    ],
    sources: [{ label: "Liberty Station community" }, { label: "San Diego International Airport noise disclosures" }],
    reviewedBy: REVIEWER,
    publishedAt: PUBLISHED,
    lastSubstantialUpdate: UPDATED,
  },
  "sorrento-valley": {
    expertSummary:
      "Sorrento Valley is a commute decision more than a lifestyle one. Buyers who work in the biotech corridor often love the five-minute drive—and should visit evenings to confirm the area feels right when offices close.",
    bestFitBuyers: [
      "Biotech and tech professionals on the corridor",
      "Condo buyers prioritizing location over neighborhood charm",
      "Relocating buyers with offices in Sorrento Mesa",
    ],
    notIdealFor: [
      "Buyers seeking a parks-and-schools suburban feel",
      "Buyers who want walkable dining outside office hours",
    ],
    housingStockNotes:
      "Newer condos and townhomes dominate; limited single-family inventory. Evaluate HOA reserves and parking on older complexes.",
    buyerMisunderstandings: [
      "Expecting residential village amenities within walking distance",
      "Assuming Carmel Valley schools apply to all Sorrento Valley addresses",
    ],
    sources: [{ label: "SANDAG employment center maps" }],
    reviewedBy: REVIEWER,
    publishedAt: PUBLISHED,
    lastSubstantialUpdate: UPDATED,
  },
  "bay-park": {
    expertSummary:
      "Bay Park gives Clairemont buyers elevation and Mission Bay breezes without Pacific Beach prices. Morena and Bay Ho pockets add different price points—tour specific blocks before generalizing the area.",
    bestFitBuyers: [
      "Central buyers wanting views on a moderate budget",
      "Buyers between Clairemont and Mission Bay",
      "Commuters to downtown or Kearny Mesa",
    ],
    notIdealFor: [
      "Walkability-first urban buyers",
      "Buyers expecting direct beach frontage",
    ],
    housingStockNotes:
      "Single-family homes on hillside streets; some view premiums. Bay Ho is quieter and closer to Mission Bay.",
    buyerMisunderstandings: [
      "Assuming all Bay Park streets have bay views",
      "Confusing Morena redevelopment pockets with established Bay Park blocks",
    ],
    subareas: [
      {
        name: "Bay Ho",
        slug: "bay-ho",
        description: "Quiet pocket near Mission Bay.",
        buyingDistinction: "Calmer streets vs central Bay Park hills.",
      },
      {
        name: "Morena",
        slug: "morena",
        description: "Emerging corridor near Bay Park and Linda Vista.",
        buyingDistinction: "Newer infill and transit changes; verify block-by-block.",
      },
    ],
    sources: [{ label: "City of San Diego Morena Corridor specific plan" }],
    reviewedBy: REVIEWER,
    publishedAt: PUBLISHED,
    lastSubstantialUpdate: UPDATED,
  },
  "ocean-beach": {
    expertSummary:
      "Ocean Beach attracts buyers who want authenticity over polish. Dog Beach, Newport Avenue, and cottage housing define the area—commute length to UTC should be modeled before falling in love with the pier.",
    bestFitBuyers: [
      "Remote and hybrid workers",
      "Buyers who prefer OB culture over PB nightlife",
      "Dog owners and creative professionals",
    ],
    notIdealFor: [
      "Daily UTC or Sorrento Valley commuters",
      "Buyers wanting new-construction tracts",
    ],
    housingStockNotes:
      "Eclectic cottages and bungalows; limited condo inventory. Proximity to the pier and Dog Beach drives premiums.",
    buyerMisunderstandings: [
      "Underestimating weekend foot traffic on Newport Avenue",
      "Assuming OB pricing matches inland central neighborhoods",
    ],
    sources: [{ label: "Ocean Beach MainStreet Association" }],
    reviewedBy: REVIEWER,
    publishedAt: PUBLISHED,
    lastSubstantialUpdate: UPDATED,
  },
  hillcrest: {
    expertSummary:
      "Hillcrest is San Diego's walkable urban village near Balboa Park. Buyers should compare Mission Hills historic streets and Bankers Hill condo towers before assuming Hillcrest itself is the only fit.",
    bestFitBuyers: [
      "Walkability and dining-first buyers",
      "Healthcare workers near UCSD Hillcrest",
      "Condo buyers who want Balboa Park access",
    ],
    notIdealFor: [
      "Buyers who need large yards or a suburban setting",
      "Daily Sorrento Valley commuters",
    ],
    housingStockNotes:
      "Mix of historic single-family, condos, and townhomes. Parking and density vary sharply by block.",
    buyerMisunderstandings: [
      "Assuming Balboa Park adjacency from every Hillcrest address",
      "Confusing Hillcrest with downtown high-rise living",
    ],
    subareas: [
      {
        name: "Mission Hills",
        slug: "mission-hills",
        description: "Historic tree-lined streets near downtown.",
        buyingDistinction: "Single-family historic homes vs Hillcrest condo density.",
      },
      {
        name: "Bankers Hill",
        slug: "bankers-hill",
        description: "Upscale urban pocket above downtown.",
        buyingDistinction: "High-rise and view condos closer to the core.",
      },
      {
        name: "University Heights",
        slug: "university-heights",
        description: "Walkable pocket between Hillcrest and North Park.",
        buyingDistinction: "Quieter residential feel with Adams Avenue nearby.",
      },
      {
        name: "Balboa Park",
        slug: "balboa-park",
        description: "Cultural district surrounded by residential edges.",
        buyingDistinction: "Park-adjacent addresses vs pure urban village blocks.",
      },
    ],
    sources: [{ label: "Balboa Park cultural partnership" }, { label: "City of San Diego Uptown community plan" }],
    reviewedBy: REVIEWER,
    publishedAt: PUBLISHED,
    lastSubstantialUpdate: UPDATED,
  },
  "north-park": {
    expertSummary:
      "North Park delivers character bungalows and 30th Street energy at a lower entry than Hillcrest. Normal Heights offers a quieter Adams Avenue adjacency—compare block noise before you buy.",
    bestFitBuyers: [
      "First-time buyers wanting urban character",
      "Remote workers who value dining and craft beer culture",
      "Buyers comparing Hillcrest on budget",
    ],
    notIdealFor: [
      "Buyers needing large yards or top-tier school focus",
      "Daily UTC commuters",
    ],
    housingStockNotes:
      "Craftsman bungalows, duplexes, and infill townhomes. Competition is strong on walkable blocks.",
    buyerMisunderstandings: [
      "Assuming all North Park blocks have identical nightlife exposure",
      "Underestimating parking constraints on event nights",
    ],
    subareas: [
      {
        name: "Normal Heights",
        slug: "normal-heights",
        description: "Residential pocket with Adams Avenue dining nearby.",
        buyingDistinction: "Quieter streets vs 30th Street corridor energy.",
      },
    ],
    sources: [{ label: "North Park Main Street" }],
    reviewedBy: REVIEWER,
    publishedAt: PUBLISHED,
    lastSubstantialUpdate: UPDATED,
  },
};

export function getCommunitySeoExtension(slug: string): CommunitySeoExtension | undefined {
  return communitySeoExtensions[slug];
}
