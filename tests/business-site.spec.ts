import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("business journey explains the paid review and results boundaries", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "AI & automation.",
  );
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Results as a Service.",
  );
  await expect(page.locator(".hero-raas-link")).toHaveAttribute(
    "href",
    "/results-as-a-service/",
  );
  await page
    .locator(".hero-actions")
    .getByRole("link", { name: "Discuss your business problem" })
    .click();
  await expect(page).toHaveURL(/\/contact\/$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Which task is slowing your business down?",
  );
  await expect(
    page.getByText(/fee and deliverables before any paid work starts/),
  ).toBeVisible();
  await page.goto("/solutions/");
  await page
    .getByText("Do you guarantee a particular saving?", { exact: true })
    .click();
  await expect(page.getByText(/No untested saving is promised/)).toBeVisible();
  await page
    .getByRole("link", { name: "Explore Results as a Service" })
    .click();
  await expect(page).toHaveURL(/\/results-as-a-service\/$/);
  await expect(
    page.getByText(/An outcome-linked service is considered once the pilot/),
  ).toBeVisible();
});

test("sample workflow holds exceptions, requires approval and resets without external requests", async ({
  page,
}) => {
  const external: string[] = [];
  page.on("request", (request) => {
    if (!new URL(request.url()).hostname.match(/^(127\.0\.0\.1|localhost)$/))
      external.push(request.url());
  });
  await page.goto("/demonstrations/enquiry-workflow/");
  await expect(page.getByRole("button", { name: /^Review ENQ/ })).toHaveCount(
    0,
  );
  await page.getByRole("button", { name: "Run sample checks" }).click();
  await expect(page.locator(".demo-summary")).toHaveText(
    "2 eligible · 1 missing information · 1 duplicate · 0 approved",
  );
  await expect(page.getByRole("button", { name: /^Review ENQ/ })).toHaveCount(
    2,
  );
  await expect(
    page.locator(".sample-row").filter({ hasText: "ENQ-102" }),
  ).toContainText("Missing information");
  await expect(
    page.locator(".sample-row").filter({ hasText: "ENQ-103" }),
  ).toContainText("Duplicate");
  await page
    .getByRole("button", { name: "Review ENQ-101", exact: true })
    .click();
  const review = page.getByRole("region", { name: "Review ENQ-101" });
  await expect(review).toBeFocused();
  await expect(review).toContainText("alex@example.com");
  await expect(page.locator(".demo-summary")).toContainText("0 approved");
  await review
    .getByRole("button", { name: "Approve simulated next step" })
    .click();
  await expect(page.locator(".demo-summary")).toContainText("1 approved");
  await expect(
    review.getByRole("button", { name: "Approve simulated next step" }),
  ).toBeDisabled();
  await expect(review.getByRole("status")).toContainText(
    "No email or task was created.",
  );
  await expect(
    page.locator(".sample-row").filter({ hasText: "ENQ-101" }),
  ).toContainText("Approved · Simulated next step");
  await page.setViewportSize({ width: 375, height: 900 });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  const audit = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(
    audit.violations.map((v) => ({
      id: v.id,
      nodes: v.nodes.map((n) => n.target),
    })),
  ).toEqual([]);
  await page.getByRole("button", { name: "Reset demonstration" }).click();
  await expect(page.locator(".demo-summary")).toContainText(
    "Checks have not run.",
  );
  await expect(page.locator(".demo-review")).toHaveCount(0);
  await page.reload();
  await expect(page.locator(".demo-summary")).toContainText(
    "No responses are approved.",
  );
  expect(external).toEqual([]);
});
