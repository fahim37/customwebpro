"use client";

import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent,
} from "react";
import {
  ArrowUpRight,
  ArrowDown,
  ArrowRight,
  Asterisk,
  Check,
  Code2,
  Cpu,
  Globe2,
  Menu,
  Pause,
  Play,
  Plus,
  Smartphone,
  Sparkles,
  Star,
  X,
} from "lucide-react";
import Motion from "./motion";
import ProjectBrief from "./project-brief";
import sourceContent from "@/research/content-catalog.json";
import Manifesto from "./manifesto";
import TechnologyStack from "./technology-stack";
import "./service-panel.css";
import "./brand.css";
import "./project-stack.css";

const fiverr = "https://www.fiverr.com/customweb_pro";
const imageRoot = "/images/original/";
const projects = [
  {
    number: "01",
    title: "A taste of something different.",
    name: "AI-powered restaurant website",
    category: "Websites",
    tags: ["WEB DESIGN", "DEVELOPMENT"],
    image: "Restaurant-Website-UI-Design-1.webp",
    color: "peach",
    url: "https://customwebpro.webmastery.tech/ai-powered-restaurant-website/",
    description:
      "An AI-powered restaurant website, bringing together website design, development, and ongoing maintenance in one cohesive digital experience.",
  },
  {
    number: "02",
    title: "Finance, with a fresh perspective.",
    name: "Financial services landing page",
    category: "Websites",
    tags: ["WEB DESIGN", "AI DEVELOPMENT"],
    image: "Modern-SaaS-workspace-with-sleek-devices.webp",
    color: "lavender",
    url: "https://customwebpro.webmastery.tech/landing-page-for-a-financial-services-company/",
    description:
      "A landing page for a financial services company. A project spanning AI development, website design, and full-stack website development.",
  },
  {
    number: "03",
    title: "Built on a stronger foundation.",
    name: "Construction company website",
    category: "Websites",
    tags: ["DEVELOPMENT", "DIGITAL EXPERIENCE"],
    image: "Construction-company-website-1.webp",
    color: "sage",
    url: "https://customwebpro.webmastery.tech/website-development-for-a-construction-company/",
    description:
      "Website development for a construction company, connecting a practical business with a considered digital presence through AI development, design, and development.",
  },
  {
    number: "04",
    title: "Less busywork. More possibility.",
    name: "AI writing & workflow platform",
    category: "AI & SaaS",
    tags: ["AI & SAAS", "PRODUCT DESIGN"],
    image: "Untitled-1.webp",
    color: "butter",
    url: "https://customwebpro.webmastery.tech/ai-writing-workflow-website-design/",
    description:
      "Website design for an AI writing and workflow platform, presenting intelligent tools through a clear, modern interface.",
  },
];
const services = [
  {
    name: "Websites that work harder.",
    label: "Web design & development",
    icon: Globe2,
    description:
      "Beautiful on the surface. Powerful underneath. Custom websites, full-stack platforms, and WordPress experiences built around your business.",
    tags: ["Custom websites", "WordPress", "Full-stack development"],
  },
  {
    name: "Intelligence, built right in.",
    label: "AI solutions & automation",
    icon: Cpu,
    description:
      "Turn repetitive work into room to grow. From AI agents and chatbots to automation systems and SaaS platforms, put intelligence to work for your business.",
    tags: ["AI agents & chatbots", "Business automation", "SaaS platforms"],
  },
  {
    name: "Your next big thing. In their pocket.",
    label: "AI mobile applications",
    icon: Smartphone,
    description:
      "Bring your idea to life with an AI-powered mobile application. Smarter, faster, personalized experiences that connect your business with the people who matter.",
    tags: ["Mobile development", "AI integration", "Personalized experiences"],
  },
  {
    name: "Learn by making something real.",
    label: "Interactive coding lessons",
    icon: Code2,
    description:
      "Build confidence through practical, interactive coding lessons. Get hands-on with exercises and real programming projects, guided by an experienced developer.",
    tags: ["Practical lessons", "Hands-on projects", "Developer mentoring"],
  },
];
const reviews = [
  {
    quote: "Pros absolutely great team to work with.",
    name: "Mordechaib",
    country: "Israel",
    initials: "M",
    color: "blue",
  },
  {
    quote:
      "Delivered the first phase on time and moving on to the second phase. Easy to work with.",
    name: "Purebullion",
    country: "United States",
    initials: "P",
    color: "green",
  },
  {
    quote:
      "Phase 1 is an important step in the project and we have a good foundation to move forward with.",
    name: "V2alarry",
    country: "United States",
    initials: "V",
    color: "orange",
  },
];
const faqs = [
  [
    "What can we build together?",
    "CustomWeb Pro offers AI-powered website development, mobile app development, full-stack web solutions, SaaS platforms, AI agents, chatbots, business automation, WordPress website design, and interactive online coding lessons.",
  ],
  [
    "Can you build a custom AI website or mobile app?",
    "Yes. Biplob builds custom AI-powered websites and mobile applications around your business needs, including AI agents, chatbots, automation, and full-stack platforms. Share your idea on Fiverr to discuss the right approach.",
  ],
  [
    "Can you redesign my existing WordPress website?",
    "Yes. WordPress website design and redesign are available, whether you need a fresh visual direction, a new business website, or a more useful experience for your visitors.",
  ],
  [
    "What happens after the project launches?",
    "Ongoing support, maintenance, and customization can be discussed as part of your project. We’ll agree on the scope you need before work begins.",
  ],
  [
    "How much does a project cost?",
    "WordPress projects start at $90, and AI websites and software start at $150. Hourly work is available at $25 per hour. Your final quote depends on the agreed scope, features, and requirements.",
  ],
];

