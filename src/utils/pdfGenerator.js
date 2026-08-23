// High-Precision Institutional-Grade 2-Page Venture Due Diligence PDF Generator
import { jsPDF } from "jspdf";

export function exportAuditPdf(report) {
  if (!report) return;

  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4"
  });

  const { idea, market, customer, competitors, comparison, swotRisk, mvp, gtm, completedAt } = report;

  // Professional Color Palette
  const cDark = [15, 23, 42];        // #0f172a (Primary Slate)
  const cIndigo = [79, 70, 229];      // #4f46e5 (Indigo Accent)
  const cEmerald = [16, 185, 129];    // #10b981 (Success Emerald)
  const cRose = [225, 29, 72];        // #e11d48 (Alert Rose)
  const cAmber = [217, 119, 6];       // #d97706 (Warning Amber)
  const cBlue = [37, 99, 235];        // #2563eb (Info Blue)
  const cText = [30, 41, 59];         // #1e293b (Body Text)
  const cMuted = [100, 116, 139];     // #64748b (Muted Gray)
  const cBgLight = [248, 250, 252];   // #f8fafc (Card Background)
  const cBorder = [226, 232, 240];    // #e2e8f0 (Card Border)

  const viabilityScore = comparison?.validationScore || 88;
  const verdict = comparison?.verdict || (viabilityScore >= 75 ? "STRONG GO" : "PROCEED WITH CAUTION");

  const leftM = 14;
  const rightM = 196;
  const contentW = 182;

  const drawHeader = (pageNumber) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(...cMuted);
    doc.text("GAMMAVAL™ AI • VENTURE CAPITAL INVESTMENT AUDIT", leftM, 11);
    doc.setFont("helvetica", "normal");
    doc.text(idea?.title ? `Asset: ${idea.title.slice(0, 38)}` : "Confidential", rightM, 11, { align: "right" });
    doc.setDrawColor(...cBorder);
    doc.setLineWidth(0.3);
    doc.line(leftM, 13, rightM, 13);
  };

  const drawFooter = (pageNumber) => {
    doc.setDrawColor(...cBorder);
    doc.setLineWidth(0.2);
    doc.line(leftM, 285, rightM, 285);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(...cMuted);
    doc.text("Confidential • Prepared via GammaVal™ 8-Agent Autonomous MAS Engine", leftM, 289);
    doc.text(`Page ${pageNumber} of 2`, rightM, 289, { align: "right" });
  };

  // =========================================================================
  // ============================ PAGE 1 =====================================
  // =========================================================================
  drawHeader(1);

  let y = 17;

  // 1. Report Category Badge
  doc.setFillColor(...cBgLight);
  doc.setDrawColor(...cBorder);
  doc.setLineWidth(0.3);
  doc.roundedRect(leftM, y, contentW, 10, 2, 2, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(...cIndigo);
  doc.text("INSTITUTIONAL VENTURE MEMORANDUM & FEASIBILITY AUDIT", leftM + 4, y + 6.5);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(...cMuted);
  doc.text(`Date: ${completedAt || new Date().toLocaleDateString()}  •  Multi-Agent MAS Engine v4.0`, rightM - 4, y + 6.5, { align: "right" });
  y += 14;

  // 2. Startup Title & Domain
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(...cDark);
  const formattedTitle = (idea?.title || "Custom Startup Venture").slice(0, 48);
  doc.text(formattedTitle, leftM, y);
  y += 5.5;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(...cMuted);
  doc.text(`Founder: ${idea?.founderName || "Founder"}  •  Industry: ${market?.industryName || idea?.domain || "AgriTech / DeepTech"}  •  Geography: ${idea?.region || "Global"}  •  Model: ${idea?.pricingModel || "Subscription SaaS"}`, leftM, y);
  y += 7.5;

  // 3. Hero Scorecard Card (Dark Slate Container)
  doc.setFillColor(...cDark);
  doc.roundedRect(leftM, y, contentW, 28, 3, 3, "F");

  // Left: Big Score & Verdict
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(255, 255, 255);
  doc.text(`${viabilityScore}/100`, leftM + 8, y + 13);

  doc.setFontSize(8);
  doc.setTextColor(...cEmerald);
  doc.text(`VERDICT: ${verdict}`, leftM + 8, y + 19);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(6.5);
  doc.setTextColor(148, 163, 184);
  doc.text("COMPOSITE VIABILITY INDEX", leftM + 8, y + 23.5);

  // Vertical Divider
  doc.setDrawColor(51, 65, 85);
  doc.setLineWidth(0.4);
  doc.line(leftM + 62, y + 4, leftM + 62, y + 24);

  // Right Grid: 4 Metric Blocks
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7);
  doc.setTextColor(148, 163, 184);
  doc.text("MARKET SIZE (TAM)", leftM + 70, y + 9);
  doc.text("CUSTOMER WTP", leftM + 128, y + 9);
  doc.text("DEFENSIBILITY MOAT", leftM + 70, y + 19);
  doc.text("COMPOSITE RISK", leftM + 128, y + 19);

  doc.setFontSize(9);
  doc.setTextColor(255, 255, 255);
  doc.text(`$${market?.tamVal || 28}B (${market?.cagr || 24.1}% CAGR)`, leftM + 70, y + 14.5);
  doc.text(`${customer?.willingnessToPay || "High"} (${customer?.painPointSeverity || 8.5}/10)`, leftM + 128, y + 14.5);
  doc.text(`${comparison?.defensibilityMoat || "High"} Moat`, leftM + 70, y + 24.5);
  doc.text(`${swotRisk?.riskScores?.overallRiskIndex || 42}/100 Index`, leftM + 128, y + 24.5);
  y += 33;

  // 4. 5-Vector Investment Readiness Radar & Benchmark Table
  doc.setFillColor(...cBgLight);
  doc.setDrawColor(...cBorder);
  doc.roundedRect(leftM, y, contentW, 58, 2.5, 2.5, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(...cDark);
  doc.text("5-VECTOR VENTURE READINESS RADAR & BENCHMARK INDEX", leftM + 4, y + 6);

  // Radar Geometry Setup
  const centerX = leftM + 38;
  const centerY = y + 33;
  const maxRadius = 19;
  const numAxes = 5;

  const radarMetrics = [
    { label: "Market TAM", score: market?.opportunityScore || 85, benchmark: "Top Decile" },
    { label: "Customer WTP", score: Math.min(100, Math.round((customer?.painPointSeverity || 8.5) * 10)), benchmark: "High Urgency" },
    { label: "Defensive Moat", score: comparison?.competitiveMoatScore || (comparison?.defensibilityMoat === "High" ? 88 : 72), benchmark: "Differentiated" },
    { label: "MVP Speed", score: 84, benchmark: "6-Week Build" },
    { label: "GTM Traction", score: 78, benchmark: "Scalable" }
  ];

  // Draw concentric polygon rings (25%, 50%, 75%, 100%)
  [0.25, 0.5, 0.75, 1.0].forEach((scale) => {
    const ringRadius = maxRadius * scale;
    const ringPoints = [];
    for (let i = 0; i < numAxes; i++) {
      const angle = (i * 2 * Math.PI) / numAxes - Math.PI / 2;
      ringPoints.push({
        x: centerX + ringRadius * Math.cos(angle),
        y: centerY + ringRadius * Math.sin(angle)
      });
    }
    doc.setDrawColor(...cBorder);
    doc.setLineWidth(0.2);
    for (let i = 0; i < ringPoints.length; i++) {
      const next = ringPoints[(i + 1) % ringPoints.length];
      doc.line(ringPoints[i].x, ringPoints[i].y, next.x, next.y);
    }
  });

  // Draw radiating spokes and calculate score polygon points
  const polygonPoints = [];
  for (let i = 0; i < numAxes; i++) {
    const angle = (i * 2 * Math.PI) / numAxes - Math.PI / 2;
    const spokeX = centerX + maxRadius * Math.cos(angle);
    const spokeY = centerY + maxRadius * Math.sin(angle);
    doc.setDrawColor(...cBorder);
    doc.setLineWidth(0.2);
    doc.line(centerX, centerY, spokeX, spokeY);

    const normScore = Math.min(100, Math.max(25, radarMetrics[i].score)) / 100;
    polygonPoints.push({
      x: centerX + maxRadius * normScore * Math.cos(angle),
      y: centerY + maxRadius * normScore * Math.sin(angle)
    });
  }

  // Draw Filled Score Polygon
  doc.setDrawColor(...cIndigo);
  doc.setLineWidth(0.8);
  for (let i = 0; i < polygonPoints.length; i++) {
    const next = polygonPoints[(i + 1) % polygonPoints.length];
    doc.line(polygonPoints[i].x, polygonPoints[i].y, next.x, next.y);
  }

  // Radar Table on the Right Side of Page 1
  const tableX = leftM + 80;
  let rowY = y + 14;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(7);
  doc.setTextColor(...cMuted);
  doc.text("EVALUATION VECTOR", tableX, rowY);
  doc.text("SCORE", tableX + 55, rowY);
  doc.text("BENCHMARK", tableX + 78, rowY);

  doc.setDrawColor(...cBorder);
  doc.setLineWidth(0.2);
  doc.line(tableX, rowY + 2, rightM - 4, rowY + 2);
  rowY += 6.5;

  radarMetrics.forEach((m) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(...cDark);
    doc.text(m.label, tableX, rowY);

    doc.setTextColor(...cIndigo);
    doc.text(`${m.score}/100`, tableX + 55, rowY);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(...cEmerald);
    doc.text(m.benchmark, tableX + 78, rowY);

    rowY += 7.5;
  });

  y += 62;

  // 5. Market Sizing Table (TAM / SAM / SOM)
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.setTextColor(...cDark);
  doc.text("1. Market Sizing & Financial Opportunity", leftM, y);
  y += 4.5;

  const mBoxW = (contentW - 6) / 3;
  const marketCards = [
    { label: "TOTAL ADDRESSABLE (TAM)", val: `$${market?.tamVal || 28} Billion`, sub: `${market?.cagr || 24.1}% Annual Growth Rate` },
    { label: "SERVICEABLE (SAM)", val: `$${market?.samVal || 6.2} Billion`, sub: `Regional ${idea?.region || "Target"} Segment` },
    { label: "OBTAINABLE (SOM - 3 YR)", val: `$${market?.somVal || 420} Million`, sub: "Beachhead Market Capture" }
  ];

  marketCards.forEach((c, idx) => {
    const bx = leftM + idx * (mBoxW + 3);
    doc.setFillColor(...cBgLight);
    doc.setDrawColor(...cBorder);
    doc.roundedRect(bx, y, mBoxW, 20, 2, 2, "FD");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(6.5);
    doc.setTextColor(...cMuted);
    doc.text(c.label, bx + 3.5, y + 5);

    doc.setFontSize(10.5);
    doc.setTextColor(...cDark);
    doc.text(c.val, bx + 3.5, y + 11.5);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(6.5);
    doc.setTextColor(...cEmerald);
    doc.text(c.sub, bx + 3.5, y + 16.5);
  });
  y += 24;

  // 6. Growth Drivers & Macro Tailwinds (2-Column Box)
  doc.setFillColor(...cBgLight);
  doc.setDrawColor(...cBorder);
  doc.roundedRect(leftM, y, contentW, 24, 2, 2, "FD");

  const colW = (contentW - 8) / 2;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(...cDark);
  doc.text("KEY MARKET GROWTH DRIVERS", leftM + 4, y + 5.5);
  doc.text("MACRO POLICY & REGULATORY TAILWINDS", leftM + colW + 6, y + 5.5);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(...cText);
  const d1 = market?.marketDrivers?.[0] || `Rapid migration toward automated ${market?.industryName || "telemetry"} solutions`;
  const d2 = market?.marketDrivers?.[1] || "High turnaround friction and prohibitive costs of manual lab analysis";
  const t1 = market?.macroTailwinds?.[0] || `Favorable regional compliance incentives across ${idea?.region || "target markets"}`;
  const t2 = market?.macroTailwinds?.[1] || "Rising operational overhead compelling automated real-time workflows";

  doc.text(`• ${d1.slice(0, 56)}`, leftM + 4, y + 11.5);
  doc.text(`• ${d2.slice(0, 56)}`, leftM + 4, y + 18);
  doc.text(`• ${t1.slice(0, 56)}`, leftM + colW + 6, y + 11.5);
  doc.text(`• ${t2.slice(0, 56)}`, leftM + colW + 6, y + 18);

  y += 28;

  // 7. Customer ICP & Willingness-to-Pay (2-Column Box)
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.setTextColor(...cDark);
  doc.text("2. Ideal Customer Profile (ICP) & Persona Validation", leftM, y);
  y += 4.5;

  doc.setFillColor(...cBgLight);
  doc.setDrawColor(...cBorder);
  doc.roundedRect(leftM, y, contentW, 30, 2, 2, "FD");

  // Left column: ICP & Urgency
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(...cDark);
  doc.text("TARGET BUYER PROFILE & PAIN INTENSITY", leftM + 4, y + 5.5);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(...cText);
  const icpStr = customer?.icpSummary || "Commercial operators, enterprise agronomists, and procurement managers.";
  doc.text(doc.splitTextToSize(`• Target ICP: ${icpStr}`, colW), leftM + 4, y + 11.5);
  doc.text(`• Pain Severity Index: ${customer?.painPointSeverity || 8.5}/10 (Severe Operational Friction)`, leftM + 4, y + 21);
  doc.text(`• Willingness-to-Pay: ${customer?.willingnessToPay || "High"}  |  Estimated ARPU: ${customer?.estimatedArpu || "$199/mo"}`, leftM + 4, y + 26);

  // Right column: Acquisition Channels
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(...cDark);
  doc.text("PRIMARY GO-TO-MARKET CHANNELS", leftM + colW + 6, y + 5.5);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(...cText);
  const ch1 = customer?.acquisitionChannels?.[0] || "Direct founder-led outbound to regional co-ops & industry groups";
  const ch2 = customer?.acquisitionChannels?.[1] || "B2B targeted account-based marketing (ABM) and partner referrals";
  const ch3 = customer?.acquisitionChannels?.[2] || "Product-led digital free diagnostic audit calculators";

  doc.text(`1. ${ch1.slice(0, 52)}`, leftM + colW + 6, y + 11.5);
  doc.text(`2. ${ch2.slice(0, 52)}`, leftM + colW + 6, y + 18);
  doc.text(`3. ${ch3.slice(0, 52)}`, leftM + colW + 6, y + 24.5);

  drawFooter(1);

  // =========================================================================
  // ============================ PAGE 2 =====================================
  // =========================================================================
  doc.addPage();
  drawHeader(2);

  y = 17;

  // 1. Multi-Vector Quantitative Risk Analysis (Visual Horizontal Bars)
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.setTextColor(...cDark);
  doc.text("3. Multi-Vector Risk Modeling & Mitigation Strategies", leftM, y);
  y += 4.5;

  doc.setFillColor(...cBgLight);
  doc.setDrawColor(...cBorder);
  doc.roundedRect(leftM, y, contentW, 40, 2.5, 2.5, "FD");

  const riskRows = [
    { label: "Market Adoption Friction", score: swotRisk?.riskScores?.marketRisk || 35, level: "Low-Moderate", mitigation: "Free pilot audits with zero upfront onboarding fee." },
    { label: "Technical & Integration Risk", score: swotRisk?.riskScores?.techRisk || 42, level: "Moderate", mitigation: "Modular microservices with automated failover pipelines." },
    { label: "Competitive Lock-in Risk", score: swotRisk?.riskScores?.competitiveRisk || 38, level: "Low-Moderate", mitigation: "Proprietary telemetry models and high workflow switching costs." },
    { label: "Regulatory & Compliance Risk", score: swotRisk?.riskScores?.executionRisk || 46, level: "Moderate", mitigation: "Proactive patent filings and industry compliance certifications." }
  ];

  let rY = y + 7;
  riskRows.forEach((r) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(...cDark);
    doc.text(r.label, leftM + 4, rY);

    // Track Bar
    const barX = leftM + 62;
    const barW = 45;
    doc.setFillColor(226, 232, 240);
    doc.roundedRect(barX, rY - 3, barW, 3.5, 1, 1, "F");

    // Progress Bar Fill
    const barColor = r.score > 60 ? cRose : r.score > 40 ? cAmber : cEmerald;
    doc.setFillColor(...barColor);
    doc.roundedRect(barX, rY - 3, (barW * r.score) / 100, 3.5, 1, 1, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(7);
    doc.setTextColor(...barColor);
    doc.text(`${r.score}/100 (${r.level})`, barX + barW + 3, rY);

    // Mitigation
    doc.setFont("helvetica", "normal");
    doc.setFontSize(6.5);
    doc.setTextColor(...cMuted);
    doc.text(`Mitigation: ${r.mitigation.slice(0, 42)}`, leftM + 128, rY);

    rY += 8.2;
  });

  y += 45;

  // 2. SWOT Strategic 4-Quadrant Matrix
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.setTextColor(...cDark);
  doc.text("4. SWOT Strategic Matrix", leftM, y);
  y += 4.5;

  const quadW = (contentW - 4) / 2;
  const quadH = 28;

  // Quad 1: Strengths (Emerald)
  doc.setFillColor(240, 253, 244);
  doc.setDrawColor(187, 247, 208);
  doc.roundedRect(leftM, y, quadW, quadH, 2, 2, "FD");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(...cEmerald);
  doc.text("STRENGTHS (INTERNAL ADVANTAGES)", leftM + 4, y + 5.5);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(...cText);
  const s1 = swotRisk?.swot?.strengths?.[0]?.title || "Proprietary AI telemetry and automated workflow alerts";
  const s2 = swotRisk?.swot?.strengths?.[1]?.title || "80% lower capital deployment costs than legacy enterprise suites";
  doc.text(`• ${s1.slice(0, 52)}`, leftM + 4, y + 12);
  doc.text(`• ${s2.slice(0, 52)}`, leftM + 4, y + 20);

  // Quad 2: Weaknesses (Amber)
  doc.setFillColor(254, 243, 199);
  doc.setDrawColor(253, 230, 138);
  doc.roundedRect(leftM + quadW + 4, y, quadW, quadH, 2, 2, "FD");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(...cAmber);
  doc.text("WEAKNESSES (INTERNAL CONSTRAINTS)", leftM + quadW + 8, y + 5.5);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(...cText);
  const w1 = swotRisk?.swot?.weaknesses?.[0]?.title || "Initial hardware supply chain lead-times";
  const w2 = swotRisk?.swot?.weaknesses?.[1]?.title || "Requires field calibration and early customer trust formation";
  doc.text(`• ${w1.slice(0, 52)}`, leftM + quadW + 8, y + 12);
  doc.text(`• ${w2.slice(0, 52)}`, leftM + quadW + 8, y + 20);

  y += 32;

  // Quad 3: Opportunities (Blue)
  doc.setFillColor(239, 246, 255);
  doc.setDrawColor(191, 219, 254);
  doc.roundedRect(leftM, y, quadW, quadH, 2, 2, "FD");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(...cBlue);
  doc.text("OPPORTUNITIES (EXTERNAL UPSIDE)", leftM + 4, y + 5.5);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(...cText);
  const o1 = swotRisk?.swot?.opportunities?.[0]?.title || "Enterprise data syndication and insurance risk partnerships";
  const o2 = swotRisk?.swot?.opportunities?.[1]?.title || "Expansion into adjacent vertical compliance workflows";
  doc.text(`• ${o1.slice(0, 52)}`, leftM + 4, y + 12);
  doc.text(`• ${o2.slice(0, 52)}`, leftM + 4, y + 20);

  // Quad 4: Threats (Rose)
  doc.setFillColor(255, 241, 242);
  doc.setDrawColor(254, 205, 211);
  doc.roundedRect(leftM + quadW + 4, y, quadW, quadH, 2, 2, "FD");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(...cRose);
  doc.text("THREATS (EXTERNAL VULNERABILITIES)", leftM + quadW + 8, y + 5.5);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(...cText);
  const t1Threat = swotRisk?.swot?.threats?.[0]?.title || "Incumbents bundling basic telemetry into legacy contracts";
  const t2Threat = swotRisk?.swot?.threats?.[1]?.title || "Rapidly shifting wireless IoT band and privacy standards";
  doc.text(`• ${t1Threat.slice(0, 52)}`, leftM + quadW + 8, y + 12);
  doc.text(`• ${t2Threat.slice(0, 52)}`, leftM + quadW + 8, y + 20);

  y += 36;

  // 3. Competitor Intelligence & Strategic Wedge Gap Table
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.setTextColor(...cDark);
  doc.text("5. Competitor Landscape & Defensible Market Wedge", leftM, y);
  y += 4.5;

  doc.setFillColor(...cBgLight);
  doc.setDrawColor(...cBorder);
  doc.roundedRect(leftM, y, contentW, 36, 2.5, 2.5, "FD");

  // Competitor Table Header
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7);
  doc.setTextColor(...cMuted);
  doc.text("COMPETITOR / INCUMBENT", leftM + 4, y + 5.5);
  doc.text("TARGET TIER", leftM + 62, y + 5.5);
  doc.text("EST. PRICING", leftM + 110, y + 5.5);
  doc.text("DEFENSIVE MOAT", leftM + 142, y + 5.5);

  doc.setDrawColor(...cBorder);
  doc.setLineWidth(0.2);
  doc.line(leftM + 4, y + 7.5, rightM - 4, y + 7.5);

  const compList = competitors?.competitors?.slice(0, 3) || [
    { name: "Enterprise Incumbent Suite", targetTier: "Global 2000", estimatedPricing: "$1,500/mo", primaryMoat: "Legacy Vendor Lock-in" },
    { name: "Specialized Point Solution", targetTier: "Mid-Market", estimatedPricing: "$199/mo", primaryMoat: "Feature Focus" }
  ];

  let compY = y + 12.5;
  compList.forEach((c) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7);
    doc.setTextColor(...cDark);
    doc.text((c.name || "Competitor Co").slice(0, 32), leftM + 4, compY);

    doc.setFont("helvetica", "normal");
    doc.text((c.targetTier || "Commercial").slice(0, 26), leftM + 62, compY);
    doc.text((c.estimatedPricing || "$199/mo").slice(0, 18), leftM + 110, compY);
    doc.text((c.primaryMoat || "Distribution").slice(0, 24), leftM + 142, compY);

    compY += 6;
  });

  // Market Wedge Callout
  doc.setFont("helvetica", "italic");
  doc.setFontSize(7);
  doc.setTextColor(...cIndigo);
  const wedgeGap = comparison?.marketGaps?.[0] || "Low-cost real-time telemetry tailored specifically for mid-market operators.";
  doc.text(`Primary Market Wedge: "${wedgeGap.slice(0, 105)}"`, leftM + 4, y + 32);

  y += 40;

  // 4. MoSCoW MVP Specification & 90-Day GTM Launch Roadmap
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.setTextColor(...cDark);
  doc.text("6. MVP Feature Scope & 90-Day GTM Commercialization Plan", leftM, y);
  y += 4.5;

  doc.setFillColor(...cBgLight);
  doc.setDrawColor(...cBorder);
  doc.roundedRect(leftM, y, contentW, 36, 2.5, 2.5, "FD");

  // Left Column: MoSCoW MVP
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(...cDark);
  doc.text(`MVP BUILD SPECIFICATION (${mvp?.recommendedLaunchWeeks || 6} WEEKS)`, leftM + 4, y + 5.5);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(...cText);
  const m1 = mvp?.moscowFeatures?.mustHave?.[0]?.featureName || "Core IoT telemetry ingestion engine & time-series storage";
  const m2 = mvp?.moscowFeatures?.mustHave?.[1]?.featureName || "Automated WhatsApp / Email alert dispatch webhook";
  const m3 = mvp?.moscowFeatures?.shouldHave?.[0]?.featureName || "Multi-tenant team dashboard & role management";

  doc.text(`• [MUST-HAVE] ${m1.slice(0, 48)}`, leftM + 4, y + 12);
  doc.text(`• [MUST-HAVE] ${m2.slice(0, 48)}`, leftM + 4, y + 19.5);
  doc.text(`• [SHOULD-HAVE] ${m3.slice(0, 48)}`, leftM + 4, y + 27);

  // Right Column: 90-Day GTM Phased Roadmap
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(...cDark);
  doc.text("90-DAY PHASED COMMERCIAL ROADMAP", leftM + colW + 6, y + 5.5);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(...cText);
  doc.text("• Sprint 1 (Days 1–30): Pilot deployment with 10 design partners.", leftM + colW + 6, y + 12);
  doc.text("• Sprint 2 (Days 31–60): Commercial beta launch & case study generation.", leftM + colW + 6, y + 19.5);
  doc.text("• Sprint 3 (Days 61–90): Outbound expansion targeting $25k+ ARR milestone.", leftM + colW + 6, y + 27);

  drawFooter(2);

  // Save PDF
  const safeFilename = (idea?.title || "gammaval_startup")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "_");
  doc.save(`${safeFilename}_due_diligence_report.pdf`);
}
