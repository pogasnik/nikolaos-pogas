import type { Project } from '@/lib/content';

// A top-to-bottom data-flow diagram drawn with HTML and CSS: real text,
// readable at phone width, no client JavaScript.
export function FlowDiagram({ flow }: { flow: Project['flow'] }) {
  return (
    <figure className="rounded-lg border border-line bg-panel p-5 sm:p-8">
      <ol className="flex flex-col items-center">
        {flow.steps.map((step, i) => (
          <li key={step.label} className="flex w-full flex-col items-center">
            {i > 0 && <Arrow />}
            <div className="w-full max-w-sm rounded-md border border-line bg-bg px-4 py-3 text-center">
              <p className="text-sm font-medium">{step.label}</p>
              {step.note && <p className="mt-0.5 font-mono text-xs text-muted">{step.note}</p>}
              {step.options && (
                <ul className="mt-3 flex flex-wrap justify-center gap-2">
                  {step.options.map((o) => (
                    <li
                      key={o}
                      className="rounded border border-line px-2 py-1 font-mono text-xs text-muted"
                    >
                      {o}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        ))}
      </ol>
      <figcaption className="mt-6 text-center text-sm text-muted">
        <span className="font-medium text-fg">{flow.title}.</span>
        {flow.footnote && <> {flow.footnote}</>}
      </figcaption>
    </figure>
  );
}

function Arrow() {
  return (
    <svg
      aria-hidden="true"
      width="12"
      height="28"
      viewBox="0 0 12 28"
      className="my-1 text-muted"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M6 0v26M1 21l5 5 5-5" />
    </svg>
  );
}
