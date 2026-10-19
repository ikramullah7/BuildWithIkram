import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { site } from "../src/config/site";

const endpoint = site.contactForm.endpoint;
const example = {
  name: "  Test Visitor  ",
  email: "visitor@example.com",
  enquiry: "Paid project",
  message:
    "I would like to discuss automating a stock reconciliation workflow.",
};
async function fillEnquiry(page: Page) {
  await page.getByLabel(/^Your name/).fill(example.name);
  await page.getByLabel(/^Email address/).fill(example.email);
  await page
    .getByLabel(/^What would you like to discuss/)
    .selectOption(example.enquiry);
  await page.getByLabel(/^Your message/).fill(example.message);
}
// No regression test may send a real email or consume the owner's quota.
test.beforeEach(async ({ page }) => {
  await page.route(endpoint, (route) => route.abort());
});

test("validation links errors to fields and sends no invalid enquiries", async ({
  page,
}) => {
  let requests = 0;
  await page.route(endpoint, async (route) => {
    requests++;
    await route.abort();
  });
  await page.goto("/contact/");
  await page.getByRole("button", { name: "Send message", exact: true }).click();
  await expect(page.locator(".contact-field-error")).toHaveCount(4);
  await expect(page.getByLabel(/^Your name/)).toBeFocused();
  await expect(page.getByLabel(/^Your name/)).toHaveAttribute(
    "aria-invalid",
    "true",
  );
  await page.getByLabel(/^Your name/).fill("   ");
  await page.getByLabel(/^Email address/).fill("invalid-email");
  await page
    .getByLabel(/^What would you like to discuss/)
    .selectOption("Content question");
  await page.getByLabel(/^Your message/).fill("Too short");
  await page.getByRole("button", { name: "Send message", exact: true }).click();
  await expect(page.locator(".contact-field-error")).toHaveCount(3);
  expect(requests).toBe(0);
  const axe = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(axe.violations).toEqual([]);
});

