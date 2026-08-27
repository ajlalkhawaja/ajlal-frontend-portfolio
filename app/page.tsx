"use client";

import {
  ArrowDown, ArrowUpRight, Braces, Check, Code2, Download, Gauge,
  BriefcaseBusiness, GitBranch, Globe2, Layers3, Mail, MapPin, Menu, X,
} from "lucide-react";
import { useEffect, useState } from "react";

type Project = {
  id: string; number: string; client: string; title: string; category: string;
  summary: string; challenge: string; contribution: string[]; css: string[];
  outcome: string; stack: string[]; visual: string;
};

const projects: Project[] = [
  {
    id: "seha", number: "01", client: "SEHA", title: "Digital Healthcare & Visa Screening",
    category: "Healthcare · UAE", visual: "health",
    summary: "Responsive bilingual healthcare workflows built for desktop and a dedicated Microsoft Surface tablet experience.",
    challenge: "Complex clinical and visa-screening journeys had to remain fast, clear and reliable across desktop, tablet, English and Arabic layouts.",
    contribution: [
      "Created a new Surface-first frontend layout for healthcare and visa workflows.",
      "Built reusable form, status, validation and navigation components.",
      "Integrated REST APIs and supported UAT, release checks and production fixes.",
    ],
    css: [
      "CSS Grid layouts that reflow from kiosk to tablet without duplicated markup",
      "Logical properties and RTL-safe spacing for Arabic",
      "Large touch targets, focus states and readable healthcare form density",
    ],
    outcome: "Improved page-load performance by more than 40% through lazy loading, code splitting and rendering optimization.",
    stack: ["Angular", "TypeScript", "SCSS", "RxJS", "REST APIs", "i18n"],
  },
  {
    id: "adio", number: "02", client: "ADIO", title: "Digital Service Applications",
    category: "Government · Abu Dhabi", visual: "portal",
    summary: "Enterprise digital-service interfaces that turn multi-step government requirements into clear, trackable user journeys.",
    challenge: "Dense business rules, multiple user states and API-driven processes needed to feel simple without hiding essential information.",
    contribution: [
      "Translated product and design requirements into modular frontend flows.",
      "Developed reusable service cards, step patterns and responsive data views.",
      "Collaborated with backend, QA and product teams through delivery and release.",
    ],
    css: [
      "Token-based surfaces and status colors for a consistent service language",
      "Fluid type and container-aware layouts for dense modules",
      "Accessible hover, active, error and keyboard-focus states",
    ],
    outcome: "Delivered a maintainable interface system supporting complex service journeys across device sizes.",
    stack: ["Angular", "TypeScript", "SCSS", "REST APIs", "Git"],
  },
  {
    id: "central-bank", number: "03", client: "CENTRAL BANK UAE", title: "Space Management System",
    category: "Enterprise · UAE", visual: "space",
    summary: "A data-rich workspace for understanding occupancy, facilities and space allocation through a calm operational interface.",
    challenge: "Operational data, filters and management actions competed for limited screen space and needed a clear visual hierarchy.",
    contribution: [
      "Built dashboard modules, filter controls and structured management views.",
      "Connected interface states to backend services and normalized loading behavior.",
      "Created reusable patterns for tables, summaries and action feedback.",
    ],
    css: [
      "Dense responsive grids with controlled overflow",
      "Sticky table regions and spatial hierarchy without visual clutter",
      "Skeleton, empty and selected states sharing one spacing system",
    ],
    outcome: "Made complex operational information easier to scan and manage through consistent frontend patterns.",
    stack: ["Angular", "TypeScript", "SCSS", "REST APIs", "Charts"],
  },
  {
    id: "dof", number: "04", client: "DEPARTMENT OF FINANCE", title: "Government Finance Portal",
    category: "Government · Abu Dhabi", visual: "finance",
    summary: "A structured government portal designed around clarity, reliable task completion and reusable frontend modules.",
    challenge: "Financial workflows required high information density while preserving clear actions, validation and responsive behavior.",
    contribution: [
      "Implemented responsive pages from approved UI/UX specifications.",
      "Created reusable input, summary and notification patterns.",
      "Resolved cross-browser layout issues and supported production releases.",
    ],
    css: [
      "Predictable form rhythm using shared spacing and sizing tokens",
      "Responsive tables that preserve context on narrow screens",
      "Print-aware and accessible states for formal workflows",
    ],
    outcome: "Strengthened consistency and usability across a complex public-sector application.",
    stack: ["React", "TypeScript", "SCSS", "Redux", "REST APIs"],
  },
  {
    id: "cheque-ocr", number: "05", client: "R&D", title: "Client-side Cheque OCR",
    category: "Research & Development", visual: "ocr",
    summary: "A browser-only OCR prototype that extracts configured cheque fields without sending sensitive images to a server.",
    challenge: "OCR accuracy changed with lighting, skew, noise and cheque layouts, while processing had to remain client-side.",
    contribution: [
      "Designed configurable image regions for targeted field extraction.",
      "Implemented preprocessing experiments with OpenCV.js before OCR.",
      "Built an Angular interface for upload, region tuning, processing and results.",
    ],
    css: [
      "Layered image overlays with responsive coordinate mapping",
      "Clear processing, success and low-confidence states",
      "Tool-like controls usable on laptop and tablet widths",
    ],
    outcome: "Proved the feasibility of configurable, privacy-conscious cheque extraction directly in the browser.",
    stack: ["Angular", "TypeScript", "Tesseract.js", "OpenCV.js", "Canvas"],
  },
  {
    id: "enterprise", number: "06", client: "UAE ENTERPRISE", title: "Government & Enterprise Platforms",
    category: "Multi-client Delivery", visual: "enterprise",
    summary: "Frontend delivery across ADNOC, MODON, ADNEC, Abu Dhabi Police and smart attendance/reporting products.",
    challenge: "Different brands and workflows needed dependable delivery without sacrificing component quality or cross-device behavior.",
    contribution: [
      "Delivered responsive modules across React and Angular codebases.",
      "Integrated APIs, handled defects and supported UAT and releases.",
      "Worked closely with designers, backend engineers, QA and stakeholders.",
    ],
    css: [
      "Reusable responsive shells adaptable to different brand systems",
      "Cross-browser layouts and resilient content wrapping",
      "Shared component states that reduce one-off CSS fixes",
    ],
    outcome: "Built a broad record of dependable frontend delivery across high-impact UAE organizations.",
    stack: ["React", "Angular", "TypeScript", "Redux", "SCSS", "REST APIs"],
  },
];

