import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page page-head">
      <h1>This page was never built.</h1>
      <p>The link may be old or mistyped. <Link href="/">Go back to the home page</Link> or <Link href="/work">see our work</Link>.</p>
    </div>
  );
}
