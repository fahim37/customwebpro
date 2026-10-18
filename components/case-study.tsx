import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowLeft, ArrowUpRight, Asterisk } from "lucide-react";
import sourceContent from "@/research/content-catalog.json";
import "./case-study.css";

type Project = (typeof sourceContent.projects)[number];

type CaseStudyProps = {
  project: Project;
  nextProject: Project;
  projectNumber: number;
};

function localProjectPath(project: Project) {
  return new URL(project.url).pathname.replace(/\/$/, "");
}

function displayPrice(value: string) {
  return value
    .replace(/\d+/g, (number) => Number(number).toLocaleString("en-US"))
    .replace("-", "–");
}

function projectParagraphs(description: string) {
  const sentences = description.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [description];
  const paragraphs: string[] = [];
  for (let index = 0; index < sentences.length; index += 2) {
    paragraphs.push(sentences.slice(index, index + 2).join("").trim());
  }
  return paragraphs;
}

export default function CaseStudy({
  project,
  nextProject,
  projectNumber,
}: CaseStudyProps) {
  const hero = project.images[0];
  const gallery = project.images.slice(1);
  const industry = project.industry.replace(/\s+\+\d+$/, "");
  const nextCover = nextProject.images[0];
  const number = String(projectNumber).padStart(2, "0");

  return (
    <div className="case-study-page">
      <a className="case-skip" href="#case-main">
        Skip to project
      </a>
      <header className="case-header">
        <div className="case-container case-header-inner">
          <Link href="/" className="case-logo" aria-label="CustomWebPro home">
            <Image
              src="/images/original/Screenshot-removebg-preview.png"
              alt="CustomWebPro"
              width={362}
              height={88}
              sizes="(max-width: 600px) 190px, 230px"
            />
          </Link>
          <nav className="case-header-nav" aria-label="Project navigation">
            <Link href="/#work">
              <ArrowLeft size={16} aria-hidden="true" /> All work
            </Link>
            <Link className="case-header-contact" href="/#contact">
              Let’s talk <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </nav>
        </div>
      </header>

      <main id="case-main">
        <section className="case-intro case-container" aria-labelledby="case-title">
          <div className="case-eyebrow-row">
            <span className="case-eyebrow">
              <span /> SELECTED WORK / {number}
            </span>
            <span className="case-intro-industry">{industry}</span>
          </div>
          <h1 id="case-title">{project.title}<span>.</span></h1>
          <div className="case-intro-bottom">
            <p>A closer look at the thinking, the details, and the final experience.</p>
            <a href="#project-overview" className="case-text-link">
              EXPLORE THE PROJECT <ArrowDown size={17} aria-hidden="true" />
            </a>
          </div>
          <dl className="case-facts">
            <div>
              <dt>PROJECT INVESTMENT</dt>
              <dd>{displayPrice(project.priceRange)}</dd>
            </div>
            <div>
              <dt>PROJECT DURATION</dt>
              <dd>{project.duration.replace("-", "–")}</dd>
            </div>
            <div>
              <dt>INDUSTRY</dt>
              <dd>{industry}</dd>
            </div>
          </dl>
        </section>

        <figure className="case-hero case-container">
          <div className="case-hero-frame">
            <div className="case-art-topline" aria-hidden="true">
              <span>CUSTOMWEBPRO — PROJECT {number}</span>
              <Asterisk size={21} />
            </div>
            <Image
              className="case-hero-image"
              src={hero.localPath}
              alt={`${project.title} — project preview`}
              width={hero.width}
              height={hero.height}
              sizes="(max-width: 700px) 90vw, (max-width: 1400px) 85vw, 1120px"
              preload
            />
          </div>
          <figcaption>
            <span>THE EXPERIENCE, BROUGHT TO LIFE.</span>
            <span>{String(project.images.length).padStart(2, "0")} PROJECT VIEWS</span>
          </figcaption>
        </figure>

        <section
          className="case-overview case-container"
          id="project-overview"
          aria-labelledby="case-overview-title"
        >
          <div className="case-overview-heading">
            <span className="case-eyebrow"><span /> THE PROJECT</span>
            <h2 id="case-overview-title">Good thinking.<br /><em>Made real.</em></h2>
          </div>
          <div className="case-overview-copy">
            {projectParagraphs(project.description).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>

        {gallery.length > 0 && (
          <section className="case-gallery-section" aria-labelledby="case-gallery-title">
            <div className="case-container">
              <div className="case-gallery-heading">
                <h2 id="case-gallery-title">A little closer.</h2>
                <span>IT’S ALL IN THE DETAILS.</span>
              </div>
              <div className={`case-gallery ${gallery.length === 1 ? "case-gallery-single" : ""}`}>
                {gallery.map((image, index) => {
                  const isFullPage = image.height > image.width * 2;
                  return (
                    <figure className={isFullPage ? "case-gallery-fullpage" : ""} key={image.localPath}>
                      <a
                        className="case-gallery-image-link"
                        href={image.localPath}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Open project view ${index + 2} at full size in a new tab`}
                      >
                        <Image
                          src={image.localPath}
                          alt={`${project.title} — ${isFullPage ? "complete page design" : `detail view ${index + 2}`}`}
                          width={image.width}
                          height={image.height}
                          sizes={gallery.length === 1 ? "(max-width: 700px) 90vw, 718px" : "(max-width: 700px) 90vw, (max-width: 1400px) 43vw, 590px"}
                        />
                        <span className="case-image-expand" aria-hidden="true"><ArrowUpRight size={18} /></span>
                      </a>
                      <figcaption>
                        <span>VIEW {String(index + 2).padStart(2, "0")}</span>
                        <span>OPEN FULL SIZE <ArrowUpRight size={12} aria-hidden="true" /></span>
                      </figcaption>
                    </figure>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        <section className="case-next case-container" aria-labelledby="case-next-title">
          <span className="case-eyebrow"><span /> KEEP EXPLORING</span>
          <Link className="case-next-link" href={localProjectPath(nextProject)}>
            <div className="case-next-image">
              <Image
                src={nextCover.localPath}
                alt=""
                fill
                sizes="(max-width: 600px) 120px, 190px"
              />
            </div>
            <div className="case-next-copy">
              <span>NEXT PROJECT</span>
              <h2 id="case-next-title">{nextProject.title}</h2>
            </div>
            <span className="case-next-arrow"><ArrowUpRight aria-hidden="true" /></span>
          </Link>
        </section>

        <section className="case-contact" aria-labelledby="case-contact-title">
          <div className="case-container case-contact-inner">
            <div>
              <span className="case-contact-label">YOUR IDEA COULD BE NEXT.</span>
              <h2 id="case-contact-title">Let’s make<br /><em>something matter.</em></h2>
            </div>
            <div className="case-contact-actions">
              <Link className="case-contact-button" href="/#contact">
                Tell us about your project <ArrowUpRight size={19} aria-hidden="true" />
              </Link>
              <a href={sourceContent.profileUrl} target="_blank" rel="noreferrer">
                Talk to Biplob on Fiverr <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="case-footer case-container">
        <span>© 2026 CustomWebPro. All rights reserved.</span>
        <Link href="/#work">BACK TO SELECTED WORK <ArrowUpRight size={15} aria-hidden="true" /></Link>
      </footer>
    </div>
  );
}
