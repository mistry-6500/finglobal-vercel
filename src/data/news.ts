/**
 * FinWorldNews editorial library.
 *
 * Every article here is written by the FinWorldNews markets desk: reported
 * facts are separated from analysis, sources are named in the text and listed
 * at the foot of each piece, and no article is a rewrite of a single source.
 *
 * To publish: add an entry to `articles`. It appears automatically on the home
 * page, its market desk, the archive and the structured data. Keep `published`
 * and `updated` in ISO date form and keep the source list honest.
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
  context: string[];
  benchmarks: { name: string; note: string }[];
}

export interface Section {
  heading: string;
  paragraphs: string[];
}

export interface Source {
  name: string;
  url: string;
}

export interface Article {
  slug: string;
  title: string;
  standfirst: string;
  summary: string;
  market: MarketSlug;
  topic: string;
  tags: string[];
  author: string;
  published: string;
  updated: string;
  readingMinutes: number;
  takeaways: string[];
  sections: Section[];
  analysis: string[];
  faqs: { q: string; a: string }[];
  sources: Source[];
  featured?: boolean;
}

export const SITE = {
  name: "FinWorldNews",
  tagline: "Breaking global financial news",
  description:
    "FinWorldNews explains what is moving global markets — US, European, Asia-Pacific, commodity, currency and digital asset — with original reporting, named sources and analysis kept separate from fact.",
  editorialPolicy:
    "We do not republish wire copy. Each article is researched across multiple primary sources — central bank statements, regulator and exchange filings, statistical agencies and established financial media — then written from scratch by our desk. Reported facts, source claims and our own interpretation are labelled separately, and every piece lists the sources a reader can check.",
  desk: "FinWorldNews Markets Desk",
  contact: "editorial@finworldnews.example",
} as const;

export const markets: Market[] = [
  {
    slug: "united-states",
    name: "United States Markets",
    shortName: "US",
    region: "North America",
    tagline: "Wall Street, the Federal Reserve and the US earnings cycle.",
    description:
      "How Federal Reserve policy, Treasury yields and corporate results move the S&P 500, Nasdaq and Dow — with the mechanics behind each move explained rather than asserted.",
    context: [
      "The United States is the reference market for global risk pricing. The federal funds rate sets the cost of the world's most-used funding currency, and the Treasury curve is the discount rate against which almost every other asset is measured.",
      "That is why a US inflation print can move Tokyo and Frankfurt before those markets open, and why our US desk coverage focuses on the transmission channel — rates to discount rates to valuations — rather than on the index level alone.",
    ],
    benchmarks: [
      { name: "S&P 500", note: "Broad large-cap benchmark; heavily concentrated in its largest members" },
      { name: "Nasdaq Composite", note: "Technology-weighted, so unusually sensitive to long-term rates" },
      { name: "US 10-year Treasury", note: "The global risk-free anchor for discounting future cash flows" },
    ],
  },
  {
    slug: "europe",
    name: "European Markets",
    shortName: "Europe",
    region: "EMEA",
    tagline: "ECB and Bank of England policy, and what actually drives European indices.",
    description:
      "European equity, bond and policy coverage: the ECB and Bank of England, the STOXX 600, DAX, CAC 40 and FTSE 100, and the gap between index performance and the domestic economy.",
    context: [
      "Europe's headline indices are less domestic than they look. The FTSE 100 and DAX are dominated by companies earning most of their revenue outside their home market, so currency translation and global demand often matter more than local GDP.",
      "Monetary policy is also split: the euro area shares one central bank across very different economies, while the United Kingdom and Switzerland run their own cycles. Our Europe coverage keeps those distinctions explicit.",
    ],
    benchmarks: [
      { name: "STOXX Europe 600", note: "The broadest pan-European equity gauge" },
      { name: "DAX", note: "German blue chips, weighted toward industry and exporters" },
      { name: "FTSE 100", note: "UK-listed but largely foreign-earning; a currency trade as much as an equity one" },
    ],
  },
  {
    slug: "asia-pacific",
    name: "Asia-Pacific Markets",
    shortName: "Asia-Pacific",
    region: "APAC",
    tagline: "Tokyo, Shanghai, Hong Kong, Mumbai and Sydney, on their own terms.",
    description:
      "Asia-Pacific coverage of the Nikkei 225, Hang Seng, CSI 300, Nifty 50 and ASX 200, plus Bank of Japan and People's Bank of China policy and the region's very different market structures.",
    context: [
      "Asia-Pacific is not one market. Japan trades on the yen and on corporate governance reform; mainland China on policy credibility and the property cycle; India on domestic flows and earnings growth; Australia on commodity demand.",
      "Grouping them under one 'Asia' headline is the most common error in market commentary, and our desk avoids it by naming the specific driver in each piece.",
    ],
    benchmarks: [
      { name: "Nikkei 225", note: "Price-weighted, so a few high-priced stocks dominate its moves" },
      { name: "Hang Seng", note: "Hong Kong-listed, with heavy mainland China exposure" },
      { name: "Nifty 50", note: "Indian large caps, increasingly driven by domestic institutional flows" },
    ],
  },
  {
    slug: "commodities",
    name: "Commodities",
    shortName: "Commodities",
    region: "Global",
    tagline: "Crude, gas, gold and the metals that price industrial demand.",
    description:
      "Commodity coverage grounded in physical supply and demand: Brent and WTI crude, natural gas, gold and silver, industrial metals and grains, plus OPEC+ policy and inventory data.",
    context: [
      "Commodities are the one asset class where the physical market disciplines the financial one. Inventories, spare capacity, freight and refining margins eventually override sentiment.",
      "Our commodities coverage therefore leans on published inventory and production data rather than price commentary, and says plainly when a move is positioning rather than fundamentals.",
    ],
    benchmarks: [
      { name: "Brent crude", note: "The seaborne pricing benchmark for roughly two thirds of traded oil" },
      { name: "Gold", note: "Reserve asset; driven by real yields, the dollar and official-sector buying" },
      { name: "Copper", note: "The clearest single read on global industrial and grid demand" },
    ],
  },
  {
    slug: "currencies",
    name: "Currencies & Rates",
    shortName: "FX & Rates",
    region: "Global",
    tagline: "The dollar, rate differentials and sovereign curves.",
    description:
      "Foreign exchange and fixed income coverage: the dollar index, EUR/USD, USD/JPY, emerging-market currencies, sovereign yield curves and the funding conditions that connect them.",
    context: [
      "Foreign exchange is the largest market in the world by turnover and the least covered by headline financial media, because it rarely produces a single dramatic number.",
      "It is also where policy divergence shows up first: currencies move on the difference between two central banks, not on either one alone.",
    ],
    benchmarks: [
      { name: "US Dollar Index", note: "The dollar against a fixed basket of developed-market peers" },
      { name: "EUR/USD", note: "The highest-turnover pair; a direct read on ECB-versus-Fed expectations" },
      { name: "USD/JPY", note: "The most rate-differential-sensitive of the major pairs" },
    ],
  },
  {
    slug: "crypto",
    name: "Crypto Markets",
    shortName: "Crypto",
    region: "Global",
    tagline: "Digital assets as a regulated market, not a slogan.",
    description:
      "Digital asset coverage focused on verifiable structure: regulated fund flows, stablecoin rules, exchange and custody arrangements, and how each interacts with traditional finance.",
    context: [
      "Digital asset coverage suffers from a shortage of checkable facts and a surplus of price talk. We concentrate on the parts that are documented: fund disclosures, regulatory texts and exchange filings.",
      "We do not publish price predictions, token promotions or unattributed on-chain claims.",
    ],
    benchmarks: [
      { name: "Bitcoin", note: "Largest digital asset by market value; the reference for the class" },
      { name: "Ether", note: "The main smart-contract network asset" },
      { name: "Regulated fund flows", note: "The most auditable proxy for institutional demand" },
    ],
  },
];

export const articles: Article[] = [
  {
    slug: "how-fed-decisions-move-global-markets",
    title: "How a single Federal Reserve sentence reprices markets on four continents",
    standfirst:
      "The FOMC statement is eight paragraphs long. Understanding which clause matters — and why it moves Frankfurt and Tokyo before they open — is most of what separates useful market coverage from noise.",
    summary:
      "A guide to reading Federal Reserve communication: what actually moves in the statement, how the transmission runs from the funds rate to global equity valuations, and which parts of the reaction are mechanical rather than emotional.",
    market: "united-states",
    topic: "Central banks",
    tags: ["Federal Reserve", "interest rates", "monetary policy", "equities"],
    author: SITE.desk,
    published: "2026-08-31",
    updated: "2026-09-02",
    readingMinutes: 8,
    featured: true,
    takeaways: [
      "The federal funds rate sets the price of short-term dollars, which is the input to nearly every global discount rate.",
      "Markets trade the change in the statement's language and the projections, not the rate decision that was already priced.",
      "Long-duration equities react most because more of their value sits in distant cash flows.",
      "A 'hawkish cut' or 'dovish hold' is not a contradiction: the level and the path are two separate signals.",
    ],
    sections: [
      {
        heading: "What the Fed actually publishes, and in what order",
        paragraphs: [
          "A Federal Open Market Committee meeting produces three distinct artefacts, and they arrive at different moments. First comes the policy statement, a short document whose wording is deliberately incremental; second, at quarterly meetings, the Summary of Economic Projections, including the interest rate 'dot plot'; third, the chair's press conference roughly half an hour later. The Federal Reserve publishes all three, along with minutes three weeks afterwards.",
          "Traders react to each separately. The statement is machine-readable and moves prices within milliseconds, largely on the diff against the previous version. The projections reset the medium-term path. The press conference frequently reverses part of the initial move, because the chair is asked to explain trade-offs the statement leaves implicit.",
          "This sequencing explains a pattern that confuses casual observers: an initial sharp move that fades or inverts within an hour. It is not indecision. It is three different information releases being priced in turn.",
        ],
      },
      {
        heading: "The transmission chain, step by step",
        paragraphs: [
          "The funds rate is an overnight rate on reserves between banks. On its own it is almost irrelevant to a pension fund in Amsterdam. It matters because it anchors the front end of the Treasury curve, and the Treasury curve is the benchmark against which the world discounts future cash flows.",
          "From there the chain is mechanical. Short-term Treasury yields reprice against the expected policy path. Longer yields reprice against the average of expected short rates plus a term premium. Equity valuations are a function of those yields, because a share price is the present value of future earnings. Currencies move on the gap between US rates and everyone else's. Emerging-market borrowers feel it through dollar funding costs.",
          "That is why an inflation surprise in the United States moves Japanese and European equity futures before those cash markets open. Nothing changed in Osaka or Milan; the discount rate applied to their earnings did.",
        ],
      },
      {
        heading: "Why technology and small caps move most",
        paragraphs: [
          "Two groups of stocks consistently show the largest reaction to rate expectations, for opposite reasons. High-growth technology companies are long-duration assets: the bulk of their expected earnings sits years ahead, so a change in the discount rate has an outsized effect on present value. Small caps are sensitive because they carry more floating-rate debt and refinance more frequently than large caps.",
          "This is arithmetic rather than sentiment, and it is checkable. The pattern shows up in index construction: the Nasdaq Composite's technology weighting makes it a leveraged expression of the rates view, which is why it and the Russell 2000 can move in the same direction on a rate surprise despite having almost nothing else in common.",
        ],
      },
      {
        heading: "Reading 'hawkish' and 'dovish' correctly",
        paragraphs: [
          "The labels describe direction of surprise relative to what was priced, not the absolute policy setting. A cut delivered alongside projections showing fewer cuts ahead is a hawkish cut, and bond yields can rise on it. A hold accompanied by softer language about the labour market is a dovish hold, and yields can fall.",
          "The practical test is simple: compare the outcome with the rate futures curve immediately before the release. If a decision is fully priced, the decision itself contains no information. Everything tradeable is in the path.",
        ],
      },
    ],
    analysis: [
      "Our view: the most common analytical error in Fed coverage is treating the decision as the news. In liquid markets the decision is usually priced days ahead; the information is in the projections and in the conditionality the chair attaches to them.",
      "We would also caution against reading a single meeting as a regime change. The committee moves in increments and states explicitly that it is data-dependent, which means the reaction function — not the individual decision — is what a long-term investor should be tracking.",
    ],
    faqs: [
      {
        q: "How often does the FOMC meet?",
        a: "Eight scheduled meetings a year, with the calendar published in advance by the Federal Reserve. Four of those include the Summary of Economic Projections.",
      },
      {
        q: "Why do markets sometimes fall when the Fed cuts rates?",
        a: "Because a cut can signal that the committee sees economic weakness, and because the cut itself may already be priced. If the accompanying projections show a shallower path than markets expected, the net message is tighter than anticipated.",
      },
      {
        q: "What is the dot plot?",
        a: "An anonymised chart of each participant's projection for the appropriate policy rate at future year-ends. It is a projection, not a commitment, and the Fed says so explicitly.",
      },
    ],
    sources: [
      { name: "Federal Reserve — FOMC calendars and statements", url: "https://www.federalreserve.gov/monetarypolicy/fomccalendars.htm" },
      { name: "Federal Reserve — Summary of Economic Projections", url: "https://www.federalreserve.gov/monetarypolicy/fomcprojtabl20250618.htm" },
      { name: "US Treasury — daily yield curve rates", url: "https://home.treasury.gov/resource-center/data-chart-center/interest-rates" },
    ],
  },
  {
    slug: "ai-capital-spending-and-index-concentration",
    title: "AI capital spending has made the S&P 500 a concentrated bet — here is the arithmetic",
    standfirst:
      "A handful of companies now drive both the index's earnings growth and its capital expenditure. That changes what 'buying the market' means for an ordinary investor.",
    summary:
      "An explanation of how index concentration works, why AI-driven capital spending is judged by cloud revenue conversion, and what the concentration means in practical terms for diversified portfolios.",
    market: "united-states",
    topic: "Equities",
    tags: ["technology", "capital expenditure", "index concentration", "earnings"],
    author: SITE.desk,
    published: "2026-08-30",
    updated: "2026-09-01",
    readingMinutes: 7,
    takeaways: [
      "Market-cap weighting means the largest members contribute most of the index's move, regardless of how many companies it contains.",
      "The market judges AI capital spending on whether cloud and services revenue accelerates alongside it.",
      "Depreciation from today's data-centre spending lands in future income statements, which is why guidance matters more than the headline capex number.",
      "Equal-weighted versions of the same index give a cleaner read on the median company.",
    ],
    sections: [
      {
        heading: "Concentration is a weighting outcome, not a conspiracy",
        paragraphs: [
          "The S&P 500 is weighted by float-adjusted market capitalisation. A company worth ten times another contributes roughly ten times as much to the index's daily move. When the largest members are unusually large relative to the rest, the index becomes a proxy for those members.",
          "This is visible without any private data: index providers publish constituent weights, and the divergence between the standard index and its equal-weighted counterpart is a direct measure of how much of the performance is coming from the top. When the cap-weighted index outperforms the equal-weighted version materially over a period, breadth is narrow.",
        ],
      },
      {
        heading: "What investors are actually testing when capex rises",
        paragraphs: [
          "Cloud providers have been guiding capital expenditure sharply higher to build data-centre capacity. In accounting terms, that spending leaves the cash flow statement now and returns as depreciation across several future years. The question the market asks each quarter is whether revenue growth is accelerating fast enough to justify that future charge.",
          "As CNBC and other outlets covering earnings season have repeatedly noted, the market's reaction has been dispersed: companies pairing higher capex with visibly accelerating cloud revenue have been treated differently from those raising budgets without a corresponding demand signal. The distinction is not sentiment — it is the difference between spending that is demand-led and spending that is speculative.",
          "The primary documents are the quarterly filings themselves, available through the SEC's EDGAR system, where capital expenditure, depreciation schedules and segment revenue are disclosed in full rather than summarised.",
        ],
      },
      {
        heading: "What it means for a diversified portfolio",
        paragraphs: [
          "For an index investor, concentration changes the risk profile without changing the ticker. A portfolio labelled 'diversified across 500 companies' can behave like a portfolio with a large single-sector position, because the weights say so.",
          "Practical responses exist and are unglamorous: examine the top-ten weight of any index fund held, compare the cap-weighted and equal-weighted return over several periods, and check whether other holdings duplicate the same names. None of this requires a market call.",
        ],
      },
    ],
    analysis: [
      "Our view: the capex debate is often framed as a bubble question, but the more useful frame is a timing question. The spending is real and documented; the uncertainty is over how quickly it converts to revenue and how the depreciation profile hits margins two to four years out.",
      "We would treat any single quarter's capex headline as weak evidence. The signal accumulates across several quarters of segment revenue disclosure, which is why we point readers to filings rather than to earnings-day headlines.",
    ],
    faqs: [
      {
        q: "Where can I check index concentration myself?",
        a: "Index providers and large ETF issuers publish full holdings and weights daily. Comparing the fund's top-ten weight over time is the simplest measure.",
      },
      {
        q: "Does high capital spending automatically hurt earnings?",
        a: "Not immediately. Capital spending is capitalised and depreciated over the asset's useful life, so it affects future operating expense rather than the current period's profit in full.",
      },
      {
        q: "Is an equal-weighted index better?",
        a: "It is different, not better. It reduces single-name concentration but increases exposure to smaller companies and requires more frequent rebalancing, which has its own costs.",
      },
    ],
    sources: [
      { name: "SEC EDGAR — company filings full-text search", url: "https://www.sec.gov/edgar/search/" },
      { name: "S&P Dow Jones Indices — index methodology", url: "https://www.spglobal.com/spdji/en/documents/methodologies/methodology-sp-us-indices.pdf" },
      { name: "CNBC — markets and earnings coverage", url: "https://www.cnbc.com/markets/" },
    ],
  },
  {
    slug: "ecb-services-inflation-and-the-euro-area",
    title: "Why euro-area inflation fell fast and then stopped: the services problem",
    standfirst:
      "Goods disinflation was largely imported and largely finished. Services inflation is domestic, wage-driven and slower — and it is what keeps the ECB cautious.",
    summary:
      "A breakdown of the two very different components of euro-area inflation, why the ECB treats services as the binding constraint, and which Eurostat releases actually move the rates market.",
    market: "europe",
    topic: "Central banks",
    tags: ["ECB", "inflation", "euro area", "monetary policy"],
    author: SITE.desk,
    published: "2026-08-29",
    updated: "2026-08-31",
    readingMinutes: 7,
    takeaways: [
      "Headline euro-area inflation fell mainly because energy and goods prices normalised after a supply shock.",
      "Services inflation tracks wages, which adjust annually and slowly, so it decelerates later in the cycle.",
      "The ECB publishes its reaction function in plain terms: it is meeting-by-meeting and data-dependent.",
      "Eurostat's flash estimate and the ECB staff projections are the two scheduled events that reprice the curve most reliably.",
    ],
    sections: [
      {
        heading: "Two inflations wearing one number",
        paragraphs: [
          "The euro area's Harmonised Index of Consumer Prices bundles together items with completely different dynamics. Energy and traded goods respond to global supply conditions, shipping costs and the exchange rate; they can fall as quickly as they rose. Services — rent, insurance, hospitality, healthcare, education — are dominated by domestic labour costs.",
          "That composition explains the shape of the disinflation. When energy base effects dropped out and supply chains normalised, headline inflation fell sharply. The services component did not, because it moves with negotiated wages that reset on annual or multi-year cycles.",
          "Eurostat publishes the breakdown by component with every flash and final estimate, so this is a matter of public record rather than interpretation.",
        ],
      },
      {
        heading: "What the ECB has said about its own reaction function",
        paragraphs: [
          "The European Central Bank has described its approach as data-dependent and decided meeting by meeting, based on the inflation outlook, the dynamics of underlying inflation, and the strength of monetary policy transmission. Those three criteria appear repeatedly in its published decisions.",
          "Read literally, that framing tells markets what to watch: not the headline rate alone, but measures of underlying inflation and evidence about how far past rate changes have reached the real economy through bank lending. The ECB's own bank lending survey is part of that evidence base.",
        ],
      },
      {
        heading: "How this shows up in prices",
        paragraphs: [
          "Bund yields and the euro trade primarily on the gap between euro-area and US policy expectations rather than on euro-area data alone. A softer euro-area print with an equally soft US print may leave the exchange rate unchanged while moving both bond markets.",
          "For equity investors, the transmission runs through bank margins, real estate valuations and the discount rate applied to long-duration earnings — the same mechanics as in the United States, applied to a slower policy cycle.",
        ],
      },
    ],
    analysis: [
      "Our view: the 'last mile' framing that dominates commentary is imprecise. The remaining inflation is not a stubborn residue of the same shock; it is a structurally different, wage-driven component that was always going to decelerate on a different timetable.",
      "We think the more informative release for readers is the wage tracker and negotiated pay data rather than the monthly headline, because that is the variable the services component follows.",
    ],
    faqs: [
      {
        q: "What is the ECB's inflation target?",
        a: "A symmetric two percent target over the medium term, as set out in its published monetary policy strategy.",
      },
      {
        q: "Why does the ECB not simply cut faster?",
        a: "Its stated concern is that easing before underlying inflation is durably contained risks a second wave, which historically has proved more costly to unwind than a delay.",
      },
      {
        q: "Does the ECB set rates for the whole EU?",
        a: "No. It sets policy for the euro area only. Non-euro EU members such as Poland and Sweden run their own central banks and cycles.",
      },
    ],
    sources: [
      { name: "European Central Bank — monetary policy decisions", url: "https://www.ecb.europa.eu/press/pr/date/html/index.en.html" },
      { name: "Eurostat — HICP inflation releases", url: "https://ec.europa.eu/eurostat/web/hicp" },
      { name: "ECB — euro area bank lending survey", url: "https://www.ecb.europa.eu/stats/ecb_surveys/bank_lending_survey/html/index.en.html" },
    ],
  },
  {
    slug: "ftse-100-is-a-currency-trade",
    title: "The FTSE 100 is not a bet on Britain — and the revenue split proves it",
    standfirst:
      "A majority of FTSE 100 revenue is earned outside the United Kingdom. That single fact resolves most of the confusion about why the index rises on bad domestic news.",
    summary:
      "Why the UK's flagship index behaves like a global commodity and pharmaceutical basket priced in sterling, how the FTSE 250 differs, and what to watch instead for a read on the domestic economy.",
    market: "europe",
    topic: "Equities",
    tags: ["FTSE 100", "United Kingdom", "sterling", "Bank of England"],
    author: SITE.desk,
    published: "2026-08-28",
    updated: "2026-08-30",
    readingMinutes: 6,
    takeaways: [
      "Most FTSE 100 revenue is generated abroad, so a weaker pound mechanically raises reported earnings.",
      "The index is concentrated in energy, mining, pharmaceuticals and financials rather than domestic consumer businesses.",
      "The FTSE 250 is the better — though still imperfect — proxy for the UK domestic economy.",
      "Bank of England decisions move gilts and the mid-cap index more visibly than they move the FTSE 100.",
    ],
    sections: [
      {
        heading: "Where the revenue comes from",
        paragraphs: [
          "The FTSE 100's largest constituents are multinational energy, mining, pharmaceutical, consumer goods and banking groups whose customers are worldwide. Their accounts are reported in sterling but earned substantially in dollars and other currencies.",
          "The translation effect is arithmetic: if the pound weakens against the dollar, a dollar of profit converts into more sterling, lifting reported earnings and, other things equal, the share price. No improvement in the underlying business is required.",
        ],
      },
      {
        heading: "Why the index can rise on weak UK data",
        paragraphs: [
          "Weak domestic data often weakens sterling, particularly when it raises the probability of Bank of England rate cuts. A weaker pound flatters the translated earnings of the index's foreign-earning majority. The result is the counterintuitive headline: gloomy UK news, higher FTSE 100.",
          "The FTSE 250, which contains more domestically focused mid-cap companies, typically does not enjoy that offset and behaves closer to the way most readers expect a national index to behave.",
        ],
      },
      {
        heading: "What to watch for the domestic picture",
        paragraphs: [
          "For the UK economy itself, the Office for National Statistics releases on GDP, labour market and CPI are the primary evidence, and the Bank of England's Monetary Policy Report sets out the central bank's own reading.",
          "Gilt yields are the cleanest market-based read on domestic policy expectations, because they are not muddied by the currency-translation effect that dominates large-cap equities.",
        ],
      },
    ],
    analysis: [
      "Our view: the routine framing of the FTSE 100 as a barometer of British economic health is simply a category error, and it distorts public debate about market performance.",
      "For readers wanting UK exposure rather than global exposure denominated in sterling, the composition of the mid-cap index is the more honest starting point — with the caveat that it carries higher volatility and more domestic cyclical risk.",
    ],
    faqs: [
      {
        q: "Does a weak pound always help the FTSE 100?",
        a: "It helps translated earnings, but a currency fall driven by a genuine domestic crisis can hit financials and domestically exposed members enough to offset that.",
      },
      {
        q: "What is the difference between the FTSE 100 and FTSE All-Share?",
        a: "The All-Share is broader, covering the vast majority of UK-listed market value, including mid and small caps, so it is somewhat less dominated by the largest multinationals.",
      },
      {
        q: "Where can I check a company's revenue split?",
        a: "In the geographic segment note of its annual report, which UK-listed companies are required to publish.",
      },
    ],
    sources: [
      { name: "Bank of England — monetary policy summary and minutes", url: "https://www.bankofengland.co.uk/monetary-policy-summary-and-minutes" },
      { name: "Office for National Statistics — economy", url: "https://www.ons.gov.uk/economy" },
      { name: "FTSE Russell — index ground rules", url: "https://www.lseg.com/en/ftse-russell/indices" },
    ],
  },
  {
    slug: "bank-of-japan-yen-and-the-carry-trade",
    title: "The yen, the carry trade and why Tokyo's policy is a global story",
    standfirst:
      "Japan spent decades as the world's cheapest funding currency. Unwinding that position is a slow process with occasional violent moments.",
    summary:
      "How the yen carry trade works, why Bank of Japan normalisation transmits into global risk assets, and which Japanese releases matter beyond the policy statement itself.",
    market: "asia-pacific",
    topic: "Central banks",
    tags: ["Bank of Japan", "yen", "carry trade", "Nikkei"],
    author: SITE.desk,
    published: "2026-08-29",
    updated: "2026-08-31",
    readingMinutes: 7,
    takeaways: [
      "A carry trade borrows in a low-rate currency to invest in higher-yielding assets; the yen was the classic funding leg.",
      "Narrowing rate differentials make that trade less profitable and can force rapid unwinds.",
      "A weaker yen supports Japanese exporter earnings while squeezing importers and household purchasing power.",
      "Japanese wage settlements and Ministry of Finance intervention language matter as much as the policy rate itself.",
    ],
    sections: [
      {
        heading: "How the carry trade actually functions",
        paragraphs: [
          "The mechanics are simple. An investor borrows in a currency with very low interest rates, converts the proceeds, and buys assets yielding more elsewhere. The profit is the yield gap, and the risk is that the funding currency appreciates before the position is closed.",
          "Because Japan held rates near or below zero for an extended period, the yen became a standard funding currency for exactly this structure. The scale is not precisely measurable — much of it sits in derivatives and cross-border bank claims — but the Bank for International Settlements publishes the underlying banking and turnover statistics that make the pattern visible.",
        ],
      },
      {
        heading: "Why normalisation is disruptive",
        paragraphs: [
          "As the Bank of Japan moves away from ultra-loose settings and other central banks ease, the gap that made the trade profitable narrows from both ends. Positions that were funded cheaply become expensive, and a rapid yen appreciation can force simultaneous unwinds across unrelated markets.",
          "That is the mechanism behind episodes in which equity markets with no obvious link to Japan sell off together: the common factor is not the assets but the funding.",
        ],
      },
      {
        heading: "The domestic side of the same coin",
        paragraphs: [
          "Inside Japan, a weaker yen has distributional consequences. Exporters and companies with large overseas earnings benefit from translation, which supports the Nikkei's heavyweight industrials. Importers, small businesses and households face higher costs for energy and food.",
          "This tension is why Japanese officials comment on currency levels, and why the annual shunto wage negotiations have become a globally watched event: durable wage growth is the condition the Bank of Japan has linked to sustained policy normalisation.",
        ],
      },
    ],
    analysis: [
      "Our view: the carry trade is best understood as a leverage channel rather than a Japan story. Its unwinds hurt because they force selling in assets chosen for liquidity, not for fundamentals.",
      "We would treat any forecast of a precise unwind date with scepticism. The position size is not publicly measurable in real time, which means honest coverage should describe conditions and mechanisms rather than predict timing.",
    ],
    faqs: [
      {
        q: "Is the carry trade illegal or exotic?",
        a: "No. It is a standard, widely used financing strategy employed by hedge funds, corporates and asset managers.",
      },
      {
        q: "What is shunto?",
        a: "Japan's annual spring wage negotiation round between large employers and unions, which sets the tone for pay growth across the economy.",
      },
      {
        q: "Does the Bank of Japan control the exchange rate?",
        a: "No. Currency intervention in Japan is decided by the Ministry of Finance and executed by the Bank of Japan as its agent.",
      },
    ],
    sources: [
      { name: "Bank of Japan — monetary policy releases", url: "https://www.boj.or.jp/en/mopo/mpmdeci/index.htm" },
      { name: "Bank for International Settlements — statistics", url: "https://www.bis.org/statistics/index.htm" },
      { name: "Japan Ministry of Finance — foreign exchange operations", url: "https://www.mof.go.jp/english/policy/international_policy/reference/feio/index.html" },
    ],
  },
  {
    slug: "china-property-drag-and-commodity-demand",
    title: "China's property adjustment is a commodities story before it is an equities story",
    standfirst:
      "Construction consumes steel, copper and cement. That is why a domestic Chinese housing cycle shows up first in Australian iron ore and Chilean copper.",
    summary:
      "How China's property downturn transmits into global commodity demand, why targeted stimulus has produced uneven results, and which published data series track the adjustment.",
    market: "asia-pacific",
    topic: "Macro",
    tags: ["China", "property", "commodities", "stimulus"],
    author: SITE.desk,
    published: "2026-08-27",
    updated: "2026-08-30",
    readingMinutes: 7,
    takeaways: [
      "Property investment has been a large share of Chinese fixed asset investment, making it a major driver of metals demand.",
      "Policy has been targeted and incremental rather than a single large package.",
      "Commodity exporters — Australia, Brazil, Chile — feel the adjustment through export volumes and prices.",
      "The National Bureau of Statistics publishes monthly property investment and floor-space data that track the cycle directly.",
    ],
    sections: [
      {
        heading: "Why housing is a metals question",
        paragraphs: [
          "Residential construction is materials-intensive: steel for structure, copper for wiring, cement and glass for the building itself, and further copper and aluminium in the appliances that follow completion. When construction starts fall, that demand does not reappear elsewhere in the economy.",
          "Because China has accounted for a very large share of global consumption in several of these materials, a domestic slowdown there is a global price event. This is the clearest example in markets of a national policy decision setting a worldwide price.",
        ],
      },
      {
        heading: "What Chinese policy has actually done",
        paragraphs: [
          "Rather than a single headline stimulus, authorities have used a sequence of targeted measures: adjustments to mortgage rules and down-payment requirements, lending facilities aimed at completing pre-sold projects, and support channelled through local government financing.",
          "The market response has consistently depended on evidence of follow-through rather than on announcements. Coverage from established outlets and the statistics bureau's own monthly releases have repeatedly shown the gap between announced facilities and drawn funds.",
        ],
      },
      {
        heading: "Where to look for the turn",
        paragraphs: [
          "Three published series track the adjustment more usefully than equity index levels: monthly property investment growth, new floor space started, and residential sales by value. All are published by the National Bureau of Statistics.",
          "For the commodity leg, port inventories and steel mill utilisation give a higher-frequency read than quarterly GDP, and Australian and Brazilian export statistics confirm whether demand is genuinely absorbing supply.",
        ],
      },
    ],
    analysis: [
      "Our view: the recurring 'stimulus rally' pattern in Chinese equities reflects the difference between announcement and implementation. Sustained repricing has required visible transmission into construction activity, not fresh headlines.",
      "We are cautious about treating any single month of property data as a turning point, given seasonality around lunar new year and the frequency of methodology revisions.",
    ],
    faqs: [
      {
        q: "Which commodities are most exposed to Chinese construction?",
        a: "Iron ore and steel most directly, followed by copper, aluminium and cement inputs.",
      },
      {
        q: "Does the Hang Seng reflect the Chinese economy?",
        a: "Partially. It is a Hong Kong index with heavy mainland exposure but a distinct constituent mix and different investor base from mainland CSI indices.",
      },
      {
        q: "Where is Chinese property data published?",
        a: "The National Bureau of Statistics of China publishes monthly investment, floor-space and sales figures in English.",
      },
    ],
    sources: [
      { name: "National Bureau of Statistics of China", url: "https://www.stats.gov.cn/english/" },
      { name: "People's Bank of China — policy announcements", url: "http://www.pbc.gov.cn/en/3688110/index.html" },
      { name: "Reserve Bank of Australia — commodity price index", url: "https://www.rba.gov.au/statistics/frequency/commodity-prices.html" },
    ],
  },
  {
    slug: "opec-spare-capacity-and-the-oil-range",
    title: "Spare capacity, not sentiment, sets the floor under crude",
    standfirst:
      "Oil trades in a range for a reason. Understanding who holds unused production capacity explains both the floor and why disruption spikes fade.",
    summary:
      "A working explanation of OPEC+ production policy, the role of spare capacity in damping geopolitical spikes, and the weekly data that shows whether the physical market is genuinely tight.",
    market: "commodities",
    topic: "Energy",
    tags: ["oil", "OPEC", "Brent", "energy"],
    author: SITE.desk,
    published: "2026-08-30",
    updated: "2026-09-01",
    readingMinutes: 7,
    takeaways: [
      "Voluntary production restraint by OPEC+ members effectively places a floor under prices while demand growth is soft.",
      "Spare capacity concentrated in a few producers means disruption spikes are often short-lived.",
      "Weekly US inventory and refinery data provide the highest-frequency read on physical tightness.",
      "Refining margins, not crude alone, determine what consumers pay at the pump.",
    ],
    sections: [
      {
        heading: "How production policy sets a floor",
        paragraphs: [
          "OPEC and its partners coordinate output targets, and several members have added voluntary cuts on top. Withholding barrels supports price when demand growth is weak, and the group's published communiqués set out the targets meeting by meeting.",
          "The floor is not guaranteed. It holds only while compliance holds, and compliance historically weakens when prices stay high enough to tempt individual members into producing above quota.",
        ],
      },
      {
        heading: "Why geopolitical spikes fade",
        paragraphs: [
          "When a supply disruption headline hits, prices jump because traders price the possibility of lost barrels. Spare capacity — production that can be brought online quickly — is what determines whether that loss is actually felt.",
          "Because meaningful spare capacity sits with a small number of producers, the market's central assumption in recent years has been that most disruptions can be covered. That assumption compresses the duration of spikes, and it reverses sharply if spare capacity is itself threatened.",
        ],
      },
      {
        heading: "The data that settles the argument",
        paragraphs: [
          "The US Energy Information Administration publishes weekly petroleum status data covering crude and product inventories, refinery utilisation and implied demand. It is the most timely public series on physical balances anywhere.",
          "The International Energy Agency and OPEC each publish monthly market reports with demand and supply estimates that frequently disagree, and that disagreement itself is informative: it maps the range of credible views on demand growth.",
        ],
      },
    ],
    analysis: [
      "Our view: coverage that attributes oil moves to a single headline usually misses the inventory picture underneath. A price spike into rising inventories is positioning; a modest rise into falling inventories is a genuine tightening.",
      "We think the more durable question for the next several years is refining capacity rather than crude supply, because product cracks have increasingly driven end-user prices even when crude was stable.",
    ],
    faqs: [
      {
        q: "What is the difference between Brent and WTI?",
        a: "Brent is a seaborne North Sea benchmark used for much of internationally traded crude; WTI is a US landlocked benchmark delivered at Cushing, Oklahoma. The spread reflects transport and regional balances.",
      },
      {
        q: "What is spare capacity?",
        a: "Production that can be brought online within a short period and sustained, typically measured in millions of barrels per day and concentrated among a few producers.",
      },
      {
        q: "Why do pump prices not always follow crude?",
        a: "Because refining margins, taxes and distribution costs sit between crude and retail fuel, and each can move independently.",
      },
    ],
    sources: [
      { name: "US Energy Information Administration — weekly petroleum status", url: "https://www.eia.gov/petroleum/weekly/" },
      { name: "International Energy Agency — oil market report", url: "https://www.iea.org/topics/oil-market-report" },
      { name: "OPEC — monthly oil market report", url: "https://www.opec.org/opec_web/en/publications/338.htm" },
    ],
  },
  {
    slug: "central-bank-gold-buying-changed-the-model",
    title: "Central bank buying has weakened gold's old relationship with real yields",
    standfirst:
      "For decades gold traded inversely to real interest rates. Persistent official-sector purchases have added a buyer that does not care about yield at all.",
    summary:
      "Why the traditional real-yield model for gold has become a weaker guide, how official-sector demand is measured, and what remains reliable in the price relationship.",
    market: "commodities",
    topic: "Metals",
    tags: ["gold", "central banks", "real yields", "reserves"],
    author: SITE.desk,
    published: "2026-08-26",
    updated: "2026-08-29",
    readingMinutes: 6,
    takeaways: [
      "Gold pays no income, so it historically weakened when inflation-adjusted bond yields rose.",
      "Central banks buy reserves for policy and diversification reasons, not for yield.",
      "That demand source is comparatively price-insensitive, which dampens the old inverse relationship.",
      "Dollar strength still weighs on gold, since it is priced in dollars globally.",
    ],
    sections: [
      {
        heading: "The model that used to work",
        paragraphs: [
          "Gold generates no coupon or dividend. Holding it therefore carries an opportunity cost equal to the real yield available on safe bonds. When real yields rise, that cost rises, and historically gold weakened. The relationship was strong enough that many desks modelled gold almost entirely off inflation-linked bond yields.",
          "Exchange-traded fund flows amplified the pattern, because ETF investors are precisely the buyers who weigh gold against bond alternatives.",
        ],
      },
      {
        heading: "What changed",
        paragraphs: [
          "Central banks have been substantial net buyers of gold in recent years, a trend documented in the World Gold Council's quarterly demand data and in IMF international reserves statistics. Their motivation is reserve diversification and policy resilience rather than expected return.",
          "A buyer indifferent to yield breaks the arbitrage that made the old model tight. It does not eliminate the real-yield effect, but it adds a persistent bid that can offset it for extended periods.",
        ],
      },
      {
        heading: "What still holds",
        paragraphs: [
          "Two relationships remain robust. Gold is priced in dollars, so a broadly stronger dollar makes it more expensive in other currencies and tends to weigh on demand. And physical demand from jewellery-heavy markets, principally India and China, remains seasonally and price-sensitive.",
          "For readers tracking this, the World Gold Council's demand trends report and IMF reserve tables are the two public sources that require no subscription.",
        ],
      },
    ],
    analysis: [
      "Our view: gold commentary that still quotes a single correlation coefficient against real yields is using a model with a structural break in it. The honest statement is that the relationship has become weaker and more variable, not that it has inverted.",
      "We would also note that official-sector purchases are reported with a lag and are sometimes revised, so real-time claims about central bank buying should be treated as provisional.",
    ],
    faqs: [
      {
        q: "What is a real yield?",
        a: "A bond yield adjusted for expected inflation, observable directly in inflation-linked government bonds such as US TIPS.",
      },
      {
        q: "Why do central banks hold gold at all?",
        a: "It is a reserve asset with no counterparty or default risk, which makes it useful for diversification away from any single currency.",
      },
      {
        q: "Is gold an inflation hedge?",
        a: "Over very long horizons it has broadly preserved purchasing power, but over periods of a few years it has frequently failed to track inflation closely.",
      },
    ],
    sources: [
      { name: "World Gold Council — Gold Demand Trends", url: "https://www.gold.org/goldhub/research/gold-demand-trends" },
      { name: "IMF — international reserves and foreign currency liquidity", url: "https://www.imf.org/en/Data" },
      { name: "US Treasury — TIPS and real yield curve", url: "https://home.treasury.gov/resource-center/data-chart-center/interest-rates" },
    ],
  },
  {
    slug: "what-actually-moves-the-dollar",
    title: "What actually moves the dollar: rate differentials, not deficits",
    standfirst:
      "Fiscal deficits and de-dollarisation headlines dominate the commentary. Over the horizons most people care about, short-term rate spreads explain far more.",
    summary:
      "A practical account of the drivers of the US dollar across different time horizons, why emerging-market currencies behave differently, and how to separate a dollar move from a counterpart move.",
    market: "currencies",
    topic: "FX",
    tags: ["US dollar", "foreign exchange", "rate differentials", "emerging markets"],
    author: SITE.desk,
    published: "2026-08-28",
    updated: "2026-08-31",
    readingMinutes: 6,
    takeaways: [
      "Over months, two-year rate differentials explain most dollar moves against major peers.",
      "Deficit and reserve-composition arguments operate over decades, not quarters.",
      "Emerging-market currencies react more to dollar funding conditions and commodity terms of trade.",
      "The dollar index measures the dollar against a fixed basket, so it can move because of the euro alone.",
    ],
    sections: [
      {
        heading: "Separating the horizons",
        paragraphs: [
          "Most disagreement about the dollar is really disagreement about time horizon. Structural arguments — twin deficits, reserve diversification, the share of trade invoiced in dollars — describe slow-moving forces that play out over many years and are genuinely uncertain.",
          "Over the horizon relevant to most investors and businesses, the dominant driver is far more prosaic: the expected path of US short-term interest rates relative to the equivalent path abroad. Currency is a relative price of two monetary policies.",
        ],
      },
      {
        heading: "Why the index can mislead",
        paragraphs: [
          "The US Dollar Index is heavily weighted toward the euro. A euro-specific event — a European Central Bank surprise, say — can move the index substantially without any change in the dollar's standing against Asian or emerging-market currencies.",
          "Reading a dollar move correctly therefore requires checking the counterpart. Trade-weighted measures published by the Federal Reserve give a broader picture than the traded index does.",
        ],
      },
      {
        heading: "Emerging markets follow a different rule",
        paragraphs: [
          "For emerging-market currencies, global dollar funding conditions and the country's commodity terms of trade often matter more than its own policy rate. A commodity exporter can see its currency strengthen despite domestic rate cuts if export prices rise.",
          "The Bank for International Settlements publishes the turnover and cross-border banking statistics that make these funding channels visible; they are the standard reference for market size and structure.",
        ],
      },
    ],
    analysis: [
      "Our view: 'the end of the dollar' framing recurs in every cycle of dollar weakness and has consistently been a poor guide to positioning. The measurable share of dollar invoicing and reserve holdings changes very slowly.",
      "That said, we would not dismiss the structural argument entirely — payment infrastructure and bilateral settlement arrangements are changing. The distinction we draw is between a slow structural shift and a tradeable trend.",
    ],
    faqs: [
      {
        q: "What is a rate differential?",
        a: "The gap between expected interest rates in two currencies, usually measured with two-year government yields or interest rate swaps.",
      },
      {
        q: "Does a strong dollar help or hurt US companies?",
        a: "It reduces the translated value of foreign earnings for US multinationals and makes exports less competitive, while lowering the cost of imports.",
      },
      {
        q: "Why does a strong dollar strain emerging markets?",
        a: "Because many borrowers there have dollar-denominated debt while earning local currency, so a stronger dollar raises the real cost of servicing it.",
      },
    ],
    sources: [
      { name: "Bank for International Settlements — statistics", url: "https://www.bis.org/statistics/index.htm" },
      { name: "Federal Reserve — foreign exchange rates (H.10)", url: "https://www.federalreserve.gov/releases/h10/" },
      { name: "IMF — currency composition of official reserves (COFER)", url: "https://data.imf.org/" },
    ],
  },
  {
    slug: "term-premium-returns-to-bond-markets",
    title: "Term premium is back, and it changes how bond curves behave",
    standfirst:
      "When central banks stopped buying, private investors had to absorb the issuance. The compensation they demand for holding duration is visible again.",
    summary:
      "What term premium is, why quantitative tightening and heavier issuance have restored it, and why long yields can now rise even when policy rate expectations fall.",
    market: "currencies",
    topic: "Rates",
    tags: ["bonds", "term premium", "quantitative tightening", "sovereign debt"],
    author: SITE.desk,
    published: "2026-08-25",
    updated: "2026-08-29",
    readingMinutes: 6,
    takeaways: [
      "Term premium is the extra yield investors demand for holding long-dated bonds rather than rolling short ones.",
      "Central bank balance sheet reduction shifts issuance absorption to price-sensitive private buyers.",
      "This can steepen curves even while expected policy rates fall.",
      "Debt management office issuance calendars have become market-moving in their own right.",
    ],
    sections: [
      {
        heading: "Defining the term",
        paragraphs: [
          "A ten-year yield can be decomposed into two parts: the average short rate expected over the next ten years, and a residual compensating the investor for uncertainty about that path. The residual is the term premium. It is not directly observable and must be estimated, which is why published models disagree.",
          "The New York Fed publishes one widely used estimate, and its methodology is documented publicly, allowing readers to see how the decomposition is constructed rather than taking the number on trust.",
        ],
      },
      {
        heading: "Why it compressed and why it returned",
        paragraphs: [
          "Large-scale asset purchases by central banks removed duration from the market. A buyer insensitive to price absorbed a large share of issuance, and the compensation demanded by everyone else fell accordingly.",
          "As balance sheets shrink and government financing needs stay elevated, that duration returns to private hands. Pension funds, banks and foreign investors are price-sensitive, and they demand compensation. The result is a visible term premium again.",
        ],
      },
      {
        heading: "What it changes in practice",
        paragraphs: [
          "The most important consequence is that long yields can rise while rate-cut expectations increase — a combination that looks contradictory if you assume the curve only reflects policy expectations.",
          "It also raises the market impact of supply. Auction sizes, maturity mix and buyback programmes published by debt management offices now move prices in a way they rarely did during the purchase era.",
        ],
      },
    ],
    analysis: [
      "Our view: because term premium is a model estimate rather than a measurement, we treat large claims about its exact level with caution and focus on direction and drivers instead.",
      "For long-term savers, the practical implication is more benign than the headlines suggest: higher term premium means better expected returns from holding long bonds, at the cost of more volatility along the way.",
    ],
    faqs: [
      {
        q: "Is term premium the same as the yield curve slope?",
        a: "No. The slope combines expected policy rates and term premium; the premium is only one component of it.",
      },
      {
        q: "Why is it only estimated?",
        a: "Because expected future short rates are unobservable, so any decomposition depends on a model of expectations.",
      },
      {
        q: "Does quantitative tightening always raise yields?",
        a: "It removes a price-insensitive buyer, which tends to raise term premium, but the net yield effect also depends on growth and inflation expectations.",
      },
    ],
    sources: [
      { name: "Federal Reserve Bank of New York — term premia (ACM) estimates", url: "https://www.newyorkfed.org/research/data_indicators/term-premia-tabs" },
      { name: "US Treasury — quarterly refunding statements", url: "https://home.treasury.gov/policy-issues/financing-the-government/quarterly-refunding" },
      { name: "OECD — global debt report", url: "https://www.oecd.org/en/publications/global-debt-report_9f7c0e75-en.html" },
    ],
  },
  {
    slug: "spot-etfs-changed-bitcoin-market-structure",
    title: "Regulated funds gave bitcoin something it never had: an auditable demand signal",
    standfirst:
      "Whatever one thinks of the asset, spot exchange-traded products changed how its demand can be measured — from inference to disclosure.",
    summary:
      "How spot digital asset funds altered market structure, why daily creation and redemption data is more reliable than on-chain inference, and what the change does not tell you.",
    market: "crypto",
    topic: "Digital assets",
    tags: ["bitcoin", "ETFs", "market structure", "institutional flows"],
    author: SITE.desk,
    published: "2026-08-30",
    updated: "2026-09-01",
    readingMinutes: 6,
    takeaways: [
      "Spot funds route demand through regulated venues with daily public disclosure.",
      "Creation and redemption data is auditable in a way that on-chain flow inference is not.",
      "Flow persistence over weeks has been more informative than any single day's number.",
      "Fund flows measure demand through one channel only; they are not a complete picture of the market.",
    ],
    sections: [
      {
        heading: "What actually changed",
        paragraphs: [
          "Before regulated spot products existed, estimating institutional digital asset demand meant inferring it from exchange balances, custodial wallet clustering and survey data. Each method carried significant error and none was auditable.",
          "Spot exchange-traded products publish holdings and share creations daily as a condition of their structure. That produces a demand series that can be checked against issuer disclosures and regulatory filings rather than estimated.",
        ],
      },
      {
        heading: "Why the channel matters",
        paragraphs: [
          "Regulated wrappers allow allocators who cannot hold the asset directly — because of custody, audit or mandate constraints — to gain exposure. That widens the potential buyer base without any change in the underlying asset.",
          "It also concentrates a share of trading into traditional market hours and infrastructure, which subtly changes intraday liquidity patterns for an asset that trades continuously.",
        ],
      },
      {
        heading: "The limits of the signal",
        paragraphs: [
          "Fund flows capture one route to exposure. Direct purchases, derivatives positioning and offshore venues remain outside the series, so flows describe a channel rather than the whole market.",
          "They also say nothing about holder intent or time horizon. A large inflow may reflect a long-term allocation or a hedged basis trade; the disclosure does not distinguish them.",
        ],
      },
    ],
    analysis: [
      "Our view: the structural change is more interesting and more durable than the price commentary that surrounds it. An auditable demand series is a genuine improvement in the evidence base for this asset class.",
      "We do not publish price targets for digital assets. Where the evidence is limited to a single channel, we say so rather than extrapolating.",
    ],
    faqs: [
      {
        q: "What is a creation or redemption?",
        a: "The process by which authorised participants create new fund shares against delivery of the underlying asset or cash, or redeem them in reverse. It is what keeps a fund's price close to its net asset value.",
      },
      {
        q: "Where are these disclosures published?",
        a: "Issuers publish daily holdings on their own sites, and periodic filings are available through the SEC's EDGAR system.",
      },
      {
        q: "Do fund flows predict price?",
        a: "There is no reliable evidence of a simple predictive relationship. Persistent flows have coincided with trends, which is a correlation rather than a forecasting tool.",
      },
    ],
    sources: [
      { name: "SEC EDGAR — issuer filings", url: "https://www.sec.gov/edgar/search/" },
      { name: "SEC — investor bulletins on exchange-traded products", url: "https://www.sec.gov/resources-for-investors/investor-alerts-bulletins" },
      { name: "Cointelegraph — digital asset market coverage", url: "https://cointelegraph.com/" },
    ],
  },
  {
    slug: "stablecoin-rules-are-payments-regulation",
    title: "Stablecoin rules are converging — and they look like payments law, not securities law",
    standfirst:
      "Across the EU, UK, Singapore and the United States, the same three requirements keep appearing: quality reserves, redemption at par, and regular disclosure.",
    summary:
      "A comparison of how major jurisdictions are regulating payment stablecoins, the common requirements emerging, and why the practical effect lands on settlement infrastructure rather than trading.",
    market: "crypto",
    topic: "Regulation",
    tags: ["stablecoins", "regulation", "MiCA", "payments"],
    author: SITE.desk,
    published: "2026-08-24",
    updated: "2026-08-28",
    readingMinutes: 6,
    takeaways: [
      "Regulators are treating payment stablecoins as a reserve-backing and redemption question.",
      "Common requirements are high-quality liquid reserves, par redemption and regular attestation.",
      "The EU's MiCA framework is the most comprehensive published regime to date.",
      "The practical impact is on settlement rails and banking relationships, not on speculative trading.",
    ],
    sections: [
      {
        heading: "The common core across jurisdictions",
        paragraphs: [
          "Read side by side, the published frameworks converge on the same three obligations. Reserves must be held in high-quality liquid assets, typically short-dated government securities and bank deposits. Holders must be able to redeem at par, in reasonable time. And the issuer must disclose reserve composition regularly, usually with independent attestation.",
          "These are the requirements applied to electronic money and payment institutions, not the disclosure regime applied to securities issuers. That choice tells you how regulators have classified the instrument in practice.",
        ],
      },
      {
        heading: "Where the frameworks differ",
        paragraphs: [
          "Differences remain in who may issue, how large a non-euro or non-domestic stablecoin may become before additional obligations bite, and whether interest may be paid to holders. The EU's Markets in Crypto-Assets regulation is the most detailed published text and sets out its own thresholds and supervisory arrangements.",
          "Other jurisdictions have taken narrower approaches, in some cases regulating issuance while leaving intermediaries under existing money-transmission rules.",
        ],
      },
      {
        heading: "Why banks and card networks care",
        paragraphs: [
          "For established payment firms, the interest is operational. A regulated, par-redeemable digital instrument can settle obligations faster and outside conventional banking hours, which matters most in cross-border corridors where correspondent banking is slow and expensive.",
          "That is a settlement-infrastructure story with measurable costs and benefits, and it is largely independent of digital asset price cycles.",
        ],
      },
    ],
    analysis: [
      "Our view: framing stablecoin regulation as a crypto crackdown misreads it. The direction of travel is toward absorbing the instrument into payments supervision, which is a normalisation rather than a restriction.",
      "The unresolved question we are watching is reserve concentration: if issuance scales, large holdings of short-dated government paper create a link between stablecoin redemptions and money markets that regulators have flagged but not fully addressed.",
    ],
    faqs: [
      {
        q: "What is a payment stablecoin?",
        a: "A digital token designed to maintain a stable value against a reference currency, backed by reserves and redeemable at par.",
      },
      {
        q: "What is MiCA?",
        a: "The European Union's Markets in Crypto-Assets regulation, a comprehensive framework covering crypto-asset issuers and service providers across member states.",
      },
      {
        q: "Are stablecoins insured like bank deposits?",
        a: "Generally no. Reserve backing is not the same as deposit insurance, and regulators have repeatedly made that distinction explicit.",
      },
    ],
    sources: [
      { name: "European Commission — crypto-assets and MiCA", url: "https://finance.ec.europa.eu/digital-finance/crypto-assets_en" },
      { name: "Bank of England — systemic payment systems using stablecoins", url: "https://www.bankofengland.co.uk/paper/2023/dp/regulatory-regime-for-systemic-payment-systems-using-stablecoins" },
      { name: "Monetary Authority of Singapore — stablecoin regulatory framework", url: "https://www.mas.gov.sg/regulation/payments" },
    ],
  },
];

export const sortedArticles = [...articles].sort((a, b) =>
  b.published.localeCompare(a.published),
);

export const featuredArticles = sortedArticles.filter((a) => a.featured);

export const getMarket = (slug: string) => markets.find((m) => m.slug === slug);

export const articlesByMarket = (slug: MarketSlug) =>
  sortedArticles.filter((a) => a.market === slug);

export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);

export const marketName = (slug: MarketSlug) =>
  markets.find((m) => m.slug === slug)?.shortName ?? slug;

export const allTags = Array.from(new Set(articles.flatMap((a) => a.tags))).sort();

export const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

export const lastUpdated = [...articles]
  .map((a) => a.updated)
  .sort()
  .reverse()[0]!;

export const wordCount = (a: Article) =>
  a.sections.reduce((n, s) => n + s.paragraphs.join(" ").split(/\s+/).length, 0);
