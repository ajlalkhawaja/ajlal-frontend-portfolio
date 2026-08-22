"use client";

import { useEffect, useMemo, useState } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";
import ThreeScene from "./three-scene";

type ProjectCategory = "Healthcare" | "Government" | "Enterprise" | "R&D";
type ProjectFilter = "All" | ProjectCategory;

type Project = {
  id: string;
  number: string;
  title: string;
  client: string;
  category: ProjectCategory;
  summary: string;
  challenge: string;
  contribution: string;
  outcome: string;
  stack: string[];
  theme: string;
};

const projects: Project[] = [
  {
    id: "seha",
    number: "01",
    title: "A calmer healthcare journey",
    client: "SEHA Digital Healthcare",
    category: "Healthcare",
    summary: "A bilingual, tablet-first service experience built for high-pressure visa-screening and healthcare workflows.",
    challenge: "Complex operational journeys needed to remain clear across Surface tablets, kiosks and desktop screens while supporting English and Arabic users.",
    contribution: "Redesigned the frontend layout, built reusable React components, handled responsive and RTL behaviour, and coordinated integration and release validation.",
    outcome: "A clearer tablet experience with predictable responsive behaviour, reusable UI patterns and maintainable foundations for future services.",
    stack: ["React", "Redux", "SCSS", "REST APIs", "RTL"],
    theme: "lime",
  },
  {
    id: "dashboard",
    number: "02",
    title: "Operations at a glance",
    client: "Enterprise Analytics",
    category: "Enterprise",
    summary: "A dense operational dashboard made instantly scannable through deliberate hierarchy, reusable data UI and responsive states.",
    challenge: "Management needed quick signals while operational teams needed enough detail to explore service performance and exceptions.",
    contribution: "Designed the component model and interaction states for KPI cards, charts, filters, search, tabular data and responsive reporting.",
    outcome: "A production-style dashboard experience that balances information density, accessibility and confident decision-making.",
    stack: ["React", "TypeScript", "Data UI", "A11y"],
    theme: "cyan",
  },
  {
    id: "portal",
    number: "03",
    title: "One service, two directions",
    client: "Government Services",
    category: "Government",
    summary: "An English and Arabic service journey with true RTL behaviour, accessible controls and clear multi-step progression.",
    challenge: "Public-service interfaces must make complex requirements understandable without sacrificing language parity or validation clarity.",
    contribution: "Created multilingual component patterns, RTL layout rules, accessible form states and responsive flows for kiosk, tablet and desktop.",
    outcome: "A reusable bilingual foundation that makes government services feel consistent, approachable and ready for real users.",
    stack: ["React", "TypeScript", "i18n", "RTL", "Forms"],
    theme: "violet",
  },
  {
    id: "floorplan",
    number: "04",
    title: "Space becomes actionable",
    client: "Central Bank of the UAE",
    category: "Government",
    summary: "Interactive floor-plan and occupancy workflows connecting complex spatial information with intuitive navigation.",
    challenge: "Large spatial datasets and live operational information had to remain useful at several levels of detail.",
    contribution: "Developed responsive floor-plan interfaces, data-driven interaction states and REST API integrations for space information.",
    outcome: "A maintainable experience that turns live spatial data into clear, navigable operational insight.",
    stack: ["Angular", "TypeScript", "SCSS", "REST APIs"],
    theme: "orange",
  },
  {
    id: "finance",
    number: "05",
    title: "Confidence across releases",
    client: "Abu Dhabi Department of Finance",
    category: "Government",
    summary: "Responsive portal enhancements and careful UAT-to-production reconciliation for a government finance environment.",
    challenge: "Multiple environments and production changes required careful comparison, validation and stakeholder coordination.",
    contribution: "Implemented UI enhancements, reconciled UAT and production differences, and supported structured release verification.",
    outcome: "Safer releases, consistent frontend behaviour and clearer coordination across technical and client teams.",
    stack: ["Angular", "JavaScript", "HTML5", "CSS3", "UAT"],
    theme: "blue",
  },
  {
    id: "ocr",
    number: "06",
    title: "Client-side Cheque OCR",
    client: "Engineering R&D",
    category: "R&D",
    summary: "A privacy-focused cheque experiment combining perspective correction, image preprocessing and client-side OCR.",
    challenge: "Handwriting, variable image quality and bank layouts make accurate field extraction difficult without specialised models.",
    contribution: "Prototyped document detection, region selection, preprocessing and OCR evaluation using browser-native workflows.",
    outcome: "A documented technical investigation showing rapid prototyping, privacy awareness and honest evaluation of model limits.",
    stack: ["Angular", "OpenCV.js", "Tesseract.js", "Canvas"],
    theme: "rose",
  },
];

