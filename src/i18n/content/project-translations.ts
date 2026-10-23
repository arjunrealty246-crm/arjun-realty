import type { Locale } from "@/i18n/config";
import { getProjectBySlug, type Project, type ProjectUpdate } from "@/data/projects";
import { deepMerge } from "./merge";
import type { ContentBundle, LocalizedStatus } from "./types";

/**
 * The prose fields of a project that are genuinely translated.
 *
 * Factual fields (name, builder, location, approval, price, plot sizes,
 * dimensions, media, testimonials) are intentionally NOT part of this type:
 * their English values are authoritative and must never be rewritten by a
 * translation. Amenity names are translated one-for-one without adding,
 * removing or reordering items. Customer testimonials are quotes and are always
 * shown in their original language.
 */
export interface ProjectTranslatableContent {
  description?: string;
  tagline?: string;
  projectType?: string;
  badge?: string;
  usps?: string[];
  amenities?: string[];
  units?: { type: string; count: string }[];
  connectivity?: string[];
  investmentHighlights?: string[];
  highlights?: string[];
  locationAdvantages?: string[];
  whyInvest?: string[];
  faqs?: { q: string; a: string }[];
  updates?: { title: string; description?: string; status: ProjectUpdate["status"] }[];
  locationOverview?: string[];
  locationOverviewLabel?: string;
  locationOverviewHeading?: string;
  seoTitle?: string;
  seoDescription?: string;
}

/** Fields in a stable order — the hash must be deterministic across builds. */
const TRANSLATABLE_KEYS: (keyof ProjectTranslatableContent)[] = [
  "description",
  "tagline",
  "projectType",
  "badge",
  "usps",
  "amenities",
  "units",
  "connectivity",
  "investmentHighlights",
  "highlights",
  "locationAdvantages",
  "whyInvest",
  "faqs",
  "updates",
  "locationOverview",
  "locationOverviewLabel",
  "locationOverviewHeading",
  "seoTitle",
  "seoDescription",
];

/** Extract the translatable prose from a project, dropping undefined fields. */
export function pickTranslatable(project: Project): ProjectTranslatableContent {
  const source = project as unknown as Record<string, unknown>;
  const out: Record<string, unknown> = {};
  for (const key of TRANSLATABLE_KEYS) {
    const value = source[key];
    if (value === undefined) continue;
    if (Array.isArray(value)) {
      out[key] = value.map((item) => {
        if (item && typeof item === "object") {
          const { type, count, q, a, title, description, status } = item as Record<string, unknown>;
          if (q !== undefined || a !== undefined) return { q, a };
          if (type !== undefined || count !== undefined) return { type, count };
          if (title !== undefined) return { title, description, status };
        }
        return item;
      });
    } else {
      out[key] = value;
    }
  }
  return out as ProjectTranslatableContent;
}

/**
 * Stable string hash (FNV-1a, 32-bit) of the translatable English source.
 *
 * If an Admin edit or a code change alters any translated prose field, the hash
 * no longer matches the bundle and the localized page stays English + noindex
 * instead of showing stale translations next to changed facts.
 */
export function hashProjectSource(project: Project): string {
  const json = JSON.stringify(pickTranslatable(project));
  let hash = 0x811c9dc5;
  for (let i = 0; i < json.length; i++) {
    hash ^= json.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }
  return hash.toString(16).padStart(8, "0");
}

export interface ProjectTranslationBundle extends ContentBundle<ProjectTranslatableContent> {
  slug: string;
  /**
   * Hash of the English source these overrides were authored against.
   * Verified by scripts/i18n-project-check.ts and re-checked at render time.
   */
  sourceHash: string;
}

/**
 * Code-based project translation bundles.
 *
 * Only projects with real translated prose are registered. Adding Hindi later is
 * mechanical: add `hi` to `overrides` and `status` with the same shape.
 */
