import { labs } from "@/lib/content";
import BlueprintDraw from "./BlueprintDraw";

export default function HardwareHero() {
  return (
    <div className="hw-hero">
      <BlueprintDraw />
      <div className="hw-hero__block">
        <h1>{labs.hardware.name}</h1>
        <p>{labs.hardware.promise}</p>
        <table className="title-block">
          <tbody>
            <tr>
              <th scope="row">Drawn by</th>
              <td>Ralypto</td>
            </tr>
            <tr>
              <th scope="row">Sheet</th>
              <td>1 of 1</td>
            </tr>
            <tr>
              <th scope="row">Scale</th>
              <td>1 : idea</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
