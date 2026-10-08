"use client";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Project, labs, statusLabel, isCrossLab } from "@/lib/content";
import MockVisual from "./MockVisual";
const DURATION = 6000; // ms per slide 
function Slide({ p }: { p: Project }) { 
  return p.images?.[0] ? <img src={p.images[0]} alt={p.title} className="ws__img" /> : <MockVisual kind={p.visual} title={p.title} />; 
} 
export default function WorkShowcase({ items }: { items: Project[] }) { 
  const [i, setI] = useState(0); 
  const [prev, setPrev] = useState<number | null>(null); 
  const [paused, setPaused] = useState(false); 
  const touchX = useRef<number | null>(null); 
  const n = items.length; 
  const go = useCallback((next: number) => { 
    setI((cur) => { 
      const target = (next + n) % n; 
      if (target !== cur) setPrev(cur); 
      return target; 
    }); 
  }, [n]); 
  useEffect(() => { 
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return; 
    const id = setTimeout(() => go(i + 1), DURATION); 
    return () => clearTimeout(id); 
  }, [i, paused, go]); 
  const p = items[i]; 
  const theme = isCrossLab(p) ? "cross" : p.labs[0]; 
  return ( 
    <div className={`ws ws--${theme} ${paused ? "is-paused" : ""}`} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)} onKeyDown={(e) => { if (e.key === "ArrowRight") go(i + 1); if (e.key === "ArrowLeft") go(i - 1); }} onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }} onTouchEnd={(e) => { if (touchX.current === null) return; const dx = e.changedTouches[0].clientX - touchX.current; if (Math.abs(dx) > 50) go(dx < 0 ? i + 1 : i - 1); touchX.current = null; }} aria-roledescription="carousel" aria-label="Selected work" > 
      <div className="ws__stage"> 
        <div className="ws__frame"> 
          {prev !== null && ( <div className="ws__layer ws__layer--prev" key={`p${prev}-${i}`}><Slide p={items[prev]} /></div> )} 
          <div className="ws__layer ws__layer--cur" key={`c${i}`}> 
            <span className="ws__sweep" aria-hidden="true" /> 
            <Slide p={p} /> 
          </div> 
          <span className="ws__count" aria-hidden="true"> {String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")} </span> 
        </div> 
        <div className="ws__info" key={`i${i}`} aria-live="polite"> 
          <p className="ws__labs"> {p.labs.map((l) => <span key={l} className={`chip chip--${l}`}>{labs[l].name}</span>)} <span className="chip chip--status">{statusLabel[p.status]}</span> </p> 
          <h3>{p.title}</h3> 
          <p className="ws__client">{p.client}</p> 
          <p className="ws__summary">{p.summary}</p> 
          {p.metrics && ( <dl className="ws__metrics"> {p.metrics.map((m) => ( <div key={m.label}><dd>{m.value}</dd><dt>{m.label}</dt></div> ))} </dl> )} 
          <Link href={`/work/${p.slug}`} className="btn">Read the case study</Link> 
        </div> 
      </div> 
      <div className="ws__controls"> 
        <button className="ws__arrow" onClick={() => go(i - 1)} aria-label="Previous project">‹</button> 
        <ol className="ws__dots"> 
          {items.map((it, k) => ( 
            <li key={it.slug}> 
              <button onClick={() => go(k)} aria-label={`Show ${it.title}`} aria-current={k === i ? "true" : undefined} className={`ws__dot ws__dot--${isCrossLab(it) ? "cross" : it.labs[0]}`} > 
                <span key={k === i ? `on${i}` : "off"} style={{ animationDuration: `${DURATION}ms` }} /> 
              </button> 
            </li> 
          ))} 
        </ol> 
        <button className="ws__arrow" onClick={() => go(i + 1)} aria-label="Next project">›</button> 
      </div> 
    </div> 
  ); 
}