const projectTranslationBundles: Record<string, ProjectTranslationBundle> = {
  "jb-harmony-woods": {
    slug: "jb-harmony-woods",
    key: "projects/jb-harmony-woods",
    path: "/projects/jb-harmony-woods",
    en: pickTranslatable(getProjectBySlug("jb-harmony-woods")!),
    overrides: {
      te: {
        description:
          "JB హార్మొనీ వుడ్స్ అనేది హైదరాబాద్లోని శ్రీశైలం హైవేకు ఆనుకుని ఉన్న ఫ్యూచర్ సిటీ గ్రోత్ కారిడార్లో ఉన్న 53 ఎకరాల FCDA ఆమోదిత ప్రీమియం లగ్జరీ సెమీ-విల్లా కమ్యూనిటీ ప్రాజెక్ట్. ఈ గేటెడ్ కమ్యూనిటీలో 200 నుండి 600 చదరపు గజాల వరకు 524 విల్లా ప్లాట్లు మరియు 1,800 నుండి 2,400 చదరపు అడుగుల వరకు 50 బుటిక్ విల్లాలు ఉన్నాయి; 30+ జీవనశైలి సౌకర్యాలతో 36,000 చదరపు అడుగుల గ్రాండ్ క్లబ్హౌస్ అందుబాటులో ఉంది. మొత్తం లేఅవుట్ అధునాతన MEP (మెకానికల్, ఎలక్ట్రికల్ & ప్లంబింగ్) మౌలిక సదుపాయాలతో — 100% భూగర్భ కేబులింగ్, ప్రత్యేక డక్టింగ్ మరియు క్రమబద్ధమైన యుటిలిటీ లైన్లతో — రూపొందించబడింది; ఇది భవిష్యత్తులో తవ్వకాలు లేదా లేఅవుట్కు నష్టం లేకుండా అంతరాయం లేని నిర్వహణను, వేగవంతమైన సమస్య పరిష్కారాన్ని నిర్ధారిస్తుంది. శ్రీశైలం హైవేకు కేవలం 2 నిమిషాల దూరంలో, రాజీవ్ గాంధీ అంతర్జాతీయ విమానాశ్రయానికి 15 నిమిషాల దూరంలో ఉన్న ఈ ప్రాజెక్ట్, ఫ్యూచర్ సిటీ, AI సిటీ, ఫాక్స్కాన్ మరియు కైన్స్ టెక్నాలజీలతో చుట్టుముట్టబడి ఉంది — ఇది స్వయం ఉపయోగం మరియు పెట్టుబడి రెండింటికీ బలమైన అవకాశంగా నిలుస్తుంది.",
        tagline:
          "ఫ్యూచర్ సిటీ గ్రోత్ కారిడార్, తుమ్మలూరులో FCDA ఆమోదిత ప్రీమియం సెమీ-విల్లా ప్లాట్లు",
        projectType: "హైదరాబాద్లో ప్రీమియం సెమీ-విల్లా ప్లాట్లు",
        badge: "ప్రీమియం ప్లాట్లు",
        usps: [
          "ఫ్యూచర్ సిటీ గ్రోత్ కారిడార్లో మొదటి FCDA ఆమోదిత ప్రీమియం విల్లా ప్లాటింగ్ ప్రాజెక్టులలో ఒకటి",
          "ప్రీమియం లగ్జరీ సెమీ-విల్లా కమ్యూనిటీ ప్రాజెక్ట్",
          "53 ఎకరాల ప్రీమియం జీవన ప్రదేశం",
          "524 ప్రీమియం విల్లా ప్లాట్లు మరియు 50 బుటిక్ విల్లాలు",
          "30+ ప్రపంచస్థాయి సౌకర్యాలతో 36,000 చదరపు అడుగుల గ్రాండ్ క్లబ్హౌస్",
          "అధునాతన MEP మౌలిక సదుపాయాలు – 100% భూగర్భ కేబులింగ్, ప్రత్యేక డక్టింగ్ & క్రమబద్ధమైన యుటిలిటీ లైన్లు",
        ],
        amenities: [
          "ఈత కొలను",
          "పిల్లల ఈత కొలను",
          "ఫిట్నెస్ జిమ్",
          "యోగా ప్రదేశం",
          "ధ్యాన లాన్",
          "పికిల్బాల్ కోర్ట్",
          "హాఫ్ బాస్కెట్బాల్ కోర్ట్",
          "బ్యాడ్మింటన్ కోర్ట్",
          "ఇండోర్ ఆటలు",
          "ఓపెన్ ఎయిర్ థియేటర్",
          "బ్యాంక్వెట్ హాల్",
          "అతిథి గదులు",
          "రూఫ్టాప్ గార్డెన్",
          "పిల్లల ఆట ప్రదేశం",
          "పార్టీ లాన్",
          "సెంట్రల్ ఐలాండ్",
          "దేవాలయం",
          "చెట్ల నీడలో కూర్చొనే ప్రదేశం",
          "ల్యాండ్స్కేప్ పార్కులు",
          "జాగింగ్ ట్రాక్",
          "వాకింగ్ ట్రాక్",
          "అవెన్యూ మొక్కలు",
          "భూగర్భ డ్రైనేజీ",
          "భూగర్భ విద్యుత్",
          "LED వీధి దీపాలు",
          "24×7 భద్రత",
          "CCTV నిఘా",
          "కాంపౌండ్ వాల్",
          "గ్రాండ్ ప్రవేశ ద్వారం",
          "నీటి సరఫరా",
          "వర్షపు నీటి సేకరణ",
          "ప్రీమియం అంతర్గత రోడ్లు",
        ],
        units: [
          { type: "ప్రీమియం విల్లా ప్లాట్లు", count: "524" },
          { type: "బుటిక్ విల్లాలు", count: "50" },
        ],
        connectivity: [
          "శ్రీశైలం హైవేకు 2 నిమిషాలు",
          "ORR ఎగ్జిట్ 14కు 8 నిమిషాలు",
          "FCDA ప్రధాన కార్యాలయానికి 10 నిమిషాలు",
          "రాజీవ్ గాంధీ అంతర్జాతీయ విమానాశ్రయానికి 15 నిమిషాలు",
          "కలెక్టర్ కార్యాలయానికి 15 నిమిషాలు",
          "ఫాక్స్కాన్కు 16 నిమిషాలు",
          "ఫ్యూచర్ సిటీకి 5 నిమిషాలు",
          "AI సిటీ & AI స్కిల్ యూనివర్సిటీకి 10 నిమిషాలు",
          "వండర్లాకు 10 నిమిషాలు",
          "కైన్స్ టెక్నాలజీకి 16 నిమిషాలు",
          "ఫైనాన్షియల్ డిస్ట్రిక్ట్కు 35 నిమిషాలు",
          "గచ్చిబౌలికి 35 నిమిషాలు",
          "నియోపోలిస్ నాలెడ్జ్ సిటీకి 40 నిమిషాలు",
        ],
        investmentHighlights: [
          "53 ఎకరాలు – ఈ ప్రాంతంలో అతిపెద్ద FCDA ఆమోదిత విల్లా ప్లాటింగ్ ప్రాజెక్టులలో ఒకటి",
          "FCDA ఆమోదం ఫ్యూచర్ సిటీ గ్రోత్ కారిడార్లో దీర్ఘకాలిక అభివృద్ధి నిశ్చయతను అందిస్తుంది",
          "AI సిటీ, ఫాక్స్కాన్ మరియు పెద్ద ఎత్తున పారిశ్రామిక పెట్టుబడుల వల్ల వేగంగా విలువ పెరుగుతున్న కారిడార్",
          "బుటిక్ విల్లాలు – ప్రీమియం ఎండ్-యూజర్లు & NRIల కోసం పరిమిత ఇన్వెంటరీ",
          "అధునాతన MEP మౌలిక సదుపాయాలు – 100% భూగర్భ కేబులింగ్, ప్రత్యేక డక్టింగ్ & క్రమబద్ధమైన యుటిలిటీ లైన్లు; తవ్వకాలు లేదా లేఅవుట్ నష్టం లేకుండా అంతరాయం లేని నిర్వహణ",
          "సులభమైన పెట్టుబడి కోసం బ్యాంకు రుణం అందుబాటులో",
          "స్పష్టమైన టైటిల్ మరియు చట్టబద్ధతతో పారదర్శక ధరలు",
        ],
        highlights: [
          "FCDA ఆమోదిత – కారిడార్లో మొదటి ప్రాజెక్టులలో ఒకటి",
          "ప్రీమియం లగ్జరీ సెమీ-విల్లా కమ్యూనిటీ ప్రాజెక్ట్",
          "అధునాతన MEP మౌలిక సదుపాయాలు – 100% భూగర్భ కేబులింగ్, ప్రత్యేక డక్టింగ్ & క్రమబద్ధమైన యుటిలిటీ లైన్లు; తవ్వకాలు లేకుండా అంతరాయం లేని నిర్వహణ",
          "36,000 చదరపు అడుగుల క్లబ్హౌస్తో 53 ఎకరాల గేటెడ్ కమ్యూనిటీ",
          "524 ప్రీమియం విల్లా ప్లాట్లు + 50 బుటిక్ విల్లాలు",
          "శ్రీశైలం హైవేకు 2 నిమిషాలు | ORR ఎగ్జిట్ 14కు 8 నిమిషాలు",
          "రాజీవ్ గాంధీ అంతర్జాతీయ విమానాశ్రయానికి 15 నిమిషాలు",
          "30+ ప్రపంచస్థాయి జీవనశైలి సౌకర్యాలు",
        ],
        locationAdvantages: [
          "శ్రీశైలం హైవేకు 2 నిమిషాలు",
          "ORR ఎగ్జిట్ 14కు 8 నిమిషాలు",
          "FCDA ప్రధాన కార్యాలయానికి 10 నిమిషాలు",
          "రాజీవ్ గాంధీ అంతర్జాతీయ విమానాశ్రయానికి 15 నిమిషాలు",
          "కలెక్టర్ కార్యాలయానికి 15 నిమిషాలు",
          "ఫాక్స్కాన్కు 16 నిమిషాలు",
          "ఫ్యూచర్ సిటీకి 5 నిమిషాలు",
          "AI సిటీ & AI స్కిల్ యూనివర్సిటీకి 10 నిమిషాలు",
          "వండర్లాకు 10 నిమిషాలు",
          "కైన్స్ టెక్నాలజీకి 16 నిమిషాలు",
          "ఫైనాన్షియల్ డిస్ట్రిక్ట్కు 35 నిమిషాలు",
          "గచ్చిబౌలికి 35 నిమిషాలు",
          "నియోపోలిస్ నాలెడ్జ్ సిటీకి 40 నిమిషాలు",
        ],
        whyInvest: [
          "వేగంగా అభివృద్ధి చెందుతున్న ఫ్యూచర్ సిటీ కారిడార్లో FCDA ఆమోదిత ప్రాజెక్ట్",
          "36,000 చదరపు అడుగుల గ్రాండ్ క్లబ్హౌస్తో 53 ఎకరాల ప్రీమియం జీవన ప్రదేశం",
          "ప్రీమియం లగ్జరీ సెమీ-విల్లా కమ్యూనిటీ ప్రాజెక్ట్",
          "524 ప్రీమియం విల్లా ప్లాట్లు & 50 పరిమిత ఎడిషన్ బుటిక్ విల్లాలు",
          "అసాధారణ లొకేషన్: శ్రీశైలం హైవేకు 2 నిమిషాలు, ORRకు 8 నిమిషాలు, విమానాశ్రయానికి 15 నిమిషాలు",
          "ఫ్యూచర్ సిటీ, AI సిటీ, ఫాక్స్కాన్ మరియు కైన్స్ టెక్నాలజీకి సమీపం",
          "అధునాతన MEP మౌలిక సదుపాయాలు – 100% భూగర్భ కేబులింగ్, ప్రత్యేక డక్టింగ్ & క్రమబద్ధమైన యుటిలిటీ లైన్లు; తవ్వకాలు లేకుండా అంతరాయం లేని నిర్వహణ",
          "పూర్తి జీవనశైలి అనుభవానికి 30+ ప్రపంచస్థాయి సౌకర్యాలు",
          "సౌకర్యవంతమైన చెల్లింపు ఎంపికలతో బ్యాంకు రుణం అందుబాటులో",
          "భారీ పారిశ్రామిక & మౌలిక సదుపాయాల వృద్ధి వల్ల అధిక విలువ పెరుగుదల అవకాశం",
        ],
        faqs: [
          {
            q: "JB హార్మొనీ వుడ్స్ మొత్తం విస్తీర్ణం ఎంత?",
            a: "JB హార్మొనీ వుడ్స్ 53 ఎకరాలలో విస్తరించి ఉంది; ఇందులో 524 ప్రీమియం విల్లా ప్లాట్లు మరియు 50 బుటిక్ విల్లాలు ఉన్నాయి.",
          },
          {
            q: "JB హార్మొనీ వుడ్స్ FCDA ఆమోదితమా?",
            a: "అవును, JB హార్మొనీ వుడ్స్ ఫ్యూచర్ సిటీ గ్రోత్ కారిడార్లో మొదటి FCDA ఆమోదిత ప్రీమియం విల్లా ప్లాటింగ్ ప్రాజెక్టులలో ఒకటి.",
          },
          {
            q: "అందుబాటులో ఉన్న ప్లాట్ సైజులు ఏమిటి?",
            a: "విల్లా ప్లాట్లు 200 నుండి 600 చదరపు గజాల వరకు ఉంటాయి. బుటిక్ విల్లాలు 1,800 నుండి 2,400 చదరపు అడుగుల వరకు ఉంటాయి.",
          },
          {
            q: "బ్యాంకు రుణం అందుబాటులో ఉందా?",
            a: "అవును, విల్లా ప్లాట్లు మరియు బుటిక్ విల్లాలు రెండింటికీ బ్యాంకు రుణ సౌకర్యం అందుబాటులో ఉంది. మేము ప్రముఖ బ్యాంకులు మరియు ఆర్థిక సంస్థలతో ఎంపానెల్ చేయబడ్డాము.",
          },
          {
            q: "ప్రాజెక్ట్ ఏ ఏ సౌకర్యాలు అందిస్తుంది?",
            a: "ప్రాజెక్ట్లో 30+ ప్రపంచస్థాయి సౌకర్యాలతో 36,000 చదరపు అడుగుల గ్రాండ్ క్లబ్హౌస్ ఉంది — వీటిలో స్విమ్మింగ్ పూల్, ఫిట్నెస్ జిమ్, పికిల్బాల్ కోర్ట్, ఇండోర్ గేమ్స్, బ్యాంక్వెట్ హాల్ మరియు మరిన్ని ఉన్నాయి.",
          },
          {
            q: "JB హార్మొనీ వుడ్స్ లొకేషన్ ప్రయోజనం ఏమిటి?",
            a: "ఈ ప్రాజెక్ట్ శ్రీశైలం హైవేకు కేవలం 2 నిమిషాల దూరంలో, ORR ఎగ్జిట్ 14కు 8 నిమిషాల దూరంలో, విమానాశ్రయానికి 15 నిమిషాల దూరంలో ఉంది; అలాగే ఫ్యూచర్ సిటీ, AI సిటీ, ఫాక్స్కాన్ మరియు ప్రధాన ల్యాండ్మార్క్లకు కొన్ని నిమిషాల దూరంలో ఉంది.",
          },
          {
            q: "ఈ ప్రాజెక్ట్ NRIలకు అనుకూలమా?",
            a: "ఖచ్చితంగా. FCDA ఆమోదం, ఫ్యూచర్ సిటీ మరియు AI సిటీకి సమీపంలోని ప్రధాన లొకేషన్, అధిక విలువ పెరుగుదల అవకాశం — ఇవి దీర్ఘకాలిక విలువ కోసం చూస్తున్న NRIలకు ఈ ప్రాజెక్ట్ను ఆదర్శ పెట్టుబడిగా మారుస్తాయి.",
          },
          {
            q: "IT హబ్లకు కనెక్టివిటీ ఎలా ఉంటుంది?",
            a: "ఫైనాన్షియల్ డిస్ట్రిక్ట్ మరియు గచ్చిబౌలి 35 నిమిషాల్లో, నియోపోలిస్ నాలెడ్జ్ సిటీ 40 నిమిషాల్లో చేరుకోవచ్చు; ఇది IT నిపుణులకు అనుకూలంగా ఉంటుంది.",
          },
        ],
        updates: [
          {
            title: "భూగర్భ మౌలిక సదుపాయాలు & రోడ్డు అభివృద్ధి పనులు కొనసాగుతున్నాయి",
            description:
              "JB హార్మొనీ వుడ్స్లో ప్రస్తుతం ప్రధాన అభివృద్ధి పనులు కొనసాగుతున్నాయి; వీటిలో భూగర్భ విద్యుత్, నీటి సరఫరా మరియు డ్రైనేజీ పైప్లైన్ పనులు ఉన్నాయి. ప్రాజెక్ట్ మౌలిక సదుపాయాల అభివృద్ధిలో మరో ముఖ్యమైన మైలురాయిగా, యాక్సెస్ రోడ్డు అభివృద్ధి మరియు CC రోడ్డు నిర్మాణం కూడా పూర్తయింది.",
            status: "in-progress",
          },
        ],
        seoTitle: "JB హార్మొనీ వుడ్స్ | తుక్కుగూడ సమీపంలో ఓపెన్ ప్లాట్లు",
        seoDescription:
          "తుక్కుగూడ సమీపంలోని తుమ్మలూరులో, ORR ఎగ్జిట్ 14 మరియు శ్రీశైలం హైవేకు దగ్గరగా ఉన్న JB హార్మొనీ వుడ్స్ FCDA ఆమోదిత ఓపెన్ ప్లాట్లను తెలుసుకోండి. ప్రాజెక్ట్ లక్షణాలు, కనెక్టివిటీ మరియు సైట్ విజిట్ వివరాలను చూడండి.",
      },
      hi: {
        description:
          "JB हार्मनी वुड्स हैदराबाद में श्रीशैलम हाईवे के पास फ्यूचर सिटी ग्रोथ कॉरिडोर में स्थित 53 एकड़ का FCDA अनुमोदित प्रीमियम लक्ज़री सेमी-विला कम्युनिटी प्रोजेक्ट है। इस गेटेड कम्युनिटी में 200 से 600 वर्ग गज तक के 524 विला प्लॉट और 1,800 से 2,400 वर्ग फुट तक के 50 बुटीक विला हैं; साथ ही 30+ जीवनशैली सुविधाओं वाला 36,000 वर्ग फुट का ग्रैंड क्लबहाउस उपलब्ध है। पूरा लेआउट उन्नत MEP (मैकेनिकल, इलेक्ट्रिकल और प्लंबिंग) इंफ्रास्ट्रक्चर के साथ तैयार किया गया है — 100% भूमिगत केबलिंग, समर्पित डक्टिंग और व्यवस्थित यूटिलिटी लाइनें — जो भविष्य में खुदाई या लेआउट को नुकसान पहुंचाए बिना निर्बाध रखरखाव और तेज़ समस्या समाधान सुनिश्चित करता है। श्रीशैलम हाईवे से केवल 2 मिनट और राजीव गांधी अंतर्राष्ट्रीय एयरपोर्ट से 15 मिनट की दूरी पर स्थित यह प्रोजेक्ट फ्यूचर सिटी, AI सिटी, फॉक्सकॉन और काइनेस टेक्नोलॉजी से घिरा है — जो इसे उपयोग और निवेश दोनों के लिए मजबूत अवसर बनाता है।",
        tagline:
          "फ्यूचर सिटी ग्रोथ कॉरिडोर, थुम्मलूर में FCDA अनुमोदित प्रीमियम सेमी-विला प्लॉट्स",
        projectType: "हैदराबाद में प्रीमियम सेमी-विला प्लॉट्स",
        badge: "प्रीमियम प्लॉट्स",
        usps: [
          "फ्यूचर सिटी ग्रोथ कॉरिडोर के पहले FCDA अनुमोदित प्रीमियम विला प्लॉटिंग प्रोजेक्ट्स में से एक",
          "प्रीमियम लक्ज़री सेमी-विला कम्युनिटी प्रोजेक्ट",
          "53 एकड़ का प्रीमियम रहने का स्थान",
          "524 प्रीमियम विला प्लॉट और 50 बुटीक विला",
          "30+ विश्वस्तरीय सुविधाओं वाला 36,000 वर्ग फुट ग्रैंड क्लबहाउस",
          "उन्नत MEP इंफ्रास्ट्रक्चर – 100% भूमिगत केबलिंग, समर्पित डक्टिंग और व्यवस्थित यूटिलिटी लाइनें",
        ],
        amenities: [
          "तैराकी पूल",
          "बच्चों का पूल",
          "फिटनेस जिम",
          "योग क्षेत्र",
          "ध्यान लॉन",
          "पिकलबॉल कोर्ट",
          "हाफ बास्केटबॉल कोर्ट",
          "बैडमिंटन कोर्ट",
          "इनडोर गेम्स",
          "ओपन एयर थिएटर",
          "बैंक्वेट हॉल",
          "गेस्ट रूम",
          "रूफटॉप गार्डन",
          "बच्चों का खेल क्षेत्र",
          "पार्टी लॉन",
          "सेंट्रल आइलैंड",
          "मंदिर",
          "पेड़ों की छाया में बैठने की जगह",
          "लैंडस्केप पार्क",
          "जॉगिंग ट्रैक",
          "वॉकिंग ट्रैक",
          "अवेन्यू प्लांटेशन",
          "भूमिगत जल निकासी",
          "भूमिगत बिजली",
          "LED स्ट्रीट लाइटिंग",
          "24×7 सुरक्षा",
          "CCTV निगरानी",
          "कंपाउंड वॉल",
          "भव्य प्रवेश द्वार",
          "जल आपूर्ति",
          "वर्षा जल संचयन",
          "प्रीमियम आंतरिक सड़कें",
        ],
        units: [
          { type: "प्रीमियम विला प्लॉट्स", count: "524" },
          { type: "बुटीक विला", count: "50" },
        ],
        connectivity: [
          "श्रीशैलम हाईवे से 2 मिनट",
          "ORR एग्ज़िट 14 से 8 मिनट",
          "FCDA मुख्यालय से 10 मिनट",
          "राजीव गांधी अंतर्राष्ट्रीय एयरपोर्ट से 15 मिनट",
          "कलेक्टर कार्यालय से 15 मिनट",
          "फॉक्सकॉन से 16 मिनट",
          "फ्यूचर सिटी से 5 मिनट",
          "AI सिटी और AI स्किल यूनिवर्सिटी से 10 मिनट",
          "वंडरला से 10 मिनट",
          "काइनेस टेक्नोलॉजी से 16 मिनट",
          "फाइनेंशियल डिस्ट्रिक्ट से 35 मिनट",
          "गाचीबावली से 35 मिनट",
          "नियोपोलिस नॉलेज सिटी से 40 मिनट",
        ],
        investmentHighlights: [
          "53 एकड़ – क्षेत्र के सबसे बड़े FCDA अनुमोदित विला प्लॉटिंग प्रोजेक्ट्स में से एक",
          "FCDA अनुमोदन फ्यूचर सिटी ग्रोथ कॉरिडोर में दीर्घकालिक विकास निश्चितता सुनिश्चित करता है",
          "AI सिटी, फॉक्सकॉन और बड़े पैमाने के औद्योगिक निवेश से तेज़ी से बढ़ता कॉरिडोर",
          "बुटीक विला – प्रीमियम एंड-यूज़र्स और NRI के लिए सीमित इन्वेंटरी",
          "उन्नत MEP इंफ्रास्ट्रक्चर – 100% भूमिगत केबलिंग, समर्पित डक्टिंग और व्यवस्थित यूटिलिटी लाइनें; खुदाई या लेआउट को नुकसान के बिना निर्बाध रखरखाव",
          "आसान निवेश के लिए बैंक ऋण उपलब्ध",
          "स्पष्ट टाइटल और कानूनी अनुपालन के साथ पारदर्शी कीमत",
        ],
        highlights: [
          "FCDA अनुमोदित – कॉरिडोर के पहले प्रोजेक्ट्स में से एक",
          "प्रीमियम लक्ज़री सेमी-विला कम्युनिटी प्रोजेक्ट",
          "उन्नत MEP इंफ्रास्ट्रक्चर – 100% भूमिगत केबलिंग, समर्पित डक्टिंग और व्यवस्थित यूटिलिटी लाइनें; खुदाई के बिना निर्बाध रखरखाव",
          "36,000 वर्ग फुट क्लबहाउस के साथ 53 एकड़ की गेटेड कम्युनिटी",
          "524 प्रीमियम विला प्लॉट + 50 बुटीक विला",
          "श्रीशैलम हाईवे से 2 मिनट | ORR एग्ज़िट 14 से 8 मिनट",
          "राजीव गांधी अंतर्राष्ट्रीय एयरपोर्ट से 15 मिनट",
          "30+ विश्वस्तरीय जीवनशैली सुविधाएं",
        ],
        locationAdvantages: [
          "श्रीशैलम हाईवे से 2 मिनट",
          "ORR एग्ज़िट 14 से 8 मिनट",
          "FCDA मुख्यालय से 10 मिनट",
          "राजीव गांधी अंतर्राष्ट्रीय एयरपोर्ट से 15 मिनट",
          "कलेक्टर कार्यालय से 15 मिनट",
          "फॉक्सकॉन से 16 मिनट",
          "फ्यूचर सिटी से 5 मिनट",
          "AI सिटी और AI स्किल यूनिवर्सिटी से 10 मिनट",
          "वंडरला से 10 मिनट",
          "काइनेस टेक्नोलॉजी से 16 मिनट",
          "फाइनेंशियल डिस्ट्रिक्ट से 35 मिनट",
          "गाचीबावली से 35 मिनट",
          "नियोपोलिस नॉलेज सिटी से 40 मिनट",
        ],
        whyInvest: [
          "तेज़ी से बढ़ते फ्यूचर सिटी कॉरिडोर में FCDA अनुमोदित प्रोजेक्ट",
          "36,000 वर्ग फुट ग्रैंड क्लबहाउस के साथ 53 एकड़ का प्रीमियम रहने का स्थान",
          "प्रीमियम लक्ज़री सेमी-विला कम्युनिटी प्रोजेक्ट",
          "524 प्रीमियम विला प्लॉट और 50 सीमित संस्करण बुटीक विला",
          "बेहतरीन स्थान: श्रीशैलम हाईवे से 2 मिनट, ORR से 8 मिनट, एयरपोर्ट से 15 मिनट",
          "फ्यूचर सिटी, AI सिटी, फॉक्सकॉन और काइनेस टेक्नोलॉजी की निकटता",
          "उन्नत MEP इंफ्रास्ट्रक्चर – 100% भूमिगत केबलिंग, समर्पित डक्टिंग और व्यवस्थित यूटिलिटी लाइनें; खुदाई के बिना निर्बाध रखरखाव",
          "पूर्ण जीवनशैली अनुभव के लिए 30+ विश्वस्तरीय सुविधाएं",
          "लचीले भुगतान विकल्पों के साथ बैंक ऋण उपलब्ध",
          "बड़े पैमाने के औद्योगिक और इंफ्रास्ट्रक्चर विकास से उच्च मूल्य वृद्धि की संभावना",
        ],
        faqs: [
          {
            q: "JB हार्मनी वुड्स का कुल क्षेत्रफल कितना है?",
            a: "JB हार्मनी वुड्स 53 एकड़ में फैला है, जिसमें 524 प्रीमियम विला प्लॉट और 50 बुटीक विला शामिल हैं।",
          },
          {
            q: "क्या JB हार्मनी वुड्स FCDA अनुमोदित है?",
            a: "हां, JB हार्मनी वुड्स फ्यूचर सिटी ग्रोथ कॉरिडोर के पहले FCDA अनुमोदित प्रीमियम विला प्लॉटिंग प्रोजेक्ट्स में से एक है।",
          },
          {
            q: "उपलब्ध प्लॉट साइज़ क्या हैं?",
            a: "विला प्लॉट 200 से 600 वर्ग गज तक हैं। बुटीक विला 1,800 से 2,400 वर्ग फुट तक हैं।",
          },
          {
            q: "क्या बैंक ऋण उपलब्ध है?",
            a: "हां, विला प्लॉट और बुटीक विला दोनों के लिए बैंक ऋण सुविधा उपलब्ध है। हम प्रमुख बैंकों और वित्तीय संस्थानों के साथ एम्पैनल्ड हैं।",
          },
          {
            q: "प्रोजेक्ट कौन-कौन सी सुविधाएं प्रदान करता है?",
            a: "प्रोजेक्ट में 36,000 वर्ग फुट का ग्रैंड क्लबहाउस है जिसमें 30+ विश्वस्तरीय सुविधाएं हैं — जिनमें तैराकी पूल, फिटनेस जिम, पिकलबॉल कोर्ट, इनडोर गेम्स, बैंक्वेट हॉल और अन्य शामिल हैं।",
          },
          {
            q: "JB हार्मनी वुड्स का स्थान क्या लाभ देता है?",
            a: "प्रोजेक्ट श्रीशैलम हाईवे से केवल 2 मिनट, ORR एग्ज़िट 14 से 8 मिनट, एयरपोर्ट से 15 मिनट की दूरी पर है; साथ ही फ्यूचर सिटी, AI सिटी, फॉक्सकॉन और प्रमुख लैंडमार्क से कुछ ही मिनटों की दूरी पर है।",
          },
          {
            q: "क्या यह प्रोजेक्ट NRI के लिए उपयुक्त है?",
            a: "बिल्कुल। FCDA अनुमोदन, फ्यूचर सिटी और AI सिटी के पास प्रमुख स्थान, और उच्च मूल्य वृद्धि की संभावना इसे दीर्घकालिक मूल्य चाहने वाले NRI के लिए आदर्श निवेश बनाती है।",
          },
          {
            q: "IT हब्स से कनेक्टिविटी कैसी है?",
            a: "फाइनेंशियल डिस्ट्रिक्ट और गाचीबावली 35 मिनट में, नियोपोलिस नॉलेज सिटी 40 मिनट में पहुंचा जा सकता है, जो IT पेशेवरों के लिए सुविधाजनक है।",
          },
        ],
        updates: [
          {
            title: "भूमिगत इंफ्रास्ट्रक्चर और सड़क विकास कार्य प्रगति पर",
            description:
              "JB हार्मनी वुड्स में प्रमुख विकास कार्य वर्तमान में प्रगति पर हैं, जिनमें भूमिगत बिजली, जल आपूर्ति और जल निकासी पाइपलाइन के कार्य शामिल हैं। प्रोजेक्ट के इंफ्रास्ट्रक्चर विकास में एक और महत्वपूर्ण माइलस्टोन के रूप में, एक्सेस रोड विकास और CC सड़क निर्माण भी पूरा हो चुका है।",
            status: "in-progress",
          },
        ],
        seoTitle: "JB हार्मनी वुड्स | तुक्कुगुडा के पास ओपन प्लॉट्स",
        seoDescription:
          "तुक्कुगुडा के पास थुम्मलूर में, ORR एग्ज़िट 14 और श्रीशैलम हाईवे के निकट स्थित JB हार्मनी वुड्स के FCDA अनुमोदित ओपन प्लॉट्स के बारे में जानें। प्रोजेक्ट विशेषताएं, कनेक्टिविटी और साइट विज़िट विवरण देखें।",
      },
    },
    status: {
      te: "needs-review",
      hi: "needs-review",
    },
    // Hash of the Admin-merged English this translation was reviewed against
    // (`getMergedProject`, not the static registry). Any later edit to a
    // translated field makes the hash mismatch and the page falls back to
    // English instead of showing stale translations next to changed facts.
    sourceHash: "64f2dd55",
  },
};

