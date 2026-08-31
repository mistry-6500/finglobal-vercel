/**
 * FinWorldNews content source.
 *
 * Everything the site renders comes from this single file — no database, no
 * API calls, no client fetching. Add a story to `articles`, and it appears on
 * the home page, its market page, the trending feed and the sitemap
 * automatically. Keep `updated` in ISO format (YYYY-MM-DD) and accurate.
 */

export type MarketSlug =
  | "united-states"
  | "europe"
  | "asia-pacific"
  | "commodities"
  | "currencies"
  | "crypto";

export interface Market {
  slug: MarketSlug;
  name: string;
  shortName: string;
  region: string;
  tagline: string;
  description: string;
  benchmarks: { name: string; note: string }[];
}

export interface Article {
  slug: string;
  title: string;
  summary: string;
  body: string[];
  market: MarketSlug;
  topic: string;
  source: string;
  sourceUrl: string;
  published: string; // ISO date
  trending?: boolean;
  breaking?: boolean;
}

export const SITE = {
  name: "FinWorldNews",
  tagline: "Breaking global financial news",
  description:
    "FinWorldNews delivers breaking global financial news across US, European, Asia-Pacific, commodity, currency and crypto markets — verified, sourced and fast.",
  editorialPolicy:
    "Every story links to a primary source: an exchange filing, a central bank release, a company statement or a wire report. Figures are quoted as published and dated.",
} as const;

export const markets: Market[] = [
  {
    slug: "united-states",
    name: "United States Markets",
    shortName: "US",
    region: "North America",
    tagline: "Wall Street, the Federal Reserve and US corporate earnings.",
    description:
      "Coverage of the S&P 500, Nasdaq and Dow, Federal Reserve policy, Treasury yields and the US corporate earnings calendar.",
    benchmarks: [
      { name: "S&P 500", note: "Broad US large-cap benchmark" },
      { name: "Nasdaq Composite", note: "Technology-weighted index" },
      { name: "US 10-year Treasury", note: "Global risk-free rate anchor" },
    ],
  },
  {
    slug: "europe",
    name: "European Markets",
    shortName: "Europe",
    region: "EMEA",
    tagline: "ECB policy, the euro area economy and London-listed movers.",
    description:
      "European equity, bond and policy news: the ECB and Bank of England, the STOXX 600, DAX, CAC 40 and FTSE 100, plus euro-area inflation and growth data.",
    benchmarks: [
      { name: "STOXX Europe 600", note: "Pan-European equity benchmark" },
      { name: "DAX", note: "German blue chips" },
      { name: "FTSE 100", note: "UK large caps, largely dollar earners" },
    ],
  },
  {
    slug: "asia-pacific",
    name: "Asia-Pacific Markets",
    shortName: "Asia-Pacific",
    region: "APAC",
    tagline: "Tokyo, Shanghai, Hong Kong, Mumbai and Sydney trading.",
    description:
      "Asia-Pacific market news covering the Nikkei 225, Hang Seng, CSI 300, Nifty 50 and ASX 200, plus Bank of Japan and People's Bank of China policy.",
    benchmarks: [
      { name: "Nikkei 225", note: "Japanese large caps" },
      { name: "Hang Seng", note: "Hong Kong listings, China exposure" },
      { name: "Nifty 50", note: "Indian large-cap benchmark" },
    ],
  },
  {
    slug: "commodities",
    name: "Commodities",
    shortName: "Commodities",
    region: "Global",
    tagline: "Crude, gold, gas and the agricultural complex.",
    description:
      "Commodity market news: Brent and WTI crude, natural gas, gold and silver, industrial metals and grains, with OPEC+ and supply-chain developments.",
    benchmarks: [
      { name: "Brent crude", note: "Global oil pricing benchmark" },
      { name: "Gold", note: "Reserve asset and inflation hedge" },
      { name: "Copper", note: "Industrial demand bellwether" },
    ],
  },
  {
    slug: "currencies",
    name: "Currencies & Rates",
    shortName: "FX & Rates",
    region: "Global",
    tagline: "Dollar strength, carry trades and sovereign bond moves.",
    description:
      "Foreign exchange and fixed income news: the US dollar index, EUR/USD, USD/JPY, emerging-market currencies, and sovereign yield curves worldwide.",
    benchmarks: [
      { name: "US Dollar Index", note: "Dollar versus a basket of peers" },
      { name: "EUR/USD", note: "Most traded currency pair" },
      { name: "USD/JPY", note: "Sensitive to rate differentials" },
    ],
  },
  {
    slug: "crypto",
    name: "Crypto Markets",
    shortName: "Crypto",
    region: "Global",
    tagline: "Digital assets, ETFs and regulation.",
    description:
      "Digital asset market news: bitcoin and ether price action, spot ETF flows, stablecoin regulation and exchange infrastructure.",
    benchmarks: [
      { name: "Bitcoin", note: "Largest digital asset by market value" },
      { name: "Ether", note: "Smart-contract network asset" },
      { name: "Spot ETF flows", note: "Regulated demand proxy" },
    ],
  },
];

