import { Mail, Radio } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../common/BrandIcons";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-line">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-signal/10 text-signal">
              <Radio size={16} />
            </span>
            <span className="font-display text-sm font-semibold text-ink">
              Smart<span className="text-signal">AI</span> News Hub
            </span>
          </div>

          <div className="flex items-center gap-5">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="text-ink-dim transition hover:text-signal"
            >
              <GithubIcon size={18} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="text-ink-dim transition hover:text-signal"
            >
              <LinkedinIcon size={18} />
            </a>
            <a
              href="mailto:hello@example.com"
              aria-label="Email"
              className="text-ink-dim transition hover:text-signal"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>

        <p className="mt-6 text-center font-mono text-xs text-ink-dim sm:text-left">
          © {year} Smart AI News Hub. Built for the interview that matters.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
