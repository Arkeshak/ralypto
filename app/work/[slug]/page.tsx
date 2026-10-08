import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects, labs, statusLabel, isCrossLab } from "@/lib/content";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  return p ? { title: p.title, description: p.summary } : {};
}

export default async function CaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const theme = isCrossLab(p) ? "cross" : p.labs[0];
  const idx = projects.findIndex((x) => x.slug === p.slug);
  const next = projects[(idx + 1) % projects.length];

  return (
    <article className={`case case--${theme}`}>
      <header className="case__head">
        <p className="case__labs">
          {p.labs.map((l) => (
            <Link key={l} href={labs[l].path} className={`chip chip--${l}`}>{labs[l].name}</Link>
          ))}
          <span className="chip chip--status">{statusLabel[p.status]}</span>
        </p>
        <h1>{p.title}</h1>
        <p className="case__summary">{p.summary}</p>
      </header>

      {p.metrics && (
        <dl className="case__metrics">
          {p.metrics.map((m) => (
            <div key={m.label}><dt>{m.label}</dt><dd>{m.value}</dd></div>
          ))}
        </dl>
      )}

      <div className="case__body">
        <section><h2>The challenge</h2><p>{p.challenge}</p></section>
        <section><h2>What we built</h2><p>{p.built}</p></section>
        <section>
          <h2>Tools</h2>
          <ul className="case__tools">{p.tools.map((t) => <li key={t}>{t}</li>)}</ul>
        </section>
        <section><h2>The result</h2><p>{p.result}</p></section>
      </div>

      {p.video && (
        <div className="case__video">
          <iframe src={p.video} title={`${p.title} video`} allowFullScreen loading="lazy" />
        </div>
      )}

      {p.images && p.images.length > 0 && (
        <div className="case__gallery">
          {p.images.map((src) => <img key={src} src={src} alt={`${p.title} image`} loading="lazy" />)}
        </div>
      )}

      <nav className="case__next" aria-label="Next project">
        <span>Next project</span>
        <Link href={`/work/${next.slug}`}>{next.title}</Link>
      </nav>
    </article>
  );
}
