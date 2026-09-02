const Section = ({
  eyebrow,
  index,
  title,
  description,
  children,
  className = '',
  tone = 'ink',
  align = 'left',
  id
}) => (
  <section id={id} className={`mx-auto max-w-7xl px-5 py-14 sm:px-6 sm:py-20 md:px-8 lg:px-10 lg:py-28 ${className}`.trim()}>
    <div className={`max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      {eyebrow ? (
        <p className={tone === 'ink' ? 'eyebrow' : 'eyebrow-ink'}>
          {index ? <span className="mr-2 text-slate-500">{index}</span> : null}
          {eyebrow}
        </p>
      ) : null}
      {title ? (
        <h2
          className={`display-ink mt-3 text-2xl sm:text-3xl md:text-4xl lg:text-5xl ${
            tone === 'ink' ? 'text-white' : 'text-ink'
          }`}
        >
          {title}
        </h2>
      ) : null}
      {description ? (
        <p className={`mt-4 text-base leading-7 sm:text-lg sm:leading-8 ${tone === 'ink' ? 'text-slate-400' : 'text-ink/70'}`}>
          {description}
        </p>
      ) : null}
    </div>
    {children}
  </section>
);

export default Section;
