import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import fs from "node:fs";
import { absolute } from "../src/config/site";
const preview = process.env.CONTENT_PREVIEW === "true";
const routes = [
  "/",
  "/solutions/",
  "/projects/",
  "/projects/ai-job-matching/",
  "/projects/enterprise-document-search/",
  "/projects/inventory-management/",
  "/blog/",
  "/videos/",
  "/about/",
  "/contact/",
  "/privacy/",
];
for (const route of routes)
  test(`page, metadata, links and accessibility: ${route}`, async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("console", (m) => {
      if (m.type() === "error") errors.push(m.text());
    });
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await expect(page.locator("main h1")).toHaveCount(1);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      /.{30,}/,
    );
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      absolute(route),
    );
    const links = await page
      .locator("a[href]")
      .evaluateAll((as) => as.map((a) => a.getAttribute("href")!));
    expect(links.filter((l) => l === "#" || l === "")).toEqual([]);
    for (const href of [
      ...new Set(links.filter((l) => l.startsWith("/") && !l.startsWith("//"))),
    ]) {
      const check = await page.request.get(href);
      expect(check.status(), href).toBe(200);
    }
    const images = page.locator("main img");
    for (const img of await images.all()) {
      await img.scrollIntoViewIfNeeded();
      await expect(img).toHaveJSProperty("complete", true);
      expect(
        await img.evaluate((el: HTMLImageElement) => el.naturalWidth),
      ).toBeGreaterThan(0);
    }
    const audit = await new AxeBuilder({ page })
      .withTags([
        "wcag2a",
        "wcag2aa",
        "wcag21aa",
        "wcag21a",
        "wcag22a",
        "wcag22aa",
      ])
      .analyze();
    expect(
      audit.violations.map((v) => ({
        id: v.id,
        nodes: v.nodes.map((n) => n.target),
      })),
    ).toEqual([]);
    expect(errors).toEqual([]);
  });
for (const width of [375, 768, 1280, 1440])
  test(`responsive layout at ${width}`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    for (const route of routes) {
      await page.goto(route);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
        route,
      ).toBe(true);
    }
  });
