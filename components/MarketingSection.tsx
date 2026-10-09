import SectionHead from "./SectionHead";
import LabLabel from "./LabLabel";

const funnel = [
  { title: "Reach", text: "Content and ads that put your brand in front of the right people." },
  { title: "Engage", text: "Reels, carousels and stories people save, share and reply to." },
  { title: "Convert", text: "Landing pages, offers and retargeting that turn followers into buyers." },
  { title: "Report", text: "A monthly report in plain language: what worked, what we change next." },
];

const monthly = [
  "A content calendar planned a month ahead",
  "Designed posts, reels and stories",
  "Paid ad campaigns on Meta and Google",
  "Replies and community management",
  "A monthly results report and review call",
];

const channels = ["Instagram", "Facebook", "TikTok", "YouTube", "Google Search", "LinkedIn"];

export default function MarketingSection() {
  return (
    <section className="lab-section mk" data-chapter="Marketing">
      <SectionHead
        label={<LabLabel lab="creative" name="Marketing" />}
        title="Digital marketing"
        intro="Good design only works if people see it. We plan the campaign, make the content, run the ads and show you the numbers."
      />
      <ol className="mk__funnel">
        {funnel.map((f, i) => (
          <li
            key={f.title}
            data-reveal
            style={{
              ["--w" as string]: `${100 - i * 14}%`,
              transitionDelay: `${i * 0.12}s`,
            }}
          >
            <h3>{f.title}</h3>
            <p>{f.text}</p>
          </li>
        ))}
      </ol>
      <div className="mk__cols">
        <div>
          <h3>Every month you get</h3>
          <ul className="mk__list">
            {monthly.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Where we run campaigns</h3>
          <ul className="tool-wall tool-wall--small">
            {channels.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
