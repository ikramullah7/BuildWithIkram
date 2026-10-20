import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import fs from "node:fs";
import path from "node:path";
fs.mkdirSync("artifacts", { recursive: true });
const baseURL = process.env.QA_BASE_URL || "http://127.0.0.1:3000";
const routes = [
  ["home", "/"],
  ["services", "/solutions/"],
  ["results", "/results-as-a-service/"],
  ["examples", "/projects/"],
  ["demo", "/demonstrations/enquiry-workflow/"],
  ["about", "/about/"],
  ["contact", "/contact/"],
  ["privacy", "/privacy/"],
  ["articles", "/blog/"],
  ["videos", "/videos/"],
];
if (process.env.CONTENT_PREVIEW === "true")
  routes.push(["article", "/blog/building-ai-job-matching/"]);
const client = new Client({ name: "buildwithikram-qa", version: "1.0.0" });
try {
  await client.connect(
    new StdioClientTransport({
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
    }),
  );
  const result = await client.callTool({
    name: "browser_run_code_unsafe",
    arguments: {
      code: `async(page) => {
    const errors = []; const layouts = [];
    page.on('pageerror',error=>errors.push(error.message));
    page.on('console',message=>{if(message.type()==='error')errors.push(message.text());});
    for(const [name,route] of ${JSON.stringify(routes)}) {
      for(const width of [375,768,1280,1440]) {
        await page.setViewportSize({width,height:1000});
        await page.goto(new URL(route,${JSON.stringify(baseURL)}).href);
        await page.evaluate(()=>document.fonts.ready);
        if(name==='home' && [375,1440].includes(width)) await page.locator('.header .brand').screenshot({path:${JSON.stringify(path.resolve("artifacts"))}+'/brand-'+width+'.png'});
        layouts.push({route,width,scrollWidth:await page.evaluate(()=>document.documentElement.scrollWidth)});
        await page.screenshot({path:${JSON.stringify(path.resolve("artifacts"))}+'/'+name+'-'+width+'.png',fullPage:true});
      }
    }
    await page.goto(new URL('/demonstrations/enquiry-workflow/',${JSON.stringify(baseURL)}).href);
    await page.getByRole('button',{name:'Run sample checks'}).click();
    await page.getByRole('button',{name:'Review ENQ-101',exact:true}).click();
    await page.getByRole('button',{name:'Approve simulated next step'}).click();
    await page.evaluate(()=>{document.documentElement.style.scrollBehavior='auto';window.scrollTo({top:0,behavior:'instant'});});
    await page.screenshot({path:${JSON.stringify(path.resolve("artifacts/demo-approved.png"))},fullPage:true});
    await page.setViewportSize({width:375,height:1000});
    await page.goto(new URL('/demonstrations/enquiry-workflow/',${JSON.stringify(baseURL)}).href);
    await page.evaluate(()=>{document.documentElement.style.scrollBehavior='auto';});
    await page.getByRole('button',{name:'Run sample checks'}).click();
    await page.getByRole('button',{name:'Review ENQ-101',exact:true}).click();
    await page.getByRole('button',{name:'Approve simulated next step'}).click();
    await page.locator('.demo-review').screenshot({path:${JSON.stringify(path.resolve("artifacts/demo-approved-mobile.png"))}});
    return {layouts,errors,demoSummary:await page.locator('.demo-summary').innerText()};
  }`,
    },
  });
  fs.writeFileSync("artifacts/mcp-qa.json", JSON.stringify(result, null, 2));
  if (result.isError) throw new Error(JSON.stringify(result));
  for (const item of result.content || [])
    if (item.type === "text")
      console.log(item.text.split("### Ran Playwright code")[0]);
} finally {
  await client.close();
}
