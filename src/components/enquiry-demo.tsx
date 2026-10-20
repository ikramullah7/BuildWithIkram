"use client";

import { useEffect, useRef, useState } from "react";
import { Arrow } from "./icons";

type Check = "Ready for review" | "Missing information" | "Duplicate";
const samples = [
  {
    id: "ENQ-101",
    name: "Alex Example",
    email: "alex@example.com",
    task: "Our weekly stock report needs information copied from three spreadsheets.",
  },
  {
    id: "ENQ-102",
    name: "Sam Example",
    email: "",
    task: "Our team manually copies enquiry details into a shared tracker.",
  },
  {
    id: "ENQ-103",
    name: "Alex Example",
    email: "alex@example.com",
    task: "Our weekly stock report needs information copied from three spreadsheets.",
  },
  {
    id: "ENQ-104",
    name: "Taylor Example",
    email: "taylor@example.com",
    task: "We want to understand why our deployment process needs so many manual checks.",
  },
];
function checkSamples(): Check[] {
  const seen = new Set<string>();
  return samples.map((sample) => {
    if (!sample.name || !sample.email || !sample.task)
      return "Missing information";
    const key = `${sample.email.trim().toLowerCase()}|${sample.task.trim().toLowerCase()}`;
    if (seen.has(key)) return "Duplicate";
    seen.add(key);
    return "Ready for review";
  });
}

export function EnquiryDemo() {
  const [checks, setChecks] = useState<Check[] | null>(null);
  const [approved, setApproved] = useState<string[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const review = useRef<HTMLElement>(null);
  useEffect(() => {
    if (selected !== null) review.current?.focus();
  }, [selected]);
  const current = selected === null ? null : samples[selected];
  return (
    <div className="enquiry-demo">
      <div className="demo-toolbar">
        <div>
          <h2>Four sample enquiries. One review queue.</h2>
          <p>The batch includes a missing email and a repeated enquiry.</p>
        </div>
        <div className="demo-actions">
          <button
            type="button"
            className="button"
            disabled={checks !== null}
            onClick={() => setChecks(checkSamples())}
          >
            Run sample checks
            <Arrow />
          </button>
          <button
            type="button"
            className="button button-secondary"
            onClick={() => {
              setChecks(null);
              setApproved([]);
              setSelected(null);
            }}
          >
            Reset demonstration
          </button>
        </div>
      </div>
      <div className="demo-summary" role="status" aria-live="polite">
        {checks
          ? `${checks.filter((c) => c === "Ready for review").length} eligible · ${checks.filter((c) => c === "Missing information").length} missing information · ${checks.filter((c) => c === "Duplicate").length} duplicate · ${approved.length} approved`
          : "Checks have not run. No responses are approved."}
      </div>
      <div className="sample-list">
        {samples.map((sample, i) => (
          <article className="sample-row" key={sample.id}>
            <div>
              <span className="sample-id">{sample.id}</span>
              <h3>{sample.name}</h3>
              <p>{sample.task}</p>
              <p className="small">{sample.email || "No email supplied"}</p>
            </div>
            <div className="sample-action">
              <span className="sample-status">
                {approved.includes(sample.id)
                  ? "Approved · Simulated next step"
                  : checks?.[i] || "Not checked"}
              </span>
              {checks?.[i] === "Ready for review" &&
                !approved.includes(sample.id) && (
                  <button
                    className="button button-secondary"
                    type="button"
                    onClick={() => setSelected(i)}
                  >
                    Review {sample.id}
                  </button>
                )}
            </div>
          </article>
        ))}
      </div>
      {current && (
        <section
          className="demo-review evidence-panel"
          ref={review}
          tabIndex={-1}
          aria-labelledby="draft-title"
        >
          <span className="pill">Template draft · Human review required</span>
          <h3 id="draft-title">Review {current.id}</h3>
          <p>
            <strong>To:</strong> {current.email}
          </p>
          <blockquote>
            Hi {current.name.split(" ")[0]}, thanks for telling me about the
            task. Which tools do you use, and where does the work get held up?
            That will help me understand whether I can help. If a paid review
            makes sense, I’ll explain what it covers before you decide.
          </blockquote>
          <p>
            Check the recipient and wording before approving. This demonstration
            records approval locally and displays a follow-up reminder. It does
            not send this draft or schedule a real task.
          </p>
          <div className="demo-actions">
            <button
              type="button"
              className="button"
              disabled={approved.includes(current.id)}
              onClick={() =>
                setApproved((ids) =>
                  ids.includes(current.id) ? ids : [...ids, current.id],
                )
              }
            >
              Approve simulated next step
              <Arrow />
            </button>
            <button
              className="button button-secondary"
              type="button"
              onClick={() => setSelected(null)}
            >
              Close review
            </button>
          </div>
          {approved.includes(current.id) && (
            <p role="status" className="approval-note">
              Approved for this session. Simulated follow-up: check whether the
              enquiry needs a response. No email or task was created.
            </p>
          )}
        </section>
      )}
      <noscript>
        <p className="notice">
          Enable JavaScript to run the interactive example. The workflow and its
          limitations are explained below.
        </p>
      </noscript>
      <p className="demo-limit">
        All records are fictional. Reset or reload the page to start again.
      </p>
    </div>
  );
}