const skillGroups = [
  ["Core", "React.js", "Angular", "TypeScript", "JavaScript", "Redux"],
  ["Interface", "Design Systems", "SCSS", "Responsive UI", "Accessibility", "RTL / i18n"],
  ["Delivery", "REST APIs", "Authentication", "GitHub", "Figma", "Agile / Scrum"],
];

const dashboardData = {
  Week: [58, 72, 64, 88, 77, 94, 82],
  Month: [67, 54, 78, 72, 91, 83, 96],
  Quarter: [48, 71, 61, 89, 74, 94, 86],
};

const portalCopy = {
  en: {
    kicker: "Digital service",
    title: "Book a healthcare appointment",
    description: "A simple, accessible journey designed for every device.",
    steps: ["Service", "Details", "Review"],
    action: "Continue",
    switcher: "العربية",
  },
  ar: {
    kicker: "خدمة رقمية",
    title: "حجز موعد للرعاية الصحية",
    description: "رحلة بسيطة وسهلة الاستخدام ومصممة لجميع الأجهزة.",
    steps: ["الخدمة", "البيانات", "المراجعة"],
    action: "متابعة",
    switcher: "English",
  },
};

function Arrow({ down = false }: { down?: boolean }) {
  return <span aria-hidden="true">{down ? "↓" : "↗"}</span>;
}

function BrandMark() {
  return <span className="brandMark" aria-hidden="true">AH<span>/</span></span>;
}

function ProjectVisual({ id }: { id: string }) {
  if (id === "seha") {
    return (
      <div className="visualDevice">
        <div className="deviceTop"><span /><span>SEHA SERVICES</span><i /></div>
        <div className="deviceBody"><aside><b>+</b><i /><i /><i /></aside><div className="appointmentPane"><small>GOOD MORNING</small><strong>How can we help?</strong><div className="serviceTiles"><span>Visa screening</span><span>Appointments</span></div></div></div>
      </div>
    );
  }
  if (id === "dashboard") {
    return (
      <div className="visualDashboard">
        <div className="visualDashTop"><span>OVERVIEW</span><i>Live</i></div>
        <div className="miniStats"><span><small>Processed</small><b>18.4k</b></span><span><small>Quality</small><b>98.1%</b></span></div>
        <div className="miniBars">{[42, 66, 55, 82, 69, 91, 76].map((height, index) => <i key={index} style={{ height: `${height}%` }} />)}</div>
      </div>
    );
  }
  if (id === "portal") {
    return (
      <div className="visualPortal">
        <div className="portalLanguages"><span>EN</span><span>ع</span></div>
        <small>DIGITAL SERVICES</small><strong>One journey.<br />Every language.</strong>
        <div className="portalLine"><i /><i /><i /></div>
      </div>
    );
  }
  if (id === "floorplan") {
    return (
      <div className="visualFloorplan">
        <div className="floorControls"><span>Level 08</span><i>74% occupied</i></div>
        <div className="floorGrid">{Array.from({ length: 18 }, (_, index) => <span className={index % 5 === 0 || index === 7 ? "occupied" : ""} key={index} />)}</div>
      </div>
    );
  }
  if (id === "finance") {
    return (
      <div className="visualFinance">
        <small>RELEASE CONFIDENCE</small><div className="releaseScore"><strong>100</strong><span>checks<br />aligned</span></div>
        <div className="releaseTrack"><i /><i /><i /><i /></div><p>UAT → VALIDATE → PRODUCTION</p>
      </div>
    );
  }
  return (
    <div className="visualOcr">
      <div className="scanCorners"><i /><i /><i /><i /></div>
      <div className="chequeLines"><span /><span /><span /></div>
      <div className="scanBeam" /><small>CLIENT-SIDE EXTRACTION</small>
    </div>
  );
}