test("submits the correct payload once, announces acceptance and supports a new message", async ({
  page,
}) => {
  const payloads: Record<string, string>[] = [];
  let release!: () => void;
  const gate = new Promise<void>((resolve) => {
    release = resolve;
  });
  await page.route(endpoint, async (route) => {
    payloads.push(route.request().postDataJSON());
    await gate;
    await route.fulfill({ status: 200, json: { success: true } });
  });
  await page.goto("/contact/");
  await fillEnquiry(page);
  await page.getByRole("button", { name: "Send message", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Sending message…", exact: true }),
  ).toBeDisabled();
  await expect(
    page.getByRole("form", { name: "Send a message" }),
  ).toHaveAttribute("aria-busy", "true");
  await page
    .getByRole("form", { name: "Send a message" })
    .evaluate((form: HTMLFormElement) => form.requestSubmit());
  await expect.poll(() => payloads.length).toBe(1);
  expect(payloads[0]).toMatchObject({
    access_key: site.contactForm.accessKey,
    name: "Test Visitor",
    email: example.email,
    enquiry: example.enquiry,
    message: example.message,
    subject: "BuildWithIkram enquiry: Paid project",
    from_name: "BuildWithIkram",
  });
  release();
  await expect(page.getByRole("status")).toContainText(
    "Your message has been submitted.",
  );
  await expect(page.getByRole("status")).toBeFocused();
  const axe = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(axe.violations).toEqual([]);
  await page.getByRole("button", { name: "Send another message" }).click();
  await expect(page.getByLabel(/^Your name/)).toHaveValue("");
  await expect(page.getByLabel(/^Your message/)).toHaveValue("");
  expect(payloads).toHaveLength(1);
});

test("provider rejection preserves the message and permits an explicit retry", async ({
  page,
}) => {
  let requests = 0;
  await page.route(endpoint, async (route) => {
    requests++;
    await route.fulfill({
      status: requests === 1 ? 429 : 200,
      json: { success: requests > 1 },
    });
  });
  await page.goto("/contact/");
  await fillEnquiry(page);
  await page.getByRole("button", { name: "Send message", exact: true }).click();
  await expect(page.getByRole("form", { name: "Send a message" }).getByRole("alert")).toContainText(
    "Your message wasn’t accepted.",
  );
  await expect(page.getByLabel(/^Your message/)).toHaveValue(example.message);
  await expect(page.getByRole("form", { name: "Send a message" }).getByRole("alert").getByRole("link")).toHaveAttribute(
    "href",
    `mailto:${site.email}`,
  );
  await page.getByRole("button", { name: "Send message", exact: true }).click();
  await expect(page.getByRole("status")).toContainText(
    "Your message has been submitted.",
  );
  expect(requests).toBe(2);
});

test("an HTTP 200 with success false is not presented as a sent message", async ({
  page,
}) => {
  await page.route(endpoint, (route) =>
    route.fulfill({ status: 200, json: { success: false } }),
  );
  await page.goto("/contact/");
  await fillEnquiry(page);
  await page.getByRole("button", { name: "Send message", exact: true }).click();
  await expect(page.getByRole("form", { name: "Send a message" }).getByRole("alert")).toContainText(
    "Your message wasn’t accepted.",
  );
  await expect(page.getByRole("status")).toHaveCount(0);
});

test("network failure preserves content and never automatically retries", async ({
  page,
}) => {
  let requests = 0;
  await page.route(endpoint, async (route) => {
    requests++;
    await route.abort();
  });
  await page.goto("/contact/");
  await fillEnquiry(page);
  await page.getByRole("button", { name: "Send message", exact: true }).click();
  await expect(page.getByRole("form", { name: "Send a message" }).getByRole("alert")).toContainText(
    "We couldn’t confirm whether your message was sent.",
  );
  await expect(page.getByLabel(/^Your message/)).toHaveValue(example.message);
  await expect(
    page.getByRole("button", { name: "Send message", exact: true }),
  ).toBeEnabled();
  expect(requests).toBe(1);
});

test("a slow response times out without clearing or silently resending the enquiry", async ({
  page,
}) => {
  await page.clock.install();
  let release!: () => void;
  const gate = new Promise<void>((resolve) => {
    release = resolve;
  });
  let requests = 0;
  await page.route(endpoint, async (route) => {
    requests++;
    await gate;
    try {
      await route.fulfill({ status: 200, json: { success: true } });
    } catch {
      /* The timed-out request is already closed. */
    }
  });
  try {
    await page.goto("/contact/");
    await fillEnquiry(page);
    await page
      .getByRole("button", { name: "Send message", exact: true })
      .click();
    await expect.poll(() => requests).toBe(1);
    await page.clock.fastForward(21000);
    await expect(page.getByRole("form", { name: "Send a message" }).getByRole("alert")).toContainText(
      "We couldn’t confirm whether your message was sent.",
    );
    await expect(page.getByLabel(/^Your message/)).toHaveValue(example.message);
    expect(requests).toBe(1);
  } finally {
    release();
  }
});

test("honeypot submissions do not contact the delivery service", async ({
  page,
}) => {
  let requests = 0;
  await page.route(endpoint, async (route) => {
    requests++;
    await route.abort();
  });
  await page.goto("/contact/");
  await fillEnquiry(page);
  await page
    .locator('[name="botcheck"]')
    .evaluate((input: HTMLInputElement) => {
      input.checked = true;
    });
  await page.getByRole("button", { name: "Send message", exact: true }).click();
  await expect(page.getByRole("form", { name: "Send a message" }).getByRole("alert")).toBeVisible();
  expect(requests).toBe(0);
});

test("native HTML submission still works without JavaScript", async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    baseURL,
  });
  const page = await context.newPage();
  let payload: URLSearchParams | undefined;
  await page.route(endpoint, async (route) => {
    payload = new URLSearchParams(route.request().postData() || "");
    await route.fulfill({
      status: 200,
      contentType: "text/html",
      body: "<h1>Test submission accepted</h1>",
    });
  });
  try {
    await page.goto("/contact/");
    await fillEnquiry(page);
    await page
      .getByRole("button", { name: "Send message", exact: true })
      .click();
    await expect(
      page.getByRole("heading", { name: "Test submission accepted" }),
    ).toBeVisible();
    expect(payload?.get("access_key")).toBe(site.contactForm.accessKey);
    expect(payload?.get("email")).toBe(example.email);
    expect(payload?.get("message")).toBe(example.message);
  } finally {
    await context.close();
  }
});