const ui = {
  en: {
    nav: ["Work", "Expertise", "About", "Contact"], available: "Available immediately · UAE Golden Visa",
    eyebrow: "Senior Frontend Engineer · Abu Dhabi", a: "I BUILD", b: "INTERFACES", d: "PEOPLE TRUST.",
    intro: "Eight+ years turning complex healthcare, government and enterprise requirements into fast, accessible and maintainable frontend systems.",
    view: "View selected work", resume: "Download résumé", work: "Selected work / 06 projects",
    workTitle: "Complex products. Clear interfaces.", workIntro: "Each case study focuses on the frontend decisions behind the screen—not just the final pixels.",
    challenge: "The challenge", contribution: "My contribution", css: "CSS & interface system", outcome: "Outcome",
    expertise: "Frontend system / 04 pillars", expertiseTitle: "CSS is architecture, not decoration.",
    about: "About / collaboration", aboutTitle: "Built for teams that ship serious products.",
    aboutBody: "I work between design intent and production reality—partnering with product, UX, backend and QA to turn difficult requirements into interfaces people can use confidently.",
    contact: "Available for UAE & remote roles", contactTitle: "Let’s build something dependable.",
    contactBody: "Based in Abu Dhabi. UAE Golden Visa holder and available to join immediately.", email: "Email me",
  },
  ar: {
    nav: ["المشاريع", "الخبرات", "نبذة", "تواصل"], available: "متاح للانضمام فوراً · الإقامة الذهبية الإماراتية",
    eyebrow: "مهندس واجهات أمامية أول · أبوظبي", a: "أبني", b: "واجهات", d: "يثق بها الناس.",
    intro: "أكثر من ثماني سنوات في تحويل متطلبات الرعاية الصحية والحكومة والمؤسسات إلى أنظمة واجهات سريعة ومتاحة وقابلة للصيانة.",
    view: "استعرض المشاريع", resume: "تحميل السيرة الذاتية", work: "أعمال مختارة / 06 مشاريع",
    workTitle: "منتجات معقدة. واجهات واضحة.", workIntro: "تركز كل دراسة حالة على قرارات الواجهة الأمامية وراء الشاشة، وليس على الشكل النهائي فقط.",
    challenge: "التحدي", contribution: "مساهمتي", css: "نظام CSS والواجهة", outcome: "النتيجة",
    expertise: "نظام الواجهة / 04 ركائز", expertiseTitle: "CSS بنية هندسية، وليس مجرد زخرفة.",
    about: "نبذة / التعاون", aboutTitle: "خبرة لفرق تطلق منتجات جدية.",
    aboutBody: "أربط بين نية التصميم وواقع الإنتاج، وأتعاون مع فرق المنتج وتجربة المستخدم والخلفية والجودة لتحويل المتطلبات الصعبة إلى واجهات موثوقة.",
    contact: "متاح لفرص الإمارات والعمل عن بُعد", contactTitle: "لنبنِ شيئاً يمكن الاعتماد عليه.",
    contactBody: "مقيم في أبوظبي، أحمل الإقامة الذهبية الإماراتية ومتاح للانضمام فوراً.", email: "راسلني",
  },
};

