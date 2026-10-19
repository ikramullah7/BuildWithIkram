"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { Arrow } from "./icons";

const enquiries = [
  "Paid project",
  "Exploratory conversation",
  "Content question",
];
type Field = "name" | "email" | "enquiry" | "message";
type Status = "idle" | "sending" | "success" | "error" | "uncertain";

export function ContactForm({
  accessKey,
  endpoint,
  email,
}: {
  accessKey: string;
  endpoint: string;
  email: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const submitting = useRef(false);
  const success = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    // Keep native HTML validation when JavaScript is unavailable; enhance it
    // with linked inline errors once the client has hydrated.
    if (formRef.current) formRef.current.noValidate = true;
    if (status === "success") success.current?.focus();
  }, [status]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const values = Object.fromEntries(
      (["name", "email", "enquiry", "message"] as Field[]).map((field) => [
        field,
        String(data.get(field) || "").trim(),
      ]),
    ) as Record<Field, string>;
    const nextErrors: Partial<Record<Field, string>> = {};
    if (!values.name || values.name.length > 100)
      nextErrors.name = "Enter your name (up to 100 characters).";
    const emailInput = form.elements.namedItem("email") as HTMLInputElement;
    if (
      !values.email ||
      values.email.length > 254 ||
      !emailInput.validity.valid
    )
      nextErrors.email = "Enter a valid email address so I can reply.";
    if (!enquiries.includes(values.enquiry))
      nextErrors.enquiry = "Choose what you’d like to discuss.";
    if (values.message.length < 10 || values.message.length > 5000)
      nextErrors.message = "Enter a message between 10 and 5,000 characters.";
    setErrors(nextErrors);
    const firstInvalid = (Object.keys(nextErrors) as Field[])[0];
    if (firstInvalid) {
      setStatus("idle");
      (form.elements.namedItem(firstInvalid) as HTMLElement)?.focus();
      return;
    }
    if (data.get("botcheck")) {
      setStatus("error");
      return;
    }

    submitting.current = true;
    setStatus("sending");
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 20000);
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          from_name: "BuildWithIkram",
          subject: `BuildWithIkram enquiry: ${values.enquiry}`,
          ...values,
        }),
        signal: controller.signal,
      });
      const result: unknown = await response.json();
      if (
        response.ok &&
        result &&
        typeof result === "object" &&
        "success" in result &&
        result.success === true
      ) {
        form.reset();
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      // A lost connection does not prove that the provider failed to accept it.
      // Preserve the message and avoid automatic retries that could duplicate it.
      setStatus("uncertain");
    } finally {
      window.clearTimeout(timeout);
      submitting.current = false;
    }
  }

  function fieldError(field: Field) {
    return errors[field] ? (
      <p className="contact-field-error" id={`contact-${field}-error`}>
        {errors[field]}
      </p>
    ) : null;
  }

  return (
    <div className="contact-form-panel">
      <h2 id="contact-form-title">Send a message</h2>
      <p className="contact-form-intro">
        Tell me what you have in mind. I’ll use your email address to reply.
      </p>
      {status === "success" ? (
        <div
          ref={success}
          tabIndex={-1}
          className="contact-form-success"
          role="status"
        >
          <h3>Thank you for getting in touch.</h3>
          <p>Your message has been submitted.</p>
          <button
            type="button"
            className="button button-secondary"
            onClick={() => {
              setStatus("idle");
              setErrors({});
            }}
          >
            Send another message
            <Arrow />
          </button>
        </div>
      ) : (
        <form
          ref={formRef}
          aria-labelledby="contact-form-title"
          action={endpoint}
          method="POST"
          onSubmit={submit}
          aria-busy={status === "sending"}
        >
          <input type="hidden" name="access_key" value={accessKey} />
          <input
            type="hidden"
            name="subject"
            value="BuildWithIkram website enquiry"
          />
          <input type="hidden" name="from_name" value="BuildWithIkram" />
          <div className="contact-honeypot" aria-hidden="true">
            <label htmlFor="contact-botcheck">Leave this field empty</label>
            <input
              id="contact-botcheck"
              type="checkbox"
              name="botcheck"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>
          <fieldset disabled={status === "sending"}>
            <legend className="sr-only">Your enquiry</legend>
            <div className="contact-field-row">
              <div className="contact-field">
                <label htmlFor="contact-name">
                  Your name <span>(required)</span>
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  maxLength={100}
                  aria-invalid={!!errors.name}
                  aria-describedby={
                    errors.name ? "contact-name-error" : undefined
                  }
                />
                {fieldError("name")}
              </div>
              <div className="contact-field">
                <label htmlFor="contact-email">
                  Email address <span>(required)</span>
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  required
                  maxLength={254}
                  aria-invalid={!!errors.email}
                  aria-describedby={
                    errors.email ? "contact-email-error" : undefined
                  }
                />
                {fieldError("email")}
              </div>
            </div>
            <div className="contact-field">
              <label htmlFor="contact-enquiry">
                What would you like to discuss? <span>(required)</span>
              </label>
              <select
                id="contact-enquiry"
                name="enquiry"
                required
                defaultValue=""
                aria-invalid={!!errors.enquiry}
                aria-describedby={
                  errors.enquiry ? "contact-enquiry-error" : undefined
                }
              >
                <option value="" disabled>
                  Select an enquiry type
                </option>
                {enquiries.map((enquiry) => (
                  <option key={enquiry} value={enquiry}>
                    {enquiry}
                  </option>
                ))}
              </select>
              {fieldError("enquiry")}
            </div>
            <div className="contact-field">
              <label htmlFor="contact-message">
                Your message <span>(required)</span>
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={7}
                required
                minLength={10}
                maxLength={5000}
                aria-invalid={!!errors.message}
                aria-describedby={`contact-message-hint${errors.message ? " contact-message-error" : ""}`}
              />
              <p className="contact-field-hint" id="contact-message-hint">
                A little context about the problem and the outcome you’re hoping
                for is helpful. Up to 5,000 characters.
              </p>
              {fieldError("message")}
            </div>
            <p className="contact-form-privacy">
              Your enquiry is sent through Web3Forms to handle your message.{" "}
              <Link href="/privacy/">Read the privacy notice</Link>.
            </p>
            <button
              className="button"
              type="submit"
              disabled={status === "sending"}
            >
              {status === "sending" ? "Sending message…" : "Send message"}
              <Arrow />
            </button>
          </fieldset>
          {(status === "error" || status === "uncertain") && (
            <div className="contact-form-error" role="alert">
              <p>
                {status === "uncertain"
                  ? "We couldn’t confirm whether your message was sent. Your text is still here. Please check your connection before trying again, or email me directly."
                  : "Your message wasn’t accepted. Your text is still here so you can try again, or email me directly."}
              </p>
              <a href={`mailto:${email}`}>Email {email}</a>
            </div>
          )}
          <noscript>
            <p className="contact-field-hint">
              You can also <a href={`mailto:${email}`}>email me directly</a> if
              you prefer.
            </p>
          </noscript>
        </form>
      )}
    </div>
  );
}