function ProofLab() {
  const [mode, setMode] = useState<"dashboard" | "portal">("dashboard");
  const [period, setPeriod] = useState<keyof typeof dashboardData>("Month");
  const [language, setLanguage] = useState<"en" | "ar">("en");
  const [step, setStep] = useState(0);
  const copy = portalCopy[language];

  return (
    <section className="proofLab sectionShell" id="lab" data-reveal>
      <div className="sectionHeading">
        <div><p className="eyebrow">03 / Interactive proof</p><h2>Don&apos;t just read it.<br /><em>Try the thinking.</em></h2></div>
        <div className="labSwitch" role="group" aria-label="Choose interactive demo">
          <button className={mode === "dashboard" ? "active" : ""} onClick={() => setMode("dashboard")}>Data dashboard</button>
          <button className={mode === "portal" ? "active" : ""} onClick={() => setMode("portal")}>Bilingual portal</button>
        </div>
      </div>

      <div className="labWindow">
        <div className="labChrome"><div><i /><i /><i /></div><span>ajlal.dev / interactive-lab</span><b>LIVE</b></div>
        {mode === "dashboard" ? (
          <div className="liveDashboard">
            <aside><BrandMark />{["Overview", "Services", "Reports", "Teams"].map((item, index) => <span className={index === 0 ? "active" : ""} key={item}>{item.slice(0, 1)}</span>)}</aside>
            <div className="liveDashMain">
              <div className="dashHeader"><div><small>EXECUTIVE OVERVIEW</small><h3>Service performance</h3></div><div className="periodSwitch">{(Object.keys(dashboardData) as Array<keyof typeof dashboardData>).map((item) => <button className={period === item ? "active" : ""} onClick={() => setPeriod(item)} key={item}>{item}</button>)}</div></div>
              <div className="dashStats"><article><span>Cases processed</span><strong>{period === "Week" ? "4,862" : period === "Month" ? "18,420" : "52,196"}</strong><small>↑ 12.4% this period</small></article><article><span>Quality score</span><strong>98.1%</strong><small>Within service target</small></article><article><span>Avg. response</span><strong>2.1h</strong><small>14 min faster</small></article></div>
              <div className="dashContent"><article className="activityChart"><header><span>Processing volume</span><b>Daily activity</b></header><div>{dashboardData[period].map((height, index) => <span key={`${period}-${index}`}><i style={{ height: `${height}%` }} /><small>{["M", "T", "W", "T", "F", "S", "S"][index]}</small></span>)}</div></article><article className="qualityDial"><span>Service quality</span><div><strong>98</strong><small>/100</small></div><p>Excellent</p></article></div>
            </div>
          </div>
        ) : (
          <div className="livePortal" dir={language === "ar" ? "rtl" : "ltr"} lang={language}>
            <div className="portalHeader"><div className="portalGovMark">AD</div><div><strong>Digital Services</strong><small>Unified government portal</small></div><button onClick={() => { setLanguage(language === "en" ? "ar" : "en"); setStep(0); }}>{copy.switcher}</button></div>
            <div className="portalExperience">
              <div className="portalCopy"><small>{copy.kicker}</small><h3>{copy.title}</h3><p>{copy.description}</p><div className="stepLine">{copy.steps.map((item, index) => <span className={index <= step ? "active" : ""} key={item}><i>{index + 1}</i><b>{item}</b></span>)}</div></div>
              <div className="portalFormCard"><small>{language === "ar" ? "الخدمة المختارة" : "SELECTED SERVICE"}</small><h4>{language === "ar" ? "فحص اللياقة الطبية" : "Medical fitness screening"}</h4><div className="formSkeleton"><span /><span /><span /></div><button onClick={() => setStep((current) => current === 2 ? 0 : current + 1)}>{step === 2 ? (language === "ar" ? "ابدأ مرة أخرى" : "Start again") : copy.action} <Arrow /></button></div>
            </div>
          </div>
        )}
      </div>
      <p className="labNote">Synthetic data only. These demonstrations show interaction, responsive UI and bilingual engineering without exposing confidential client systems.</p>
    </section>
  );
}

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState<ProjectFilter>("All");
  const [activeProjectId, setActiveProjectId] = useState("seha");
  const [wordIndex, setWordIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const words = ["healthcare", "government", "enterprise", "human-centred"];

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("isVisible");
      });
    }, { threshold: 0.12 });
    document.querySelectorAll("[data-reveal]").forEach((element) => observer.observe(element));

    const updateProgress = () => {
      const distance = document.documentElement.scrollHeight - window.innerHeight;
      const progress = distance > 0 ? window.scrollY / distance : 0;
      document.documentElement.style.setProperty("--scroll-progress", String(progress));
    };
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateProgress);
    };
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => setWordIndex((current) => (current + 1) % words.length), 2300);
    return () => window.clearInterval(interval);
  }, [words.length]);

  const visibleProjects = useMemo(() => filter === "All" ? projects : projects.filter((project) => project.category === filter), [filter]);
  const activeProject = projects.find((project) => project.id === activeProjectId) ?? projects[0];

  const changeFilter = (nextFilter: ProjectFilter) => {
    setFilter(nextFilter);
    const firstProject = nextFilter === "All" ? projects[0] : projects.find((project) => project.category === nextFilter);
    if (firstProject) setActiveProjectId(firstProject.id);
  };

  const openCaseStudy = (projectId: string) => {
    setActiveProjectId(projectId);
    window.setTimeout(() => {
      const caseStudy = document.getElementById("case-study");
      caseStudy?.scrollIntoView({ behavior: "smooth", block: "center" });
      caseStudy?.focus({ preventScroll: true });
    }, 0);
  };

  const tilt = (event: ReactMouseEvent<HTMLElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const card = event.currentTarget;
    const bounds = card.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    card.style.setProperty("--tilt-x", `${y * -5}deg`);
    card.style.setProperty("--tilt-y", `${x * 7}deg`);
    card.style.setProperty("--glow-x", `${(x + 0.5) * 100}%`);
    card.style.setProperty("--glow-y", `${(y + 0.5) * 100}%`);
  };

  const resetTilt = (event: ReactMouseEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty("--tilt-x", "0deg");
    event.currentTarget.style.setProperty("--tilt-y", "0deg");
  };

  const copyEmail = async () => {
    await navigator.clipboard.writeText("ajlalkhawaja1@gmail.com");
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <main id="top">
      <div className="scrollProgress" aria-hidden="true" />
      <header className="siteHeader">
        <a className="brand" href="#top" aria-label="Ajlal Haider, home"><BrandMark /><span>Ajlal Haider<small>Senior Frontend Engineer</small></span></a>
        <nav className={menuOpen ? "siteNav open" : "siteNav"} aria-label="Primary navigation">
          {["About", "Work", "Lab", "Journey", "Contact"].map((item) => <a href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)} key={item}>{item}</a>)}
        </nav>
        <div className="headerActions">
          <a className="githubButton" href="https://www.linkedin.com/in/ajlal-haider-khawaja/" target="_blank" rel="noreferrer">LinkedIn <Arrow /></a>
          <a className="githubButton" href="https://github.com/ajlalkhawaja" target="_blank" rel="noreferrer">GitHub <Arrow /></a>
          <a className="hireButton" href="mailto:ajlalkhawaja1@gmail.com">Let&apos;s talk <Arrow /></a>
          <button className="menuButton" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><span /><span /></button>
        </div>
      </header>

      <section className="hero sectionShell">
        <div className="heroCopy" data-reveal>
          <p className="availability"><i /> Available immediately · Abu Dhabi · Remote-ready</p>
          <h1><span>Senior Frontend Engineer</span>I build digital products people <em>trust.</em></h1>
          <p className="heroLead">React, Angular and TypeScript specialist creating high-stakes <strong key={words[wordIndex]}>{words[wordIndex]}</strong> experiences that are clear, responsive and dependable.</p>
          <div className="heroActions">
            <a className="primaryButton" href="#work">See the work <Arrow down /></a>
            <a className="secondaryButton" href="/Ajlal_Haider_Senior_Frontend_Engineer_Resume.pdf" download>Download résumé <Arrow /></a>
          </div>
          <div className="heroProjectLinks"><span>SELECTED PROJECTS</span><div><a href="#work">SEHA</a><a href="#work">ADIO</a><a href="#work">Central Bank UAE</a><a href="#work">Department of Finance</a><a className="linkedinProjectLink" href="https://www.linkedin.com/in/ajlal-haider-khawaja/" target="_blank" rel="noreferrer">View LinkedIn profile <Arrow /></a></div></div>
          <div className="heroMeta"><a href="https://github.com/ajlalkhawaja" target="_blank" rel="noreferrer">GitHub profile <Arrow /></a><span>8+ years&apos; experience</span><span>UAE Golden Visa</span></div>
        </div>

        <div className="heroStage" data-reveal>
          <ThreeScene />
          <div className="portraitHalo" aria-hidden="true" />
          <div className="portraitFrame">
            {/* The native image avoids Vinext's optional optimizer, which has no local ASSETS binding on Windows. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/ajlal-haider.png" width={822} height={813} loading="eager" fetchPriority="high" alt="Ajlal Haider, Senior Frontend Engineer" />
            <div className="portraitCaption"><span>AJLAL HAIDER</span><small>Frontend × Product × UI</small></div>
          </div>
          <div className="orbitBadge badgeReact"><i /> React</div>
          <div className="orbitBadge badgeAngular"><i /> Angular</div>
          <div className="orbitBadge badgeTypeScript"><i /> TypeScript</div>
          <div className="stageMetric"><small>PROVEN IMPACT</small><strong>40%</strong><span>faster page loads</span></div>
        </div>
      </section>

      <section className="clientMarquee" aria-label="Selected client project experience">
        <div>{["SEHA", "ADIO", "CENTRAL BANK UAE", "ADNOC", "MODON", "ADNEC", "DEPARTMENT OF FINANCE", "SEHA", "ADIO", "CENTRAL BANK UAE"].map((item, index) => <span key={`${item}-${index}`}><i />{item}</span>)}</div>
      </section>

      <section className="about sectionShell" id="about" data-reveal>
        <div className="aboutIndex">01 / ABOUT</div>
        <div className="aboutStatement"><p>Not just polished screens.</p><h2>I translate <em>complex operations</em> into frontend systems that feel obvious.</h2></div>
        <div className="aboutDetails"><p>For 8+ years, I&apos;ve worked where design, engineering and real-world operations meet—building bilingual healthcare journeys, government platforms, enterprise dashboards and interactive spatial tools.</p><div className="impactGrid"><article><strong>8+</strong><span>years delivering<br />production UI</span></article><article><strong>7+</strong><span>major UAE<br />project environments</span></article><article><strong>EN / AR</strong><span>bilingual and<br />RTL engineering</span></article></div></div>
      </section>

      <section className="work sectionShell" id="work">
        <div className="sectionHeading" data-reveal><div><p className="eyebrow">02 / Selected work</p><h2>Built for real pressure.<br /><em>Designed for clarity.</em></h2></div><p>Client-safe case studies focused on the problem, my engineering contribution and the result. Confidential production data stays private.</p></div>
        <div className="projectDirectory"><strong>{visibleProjects.length} project{visibleProjects.length === 1 ? "" : "s"} shown</strong><span>All six projects are available below. Select a category to filter them.</span></div>
        <div className="projectFilters" role="group" aria-label="Filter projects">{(["All", "Healthcare", "Government", "Enterprise", "R&D"] as const).map((item) => {
          const count = item === "All" ? projects.length : projects.filter((project) => project.category === item).length;
          return <button type="button" className={filter === item ? "active" : ""} aria-pressed={filter === item} onClick={() => changeFilter(item)} key={item}>{item}<span>{count}</span></button>;
        })}</div>
        <div className="projectGrid" aria-live="polite">
          {visibleProjects.map((project) => (
            <article className={`projectCard theme-${project.theme} ${activeProjectId === project.id ? "selected" : ""}`} onMouseMove={tilt} onMouseLeave={resetTilt} key={project.id}>
              <div className="projectGlow" />
              <div className="projectTop"><span>{project.number}</span><small>{project.category}</small></div>
              <ProjectVisual id={project.id} />
              <div className="projectCopy"><p>{project.client}</p><h3>{project.title}</h3><span>{project.summary}</span><div>{project.stack.slice(0, 3).map((item) => <i key={item}>{item}</i>)}</div></div>
              <button type="button" aria-controls="case-study" onClick={() => openCaseStudy(project.id)}>Explore case study <Arrow /></button>
            </article>
          ))}
        </div>

        <article className={`caseStudy theme-${activeProject.theme}`} id="case-study" tabIndex={-1} aria-live="polite">
          <div className="caseStudyHeader"><div><p>{activeProject.number} / {activeProject.client}</p><h3>{activeProject.title}</h3></div><div className="caseStudyLinks"><a href="https://www.linkedin.com/in/ajlal-haider-khawaja/" target="_blank" rel="noreferrer">LinkedIn profile <Arrow /></a><a href="https://github.com/ajlalkhawaja" target="_blank" rel="noreferrer">GitHub profile <Arrow /></a></div></div>
          <div className="caseStudyGrid"><div><span>THE CHALLENGE</span><p>{activeProject.challenge}</p></div><div><span>MY CONTRIBUTION</span><p>{activeProject.contribution}</p></div><div><span>THE OUTCOME</span><p>{activeProject.outcome}</p></div></div>
          <div className="caseStack">{activeProject.stack.map((item) => <span key={item}>{item}</span>)}</div>
        </article>
      </section>

      <ProofLab />

      <section className="journey sectionShell" id="journey">
        <div className="sectionHeading" data-reveal><div><p className="eyebrow">04 / Journey</p><h2>Experience that ships.<br /><em>Not just experiments.</em></h2></div><p>Frontend ownership across cross-functional teams, production releases and client-facing enterprise programmes.</p></div>
        <div className="journeyGrid">
          <div className="timeline" data-reveal>
            <article><div className="timelineYear">2024 — 2026</div><div className="timelinePoint" /><div><p>Smart Vision for Information Systems · Abu Dhabi</p><h3>Frontend Developer</h3><span>React and Angular delivery for UAE healthcare, government and enterprise clients. Bilingual UI, integrations, UAT and production releases.</span></div></article>
            <article><div className="timelineYear">2018 — 2024</div><div className="timelinePoint" /><div><p>Systems Limited · Lahore</p><h3>Consultant Frontend Developer</h3><span>Full-cycle frontend development, reusable component architecture, code reviews, mentoring and Agile delivery across enterprise applications.</span></div></article>
          </div>
          <div className="skillStack" data-reveal>{skillGroups.map((group, index) => <article key={group[0]}><div><span>0{index + 1}</span><h3>{group[0]}</h3></div><p>{group.slice(1).map((item) => <i key={item}>{item}</i>)}</p></article>)}</div>
        </div>
      </section>

      <section className="contact sectionShell" id="contact" data-reveal>
        <div className="contactOrb" aria-hidden="true"><span /><i /><b /></div>
        <p className="eyebrow">05 / Start a conversation</p>
        <h2>Have a complex product?<br /><em>Let&apos;s make it feel simple.</em></h2>
        <p className="contactLead">Available immediately for senior frontend roles, UAE opportunities and international remote collaborations.</p>
        <div className="contactActions"><a className="contactPrimary" href="mailto:ajlalkhawaja1@gmail.com">Email Ajlal <Arrow /></a><a href="/Ajlal_Haider_Senior_Frontend_Engineer_Resume.pdf" download>Download résumé <Arrow /></a><button onClick={copyEmail}>{copied ? "Email copied ✓" : "Copy email"}</button></div>
        <div className="contactCards"><a href="mailto:ajlalkhawaja1@gmail.com"><small>EMAIL</small><strong>ajlalkhawaja1@gmail.com</strong><Arrow /></a><a href="tel:+971508840071"><small>CALL / WHATSAPP</small><strong>+971 50 884 0071</strong><Arrow /></a><a href="https://github.com/ajlalkhawaja" target="_blank" rel="noreferrer"><small>CODE</small><strong>github.com/ajlalkhawaja</strong><Arrow /></a></div>
      </section>

      <footer><a className="brand" href="#top"><BrandMark /><span>Ajlal Haider<small>Senior Frontend Engineer</small></span></a><p>React · Angular · TypeScript · UI Engineering</p><div><a href="https://www.linkedin.com/in/ajlal-haider-khawaja/" target="_blank" rel="noreferrer">LinkedIn</a><a href="https://github.com/ajlalkhawaja" target="_blank" rel="noreferrer">GitHub</a><span>© {new Date().getFullYear()}</span></div></footer>
    </main>
  );
}
