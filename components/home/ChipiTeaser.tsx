"use client";
import { useState } from "react";
import Link from "next/link";
import { Shimmer, Pull } from "./Anim";
import { chipi } from "@/lib/products";
import Chipi3DViewer, { ExpressionType } from "@/components/products/Chipi3DViewer";

/* Homepage CHIPI section: the same interactive 3D showcase as the Products page. */
export default function ChipiTeaser() {
  const [expr, setExpr] = useState<ExpressionType>("normal");
  return (
    <div className="hm-wrap hm-product">
      <p className="hm-badge"><i aria-hidden="true" /><Shimmer text="Coming soon · Limited early-bird pre-orders" /></p>
      <h2 id="hm-product">CHIPI.</h2>
      <p className="hm-lead">
        A pocket-sized smart companion with an expressive face. {chipi.teaser}
      </p>
      <p className="hm-price">Estimated price LKR 3,000–3,500</p>
      <div className="hm-actions">
        <Pull><Link href="/products" className="hm-btn hm-btn--amber">Explore CHIPI</Link></Pull>
      </div>

      {/* .pd supplies the colour variables the product viewer's styles rely on */}
      <div className="pd hm-pd">
        <Chipi3DViewer expression={expr} onExpressionChange={setExpr} />
      </div>
    </div>
  );
}
