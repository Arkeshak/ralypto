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
