import { Workflow } from "lucide-react";
import "./technology-stack.css";

const technologies = [
  { label: "React", icon: "react" },
  { label: "Next.js", icon: "nextdotjs" },
  { label: "WordPress", icon: "wordpress" },
];

export default function TechnologyStack() {
  return (
    <div className="technology-stack" aria-label="Our technology stack">
      <span className="technology-stack-caption">
        GOOD TOOLS. BETTER THINKING.
      </span>
      <ul className="technology-stack-list" role="list">
        {technologies.map(({ label, icon }) => (
          <li className="technology-stack-item" key={icon}>
            <span
              className={`technology-stack-icon technology-stack-${icon}`}
              aria-hidden="true"
            />
            <span>{label}</span>
          </li>
        ))}
        <li className="technology-stack-item">
          <Workflow
            className="technology-stack-workflow"
            size={24}
            strokeWidth={1.6}
            aria-hidden="true"
          />
          <span>AI &amp; Automation</span>
        </li>
      </ul>
    </div>
  );
}
