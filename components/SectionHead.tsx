/* One consistent header for every section, so visitors always know where they are. */
export default function SectionHead({
  label,
  title,
  intro,
  action,
}: {
  label: React.ReactNode;
  title: string;
  intro?: string;
  action?: React.ReactNode;
}) {
  return (
    <header className="shead" data-reveal>
      <p className="shead__label">{label}</p>
      <div className="shead__row">
        <h2>{title}</h2>
        {intro && <p className="shead__intro">{intro}</p>}
      </div>
      {action && <div className="shead__action">{action}</div>}
    </header>
  );
}
