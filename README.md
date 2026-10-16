# Ralypto — portfolio website

One studio, three worlds: **Software Lab** (amber terminal), **Creative Studio** (risograph magazine, incl. digital marketing) and **Hardware Lab** (engineering blueprint).

## Run it

Needs Node.js 18.18 or newer.

```bash
npm install
npm run dev      # open http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

## Where things are

| What                                      | File                                           |
| ----------------------------------------- | ---------------------------------------------- |
| All text, projects, team, email, WhatsApp | `lib/content.ts`                               |
| Brand colours and fonts                   | top of `styles/base.css`                       |
| Home page                                 | `app/page.tsx`                                 |
| Lab pages                                 | `app/software`, `app/creative`, `app/hardware` |
| Shared lab layout                         | `components/LabPage.tsx`                       |
| Case study template                       | `app/work/[slug]/page.tsx`                     |
| Start-a-project form                      | `components/BriefBuilder.tsx`                  |
| Email and WhatsApp draft links            | `lib/project-brief.ts`                         |
| Header logo artwork                       | `public/brand/ralypto-logo*.svg`               |

## Add a project

Add an entry to `projects` in `lib/content.ts`. The first lab in `labs` decides the card style; two or more labs makes it a cross-lab project. Put images in `public/work/` and list them in `images`.

## Before going live

1. Replace every sample project in `lib/content.ts` with real work.
2. Set the real email, WhatsApp number and social links in `site`.
3. Replace founder names, bios, links; add photos to `public/team/`.
4. Add a showreel MP4 to `public/` and set `SHOWREEL` in `components/CreativeHero.tsx`.
5. Add real before/after photos in `app/creative/page.tsx`.
6. Deploy on Vercel (free): push to GitHub, import the repo at vercel.com, add the domain.

## Fun detail

On the Software Lab page, press the backtick key (`) or the "Open terminal" button and type `help`.

## Project enquiries

The contact page renders `BriefBuilder` inside a React Suspense boundary. The
builder keeps the four-step form in browser state and assembles the selected labs,
idea, timeline, budget, name and reply contact into one message. The final buttons
validate the required details before opening an external draft.

`lib/project-brief.ts` reads the recipient details from `site` in `lib/content.ts`
and URL-encodes the message for Gmail compose, a default email app (`mailto:`),
and WhatsApp (`wa.me`). The Gmail link passes a complete encoded `mailto:` URI
through Gmail's `extsrc=mailto` handler, preserving its recipient, subject and
message body together. Email line breaks use CRLF. Gmail is used for the main email button so visitors can
open webmail without configuring a desktop mail handler. It requires a Google
account; the final step also offers a link to the visitor's email app and a Copy
brief button as a fallback if a mail provider fails to populate the message. WhatsApp
uses the visitor's app or WhatsApp Web. Visitors review and press Send themselves.
No API route, mail server, database, credentials or automatic sending is involved.
The site does not save a copy of the enquiry; leaving/reloading the form loses
the entered details. Long briefs can encounter browser/provider URL limits.

The shared navigation displays the supplied logo as SVG outlines, with navy ink
on light headers and cream ink on dark lab headers; both retain the yellow dot.
`scripts/trace-logo.py` documents how the outlines were extracted from the supplied
brand board (Pillow and NumPy are only needed to regenerate assets).

Check draft destinations and special-character encoding with:

```bash
node scripts/check-project-brief.cjs
npm run build
```
