// Run after npm ci: node scripts/check-project-brief.cjs
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const ts = require("typescript");

function loadTs(file) {
  const filename = path.resolve(__dirname, "..", file);
  const { outputText } = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  });
  const module = { exports: {} };
  new Function("require", "module", "exports", outputText)(
    (name) => loadTs(path.relative(path.resolve(__dirname, ".."), path.resolve(path.dirname(filename), `${name}.ts`))),
    module,
    module.exports,
  );
  return module.exports;
}

const { site } = loadTs("lib/content.ts");
const { projectBriefLinks } = loadTs("lib/project-brief.ts");
const message = [
  "Hi Ralypto, I'm Test Client.",
  "I need: Software Lab, Creative Studio",
  "Idea: A café website & store + booking? #launch 100% 🚀",
  "Timeline: Within a month",
  "Budget: LKR 50,000 to 200,000",
  "Reach me at: test+brief@example.com",
].join("\n");
const links = projectBriefLinks(message);
const email = new URL(links.email);
const whatsapp = new URL(links.whatsapp);
const emailApp = new URL(links.emailApp);

assert.equal(email.origin, "https://mail.google.com");
assert.equal(email.searchParams.get("extsrc"), "mailto");
assert.equal(email.searchParams.get("url"), links.emailApp);
const gmailDraft = new URL(email.searchParams.get("url"));
assert.equal(gmailDraft.protocol, "mailto:");
assert.equal(gmailDraft.pathname, "ralypto@gmail.com");
assert.equal(gmailDraft.searchParams.get("subject"), "New project brief");
assert.equal(gmailDraft.searchParams.get("body"), message.replace(/\n/g, "\r\n"));
assert.equal(whatsapp.origin, "https://wa.me");
assert.equal(whatsapp.pathname, "/94755159435");
assert.equal(whatsapp.searchParams.get("text"), message);
assert.equal(emailApp.protocol, "mailto:");
assert.equal(emailApp.pathname, "ralypto@gmail.com");
assert.equal(emailApp.searchParams.get("body"), message.replace(/\n/g, "\r\n"));
assert.equal(new URL(projectBriefLinks("Line one\r\nLine two").emailApp).searchParams.get("body"), "Line one\r\nLine two");
assert.equal(site.whatsappDisplay, "+94 75 515 9435");
assert.equal(site.socials.find(({ label }) => label === "WhatsApp").href, "https://wa.me/94755159435");
console.log("Project draft checks passed: recipients, all fields, multiline text, Unicode and URL encoding.");
