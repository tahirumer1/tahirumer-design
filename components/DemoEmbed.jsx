"use client";

import { useState } from "react";

/**
 * Embeds a live, self-contained HTML demo in a responsive 16:10 frame.
 * Shows the card image as a poster until the iframe loads, with an
 * "Open live demo" fallback link for browsers that block iframes.
 */
export default function DemoEmbed({ src, poster, title, accent }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="cs-demo">
      <div className="cs-demo__frame">
        {poster && (
          <img
            src={poster}
            alt=""
            aria-hidden="true"
            className={`cs-demo__poster ${loaded ? "cs-demo__poster--hidden" : ""}`}
          />
        )}
        <iframe
          src={src}
          title={`${title} — live demo`}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          sandbox="allow-scripts allow-same-origin allow-popups"
        />
      </div>
      <div className="cs-demo__bar">
        <span className="mono cs-demo__hint">
          <span className="cs-demo__dot" style={accent ? { background: accent } : undefined} />
          Live, interactive demo — scroll inside the frame
        </span>
        <a
          href={src}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor=""
          className="cs-demo__open"
        >
          Open live demo ↗
        </a>
      </div>
    </div>
  );
}
