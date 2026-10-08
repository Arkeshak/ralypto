# Prompt for coding agents (Claude Code, Cursor, Copilot, etc.)

Copy everything below the line into your coding agent, with this project folder open.

---

You are working on the portfolio website for **Ralypto**, a new three-person studio from Sri Lanka. The codebase in this folder is a working Next.js 15 (App Router) + TypeScript project with plain CSS. Read `README.md` and `lib/content.ts` before changing anything.

## What the company does

Ralypto has three departments, called labs. Each founder leads one:

1. **Software Lab**: websites, ERP and business systems, custom software, mobile apps, AI agents and automation, integrations.
2. **Creative Studio**: logo and brand identity, graphic design, video editing, photo editing, and **digital marketing** (social media management, paid ads on Meta and Google, SEO and content, campaign strategy).
3. **Hardware Lab**: embedded systems, robotics, IoT devices, relay and control design, 3D and AutoCAD design, prototyping.

The site's job: when the team finds a potential client, they send this website to show what they have done. It must look creative and unlike any template.

## The design concept: one studio, three worlds

Each lab page is its own visual world, tied together by the Ralypto brand. Never flatten them into one generic style.

| Area                               | World                    | Colours                                                                                            | Display font                           |
| ---------------------------------- | ------------------------ | -------------------------------------------------------------------------------------------------- | -------------------------------------- |
| Brand (home, work, about, contact) | Clean studio             | violet ink `#1b1530`, cool paper `#f5f6f8`, Ralypto violet `#5b3df5`                               | Unbounded                              |
| Software Lab                       | Amber phosphor terminal  | `#121008` background, `#ffb000` amber, `#e9e2cf` text                                              | JetBrains Mono                         |
| Creative Studio                    | Risograph print magazine | white paper, pink `#ff48b0`, blue `#0078bf`, yellow `#ffe800`, multiply-blended overlapping shapes | Bricolage Grotesque (condensed widths) |
| Hardware Lab                       | Engineering blueprint    | `#1c4ba0` blue with grid lines, `#dce8ff` lines, `#ff7a1a` orange for dimensions and annotations   | Barlow Condensed                       |

Body text everywhere: Instrument Sans. All tokens live at the top of `styles/base.css`; use the CSS variables, never hard-code new colours.

### Signature moments (keep them)

- **Home**: the "three doors" hero (`components/ThreeDoors.tsx`). Three panels, one per lab; hovering widens a panel; clicking enters the lab.
- **Software Lab**: a terminal that types out a build log (`TerminalHero.tsx`) and a working hidden terminal opened with the backtick key (`HiddenTerminal.tsx`, commands: help, ls, cd, labs, whoami, contact, clear, exit).
- **Creative Studio**: giant overprinted "Creative Studio" headline over drifting riso shapes (`CreativeHero.tsx`), a digital marketing funnel section (`MarketingSection.tsx`), a drag-to-compare before/after slider (`BeforeAfter.tsx`).
- **Hardware Lab**: a robot-arm technical drawing that draws itself (`BlueprintDraw.tsx`), a drawing title block, and an exploded view whose layers separate on scroll (`ExplodedView.tsx`).
- **Project cards** (`ProjectCard.tsx`) change form by lab: repository card (software), poster (creative), spec sheet (hardware), striped card (cross-lab).
- **Contact**: a four-step brief builder that produces a WhatsApp or email message (`BriefBuilder.tsx`). No backend needed.

## Structure

- Every lab page uses `components/LabPage.tsx` with the same section order: hero, what we build, lab extras, selected work, tools, how this lab works, lab lead, call to action. Each lab supplies its own hero and extras.
- All content comes from `lib/content.ts`: `site`, `labs`, `team`, `projects`. Pages must not contain hard-coded project data.
- Project `labs` array: the first lab is the main one and decides the card style; two or more labs = cross-lab project.
- Every project carries a `status` shown on the site: Client project, Personal project, or Concept. Keep this honest labelling.

## Rules

1. **Do not make it generic.** No stock SaaS card grids with identical rounded corners and grey shadows, no gradient blobs as decoration, no all-caps eyebrow labels above headings, no arrows appended to button text, no fade-up animation on every section. One orchestrated motion moment per page is enough.
2. Keep each lab in its own world. A new section on the Hardware page must look like it belongs on a blueprint; on the Creative page, like a print magazine; on the Software page, like a terminal.
3. Write copy in plain, active, client-facing language. Buttons say exactly what they do ("Start a project", "Send on WhatsApp").
4. Accessibility: keyboard focus visible, `prefers-reduced-motion` respected (already handled globally in `styles/base.css`), real alt text on images, colour contrast at WCAG AA.
5. Responsive down to 360px wide. Test every change on mobile.
6. Do not add new dependencies unless clearly necessary. Use `next/image` if you add many images.
7. Run `npm run build` after every change and fix all errors before finishing.
8. Ralypto is not a registered company yet. Never write "Pvt Ltd", registration numbers or claims of company size.

## Tasks you may be asked to do

- Replace the sample projects in `lib/content.ts` with real ones (the team will provide details, images and videos).
- Add founder names, bios, photos (`public/team/`) and links.
- Add a Ralypto logo (SVG) to replace the text wordmark in `components/Nav.tsx`, keeping the three lab-coloured dots.
- Add a showreel video to the Creative Studio hero.
- Add real before/after images.
- Add new projects with `images` and a YouTube `video` embed.
- Add SEO: Open Graph images per page, `sitemap.ts`, `robots.ts`.
- Optional: move projects to a CMS (Sanity or MDX files) once there are more than about 15.
- Deploy to Vercel and connect the domain.

When you finish a task, summarise what you changed and which files you touched.
