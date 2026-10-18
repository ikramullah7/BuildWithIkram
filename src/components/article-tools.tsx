"use client";
import { useState } from "react";
import type { ComponentPropsWithoutRef } from "react";
export function CodeBlock({
  children,
  ...props
}: ComponentPropsWithoutRef<"pre">) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="code-wrap">
      <button
        className="copy-code"
        type="button"
        onClick={async (e) => {
          const text =
            e.currentTarget.parentElement?.querySelector("pre")?.textContent ||
            "";
          try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          } catch {
            setCopied(false);
          }
        }}
      >
        <span aria-live="polite">{copied ? "Copied" : "Copy code"}</span>
      </button>
      <pre {...props}>{children}</pre>
    </div>
  );
}
export function VideoEmbed({ id, title }: { id: string; title: string }) {
  const [loaded, setLoaded] = useState(false);
  if (!/^[\w-]{11}$/.test(id)) return null;
  return (
    <div className="video-embed">
      {loaded ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`}
          title={title}
          loading="lazy"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      ) : (
        <button onClick={() => setLoaded(true)}>
          <span aria-hidden="true">▷</span>Load video: {title}
          <small>Connects to YouTube when you choose to play.</small>
        </button>
      )}
    </div>
  );
}