function Visual({ type, label }: { type: string; label: string }) {
  return <div className={`project-visual visual-${type}`} aria-hidden="true">
    <div className="visual-topbar"><span/><span/><span/><small>{label}</small></div>
    <div className="visual-stage"><div className="visual-sidebar"><i/><i/><i/><i/></div>
      <div className="visual-content"><div className="visual-kicker"/><div className="visual-title"/>
        <div className="visual-grid"><div className="visual-card visual-card-wide"><b/><em/><em/><em/></div>
          <div className="visual-card visual-metric"><strong>{type === "ocr" ? "OCR" : type === "health" ? "40%" : "UI"}</strong><em/></div>
          <div className="visual-card visual-chart"><span/><span/><span/><span/><span/></div></div>
      </div>
    </div>
  </div>;
}

export default function Home() {
  const [lang, setLang] = useState<"en" | "ar">("en");
  const [menu, setMenu] = useState(false);
  const [cursor, setCursor] = useState({ x: -80, y: -80, active: false });
  const c = ui[lang];

  useEffect(() => {
    const move = (e: MouseEvent) => setCursor(v => ({ ...v, x: e.clientX, y: e.clientY }));
    const over = (e: MouseEvent) => setCursor(v => ({ ...v, active: Boolean((e.target as HTMLElement).closest("a,button,.project-visual")) }));
    addEventListener("mousemove", move); document.addEventListener("mouseover", over);
    return () => { removeEventListener("mousemove", move); document.removeEventListener("mouseover", over); };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(e => e.isIntersecting && e.target.classList.add("is-visible")), { threshold: .12 });
    document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [lang]);

  const ids = ["work", "expertise", "about", "contact"];
  const pillars = [
    [<Layers3 key="i"/>, "Responsive systems", "Grid, flex, container-aware layouts and design tokens that stay coherent across screens."],
    [<Globe2 key="i"/>, "Bilingual interfaces", "Logical CSS properties, RTL direction, type and spacing that genuinely work in Arabic."],
    [<Gauge key="i"/>, "Measured performance", "Code splitting, lazy loading and less work on the critical rendering path."],
    [<Braces key="i"/>, "Maintainable components", "React and Angular interfaces organized around explicit states and reuse."],
  ];

  return <main id="top" dir={lang === "ar" ? "rtl" : "ltr"} className={`site-shell ${lang === "ar" ? "is-rtl" : ""}`}>
    <div className="noise"/><div className={`cursor ${cursor.active ? "is-active" : ""}`} style={{ transform: `translate3d(${cursor.x}px,${cursor.y}px,0)` }}/>
    <div
      className="availability-ticker"
      aria-label="Employment availability"
    >
      <div className="availability-track">
        <div className="ticker-group">
          <strong>AVAILABLE IMMEDIATELY</strong>
          <i />
          <span>UAE GOLDEN VISA</span>
          <i />
          <span>ABU DHABI, UAE</span>
          <i />
          <span>OPEN TO UAE & REMOTE OPPORTUNITIES</span>
          <i />
        </div>

        <div className="ticker-group" aria-hidden="true">
          <strong>AVAILABLE IMMEDIATELY</strong>
          <i />
          <span>UAE GOLDEN VISA</span>
          <i />
          <span>ABU DHABI, UAE</span>
          <i />
          <span>OPEN TO UAE & REMOTE OPPORTUNITIES</span>
          <i />
          <span>email: ajlalkhawaja1@gmail.com</span>
          <i />
          <span>+971 50 884 0071</span>
        </div>
      </div>
    </div>
    <header className="site-header">
      <a className="brand" href="#top"><span>AJLAL</span><small>FRONTEND / 08+</small></a>
      <nav className={`site-nav ${menu ? "is-open" : ""}`}>
        {c.nav.map((item, i) => <a key={item} href={`#${ids[i]}`} onClick={() => setMenu(false)}><small>0{i + 1}</small>{item}</a>)}
        <div className="language-switch"><button className={lang === "en" ? "active" : ""} onClick={() => setLang("en")}>EN</button><span>/</span><button className={lang === "ar" ? "active" : ""} onClick={() => setLang("ar")}>AR</button></div>
      </nav>
      <button className="menu-button" onClick={() => setMenu(!menu)} aria-label="Toggle navigation">{menu ? <X/> : <Menu/>}</button>
    </header>

    <section className="hero section-frame">
      <div className="hero-grid"/><div className="hero-copy reveal is-visible">
        <div className="status-line"><span className="pulse"/>{c.available}</div><p className="eyebrow">{c.eyebrow}</p>
        <h1><span>{c.a}</span><span className="outline-word">{c.b}</span><span>{c.d}</span></h1>
        <p className="hero-intro">{c.intro}</p>
        <div className="hero-actions"><a className="button button-primary" href="#work">{c.view}<ArrowDown/></a><a className="button button-ghost" href="/Ajlal_Haider_Senior_Frontend_Engineer_ATS_Resume.pdf" download>{c.resume}<Download/></a></div>
      </div>
      <figure className="hero-portrait reveal is-visible"><div className="portrait-frame">{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/ajlal-portrait-clean.png" width="1024" height="1536" alt="Ajlal Haider Khawaja, Senior Frontend Engineer"/><span className="portrait-scan"/></div><figcaption><span>AJLAL HAIDER KHAWAJA</span><small>REACT · ANGULAR · TYPESCRIPT</small></figcaption></figure>
      <div className="hero-index"><span>01</span><i/><small>06</small></div><a className="scroll-cue" href="#work"><span>SCROLL TO EXPLORE</span><ArrowDown/></a>
    </section>

    <div className="client-strip"><span>SEHA</span><i/><span>ADIO</span><i/><span>CENTRAL BANK UAE</span><i/><span>DEPARTMENT OF FINANCE</span><i/><span>ADNOC · MODON · ADNEC</span></div>

    <section id="work" className="work-section section-frame">
      <div className="section-heading reveal"><p className="section-label"><span>01</span>{c.work}</p><h2>{c.workTitle}</h2><p>{c.workIntro}</p></div>
      <div className="project-index reveal">{projects.map(p => <a href={`#${p.id}`} key={p.id}><small>{p.number}</small><span>{p.client}</span><ArrowUpRight/></a>)}</div>
      <div className="projects-stack">{projects.map(p => <article id={p.id} className="project-case reveal" key={p.id}>
        <div className="project-meta"><span>{p.number}</span><p>{p.category}</p></div>
        <div className="project-lead"><p className="project-client">{p.client}</p><h3>{p.title}</h3><p className="project-summary">{p.summary}</p><div className="project-stack">{p.stack.map(x => <span key={x}>{x}</span>)}</div></div>
        <Visual type={p.visual} label={p.client}/>
        <div className="case-grid">
          <div className="case-block"><span className="case-number">A</span><h4>{c.challenge}</h4><p>{p.challenge}</p></div>
          <div className="case-block"><span className="case-number">B</span><h4>{c.contribution}</h4><ul>{p.contribution.map(x => <li key={x}><Check/>{x}</li>)}</ul></div>
          <div className="case-block css-block"><span className="case-number">C</span><h4>{c.css}</h4><ul>{p.css.map(x => <li key={x}><Code2/>{x}</li>)}</ul></div>
          <div className="case-block outcome-block"><span className="case-number">D</span><h4>{c.outcome}</h4><p>{p.outcome}</p></div>
        </div>
      </article>)}</div>
    </section>

    <section id="expertise" className="expertise-section section-frame">
      <div className="section-heading reveal"><p className="section-label"><span>02</span>{c.expertise}</p><h2>{c.expertiseTitle}</h2></div>
      <div className="pillars">{pillars.map((p, i) => <article className="pillar reveal" key={i}><div>{p[0]}<small>0{i + 1}</small></div><h3>{p[1]}</h3><p>{p[2]}</p></article>)}</div>
      <div className="tech-marquee"><div><span>REACT</span><i/><span>ANGULAR</span><i/><span>TYPESCRIPT</span><i/><span>SCSS</span><i/><span>REDUX</span><i/><span>REST APIs</span></div></div>
    </section>

    <section id="about" className="about-section section-frame"><div className="about-number reveal">08<span>+</span></div><div className="about-copy reveal"><p className="section-label"><span>03</span>{c.about}</p><h2>{c.aboutTitle}</h2><p>{c.aboutBody}</p><div className="about-facts"><span><MapPin/>Abu Dhabi, UAE</span><span><Globe2/>English / Arabic UI</span><span><Code2/>React + Angular</span></div></div></section>

    <section id="contact" className="contact-section section-frame"><p className="section-label reveal"><span>04</span>{c.contact}</p><h2 className="reveal">{c.contactTitle}</h2><p className="contact-copy reveal">{c.contactBody}</p><div className="contact-actions reveal"><a className="contact-primary" href="mailto:ajlalkhawaja1@gmail.com"><span>{c.email}</span><Mail/></a><a href="https://www.linkedin.com/in/ajlal-haider-khawaja/" target="_blank" rel="noreferrer"><BriefcaseBusiness/>LinkedIn<ArrowUpRight/></a><a href="https://github.com/ajlalkhawaja" target="_blank" rel="noreferrer"><GitBranch/>GitHub<ArrowUpRight/></a></div></section>
    <footer><a href="#top">AJLAL / FRONTEND</a><span>© 2026 · Engineered with React, TypeScript & CSS</span><a href="mailto:ajlalkhawaja1@gmail.com">ajlalkhawaja1@gmail.com</a></footer>
  </main>;
}