export const articles: Article[] = [
  {
    slug: "fed-holds-rates-signals-patience",
    title: "Fed holds rates steady and signals patience on the next cut",
    summary:
      "The Federal Open Market Committee left its policy rate unchanged and repeated that it needs greater confidence on inflation before easing further.",
    body: [
      "The Federal Open Market Committee voted to keep the federal funds target range unchanged, repeating language that it wants greater confidence inflation is moving sustainably toward 2 percent before reducing policy restraint.",
      "Treasury yields were choppy after the statement as traders trimmed bets on a near-term cut. Rate-sensitive parts of the equity market — small caps, housing and regional banks — gave back early gains.",
      "Investors now turn to the next round of payrolls and CPI prints, which the committee has repeatedly framed as the deciding inputs for the timing of any move.",
    ],
    market: "united-states",
    topic: "Central banks",
    source: "Federal Reserve — FOMC statements",
    sourceUrl: "https://www.federalreserve.gov/monetarypolicy/fomccalendars.htm",
    published: "2026-08-31",
    breaking: true,
    trending: true,
  },
  {
    slug: "megacap-tech-earnings-ai-capex",
    title: "Megacap tech earnings put AI capital spending back under scrutiny",
    summary:
      "Cloud providers keep raising data-centre budgets, and investors are asking how quickly that spending converts into revenue.",
    body: [
      "The largest US technology companies continue to guide capital expenditure sharply higher, driven by data-centre buildouts for AI workloads. Cloud revenue growth remains the metric investors use to judge whether that spending pays back.",
      "The dispersion inside the index is widening: names that pair rising capex with accelerating cloud revenue have been rewarded, while those raising budgets without a visible demand signal have not.",
      "Because a handful of these companies dominate index weightings, their guidance moves the S&P 500 and Nasdaq far more than their share count suggests.",
    ],
    market: "united-states",
    topic: "Equities",
    source: "Company quarterly filings — SEC EDGAR",
    sourceUrl: "https://www.sec.gov/edgar/search/",
    published: "2026-08-30",
    trending: true,
  },
  {
    slug: "ecb-inflation-path-euro-area",
    title: "ECB keeps easing gradual as euro-area inflation cools unevenly",
    summary:
      "Services inflation is proving stickier than goods, keeping the European Central Bank cautious about the pace of rate reductions.",
    body: [
      "Euro-area headline inflation has come down substantially from its peak, but services prices — closely tied to wages — are falling more slowly, and the European Central Bank has said it will move meeting by meeting.",
      "Bund yields and the euro have both traded on the gap between euro-area and US rate expectations rather than on domestic data alone.",
      "Eurostat's flash estimates and the ECB's staff projections remain the two releases that reprice the curve most reliably.",
    ],
    market: "europe",
    topic: "Central banks",
    source: "European Central Bank — monetary policy decisions",
    sourceUrl: "https://www.ecb.europa.eu/press/pr/date/html/index.en.html",
    published: "2026-08-29",
    trending: true,
  },
  {
    slug: "ftse-100-dollar-earners",
    title: "FTSE 100 leans on dollar earners as sterling swings",
    summary:
      "Roughly three quarters of FTSE 100 revenue is earned abroad, so currency moves shape the index as much as UK economic data.",
    body: [
      "The FTSE 100 is dominated by energy, mining, pharmaceutical and financial groups that report a large majority of revenue outside the United Kingdom. A weaker pound mechanically lifts translated earnings.",
      "That makes the index a poor proxy for the UK domestic economy; the more domestically exposed FTSE 250 tracks Bank of England expectations far more closely.",
      "Bank of England decisions and UK CPI releases remain the scheduled events that move both indices and gilt yields.",
    ],
    market: "europe",
    topic: "Equities",
    source: "Bank of England — monetary policy",
    sourceUrl: "https://www.bankofengland.co.uk/monetary-policy-summary-and-minutes",
    published: "2026-08-28",
  },
  {
    slug: "bank-of-japan-yen-policy-normalisation",
    title: "Bank of Japan normalisation keeps the yen at the centre of Asia trade",
    summary:
      "Japan's slow exit from ultra-loose policy continues to drive USD/JPY, exporter earnings and regional risk appetite.",
    body: [
      "The Bank of Japan's gradual policy normalisation has made the rate differential with the United States the dominant driver of USD/JPY, and by extension of Japanese exporter earnings.",
      "A weaker yen flatters Nikkei constituents that sell abroad while squeezing importers and household purchasing power — a tension the government has repeatedly acknowledged.",
      "Traders watch BoJ statements, Japanese wage data and any Ministry of Finance intervention language for turning points.",
    ],
    market: "asia-pacific",
    topic: "Central banks",
    source: "Bank of Japan — monetary policy releases",
    sourceUrl: "https://www.boj.or.jp/en/mopo/mpmdeci/index.htm",
    published: "2026-08-29",
    trending: true,
  },
  {
    slug: "china-stimulus-property-drag",
    title: "China stimulus measures meet a persistent property drag",
    summary:
      "Targeted support has stabilised parts of the market, but property investment and consumer confidence remain the binding constraints.",
    body: [
      "Chinese policymakers have leaned on targeted measures — lending facilities, mortgage rules and local government support — rather than a single large stimulus package.",
      "Property investment remains the clearest drag on growth, and it feeds through to commodity demand, particularly iron ore and copper.",
      "The Hang Seng and CSI 300 have both traded on the credibility of follow-through rather than on announcement headlines alone.",
    ],
    market: "asia-pacific",
    topic: "Macro",
    source: "National Bureau of Statistics of China",
    sourceUrl: "https://www.stats.gov.cn/english/",
    published: "2026-08-27",
  },
  {
    slug: "opec-supply-decisions-oil-range",
    title: "OPEC+ supply decisions keep crude locked in a tense range",
    summary:
      "Voluntary production restraint is offsetting soft demand growth, leaving oil sensitive to any supply disruption headline.",
    body: [
      "OPEC+ output policy continues to set the floor under crude, while demand growth expectations — especially from China — cap the upside.",
      "With spare capacity concentrated in a few producers, geopolitical disruption headlines produce sharp but often short-lived spikes.",
      "Refining margins and inventory data from the EIA remain the highest-frequency read on physical tightness.",
    ],
    market: "commodities",
    topic: "Energy",
    source: "U.S. Energy Information Administration",
    sourceUrl: "https://www.eia.gov/petroleum/weekly/",
    published: "2026-08-30",
    breaking: true,
  },
  {
    slug: "gold-central-bank-buying",
    title: "Central bank buying underpins gold demand",
    summary:
      "Official-sector purchases have become a structural source of gold demand alongside the traditional rates-and-dollar drivers.",
    body: [
      "Central banks have been persistent net buyers of gold in recent years, adding a demand source that is far less sensitive to real interest rates than ETF flows.",
      "That has weakened the historically tight inverse relationship between gold and real yields, though a stronger dollar still weighs on the metal.",
      "The World Gold Council's quarterly demand trends report is the standard reference for official-sector flows.",
    ],
    market: "commodities",
    topic: "Metals",
    source: "World Gold Council — Gold Demand Trends",
    sourceUrl: "https://www.gold.org/goldhub/research/gold-demand-trends",
    published: "2026-08-26",
  },
  {
    slug: "dollar-index-rate-differentials",
    title: "Dollar direction still set by rate differentials, not deficits",
    summary:
      "Short-term interest rate spreads continue to explain most of the dollar's moves against major peers.",
    body: [
      "Despite persistent debate about fiscal deficits and reserve diversification, two-year rate differentials remain the best short-horizon explanation of dollar moves against the euro and yen.",
      "Emerging-market currencies are more sensitive to dollar funding conditions and commodity terms of trade than to their own policy rates alone.",
      "BIS and central bank data remain the reference points for turnover and reserve composition.",
    ],
    market: "currencies",
    topic: "FX",
    source: "Bank for International Settlements",
    sourceUrl: "https://www.bis.org/statistics/index.htm",
    published: "2026-08-28",
  },
  {
    slug: "sovereign-yield-curves-term-premium",
    title: "Term premium returns to sovereign bond pricing",
    summary:
      "Heavier issuance and reduced central bank balance sheets are restoring compensation for duration risk.",
    body: [
      "As central banks let balance sheets run down, private investors are absorbing more government issuance, and long-dated yields carry more visible term premium.",
      "That reshapes curve dynamics: long yields can rise even when policy rate expectations fall.",
      "Debt management office issuance calendars have become market-moving events in their own right.",
    ],
    market: "currencies",
    topic: "Rates",
    source: "OECD — sovereign borrowing outlook",
    sourceUrl: "https://www.oecd.org/finance/global-debt-report/",
    published: "2026-08-25",
  },
  {
    slug: "bitcoin-etf-flows-market-structure",
    title: "Spot ETF flows reshape bitcoin market structure",
    summary:
      "Regulated fund flows have become the cleanest daily read on institutional digital asset demand.",
    body: [
      "Spot bitcoin exchange-traded products have channelled institutional demand through regulated venues, and daily creation and redemption data now serve as a demand indicator that did not exist in earlier cycles.",
      "Flow persistence, rather than any single day's number, has mapped most closely to sustained price trends.",
      "Issuer disclosures and exchange filings remain the primary sources for these figures.",
    ],
    market: "crypto",
    topic: "Digital assets",
    source: "Issuer daily disclosures — SEC EDGAR",
    sourceUrl: "https://www.sec.gov/edgar/search/",
    published: "2026-08-30",
    trending: true,
  },
  {
    slug: "stablecoin-regulation-payments",
    title: "Stablecoin rules pull digital assets closer to payments regulation",
    summary:
      "Reserve, redemption and disclosure requirements are converging across major jurisdictions.",
    body: [
      "Regulatory frameworks in the EU, UK, Singapore and the United States increasingly treat payment stablecoins as a payments and reserve-backing question rather than a securities question.",
      "Common threads are high-quality liquid reserves, redemption at par, and regular attestation or audit disclosure.",
      "For banks and card networks, the practical impact is settlement infrastructure rather than speculative trading.",
    ],
    market: "crypto",
    topic: "Regulation",
    source: "European Commission — MiCA regulation",
    sourceUrl: "https://finance.ec.europa.eu/digital-finance/crypto-assets_en",
    published: "2026-08-24",
  },
];

export const sortedArticles = [...articles].sort((a, b) =>
  b.published.localeCompare(a.published),
);

export const getMarket = (slug: string) => markets.find((m) => m.slug === slug);

export const articlesByMarket = (slug: MarketSlug) =>
  sortedArticles.filter((a) => a.market === slug);

export const trendingArticles = sortedArticles.filter((a) => a.trending);

export const breakingArticles = sortedArticles.filter((a) => a.breaking);

export const getArticle = (slug: string) =>
  articles.find((a) => a.slug === slug);

export const marketName = (slug: MarketSlug) =>
  markets.find((m) => m.slug === slug)?.shortName ?? slug;

export const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });

export const lastUpdated = sortedArticles[0]?.published ?? "";
