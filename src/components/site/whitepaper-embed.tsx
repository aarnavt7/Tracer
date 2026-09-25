import { siteConfig } from "@/config/site";

const { whitepaper } = siteConfig;

/** Hide the browser viewer's toolbar so the embed reads as part of the page. */
const EMBED_URL = `${whitepaper.pdfUrl}#toolbar=0&navpanes=0&scrollbar=1&view=FitH`;

export function WhitepaperEmbed() {
  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-card/40 shadow-[inset_0_1px_0_0_var(--inset-highlight)]">
      <object
        data={EMBED_URL}
        type="application/pdf"
        title={whitepaper.documentTitle}
        aria-label={whitepaper.documentTitle}
        className="block h-[80vh] min-h-[600px] w-full bg-white"
      >
        {/* Fallback for browsers without an inline PDF viewer (e.g. iOS Safari). */}
        <div className="flex h-full flex-col items-center justify-center gap-4 bg-background p-8 text-center">
          <p className="max-w-md text-sm text-muted-foreground">
            {whitepaper.documentTitle}
          </p>
          <a
            href={whitepaper.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90"
          >
            Open the whitepaper
          </a>
        </div>
      </object>
    </div>
  );
}
