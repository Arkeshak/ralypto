import type { FeatureIcon } from "@/lib/products";

const paths: Record<FeatureIcon, React.ReactNode> = {
  keychain: <><circle cx="8" cy="8" r="4" /><path d="M11 11l9 9M16 16l2-2M18.5 18.5l2-2" /></>,
  display: <><rect x="3" y="5" width="18" height="12" rx="2" /><path d="M8 21h8M12 17v4" /></>,
  face: <><circle cx="12" cy="12" r="9" /><path d="M9 10h.01M15 10h.01M8.5 14.5c1 1.5 2.2 2 3.5 2s2.5-.5 3.5-2" /></>,
  touch: <><path d="M9 11V5a2 2 0 014 0v6" /><path d="M13 10a2 2 0 014 0v3a7 7 0 01-7 7c-3 0-4-1.5-6-4l-1-2a2 2 0 013-2l1 1" /></>,
  motion: <path d="M4 12h3l2-6 4 12 2-6h5" />,
  chip: <><rect x="7" y="7" width="10" height="10" rx="1.5" /><path d="M10 3v4M14 3v4M10 17v4M14 17v4M3 10h4M3 14h4M17 10h4M17 14h4" /></>,
};

export default function ProductIcon({ name }: { name: FeatureIcon }) {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}
