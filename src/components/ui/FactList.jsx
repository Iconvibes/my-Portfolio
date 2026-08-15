// Shared renderer for the quotable facts module (src/content/facts.js).
//
// Used by the home FactSheet (full facts grid) and the About at-a-glance card
// (curated subset, row style) so both pages render the same data with the same
// markup — no hand-written duplicates that can drift apart.
//
// Props:
//   facts        array of { label, statement }
//   className    classes for the <dl> (layout: grid, spacing, columns)
//   ddClassName  classes for each <dd> statement (default matches FactSheet)
//   rows         when true, add separator borders between facts (About card)
const FactList = ({ facts, className = '', ddClassName = 'mt-2 text-sm leading-7 text-slate-300', rows = false }) => {
  const rowClasses = rows ? 'border-b border-line-soft pb-3 last:border-b-0 last:pb-0' : '';
  return (
    <dl className={className}>
      {facts.map((fact) => (
        <div key={fact.label} className={rowClasses}>
          <dt className="mono-label text-slate-500">{fact.label}</dt>
          <dd className={ddClassName}>{fact.statement}</dd>
        </div>
      ))}
    </dl>
  );
};

export default FactList;