export function getProjectTranslationBundle(slug: string): ProjectTranslationBundle | undefined {
  return projectTranslationBundles[slug];
}

export function getProjectBundleByPath(path: string): { path: string; status: LocalizedStatus } | undefined {
  const normalized = path === "" ? "/" : path;
  return Object.values(projectTranslationBundles).find((bundle) => bundle.path === normalized);
}

export interface LocalizedProjectResult {
  project: Project;
  /** Whether translated prose was actually applied. */
  applied: boolean;
  /** True when the English source changed since the overrides were authored. */
  stale: boolean;
}

/**
 * Apply a locale's translated prose to a project record.
 *
 * The caller passes the fully merged project (static + Admin overrides) so the
 * hash guard sees exactly the English that would otherwise be rendered. On a
 * hash mismatch nothing is applied: English is shown and the page stays noindex.
 */
export function localizeProject(project: Project, locale: Locale): LocalizedProjectResult {
  if (locale === "en") return { project, applied: false, stale: false };

  const bundle = projectTranslationBundles[project.slug];
  if (!bundle) return { project, applied: false, stale: false };

  const override = bundle.overrides[locale as Exclude<Locale, "en">];
  if (!override) return { project, applied: false, stale: false };

  if (hashProjectSource(project) !== bundle.sourceHash) {
    return { project, applied: false, stale: true };
  }

  const resolved = deepMerge(bundle.en, override);
  const localized: Project = { ...project };
  for (const [key, value] of Object.entries(resolved)) {
    if (value === undefined) continue;
    (localized as unknown as Record<string, unknown>)[key] = value;
  }
  return { project: localized, applied: true, stale: false };
}

/** Top-level translatable keys missing from a locale override (completeness gate). */
export function findMissingProjectTranslations(
  slug: string,
  locale: Exclude<Locale, "en">
): string[] {
  const bundle = projectTranslationBundles[slug];
  if (!bundle) return ["<bundle missing>"];
  const override = bundle.overrides[locale] as Record<string, unknown> | undefined;
  if (!override) return ["<no override>"];
  const missing: string[] = [];
  for (const key of Object.keys(bundle.en) as (keyof ProjectTranslatableContent)[]) {
    const value = override[key];
    if (value === undefined || value === null || value === "") missing.push(key);
    else if (Array.isArray(value) && value.length === 0) missing.push(key);
  }
  return missing;
}

export { projectTranslationBundles };