function Logo() {
  return (
    <a
      className="brand brand-original"
      href="#home"
      aria-label="CustomWebPro home"
    >
      <Image
        src={`${imageRoot}Screenshot-removebg-preview.png`}
        alt="CustomWebPro"
        width={362}
        height={88}
        sizes="(max-width: 600px) 230px, 250px"
      />
    </a>
  );
}
function SectionLabel({
  number,
  children,
  light = false,
}: {
  number: string;
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <div className={`section-label ${light ? "label-light" : ""}`}>
      <span className="label-square" />
      {children}
      <span className="label-number">/{number}</span>
    </div>
  );
}
function Tilt({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  function move(event: PointerEvent<HTMLDivElement>) {
    if (
      event.pointerType !== "mouse" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const box = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty(
      "--tilt-x",
      `${((event.clientY - box.top) / box.height - 0.5) * -5}deg`,
    );
    event.currentTarget.style.setProperty(
      "--tilt-y",
      `${((event.clientX - box.left) / box.width - 0.5) * 5}deg`,
    );
  }
  function reset(event: PointerEvent<HTMLDivElement>) {
    event.currentTarget.style.setProperty("--tilt-x", "0deg");
    event.currentTarget.style.setProperty("--tilt-y", "0deg");
  }
  return (
    <div className={className} onPointerMove={move} onPointerLeave={reset}>
      {children}
    </div>
  );
}

function FounderPortrait({ hero = false }: { hero?: boolean }) {
  return (
    <div className="portrait-composition" data-reveal={hero ? undefined : ""}>
      <div className="portrait-orbit" data-scroll-rotate="8" />
      <div
        className="portrait-large-type"
        aria-hidden="true"
        data-parallax="0.12"
        data-parallax-max="35"
      >
        hello.
      </div>
      <div
        className="portrait-image"
        data-parallax="-0.065"
        data-parallax-max="25"
      >
        <Image
          src={`${imageRoot}Confident-Business-Portrait-Cutout.png`}
          alt="Biplob Hossain, AI and Full Stack Developer behind CustomWebPro"
          fill
          preload={hero}
          sizes={
            hero
              ? "(max-width: 600px) 90vw, (max-width: 1100px) 48vw, 640px"
              : "(max-width: 600px) 90vw, (max-width: 1100px) 45vw, 545px"
          }
        />
      </div>
      <div className="portrait-sticker" data-scroll-rotate="16">
        A LITTLE
        <br />
        OBSESSED WITH
        <br />
        <span>the details. ↗</span>
      </div>
      <div className="portrait-caption">
        <span>BIPLOB HOSSAIN</span>
        <span>FOUNDER & DEVELOPER ↗</span>
      </div>
    </div>
  );
}

export default function Agency() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [motionPaused, setMotionPaused] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const [filter, setFilter] = useState("All work");
  const [activeProject, setActiveProject] = useState<
    (typeof projects)[number] | null
  >(null);
  const [reviewIndex, setReviewIndex] = useState(0);
  const projectDialog = useRef<HTMLDialogElement>(null);
  const menuTrigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!activeProject) return;
    const dialog = projectDialog.current;
    dialog?.showModal();
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = old;
    };
  }, [activeProject]);
  const visibleProjects = projects.filter(
    (project) => filter === "All work" || project.category === filter,
  );
  const projectDetails = activeProject
    ? sourceContent.projects.find(
        (project) => project.url === activeProject.url,
      )
    : undefined;

  useEffect(() => {
    if (!menuOpen) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setMenuOpen(false);
        menuTrigger.current?.focus({ preventScroll: true });
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [menuOpen]);

  return (
    <div className={motionPaused ? "motion-paused" : undefined}>
      <Motion />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <div className="header-inner">
          <Logo />
          <button
            ref={menuTrigger}
            type="button"
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="main-navigation"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
          <nav
            id="main-navigation"
            aria-label="Main navigation"
            className={`main-nav ${menuOpen ? "menu-open" : ""}`}
          >
            {[
              ["Work", "work"],
              ["Services", "services"],
              ["About", "about"],
              ["Reviews", "reviews"],
            ].map(([label, id]) => (
              <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>
                {label}
                <span>↗</span>
              </a>
            ))}
            <a
              className="mobile-contact"
              href="#contact"
              onClick={() => setMenuOpen(false)}
            >
              Let’s talk <ArrowUpRight size={16} />
            </a>
          </nav>
          <a href="#contact" className="header-cta">
            Have a project in mind?{" "}
            <span>
              Let’s talk <ArrowUpRight size={15} />
            </span>
          </a>
        </div>
      </header>

      <main id="main">
        <section
          className="hero page-container"
          id="home"
          data-scroll-section
          data-scroll-hero
        >
          <div className="hero-topline">
            <span>
              <span className="live-dot" /> INDEPENDENT MINDS. EXTRAORDINARY
              POSSIBILITIES.
            </span>
            <span>DESIGN. CODE. A LITTLE MAGIC.</span>
          </div>
          <div className="hero-main">
            <div className="hero-copy">
              <div className="hero-kicker">
                <span className="tiny-line" /> YOUR VISION. OUR NEXT OBSESSION.
              </div>
              <h1>
                Big ideas.
                <br />
                Intelligent builds.
                <br />
                <span className="hero-last">
                  Real <em>impact.</em>
                  <svg viewBox="0 0 360 22" aria-hidden="true">
                    <path d="M4 15Q150 -3 350 10M40 21Q220 8 320 16" />
                  </svg>
                </span>
              </h1>
              <p>
                We turn your what-if into what’s next.
                <br className="desktop-break" /> Standout websites, AI-powered
                apps, and digital
                <br className="desktop-break" /> experiences made to move your
                business forward.
              </p>
              <div className="hero-actions">
                <ProjectBrief className="button button-blue">
                  Let’s build something <ArrowUpRight size={19} />
                </ProjectBrief>
                <a className="text-link" href="#work">
                  Explore our work <ArrowDown size={17} />
                </a>
              </div>
              <div className="hero-proof">
                <div className="proof-avatars" aria-hidden="true">
                  <span>M</span>
                  <span>P</span>
                  <span>V</span>
                  <span>+</span>
                </div>
                <div>
                  <div className="proof-stars">
                    ★★★★★ <b>4.9/5</b>
                  </div>
                  <span>AI development on Fiverr · 265 reviews</span>
                </div>
              </div>
            </div>
            <div className="hero-art hero-portrait">
              <FounderPortrait hero />
              <div className="art-caption">
                <span>HUMAN CREATIVITY. INTELLIGENT BUILDS.</span>
                <button
                  className="art-interact motion-toggle"
                  onClick={() => setMotionPaused(!motionPaused)}
                  aria-pressed={motionPaused}
                  aria-label={
                    motionPaused ? "Resume animations" : "Pause animations"
                  }
                >
                  {motionPaused ? "RESUME MOTION" : "PAUSE MOTION"}
                  {motionPaused ? <Play size={11} /> : <Pause size={11} />}
                </button>
              </div>
            </div>
          </div>
          <div className="hero-bottom">
            <a href="#about" className="founder-chip">
              <span className="founder-avatar">
                <Image
                  src={`${imageRoot}Confident-Business-Portrait-Cutout.png`}
                  alt=""
                  width={40}
                  height={45}
                />
              </span>
              <span>
                Led by <strong>Biplob Hossain</strong>
                <small>AI & Full Stack Developer</small>
              </span>
              <ArrowUpRight size={16} />
            </a>
            <div className="hero-bottom-note">
              A small studio with a big-picture mindset.
              <br />
              <strong>Built on experience. Driven by curiosity.</strong>
            </div>
            <a className="scroll-cue" href="#work">
              SCROLL TO DISCOVER{" "}
              <span>
                <ArrowDown size={17} />
              </span>
            </a>
          </div>
        </section>

        <div
          className="ticker"
          aria-label="Web development, AI solutions, mobile applications, digital experiences"
        >
          <div className="ticker-track">
            {[0, 1].map((i) => (
              <div className="ticker-set" key={i} aria-hidden={i === 1}>
                {[
                  "CUSTOM WEBSITES",
                  "AI SOLUTIONS",
                  "MOBILE APPLICATIONS",
                  "DIGITAL EXPERIENCES",
                ].map((word) => (
                  <span key={word}>
                    {word}
                    <Asterisk />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        <section
          className="work-section page-container section-space"
          id="work"
          data-scroll-section
        >
          <SectionLabel number="01">SELECTED WORK</SectionLabel>
          <div className="section-heading" data-reveal>
            <h2>
              Proof over
              <br />
              <span className="serif">promises.</span>
              <span className="blue-period">↗</span>
            </h2>
            <div className="heading-aside">
              <p>
                A few ideas we’ve helped turn into
                <br />
                something real. Yours could be next.
              </p>
              <div className="filter-group" aria-label="Filter projects">
                {["All work", "Websites", "AI & SaaS"].map((item) => (
                  <button
                    key={item}
                    aria-pressed={filter === item}
                    className={filter === item ? "active" : ""}
                    onClick={() => setFilter(item)}
                  >
                    {item}
                    {item === "All work" && <span>04</span>}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div
            className="project-grid"
            data-reveal
            data-scroll-stack
            data-stack-top="118"
            style={{ "--stack-count": visibleProjects.length } as CSSProperties}
          >
            {visibleProjects.map((project, index) => (
              <article
                className="project"
                key={project.number}
                data-stack-card
                style={{ "--stack-index": index } as CSSProperties}
              >
                <button
                  className="project-button"
                  onClick={() => setActiveProject(project)}
                  aria-label={`View ${project.name}`}
                >
                  <span className="project-stack-spine" aria-hidden="true">
                    <span className="spine-number">{project.number}</span>
                    <span className="spine-title">{project.name}</span>
                    <span className="spine-category">{project.category}</span>
                    <ArrowUpRight size={13} />
                  </span>
                  <Tilt className={`project-art ${project.color}`}>
                    <div className="project-art-top">
                      <span>CUSTOMWEBPRO — SELECTED WORK</span>
                      <span>/{project.number}</span>
                    </div>
                    <div
                      className="project-browser"
                      data-parallax="-0.14"
                      data-parallax-max="60"
                    >
                      <div className="browser-bar">
                        <span />
                        <span />
                        <span />
                        <div>{project.name.toLowerCase()}</div>
                        <Plus size={10} />
                      </div>
                      <div className="project-image">
                        <Image
                          src={`${imageRoot}${project.image}`}
                          alt={`${project.name} portfolio preview`}
                          fill
                          sizes="(max-width: 700px) 90vw, 45vw"
                        />
                      </div>
                    </div>
                    <span className="project-view">
                      VIEW PROJECT <ArrowUpRight size={18} />
                    </span>
                  </Tilt>
                  <div className="project-info">
                    <div>
                      <div className="project-tags">
                        {project.tags.map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </div>
                      <h3>{project.title}</h3>
                    </div>
                    <span className="project-arrow">
                      <ArrowUpRight size={23} />
                    </span>
                  </div>
                </button>
              </article>
            ))}
          </div>
          <div className="work-footer">
            <span>Every project starts with a conversation.</span>
            <ProjectBrief className="text-link">
              Let’s start yours <ArrowUpRight size={18} />
            </ProjectBrief>
          </div>
        </section>

        <section
          className="scroll-ribbon"
          data-scroll-section
          aria-label="Designed to make an impact"
        >
          <div className="ribbon-line ribbon-line-one" aria-hidden="true">
            <span>GOOD DESIGN.</span>
            <Asterisk />
            <span>REAL IMPACT.</span>
            <Asterisk />
            <span>BIG POSSIBILITIES.</span>
          </div>
          <div className="ribbon-line ribbon-line-two" aria-hidden="true">
            <span>Built to move you.</span>
            <span>Made to matter.</span>
            <span>Built to move you.</span>
          </div>
        </section>

        <section className="services-section" id="services" data-scroll-section>
          <div className="page-container section-space">
            <SectionLabel number="02" light>
              WHAT WE DO
            </SectionLabel>
            <div className="section-heading" data-reveal>
              <h2>
                Good ideas deserve
                <br />
                <span className="serif">great execution.</span>
              </h2>
              <p className="service-intro">
                One creative partner. From the first
                <br />
                spark to the final line of code.
              </p>
            </div>
            <div className="services-layout" data-reveal>
              <div className="service-list">
                {services.map((service, index) => {
                  const ServiceIcon = service.icon;
                  return (
                    <button
                      key={service.label}
                      id={`service-tab-${index}`}
                      className={`service-row ${index === activeService ? "active" : ""}`}
                      onClick={() => setActiveService(index)}
                      aria-expanded={index === activeService}
                      aria-controls="service-detail"
                    >
                      <span className="service-number">0{index + 1}</span>
                      <span className="service-row-label">
                        <ServiceIcon size={21} strokeWidth={1.6} aria-hidden="true" />
                        {service.label}
                      </span>
                      <ArrowUpRight />
                    </button>
                  );
                })}
              </div>
              <div
                className="service-detail"
                id="service-detail"
                aria-labelledby={`service-tab-${activeService}`}
                key={activeService}
              >
                <div
                  className="service-visual service-visual-clean"
                  aria-hidden="true"
                >
                  <span className="service-visual-index">
                    0{activeService + 1} / BUILT WITH PURPOSE
                  </span>
                  <svg
                    className="service-connectors"
                    viewBox="0 0 400 176"
                    fill="none"
                  >
                    <path d="M72 105H132Q144 105 144 93V88H200M200 88H249Q260 88 260 76V64H328" />
                    <path
                      className="service-signal"
                      pathLength="100"
                      d="M72 105H132Q144 105 144 93V88H200H249Q260 88 260 76V64H328"
                    />
                  </svg>
                  <span className="service-visual-node service-node-left">
                    <Code2 size={18} />
                  </span>
                  <div className="service-visual-icon">
                    {(() => {
                      const Icon = services[activeService].icon;
                      return <Icon size={36} strokeWidth={1.5} />;
                    })()}
                  </div>
                  <span className="service-visual-node service-node-right">
                    <Sparkles size={17} />
                  </span>
                  <span className="service-visual-caption">
                    IDEA <span>→</span> EXPERIENCE
                  </span>
                </div>
                <h3>{services[activeService].name}</h3>
                <p>{services[activeService].description}</p>
                <div className="service-pills">
                  {services[activeService].tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <ProjectBrief className="service-cta">
                  Talk about your project <ArrowUpRight size={17} />
                </ProjectBrief>
              </div>
            </div>
            <TechnologyStack />
          </div>
        </section>

        <Manifesto />

        <section
          className="about-section page-container section-space"
          id="about"
          data-scroll-section
        >
          <SectionLabel number="03">THE HUMAN BEHIND THE CODE</SectionLabel>
          <div className="about-grid">
            <FounderPortrait />
            <div className="about-copy" data-reveal>
              <h2>
                Small studio.
                <br />
                Big on <span className="serif">possibility.</span>
              </h2>
              <p className="about-lead">
                Hey, I’m Biplob. I build the kind of digital things that help
                good businesses become great ones.
              </p>
              <p>
                With 6+ years of experience in AI and full-stack development, I
                turn ambitious ideas into websites, mobile apps, automation
                systems, and SaaS platforms that make a real difference.
              </p>
              <p>
                My approach? Stay curious, sweat the details, and make the
                complex feel simple. From our first conversation to your launch
                day, you work directly with the person bringing your idea to
                life.
              </p>
              <a
                className="text-link"
                href={fiverr}
                target="_blank"
                rel="noreferrer"
              >
                A little more about me on Fiverr <ArrowUpRight size={17} />
              </a>
              <div className="about-stats">
                <div>
                  <strong>
                    6<span>+</span>
                  </strong>
                  <span>YEARS OF CRAFT</span>
                </div>
                <div>
                  <strong>
                    1.5<span>K+</span>
                  </strong>
                  <span>CLIENTS TRUSTED US</span>
                </div>
                <div>
                  <strong>
                    4.9<span>/5</span>
                  </strong>
                  <span>AI GIG RATING</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="process-section" data-scroll-section>
          <div className="page-container section-space">
            <div className="process-heading" data-reveal>
              <SectionLabel number="04">HOW WE GET THERE</SectionLabel>
              <h2>
                From “what if”
                <br />
                to <span className="serif">“it’s live.”</span>
              </h2>
              <p>
                A clear process. A shared vision.
                <br />
                Something great at the other end.
              </p>
            </div>
            <div className="process-grid" data-reveal>
              <div className="process-progress" aria-hidden="true" />
              {[
                {
                  title: "Discover",
                  text: "We listen first. Your idea, your audience, your goals. We find the right direction together.",
                  icon: "↗",
                },
                {
                  title: "Design",
                  text: "We turn the plan into an experience. Thoughtful design that feels right and works beautifully.",
                  icon: "✳",
                },
                {
                  title: "Develop",
                  text: "We bring it all to life with clean code, smart integrations, and attention to every detail.",
                  icon: "⌘",
                },
                {
                  title: "Deliver",
                  text: "We refine, test, and get you ready for the world. Your next chapter starts here.",
                  icon: "↗",
                },
              ].map((step, i) => (
                <div className="process-step" key={step.title}>
                  <div className="process-step-top">
                    <span>0{i + 1}</span>
                    <span>{step.icon}</span>
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          className="reviews-section page-container section-space"
          id="reviews"
        >
          <SectionLabel number="05">KIND WORDS. REAL PEOPLE.</SectionLabel>
          <div className="reviews-layout">
            <div className="review-heading" data-reveal>
              <h2>
                Good work.
                <br />
                <span className="serif">Better relationships.</span>
              </h2>
              <div className="review-score">
                <div className="stars">★★★★★</div>
                <span>
                  <strong>4.9/5</strong> from 265 reviews
                </span>
                <a href={fiverr} target="_blank" rel="noreferrer">
                  AI DEVELOPMENT ON FIVERR <ArrowUpRight size={13} />
                </a>
              </div>
              <div className="review-controls">
                <button
                  aria-label="Previous review"
                  onClick={() =>
                    setReviewIndex(
                      (reviewIndex + reviews.length - 1) % reviews.length,
                    )
                  }
                >
                  <ArrowRight className="rotate-arrow" size={20} />
                </button>
                <span>
                  0{reviewIndex + 1}
                  <span> / 03</span>
                </span>
                <button
                  aria-label="Next review"
                  onClick={() =>
                    setReviewIndex((reviewIndex + 1) % reviews.length)
                  }
                >
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
            <div className="review-card" data-reveal>
              <span className="quote-mark" aria-hidden="true">
                “
              </span>
              <div aria-live="polite" aria-atomic="true">
                <div className="review-content" key={reviewIndex}>
                  <blockquote>{reviews[reviewIndex].quote}</blockquote>
                  <div className="review-author">
                    <span
                      className={`review-avatar ${reviews[reviewIndex].color}`}
                    >
                      {reviews[reviewIndex].initials}
                    </span>
                    <div>
                      <strong>{reviews[reviewIndex].name}</strong>
                      <span>{reviews[reviewIndex].country}</span>
                    </div>
                    <span className="review-source">
                      FIVERR CLIENT <Check size={13} />
                    </span>
                  </div>
                </div>
              </div>
              <div className="review-card-footer">
                <span>REAL FEEDBACK. LASTING CONNECTIONS.</span>
                <Star size={14} />
              </div>
            </div>
          </div>
        </section>

        <section className="pricing-section" id="pricing">
          <div className="page-container section-space">
            <SectionLabel number="06">
              AN INVESTMENT IN WHAT’S NEXT
            </SectionLabel>
            <div className="section-heading" data-reveal>
              <h2>
                Big ambitions.
                <br />
                <span className="serif">Clear starting points.</span>
              </h2>
              <p className="pricing-intro">
                A starting point for your next chapter.
                <br />
                Every project is scoped around you.
              </p>
            </div>
            <div className="pricing-grid" data-reveal>
              {[
                {
                  name: "WordPress experiences",
                  detail: "A fresh home for your business.",
                  price: "90",
                  items: [
                    "Website design or redesign",
                    "WordPress development",
                    "Scope tailored to your needs",
                  ],
                  featured: false,
                },
                {
                  name: "AI websites & software",
                  detail: "Bring your ambitious idea to life.",
                  price: "150",
                  items: [
                    "AI-powered websites or mobile apps",
                    "Custom full-stack development",
                    "Built around your business goals",
                  ],
                  featured: true,
                },
              ].map((plan) => (
                <div
                  className={`pricing-card ${plan.featured ? "featured" : ""}`}
                  key={plan.name}
                >
                  <div className="plan-top">
                    <span>
                      {plan.featured ? (
                        <Sparkles size={22} />
                      ) : (
                        <Globe2 size={22} />
                      )}
                    </span>
                    {plan.featured && (
                      <span className="plan-badge">
                        A LITTLE MORE POSSIBILITY
                      </span>
                    )}
                  </div>
                  <h3>{plan.name}</h3>
                  <p>{plan.detail}</p>
                  <div className="plan-price">
                    <span>FROM</span>
                    <strong>${plan.price}</strong>
                    <span>/ PROJECT</span>
                  </div>
                  <div className="plan-rule" />
                  <ul>
                    {plan.items.map((item) => (
                      <li key={item}>
                        <Check size={15} />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <ProjectBrief
                    className={`button ${plan.featured ? "button-blue" : "button-outline"}`}
                  >
                    Let’s talk about it <ArrowUpRight size={18} />
                  </ProjectBrief>
                </div>
              ))}
            </div>
            <div className="hourly-row">
              <div>
                <span className="hourly-icon">
                  <Code2 size={22} />
                </span>
                <div>
                  <strong>Need an extra pair of expert hands?</strong>
                  <span>Flexible support, one hour at a time.</span>
                </div>
              </div>
              <a href={fiverr} target="_blank" rel="noreferrer">
                <strong>$25</strong>
                <span>/ HOUR</span>
                <ArrowUpRight size={22} />
              </a>
            </div>
            <p className="pricing-note">
              Starting prices from our Fiverr profile. Final pricing depends on
              your project scope.
            </p>
          </div>
        </section>

        <section className="faq-section page-container section-space" id="faq">
          <div className="faq-heading" data-reveal>
            <SectionLabel number="07">BEFORE WE SAY HELLO</SectionLabel>
            <h2>
              A few good
              <br />
              <span className="serif">questions.</span>
            </h2>
            <p>
              Still curious about something?
              <br />
              <a href={fiverr} target="_blank" rel="noreferrer">
                Let’s have a conversation <ArrowUpRight size={14} />
              </a>
            </p>
          </div>
          <div className="faq-list" data-reveal>
            {faqs.map(([question, answer], i) => (
              <details key={question} className="faq-item">
                <summary>
                  <span className="faq-number">0{i + 1}</span>
                  <span>{question}</span>
                  <Plus size={19} />
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="contact-orbit" aria-hidden="true" />
          <div className="page-container">
            <div className="contact-top">
              <span>
                <span className="live-dot" /> GREAT THINGS START WITH A HELLO.
              </span>
              <span>YOUR NEXT CHAPTER STARTS HERE.</span>
            </div>
            <div className="contact-main" data-reveal>
              <h2>
                Have a big idea?
                <br />
                Let’s make it <span className="serif">happen.</span>
              </h2>
              <ProjectBrief className="contact-circle">
                <ArrowUpRight />
                <span>LET’S TALK</span>
              </ProjectBrief>
            </div>
            <div className="contact-bottom">
              <p>
                Websites. AI. Apps. Possibilities.
                <br />
                We’re ready when you are.
              </p>
              <a href={fiverr} target="_blank" rel="noreferrer">
                Find us on{" "}
                <strong>
                  fiverr<span>.</span>
                </strong>
                <ArrowUpRight size={20} />
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer page-container">
        <div className="footer-top">
          <Logo />
          <p>
            Thoughtfully designed.
            <br />
            Intelligently built.
          </p>
          <a href="#home" className="back-top">
            BACK TO TOP <ArrowUpRight size={17} />
          </a>
        </div>
        <div className="footer-bottom">
          <span>© 2026 CustomWebPro. All rights reserved.</span>
          <div>
            <a href="#work">Work</a>
            <a href="#services">Services</a>
            <a href="#pricing">Pricing</a>
            <a href="#faq">FAQ</a>
          </div>
          <span>
            MADE WITH CARE. AND A LOT OF COFFEE. <Asterisk size={14} />
          </span>
        </div>
      </footer>

      <dialog
        ref={projectDialog}
        className="project-dialog"
        aria-labelledby="project-dialog-title"
        onClose={() => setActiveProject(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget)
            projectDialog.current?.close();
        }}
      >
        {activeProject && (
          <div className="project-dialog-inner">
            <button
              className="dialog-close"
              onClick={() => projectDialog.current?.close()}
              aria-label="Close project"
            >
              <X size={22} />
            </button>
            <div
              className="project-dialog-scroll"
              tabIndex={0}
              role="region"
              aria-label="Project details"
            >
              <div className={`project-dialog-image ${activeProject.color}`}>
                <Image
                  src={`${imageRoot}${activeProject.image}`}
                  alt={`${activeProject.name} project`}
                  width={1200}
                  height={800}
                  sizes="(max-width: 700px) 95vw, 800px"
                />
              </div>
              <div className="project-dialog-copy">
                <span className="eyebrow">
                  SELECTED WORK / {activeProject.number}
                </span>
                <h2 id="project-dialog-title">{activeProject.name}</h2>
                <p>
                  {projectDetails?.description || activeProject.description}
                </p>
                {projectDetails && (
                  <>
                    <dl className="project-facts">
                      <div>
                        <dt>INDUSTRY</dt>
                        <dd>{projectDetails.industry}</dd>
                      </div>
                      <div>
                        <dt>PROJECT RANGE</dt>
                        <dd>{projectDetails.priceRange}</dd>
                      </div>
                      <div>
                        <dt>TIMELINE</dt>
                        <dd>{projectDetails.duration}</dd>
                      </div>
                    </dl>
                    <div className="project-gallery">
                      {projectDetails.images
                        .filter(
                          (picture) =>
                            picture.localPath !==
                            `${imageRoot}${activeProject.image}`,
                        )
                        .map((picture) => (
                          <a
                            key={picture.localPath}
                            href={picture.localPath}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`Open full ${activeProject.name} image`}
                          >
                            <Image
                              src={picture.localPath}
                              alt={`${activeProject.name} additional view`}
                              width={picture.width || 800}
                              height={picture.height || 600}
                              sizes="(max-width: 600px) 40vw, 350px"
                            />
                          </a>
                        ))}
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="project-dialog-links">
              <a
                className="button button-blue"
                href={activeProject.url}
                target="_blank"
                rel="noreferrer"
              >
                Original project details <ArrowUpRight size={17} />
              </a>
              <a
                className="text-link"
                href={fiverr}
                target="_blank"
                rel="noreferrer"
              >
                Build something like this <ArrowUpRight size={17} />
              </a>
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
}
