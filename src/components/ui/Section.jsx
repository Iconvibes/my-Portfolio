const Section = ({ eyebrow, title, description, children, className = '' }) => (
  <section className={`mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-10 lg:py-28 ${className}`.trim()}>
    <div className="max-w-3xl">
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      {title ? <h2 className="mt-4 text-3xl font-semibold tracking-normal text-white sm:text-4xl lg:text-5xl">{title}</h2> : null}
      {description ? <p className="mt-5 text-lg leading-8 text-slate-400">{description}</p> : null}
    </div>
    {children}
  </section>
);

export default Section;
