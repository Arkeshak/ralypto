import Link from "next/link";
import { labs } from "@/lib/content";
import BlueprintDraw from "./BlueprintDraw";

/* Home hero: three panels, one per lab. Hover or focus widens a panel. */
export default function ThreeDoors() {
  return (
    <div className="doors">
      <Link href={labs.software.path} className="door door--software">
        <div className="door__preview" aria-hidden="true">
          <pre>
            <span className="t-dim">~/ralypto</span> <span className="t-amber">$</span> build --your-idea{"\n"}
            <span className="t-dim">compiling idea.ts ...</span>{"\n"}
            <span className="t-dim">tests passed</span> <span className="t-amber">12/12</span>{"\n"}
            <span className="t-amber">ready</span> on ralypto.com<span className="caret" />
          </pre>
        </div>
        <div className="door__label">
          <h2>{labs.software.name}</h2>
          <p>{labs.software.doorLine}</p>
        </div>
      </Link>

      <Link href={labs.creative.path} className="door door--creative">
        <div className="door__preview" aria-hidden="true">
          <div className="riso">
            <span className="riso__shape riso__shape--a" />
            <span className="riso__shape riso__shape--b" />
            <span className="riso__shape riso__shape--c" />
            <p className="riso__words">make<br />it<br />seen</p>
          </div>
        </div>
        <div className="door__label">
          <h2>{labs.creative.name}</h2>
          <p>{labs.creative.doorLine}</p>
        </div>
      </Link>

      <Link href={labs.hardware.path} className="door door--hardware">
        <div className="door__preview" aria-hidden="true">
          <BlueprintDraw compact />
        </div>
        <div className="door__label">
          <h2>{labs.hardware.name}</h2>
          <p>{labs.hardware.doorLine}</p>
        </div>
      </Link>
    </div>
  );
}