test("mobile navigation, keyboard and escape", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByText("Skip to content", { exact: true }),
  ).toBeFocused();
  await page.getByRole("button", { name: "Open navigation" }).click();
  await expect(
    page.getByRole("navigation", { name: "Main navigation" }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("button", { name: "Open navigation" }),
  ).toBeFocused();
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page
    .getByRole("navigation", { name: "Main navigation" })
    .getByRole("link", { name: "Projects", exact: true })
    .click();
  await expect(page).toHaveURL(/\/projects\/$/);
  await expect(
    page.getByRole("button", { name: "Open navigation" }),
  ).toHaveAttribute("aria-expanded", "false");
});
test("unknown pages and excluded drafts return 404", async ({ page }) => {
  expect((await page.goto("/does-not-exist/"))?.status()).toBe(404);
  await expect(
    page.getByRole("heading", { name: "This page hasn’t been built here." }),
  ).toBeVisible();
  if (!preview) {
    for (const slug of [
      "building-ai-job-matching",
      "document-search-with-rag",
    ]) {
      expect((await page.goto(`/blog/${slug}/`))?.status()).toBe(404);
      expect(fs.existsSync(`out/blog/${slug}/index.html`)).toBe(false);
      expect(fs.readFileSync("out/sitemap.xml", "utf8")).not.toContain(slug);
    }
    await page.goto("/blog/");
    await expect(page.getByText("0 articles", { exact: true })).toBeVisible();
  }
});
test("confirmed contact, social and YouTube destinations", async ({ page }) => {
  await page.goto("/contact/");
  await expect(
    page.getByRole("link", { name: "Email Ikram", exact: true }),
  ).toHaveAttribute("href", "mailto:ikramullah@gmx.co.uk");
  const channels = page.getByRole("navigation", {
    name: "Contact and social links",
  });
  const destinations = [
    ["Email", "mailto:ikramullah@gmx.co.uk"],
    ["LinkedIn", "https://www.linkedin.com/in/ullahikram/"],
    ["GitHub", "https://github.com/ikramullah7/BuildWithIkram"],
    ["YouTube", "https://www.youtube.com/@BuildWithIkram"],
  ];
  await expect(channels.getByRole("link")).toHaveCount(destinations.length);
  for (const [name, href] of destinations) {
    await expect(
      channels.getByRole("link", { name: new RegExp(`^${name}`) }),
    ).toHaveAttribute("href", href);
  }
  await expect(page.getByText("Coming soon", { exact: true })).toHaveCount(0);
  const footer = page.getByRole("navigation", { name: "Social links" });
  for (const [name, href] of destinations.slice(1)) {
    await expect(
      footer.getByRole("link", { name, exact: true }),
    ).toHaveAttribute("href", href);
  }
  await page.goto("/");
  await expect(
    page
      .locator(".hero-actions")
      .getByRole("link", { name: "Watch on YouTube" }),
  ).toHaveAttribute("href", "https://www.youtube.com/@BuildWithIkram");
  await page.goto("/videos/");
  await expect(
    page.getByRole("heading", { name: "Every useful build has a story." }),
  ).toBeVisible();
  await expect(
    page.getByRole("main").getByRole("link", { name: "Watch on YouTube" }),
  ).toHaveAttribute("href", "https://www.youtube.com/@BuildWithIkram");
  await expect(page.locator("iframe")).toHaveCount(0);
});
test("editorial preview renders MDX, highlights code, filters and links", async ({
  page,
  context,
}) => {
  test.skip(
    !preview,
    "Draft content is only rendered in the editorial preview build",
  );
  await page.goto("/blog/");
  await expect(page.getByRole("status")).toHaveText("2 articles");
  await page
    .getByLabel("Category", { exact: true })
    .selectOption("Document intelligence");
  await expect(page.getByRole("status")).toHaveText("1 article");
  await page.getByLabel("Tag", { exact: true }).selectOption("Python");
  await expect(page.getByRole("status")).toHaveText("0 articles");
  await page.getByLabel("Category", { exact: true }).selectOption("All");
  await expect(page.getByRole("status")).toHaveText("1 article");
  await page
    .getByRole("heading", { name: "Designing an AI job matching workflow" })
    .getByRole("link")
    .click();
  await expect(page.locator("pre code")).toContainText("location_allowed");
  await expect(page.locator("[data-rehype-pretty-code-figure]")).toHaveCount(1);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    /noindex/,
  );
  await page
    .getByRole("navigation", { name: "Table of contents" })
    .getByRole("link", { name: "Privacy and limitations" })
    .click();
  await expect(page).toHaveURL(/#privacy-and-limitations$/);
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.getByRole("button", { name: "Copy code" }).click();
  await expect(page.getByText("Copied", { exact: true })).toBeVisible();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain(
    "location_allowed",
  );
  await expect(
    page.getByRole("link", { name: "Related project →" }),
  ).toHaveAttribute("href", "/projects/ai-job-matching/");
  const axe = await new AxeBuilder({ page })
    .withTags([
      "wcag2a",
      "wcag2aa",
      "wcag21a",
      "wcag21aa",
      "wcag22a",
      "wcag22aa",
    ])
    .analyze();
  expect(axe.violations).toEqual([]);
});
for (const slug of ["building-ai-job-matching", "document-search-with-rag"])
  test(`editorial article mobile and accessibility: ${slug}`, async ({
    page,
  }) => {
    test.skip(!preview, "Unpublished articles are not in production");
    await page.setViewportSize({ width: 375, height: 900 });
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    expect((await page.goto(`/blog/${slug}/`))?.status()).toBe(200);
    await expect(page.locator("main h1")).toHaveCount(1);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      /noindex/,
    );
    await expect(page.locator("pre code")).toHaveCount(1);
    await expect(
      page.getByRole("navigation", { name: "Table of contents" }),
    ).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    const audit = await new AxeBuilder({ page })
      .withTags([
        "wcag2a",
        "wcag2aa",
        "wcag21a",
        "wcag21aa",
        "wcag22a",
        "wcag22aa",
      ])
      .analyze();
    expect(
      audit.violations.map((v) => ({
        id: v.id,
        targets: v.nodes.map((n) => n.target),
      })),
    ).toEqual([]);
    expect(errors).toEqual([]);
  });
