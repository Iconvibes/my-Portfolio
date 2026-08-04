const Marquee = ({ items = [] }) => {
  const row = [...items, ...items];

  return (
    <div className="marquee-paused relative overflow-hidden border-y border-signal-ink bg-signal py-3">
      <div className="animate-marquee flex w-max items-center gap-8 whitespace-nowrap pr-8">
        {row.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="mono-label flex items-center gap-8 text-signal-ink"
          >
            {item}
            <span aria-hidden="true" className="text-signal-ink/50">
              ✦
            </span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
