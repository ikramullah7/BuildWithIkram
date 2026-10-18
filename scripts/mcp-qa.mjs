import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import fs from "node:fs";
import path from "node:path";
fs.mkdirSync("artifacts", { recursive: true });
const client = new Client({ name: "buildwithikram-qa", version: "1.0.0" });
const transport = new StdioClientTransport({
  command: "node",
  args: [
    "node_modules/@playwright/mcp/cli.js",
    "--headless",
    "--isolated",
    "--browser",
    "chrome",
    "--output-dir",
    path.resolve("artifacts"),
  ],
  stderr: "pipe",
});
try {
  await client.connect(transport);
  const tools = await client.listTools();
  const results = [];
  async function call(name, args) {
    const result = await client.callTool({ name, arguments: args });
    if (result.isError) throw new Error(JSON.stringify(result));
    results.push({ name, result });
    return result;
  }
  await call("browser_navigate", { url: "http://127.0.0.1:3000/" });
  for (const width of [375, 768, 1280, 1440]) {
    await call("browser_resize", { width, height: 1000 });
    await call("browser_take_screenshot", {
      type: "png",
      filename: path.resolve(`artifacts/home-${width}.png`),
      fullPage: true,
    });
  }
  await call("browser_navigate", {
    url: "http://127.0.0.1:3000/projects/enterprise-document-search/",
  });
  await call("browser_take_screenshot", {
    type: "png",
    filename: path.resolve("artifacts/project-desktop.png"),
    fullPage: true,
  });
  if (process.env.CONTENT_PREVIEW === "true") {
    await call("browser_navigate", {
      url: "http://127.0.0.1:3000/blog/building-ai-job-matching/",
    });
    await call("browser_take_screenshot", {
      type: "png",
      filename: path.resolve("artifacts/article-desktop.png"),
      fullPage: true,
    });
    await call("browser_resize", { width: 375, height: 900 });
    await call("browser_take_screenshot", {
      type: "png",
      filename: path.resolve("artifacts/article-mobile.png"),
      fullPage: true,
    });
  }
  await call("browser_console_messages", { level: "error" });
  fs.writeFileSync(
    "artifacts/mcp-qa.json",
    JSON.stringify(
      { availableTools: tools.tools.map((t) => t.name), results },
      null,
      2,
    ),
  );
  console.log(
    "Microsoft Playwright MCP connected, navigated local pages and captured all four viewport widths. Results: artifacts/mcp-qa.json",
  );
} finally {
  await client.close();
}
