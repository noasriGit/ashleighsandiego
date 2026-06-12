export type CommunityContent = {
  slug: string;
  whoItsFor: string[];
  housingOverview: string;
  lifestyle: string;
  commute: string;
  nearbyComparisons: { name: string; slug: string; note: string }[];
  faqs: { question: string; answer: string }[];
  /**
   * Optional hero photo for the neighborhood guide.
   * Expected path: `/images/neighborhoods/{slug}-hero.jpg` (1920x600).
   * When omitted, the guide hero falls back to the brand gradient.
   * Use only real licensed/community photography — never AI or fake MLS imagery.
   */
  heroImage?: string;
  heroImageAlt?: string;
  /**
   * Optional headline stats (e.g. walk score, parks, school count).
   * Only include verifiable, non-misleading figures. Rendered as a StatBand
   * when present; the page omits the band entirely when absent.
   */
  stats?: { value: string; label: string }[];
};

export const communityContent: Record<string, CommunityContent> = {
  "la-jolla": {
    slug: "la-jolla",
    stats: [
      { value: "92037", label: "ZIP Code" },
      { value: "I-5 · I-805", label: "Freeway Access" },
      { value: "UCSD · Scripps", label: "Nearby Anchors" },
    ],
    whoItsFor: [
      "Buyers seeking coastal living with ocean views and village amenities",
      "Families prioritizing top-rated schools and UCSD proximity",
      "Professionals in biotech, healthcare, or university roles",
      "Relocating buyers who want an established, upscale community",
    ],
    housingOverview:
      "La Jolla offers a wide range from ocean-view condos and townhomes to luxury single-family homes on the hillsides. Price points vary significantly by subarea — Bird Rock and La Jolla Shores tend toward family homes, while the Village has more condos and walkable dining.",
    lifestyle:
      "La Jolla blends beach access, coastal trails, boutique shopping, and fine dining. Torrey Pines State Reserve, the Cove, and La Jolla Shores provide outdoor recreation. UCSD and Scripps are nearby, creating a mix of academic, medical, and research community energy.",
    commute:
      "I-5 and I-805 provide freeway access. Commute to Sorrento Valley biotech corridor is straightforward. Downtown is roughly 20–30 minutes depending on traffic. Many buyers work remotely or commute to UTC, Sorrento Valley, or central San Diego.",
    nearbyComparisons: [
      { name: "Pacific Beach", slug: "pacific-beach", note: "More casual beach town feel at generally lower price points" },
      { name: "University City", slug: "university-city", note: "More central, newer condos, closer to UTC shopping" },
      { name: "Del Mar", slug: "del-mar", note: "Similar upscale coastal vibe, slightly north with fairgrounds culture" },
    ],
    faqs: [
      { question: "Is La Jolla good for relocating families?", answer: "Yes — La Jolla offers strong schools, beach access, and family-friendly subareas like La Jolla Shores and Bird Rock. Budget and housing type preferences will determine which subarea fits best." },
      { question: "What is the commute like from La Jolla?", answer: "La Jolla has good freeway access via I-5 and I-805. Commutes to Sorrento Valley, UTC, and downtown San Diego are common. Traffic on I-5 can be heavy during peak hours." },
      { question: "Are there condo options in La Jolla?", answer: "Yes — the Village and nearby areas have condo and townhome options, though inventory can be limited. Condos can be a good entry point for buyers who want the La Jolla address." },
    ],
  },
  "pacific-beach": {
    slug: "pacific-beach",
    stats: [
      { value: "92109", label: "ZIP Code" },
      { value: "I-5 · I-8", label: "Freeway Access" },
      { value: "Boardwalk · Bay", label: "Nearby Anchors" },
    ],
    whoItsFor: [
      "Buyers who want active beach-town living and boardwalk access",
      "Young professionals and couples seeking a social, walkable vibe",
      "Buyers comparing La Jolla who want coastal living at a lower price point",
      "Remote workers who prioritize lifestyle over commute",
    ],
    housingOverview:
      "Pacific Beach has a mix of condos, townhomes, and single-family homes. Crown Point offers canal-side living. Many properties are older but renovated. Beach-adjacent units command premiums.",
    lifestyle:
      "PB is known for its boardwalk, Garnet Avenue dining and nightlife, and a younger, active crowd. Mission Bay and Kate Sessions Park add outdoor options. The vibe is casual and beach-focused compared to La Jolla's village feel.",
    commute:
      "I-5 and I-8 provide freeway access. Commute to UTC or Sorrento Valley is 15–25 minutes. Downtown is about 15–20 minutes. Traffic on Garnet and Mission Blvd can be heavy on weekends.",
    nearbyComparisons: [
      { name: "La Jolla", slug: "la-jolla", note: "More upscale and quieter, with higher price points" },
      { name: "Ocean Beach", slug: "ocean-beach", note: "More laid-back and local, less nightlife-focused" },
      { name: "Mission Valley", slug: "mission-valley", note: "More central and affordable, less beach access" },
    ],
    faqs: [
      { question: "Is Pacific Beach family-friendly?", answer: "PB can work for families, especially in quieter pockets away from Garnet. Schools and noise levels vary by block. Crown Point and north PB tend to be calmer." },
      { question: "How does Pacific Beach compare to La Jolla?", answer: "PB is more casual and social with a younger demographic. La Jolla is quieter and more upscale. PB generally offers lower entry prices for coastal living." },
      { question: "Are there condos in Pacific Beach?", answer: "Yes — condos and townhomes are common, especially near the beach and Garnet Avenue. They can be a good option for buyers who want coastal access without a single-family budget." },
    ],
  },
  "university-city": {
    slug: "university-city",
    stats: [
      { value: "92122", label: "ZIP Code" },
      { value: "I-5 · I-805", label: "Freeway Access" },
      { value: "Westfield UTC", label: "Nearby Anchor" },
    ],
    whoItsFor: [
      "Buyers who want central access to UCSD, UTC, and Sorrento Valley",
      "Professionals in biotech, healthcare, or tech",
      "Families seeking newer construction and good schools",
      "Relocating buyers who prioritize commute over beach proximity",
    ],
    housingOverview:
      "University City and UTC feature a mix of condos, townhomes, and single-family homes. Newer developments near Westfield UTC offer modern amenities. Price points are generally lower than La Jolla with strong appreciation potential.",
    lifestyle:
      "UTC offers major shopping, dining, and entertainment at Westfield UTC. UCSD and the biotech corridor are minutes away. The area feels suburban-convenient rather than beach-town casual.",
    commute:
      "Excellent freeway access via I-5 and I-805. Sorrento Valley and UTC employers are 5–15 minutes. Downtown is 20–25 minutes. One of the best-located areas for biotech and UCSD commuters.",
    nearbyComparisons: [
      { name: "La Jolla", slug: "la-jolla", note: "Coastal and upscale, further from UTC shopping" },
      { name: "Carmel Valley", slug: "carmel-valley", note: "More suburban and family-focused, similar schools" },
      { name: "Sorrento Valley", slug: "sorrento-valley", note: "Closer to biotech offices, more condo/townhome inventory" },
    ],
    faqs: [
      { question: "Is University City good for UCSD families?", answer: "Yes — proximity to UCSD, good schools, and UTC amenities make it popular with university-affiliated buyers and families." },
      { question: "What is UTC vs University City?", answer: "UTC refers to the commercial/shopping hub (Westfield UTC). University City is the broader residential area. They're often grouped together for home search purposes." },
      { question: "Are there affordable options near UTC?", answer: "University City generally offers more affordable options than La Jolla or Del Mar, especially for condos and townhomes. Clairemont and Kearny Mesa are nearby alternatives." },
    ],
  },
  "clairemont": {
    slug: "clairemont",
    stats: [
      { value: "92117", label: "ZIP Code" },
      { value: "I-5 · I-805 · I-8", label: "Freeway Access" },
      { value: "Clairemont Sq", label: "Nearby Anchor" },
    ],
    whoItsFor: [
      "Buyers seeking more space and value in central San Diego",
      "Families who want yards and good schools without coastal premiums",
      "Commuters to central San Diego, Kearny Mesa, or Mission Valley",
      "First-time buyers looking for single-family homes under $1M",
    ],
    housingOverview:
      "Clairemont is known for mid-century single-family homes on larger lots. North Clairemont and Bay Park offer hillside views. Condos and townhomes are less common but available. Strong value compared to coastal areas.",
    lifestyle:
      "Established neighborhoods with local parks, canyon trails, and community feel. Less walkable than coastal or urban areas but more space and privacy. Clairemont Town Square provides shopping and dining.",
    commute:
      "Central location with I-5, I-805, and I-8 access. Mission Valley, Kearny Mesa, and downtown are 10–20 minutes. Good option for buyers working across multiple San Diego job centers.",
    nearbyComparisons: [
      { name: "Bay Park", slug: "bay-park", note: "Hillside views and bay breezes, slightly higher prices" },
      { name: "Mission Valley", slug: "mission-valley", note: "More condos and central shopping, less yard space" },
      { name: "Pacific Beach", slug: "pacific-beach", note: "Coastal lifestyle at higher price points" },
    ],
    faqs: [
      { question: "Is Clairemont a good value for relocating buyers?", answer: "Clairemont often offers more square footage and lot size per dollar compared to coastal neighborhoods. It's popular with buyers who prioritize space and central location." },
      { question: "What are Clairemont schools like?", answer: "School quality varies by subarea. Research specific school boundaries before buying — this is an important step for relocating families." },
      { question: "How far is Clairemont from the beach?", answer: "Pacific Beach and Mission Bay are 10–15 minutes by car. You trade beach proximity for more home and yard for your budget." },
    ],
  },
  "mission-valley": {
    slug: "mission-valley",
    stats: [
      { value: "92108", label: "ZIP Code" },
      { value: "I-8 · I-805 · I-15", label: "Freeway Access" },
      { value: "Fashion Valley", label: "Nearby Anchor" },
    ],
    whoItsFor: [
      "Buyers who want central location and freeway access",
      "Condo and townhome buyers seeking affordability",
      "Commuters to multiple San Diego job centers",
      "Buyers interested in newer communities like Civita",
    ],
    housingOverview:
      "Mission Valley is dominated by condos and townhomes, with some single-family pockets. Civita offers newer master-planned homes. Price points are among the more affordable in central San Diego.",
    lifestyle:
      "Shopping centers (Fashion Valley, Mission Valley Mall), restaurants, and freeway convenience define the area. Less neighborhood character than coastal or established communities, but highly functional for commuters.",
    commute:
      "Mission Valley sits at the intersection of I-8, I-805, and I-15 — one of the best-connected areas in San Diego. Downtown, UTC, and most job centers are 15–25 minutes.",
    nearbyComparisons: [
      { name: "Clairemont", slug: "clairemont", note: "More single-family homes and neighborhood feel" },
      { name: "Linda Vista", slug: "linda-vista", note: "More affordable, diverse community nearby" },
      { name: "Hillcrest", slug: "hillcrest", note: "Walkable urban village, higher price points" },
    ],
    faqs: [
      { question: "Is Mission Valley good for first-time buyers?", answer: "Mission Valley can offer more affordable condo and townhome options compared to coastal areas. It's worth comparing commute needs and lifestyle preferences." },
      { question: "What is Civita?", answer: "Civita is a newer master-planned community within Mission Valley with modern homes, parks, and amenities. It's popular with families and first-time buyers." },
      { question: "Is Mission Valley walkable?", answer: "Some areas near Fashion Valley and trolley stations are walkable. Overall, Mission Valley is more car-dependent than neighborhoods like Hillcrest or North Park." },
    ],
  },
  "del-mar": {
    slug: "del-mar",
    stats: [
      { value: "92014", label: "ZIP Code" },
      { value: "I-5", label: "Freeway Access" },
      { value: "Del Mar Fairgrounds", label: "Nearby Anchor" },
    ],
    whoItsFor: [
      "Buyers seeking upscale coastal living north of La Jolla",
      "Families who value top schools and a village atmosphere",
      "Professionals with flexible commutes or remote work",
      "Buyers comparing La Jolla who want a slightly quieter coastal feel",
    ],
    housingOverview:
      "Del Mar features luxury single-family homes, ocean-view properties, and select condos. Del Mar Heights offers hillside homes with canyon views. Inventory is limited and price points are among the highest in the area.",
    lifestyle:
      "Del Mar Village offers boutique shopping and dining. The Del Mar Fairgrounds and racetrack are local landmarks. Beaches are beautiful but smaller than La Jolla Shores or Pacific Beach.",
    commute:
      "I-5 provides direct freeway access. Sorrento Valley is 10–15 minutes south. Downtown is 25–30 minutes. Many Del Mar residents work locally, remotely, or commute south to biotech hubs.",
    nearbyComparisons: [
      { name: "La Jolla", slug: "la-jolla", note: "Similar upscale coastal feel, more UCSD proximity" },
      { name: "Carmel Valley", slug: "carmel-valley", note: "More suburban, family-oriented, slightly lower prices" },
      { name: "Solana Beach", slug: "del-mar", note: "Neighboring coastal community with train access" },
    ],
    faqs: [
      { question: "How does Del Mar compare to La Jolla?", answer: "Both are upscale coastal communities. Del Mar feels slightly more village-quaint and is north of La Jolla. La Jolla has more UCSD and biotech proximity." },
      { question: "Is Del Mar good for families?", answer: "Del Mar is popular with families who value schools, safety, and coastal lifestyle. Budget is typically the main consideration for relocating buyers." },
      { question: "Are there condo options in Del Mar?", answer: "Condo inventory is limited compared to La Jolla or UTC. Most buyers focus on single-family homes or townhomes in Del Mar Heights." },
    ],
  },
  "carmel-valley": {
    slug: "carmel-valley",
    stats: [
      { value: "92130", label: "ZIP Code" },
      { value: "I-5 · I-805", label: "Freeway Access" },
      { value: "Torrey Hills", label: "Popular Subarea" },
    ],
    whoItsFor: [
      "Families prioritizing top schools and master-planned amenities",
      "Buyers who want suburban feel with UTC/Sorrento Valley commute",
      "Relocating professionals in biotech or tech",
      "Buyers comparing Del Mar who want more space for their budget",
    ],
    housingOverview:
      "Carmel Valley features newer single-family homes, townhomes, and select condos. Master-planned communities offer parks, pools, and community centers. Torrey Hills is a popular subarea.",
    lifestyle:
      "Family-oriented with excellent parks, trails, and community events. Carmel Valley Road provides shopping and dining. Less coastal than Del Mar or La Jolla but more space and newer construction.",
    commute:
      "Close to I-5 and I-805. Sorrento Valley and UTC are 10–15 minutes. UCSD is 15–20 minutes. One of the best areas for biotech corridor commuters who want family-friendly neighborhoods.",
    nearbyComparisons: [
      { name: "Del Mar", slug: "del-mar", note: "Coastal and upscale, higher price points" },
      { name: "University City", slug: "university-city", note: "Closer to UTC, more condo inventory" },
      { name: "Sorrento Valley", slug: "sorrento-valley", note: "Closer to offices, more urban feel" },
    ],
    faqs: [
      { question: "Is Carmel Valley good for relocating families?", answer: "Carmel Valley is one of the most popular areas for relocating families due to schools, safety, and amenities. Budget and commute preferences should guide your search." },
      { question: "How far is Carmel Valley from the beach?", answer: "Del Mar beaches are 10–15 minutes. La Jolla is 15–20 minutes. You trade immediate beach access for more home and yard space." },
      { question: "What is Torrey Hills?", answer: "Torrey Hills is a subarea of Carmel Valley popular with families. It offers a mix of single-family homes and townhomes with good school access." },
    ],
  },
  "point-loma": {
    slug: "point-loma",
    stats: [
      { value: "92106", label: "ZIP Code" },
      { value: "I-5 · I-8", label: "Freeway Access" },
      { value: "Liberty Station", label: "Nearby Anchor" },
    ],
    whoItsFor: [
      "Buyers seeking peninsula living with bay and ocean views",
      "Military families considering proximity to Naval Base Point Loma",
      "Families who value Liberty Station and Point Loma schools",
      "Buyers who want coastal feel with more privacy than Pacific Beach",
    ],
    housingOverview:
      "Point Loma offers single-family homes ranging from modest to luxury, with bay-view and ocean-view premiums. Liberty Station has condos and townhomes. Point Loma Heights provides hillside options.",
    lifestyle:
      "Liberty Station offers dining, arts, and a weekly farmers market. Sunset Cliffs provides dramatic coastal trails. The peninsula has a relaxed, local feel distinct from downtown or beach towns.",
    commute:
      "I-5 and I-8 access. Downtown is 10–15 minutes. Naval Base Point Loma and NAS North Island are nearby. Airport proximity is convenient but can mean occasional aircraft noise.",
    nearbyComparisons: [
      { name: "Ocean Beach", slug: "ocean-beach", note: "More bohemian beach town, less peninsula privacy" },
      { name: "La Jolla", slug: "la-jolla", note: "Ocean-facing vs bay-facing, different coastal character" },
      { name: "Old Town", slug: "point-loma", note: "Historic district at the base of Point Loma" },
    ],
    faqs: [
      { question: "Is Point Loma good for military families?", answer: "Point Loma's proximity to Naval Base Point Loma and NAS North Island makes it popular with military buyers. Commute times and BAH budget should guide your search." },
      { question: "What is Liberty Station?", answer: "Liberty Station is a redeveloped naval training center with housing, dining, arts, and events. It's a hub of Point Loma community life." },
      { question: "Is there aircraft noise in Point Loma?", answer: "Proximity to San Diego International Airport can mean aircraft noise in some areas. Visit at different times of day to assess before buying." },
    ],
  },
  "sorrento-valley": {
    slug: "sorrento-valley",
    stats: [
      { value: "92121", label: "ZIP Code" },
      { value: "I-5 · I-805", label: "Freeway Access" },
      { value: "Biotech Corridor", label: "Nearby Anchor" },
    ],
    whoItsFor: [
      "Biotech and tech professionals who want a short commute",
      "Buyers seeking newer condos and townhomes",
      "Relocating buyers working in Sorrento Mesa or UTC",
      "Investors and professionals prioritizing location over beach access",
    ],
    housingOverview:
      "Sorrento Valley and Sorrento Mesa feature newer condo and townhome developments, with some single-family pockets. Inventory skews toward multi-family. Price points vary but are generally competitive for the location.",
    lifestyle:
      "The area is work-focused with biotech campuses, restaurants, and limited residential character. Buyers typically choose Sorrento Valley for commute convenience rather than lifestyle amenities.",
    commute:
      "This is the biotech corridor — many residents walk or have a 5-minute drive to work. I-5 and I-805 provide regional access. UTC is 5–10 minutes. La Jolla is 10–15 minutes.",
    nearbyComparisons: [
      { name: "University City", slug: "university-city", note: "More residential character, UTC shopping nearby" },
      { name: "Carmel Valley", slug: "carmel-valley", note: "More family-oriented, 10–15 minute commute" },
      { name: "Mira Mesa", slug: "sorrento-valley", note: "More affordable option further inland" },
    ],
    faqs: [
      { question: "Is Sorrento Valley good for biotech commuters?", answer: "Sorrento Valley is ideal for biotech and tech professionals — many campuses are in walking distance or a short drive. It's one of the top choices for commute-focused buyers." },
      { question: "Are there family-friendly options in Sorrento Valley?", answer: "Families often look at nearby Carmel Valley or University City for schools and parks, while keeping Sorrento Valley on the list for commute. Evaluate based on your priorities." },
      { question: "What types of homes are in Sorrento Valley?", answer: "Condos and townhomes dominate the inventory. Newer developments offer modern amenities. Single-family homes are less common." },
    ],
  },
  "bay-park": {
    slug: "bay-park",
    stats: [
      { value: "92110", label: "ZIP Code" },
      { value: "I-5 · I-8", label: "Freeway Access" },
      { value: "Mission Bay", label: "Nearby Anchor" },
    ],
    whoItsFor: [
      "Buyers wanting hillside views and bay breezes on a budget",
      "Families seeking single-family homes between Clairemont and Mission Bay",
      "Commuters to central San Diego or Kearny Mesa",
      "Buyers comparing Clairemont who want more character",
    ],
    housingOverview:
      "Bay Park offers single-family homes, many with views of Mission Bay. More character and elevation than flat Clairemont blocks. Price points sit between Clairemont and coastal areas.",
    lifestyle:
      "Quiet residential streets with canyon and bay views. Tecolote Canyon Natural Park and Mission Bay are nearby. Less walkable than urban neighborhoods but more scenic than inland Clairemont.",
    commute:
      "I-5 and I-8 access. Downtown and Mission Valley are 10–15 minutes. Kearny Mesa is 10 minutes. Good central location for buyers working across San Diego.",
    nearbyComparisons: [
      { name: "Clairemont", slug: "clairemont", note: "Flatter terrain, generally lower prices" },
      { name: "Pacific Beach", slug: "pacific-beach", note: "Beach access, higher prices and more activity" },
      { name: "Morena", slug: "bay-park", note: "Emerging area with newer development nearby" },
    ],
    faqs: [
      { question: "How does Bay Park compare to Clairemont?", answer: "Bay Park offers hillside views and bay breezes at a slight premium over flat Clairemont. Both provide central location and single-family home options." },
      { question: "Is Bay Park good for families?", answer: "Bay Park is popular with families who want views, space, and central access. School boundaries should be verified for specific addresses." },
      { question: "How close is Bay Park to Mission Bay?", answer: "Mission Bay is 5–10 minutes by car. You get bay proximity without Pacific Beach prices or crowds." },
    ],
  },
  "ocean-beach": {
    slug: "ocean-beach",
    stats: [
      { value: "92107", label: "ZIP Code" },
      { value: "I-8", label: "Freeway Access" },
      { value: "OB Pier · Dog Beach", label: "Nearby Anchors" },
    ],
    whoItsFor: [
      "Buyers who want a laid-back, local beach community",
      "Creative professionals and remote workers",
      "Buyers who prefer OB's identity over Pacific Beach's nightlife",
      "Dog owners — Ocean Beach Dog Beach is a major draw",
    ],
    housingOverview:
      "Ocean Beach has cottages, bungalows, and some newer construction. Inventory is eclectic. Beach-adjacent properties command premiums. Condos are less common than in PB or Mission Valley.",
    lifestyle:
      "OB Pier, Newport Avenue shops, and a strong local culture define the area. Less polished than La Jolla, more authentic than PB's party scene. Dog Beach and Sunset Cliffs are highlights.",
    commute:
      "I-8 provides freeway access. Downtown is 15 minutes. UTC and Sorrento Valley are 25–30 minutes. OB works best for buyers who prioritize lifestyle and can manage longer commutes or work remotely.",
    nearbyComparisons: [
      { name: "Point Loma", slug: "point-loma", note: "Peninsula living, more bay views and military proximity" },
      { name: "Pacific Beach", slug: "pacific-beach", note: "More nightlife and boardwalk energy" },
      { name: "Mission Hills", slug: "hillcrest", note: "Urban village feel without beach access" },
    ],
    faqs: [
      { question: "How does Ocean Beach compare to Pacific Beach?", answer: "OB is more laid-back and local-focused. PB has more nightlife and boardwalk activity. OB generally has a more bohemian, community-oriented feel." },
      { question: "Is Ocean Beach good for remote workers?", answer: "OB is popular with remote workers who prioritize beach lifestyle. Commute to job centers is longer, so remote or hybrid work arrangements fit well." },
      { question: "Are there affordable options in Ocean Beach?", answer: "OB offers a range of price points, but beach proximity adds premium. Buyers on tighter budgets often look at Point Loma Heights or areas further from the pier." },
    ],
  },
  "hillcrest": {
    slug: "hillcrest",
    stats: [
      { value: "92103", label: "ZIP Code" },
      { value: "I-805 · SR-163", label: "Freeway Access" },
      { value: "Balboa Park", label: "Nearby Anchor" },
    ],
    whoItsFor: [
      "Buyers who want walkable urban living near Balboa Park",
      "LGBTQ+ community members seeking an inclusive neighborhood",
      "Healthcare professionals working at nearby medical centers",
      "Buyers who prefer condos and townhomes over suburban yards",
    ],
    housingOverview:
      "Hillcrest features condos, townhomes, and historic single-family homes. Walkable density with mixed housing types. Price per square foot is higher due to location and walkability.",
    lifestyle:
      "Hillcrest is San Diego's premier walkable urban village with dining, nightlife, and farmers markets. Balboa Park, museums, and the zoo are walking distance. Strong community identity and inclusivity.",
    commute:
      "Central location with I-805 and SR-163 access. Downtown is 5–10 minutes. Medical centers (UCSD Hillcrest, Scripps) are nearby. Less ideal for UTC or Sorrento Valley commuters.",
    nearbyComparisons: [
      { name: "North Park", slug: "north-park", note: "Similar urban vibe, slightly more affordable" },
      { name: "Bankers Hill", slug: "hillcrest", note: "Upscale urban living closer to downtown" },
      { name: "Mission Valley", slug: "mission-valley", note: "More affordable, car-dependent, central freeway access" },
    ],
    faqs: [
      { question: "Is Hillcrest walkable?", answer: "Hillcrest is one of San Diego's most walkable neighborhoods. Daily errands, dining, and Balboa Park are accessible on foot." },
      { question: "Are there condo options in Hillcrest?", answer: "Yes — condos and townhomes are common in Hillcrest. They're popular with buyers who want urban lifestyle without yard maintenance." },
      { question: "How does Hillcrest compare to North Park?", answer: "Both are walkable urban neighborhoods. Hillcrest is closer to Balboa Park and medical centers. North Park has a younger, trendier dining scene." },
    ],
  },
  "north-park": {
    slug: "north-park",
    stats: [
      { value: "92104", label: "ZIP Code" },
      { value: "SR-163 · I-805", label: "Freeway Access" },
      { value: "30th St Corridor", label: "Nearby Anchor" },
    ],
    whoItsFor: [
      "Young professionals and creatives seeking walkable urban living",
      "First-time buyers who want character homes under $1M",
      "Buyers comparing Hillcrest who want a trendier, younger vibe",
      "Remote workers who value neighborhood dining and culture",
    ],
    housingOverview:
      "North Park has Craftsman bungalows, duplexes, and newer infill construction. Adams Avenue and 30th Street corridors provide dining and nightlife. Entry prices are lower than Hillcrest for similar urban feel.",
    lifestyle:
      "North Park is known for craft beer, independent restaurants, and a thriving arts scene. Morley Field and Balboa Park are nearby. The vibe is younger and trendier than established Hillcrest.",
    commute:
      "SR-163 and I-805 provide freeway access. Downtown is 10 minutes. UTC and Sorrento Valley are 25–30 minutes. Best for buyers with central or remote work arrangements.",
    nearbyComparisons: [
      { name: "Hillcrest", slug: "hillcrest", note: "More established urban village, closer to Balboa Park" },
      { name: "Normal Heights", slug: "north-park", note: "Quieter residential, Adams Avenue dining nearby" },
      { name: "University Heights", slug: "hillcrest", note: "Between Hillcrest and North Park, mixed character" },
    ],
    faqs: [
      { question: "Is North Park good for first-time buyers?", answer: "North Park can offer character homes at lower entry points than coastal areas. Condos and smaller homes are available, though competition can be strong." },
      { question: "How walkable is North Park?", answer: "The Adams Avenue and 30th Street corridors are very walkable. Residential side streets are quieter. Overall walkability is a major draw." },
      { question: "What is the nightlife like in North Park?", answer: "North Park has a vibrant dining and craft beer scene. It's livelier than Clairemont or Carmel Valley but different from Pacific Beach's boardwalk culture." },
    ],
  },
};

export function getCommunityContent(slug: string): CommunityContent | undefined {
  return communityContent[slug];
}
