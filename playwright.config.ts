import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: "http://127.0.0.1:3000",
    headless: true,
    launchOptions: {
      executablePath:
        process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE ||
        (process.platform === "darwin"
          ? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
          : undefined),
    },
    trace: "retain-on-failure",
  },
  webServer: {
    command: "node scripts/serve.mjs",
    url: "http://127.0.0.1:3000",
    reuseExistingServer: !process.env.CI,
  },
  workers: 2,
});
