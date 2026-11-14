"use client";
import { useEffect, useRef, useState } from "react";

/* Shows the real product photo. If the file is not there yet, shows a neutral
   placeholder (never an invented product design). */
export default function ProductImage({ src, alt, priority }: { src: string; alt: string; priority?: boolean }) {
  const [failed, setFailed] = useState(false);
  const ref = useRef<HTMLImageElement>(null);
  /* The image may fail before React attaches onError, so check once on mount. */
  useEffect(() => {
    const el = ref.current;
    if (el && el.complete && el.naturalWidth === 0) setFailed(true);
  }, []);
  if (failed) {
    return (
      <div className="pd-ph" role="img" aria-label="Chipi product photo coming soon">
        <span>CHIPI</span>
        <small>Product photo coming soon</small>
      </div>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={ref}
      src={src}
      alt={alt}
      width={900}
      height={900}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}
