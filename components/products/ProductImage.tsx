"use client";
import { useState } from "react";

/* Shows the real product photo. If the file is not there yet, shows a neutral
   placeholder (never an invented product design). */
export default function ProductImage({ src, alt, priority }: { src: string; alt: string; priority?: boolean }) {
  const [failed, setFailed] = useState(false);
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
