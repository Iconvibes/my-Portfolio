const PageShell = ({ title, eyebrow, index, children, intro }) => (
  <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6 sm:py-16 md:px-8 lg:px-10 lg:py-24">
    <div className="max-w-3xl">
      <p className="eyebrow">
        {index ? <span className="mr-2 text-secondary">{index}</span> : null}
        {eyebrow}
      </p>
      <h1 className="display-ink mt-4 text-3xl text-paper sm:text-4xl md:text-5xl lg:text-6xl">{title}</h1>
      {intro ? <p className="mt-6 text-lg leading-8 text-secondary">{intro}</p> : null}
    </div>
    {children || null}
  </section>
);

export default PageShell;
