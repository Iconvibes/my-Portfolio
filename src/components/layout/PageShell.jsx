const PageShell = ({ title, eyebrow, index, children, intro }) => (
  <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-10 lg:py-24">
    <div className="max-w-3xl animate-enter">
      <p className="eyebrow">
        {index ? <span className="mr-2 text-slate-500">{index}</span> : null}
        {eyebrow}
      </p>
      <h1 className="display-ink mt-4 text-5xl text-white sm:text-6xl">{title}</h1>
      {intro ? <p className="mt-6 text-lg leading-8 text-slate-300">{intro}</p> : null}
    </div>
    {children || null}
  </section>
);

export default PageShell;
