"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  CodeXml,
  Copy,
  GraduationCap,
  Smartphone,
  Sparkles,
  X,
} from "lucide-react";
import "./project-brief.css";

const services = [
  { name: "Website", icon: CodeXml },
  { name: "AI & SaaS", icon: Sparkles },
  { name: "Mobile app", icon: Smartphone },
  { name: "Coding lessons", icon: GraduationCap },
];

type ProjectBriefProps = {
  className?: string;
  children: ReactNode;
};

export default function ProjectBrief({
  className,
  children,
}: ProjectBriefProps) {
  const id = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const reviewRef = useRef<HTMLTextAreaElement>(null);
  const unlockRef = useRef<(() => void) | null>(null);
  const [service, setService] = useState("Website");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [brief, setBrief] = useState<string | null>(null);
  const [copyStatus, setCopyStatus] = useState("");
  const reviewing = brief !== null;

  useEffect(() => () => unlockRef.current?.(), []);

  useEffect(() => {
    if (!dialogRef.current?.open) return;
    if (reviewing) reviewRef.current?.focus();
    else nameRef.current?.focus();
  }, [reviewing]);

  function openDialog() {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;

    setBrief(null);
    setCopyStatus("");
    const previousOverflow = document.body.style.overflow;
    const previousPadding = document.body.style.paddingRight;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    const padding =
      Number.parseFloat(window.getComputedStyle(document.body).paddingRight) ||
      0;
    document.body.style.overflow = "hidden";
    if (scrollbar > 0)
      document.body.style.paddingRight = `${padding + scrollbar}px`;
    unlockRef.current = () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPadding;
      unlockRef.current = null;
    };
    dialog.showModal();
    nameRef.current?.focus({ preventScroll: true });
  }

  function handleClose() {
    unlockRef.current?.();
    triggerRef.current?.focus({ preventScroll: true });
  }

  function prepareBrief(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name.trim()) {
      nameRef.current?.setCustomValidity("Please enter your name.");
      nameRef.current?.reportValidity();
      return;
    }
    if (!description.trim()) {
      descriptionRef.current?.setCustomValidity(
        "Tell Biplob a little about your project.",
      );
      descriptionRef.current?.reportValidity();
      return;
    }
    setBrief(
      `Hi Biplob,\n\nI'm ${name.trim()} and I'd love to discuss a project with you.\n\nService: ${service}\n\n${description.trim()}\n\nPlease let me know the next steps, an estimated timeline, and a quote.\n\nThanks,\n${name.trim()}`,
    );
    setCopyStatus("");
  }

  async function copyBrief() {
    if (brief === null) return;
    try {
      await navigator.clipboard.writeText(brief);
      setCopyStatus("Brief copied. Paste it into your Fiverr conversation.");
    } catch {
      reviewRef.current?.focus();
      reviewRef.current?.select();
      setCopyStatus(
        "Your brief is selected. Use your device’s copy command, then paste it on Fiverr.",
      );
    }
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={className || "brief-trigger"}
        onClick={openDialog}
        aria-haspopup="dialog"
        aria-controls={`${id}-dialog`}
      >
        {children}
      </button>
      <dialog
        ref={dialogRef}
        id={`${id}-dialog`}
        className="brief-dialog"
        aria-labelledby={`${id}-title`}
        aria-describedby={`${id}-intro`}
        onClose={handleClose}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialogRef.current?.close();
        }}
      >
        <div className="brief-panel">
          <div className="brief-topline">
            <span className="brief-eyebrow">
              <span className="brief-dot" /> A GOOD START
            </span>
            <button
              type="button"
              className="brief-close"
              aria-label="Close project brief"
              onClick={() => dialogRef.current?.close()}
            >
              <X size={21} aria-hidden="true" />
            </button>
          </div>

          <h2 id={`${id}-title`} className="brief-title">
            Let’s make
            <br />
            something <span>great.</span>
          </h2>
          <p id={`${id}-intro`} className="brief-intro">
            {brief === null
              ? "Prepare a brief to share with Biplob on Fiverr."
              : "Your brief is ready to review. Make it yours, then share it with Biplob."}
          </p>

          {brief === null ? (
            <form className="brief-form" onSubmit={prepareBrief}>
              <fieldset className="brief-fieldset">
                <legend className="brief-label">
                  01 — What are we building?
                </legend>
                <div className="brief-choices">
                  {services.map(({ name: serviceName, icon: Icon }) => (
                    <label
                      key={serviceName}
                      className="brief-choice"
                      data-selected={service === serviceName}
                    >
                      <input
                        type="radio"
                        name="service"
                        value={serviceName}
                        checked={service === serviceName}
                        onChange={() => setService(serviceName)}
                      />
                      <Icon size={20} strokeWidth={1.7} aria-hidden="true" />
                      <span>{serviceName}</span>
                      <span className="brief-choice-check" aria-hidden="true">
                        {service === serviceName && <Check size={14} />}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="brief-field">
                <label htmlFor={`${id}-name`} className="brief-label">
                  02 — Your name <span>(required)</span>
                </label>
                <input
                  ref={nameRef}
                  id={`${id}-name`}
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  maxLength={120}
                  value={name}
                  onChange={(event) => {
                    event.currentTarget.setCustomValidity("");
                    setName(event.target.value);
                  }}
                  placeholder="Nice to meet you…"
                  className="brief-input"
                />
              </div>

              <div className="brief-field">
                <label htmlFor={`${id}-description`} className="brief-label">
                  03 — A little about your idea <span>(required)</span>
                </label>
                <textarea
                  ref={descriptionRef}
                  id={`${id}-description`}
                  name="description"
                  required
                  maxLength={4000}
                  rows={4}
                  value={description}
                  onChange={(event) => {
                    event.currentTarget.setCustomValidity("");
                    setDescription(event.target.value);
                  }}
                  placeholder="The idea, the goal, your ideal timeline…"
                  className="brief-input brief-description"
                />
              </div>

              <button type="submit" className="brief-primary">
                Prepare my brief <ArrowRight size={20} aria-hidden="true" />
              </button>
              <p className="brief-note">
                Nothing is sent automatically. You’ll review your brief before
                sharing it on Fiverr.
              </p>
            </form>
          ) : (
            <div className="brief-review">
              <label htmlFor={`${id}-review`} className="brief-label">
                YOUR PROJECT BRIEF — EDIT ANYTHING
              </label>
              <textarea
                ref={reviewRef}
                id={`${id}-review`}
                className="brief-input brief-review-text"
                value={brief}
                onChange={(event) => {
                  setBrief(event.target.value);
                  setCopyStatus("");
                }}
                rows={10}
                spellCheck
              />
              <p className="brief-share-note">
                Copy this brief, then paste it into your Fiverr conversation.
                Opening Fiverr won’t send it for you.
              </p>
              <div className="brief-review-actions">
                <button
                  type="button"
                  className="brief-copy"
                  onClick={copyBrief}
                >
                  {copyStatus.startsWith("Brief copied") ? (
                    <Check size={18} aria-hidden="true" />
                  ) : (
                    <Copy size={18} aria-hidden="true" />
                  )}{" "}
                  Copy brief
                </button>
                <a
                  href="https://www.fiverr.com/customweb_pro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="brief-primary"
                >
                  Continue on Fiverr{" "}
                  <ArrowUpRight size={20} aria-hidden="true" />
                  <span className="brief-sr-only"> (opens in a new tab)</span>
                </a>
              </div>
              <p className="brief-copy-status" role="status" aria-live="polite">
                {copyStatus}
              </p>
              <button
                type="button"
                className="brief-back"
                onClick={() => {
                  setBrief(null);
                  setCopyStatus("");
                }}
              >
                <ArrowLeft size={16} aria-hidden="true" /> Back to your project
              </button>
            </div>
          )}
        </div>
      </dialog>
    </>
  );
}
