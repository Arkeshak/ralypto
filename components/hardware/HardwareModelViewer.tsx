"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const ShowcaseScene = dynamic(() => import("./ShowcaseScene"), {
  ssr: false,
  loading: () => <p className="h3d__loading">Loading 3D model ...</p>,
});

export default function HardwareModelViewer({
  modelId,
  animate = true,
  labels = true,
  exploded = false,
}: {
  modelId: string;
  animate?: boolean;
  labels?: boolean;
  exploded?: boolean;
}) {
  const [visible, setVisible] = useState(false);
  const [canAnimate, setCanAnimate] = useState(animate);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCanAnimate(animate && !window.matchMedia("(prefers-reduced-motion: reduce)").matches);

    const el = stageRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          // Optional: we can disconnect so it stays loaded once scrolled into view
          // or we can toggle visibility to save memory when scrolled away.
          // The prompt says: "Load heavy 3D scenes lazily. Do not render six expensive WebGL scenes simultaneously when they are off-screen."
          // So let's actually just render when visible.
        } else {
          // Unmount the heavy canvas when totally offscreen to save WebGL contexts
          setVisible(false);
        }
      },
      { rootMargin: "400px" } // large root margin to load before it appears
    );
    io.observe(el);
    return () => io.disconnect();
  }, [animate]);

  return (
    <div className="hw-showcase__stage" ref={stageRef} style={{ width: '100%', height: '400px', position: 'relative' }}>
      {visible ? (
        <ShowcaseScene model={modelId} animate={canAnimate} labels={labels} exploded={exploded} />
      ) : (
        <p className="h3d__loading" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.5 }}>
          [ Model sleeping ]
        </p>
      )}
      <p className="h3d__hint" aria-hidden="true" style={{ position: 'absolute', bottom: '1rem', left: '0', width: '100%', textAlign: 'center', opacity: 0.6, fontSize: '0.85rem' }}>
        Drag to rotate
      </p>
    </div>
  );
}
