const PageShell = ({ title, eyebrow, children, intro }) => {
  return (
    <section className={`mx-auto flex max-w-7xl flex-col gap-10 px-6 py-16 sm:px-8 lg:px-10 lg:py-24 ${children ? 'min-h-[70vh]' : ''}`.trim()}>
      <div className="max-w-3xl animate-enter">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-normal text-white sm:text-5xl">{title}</h1>
        {intro ? <p className="mt-6 text-lg text-slate-300">{intro}</p> : null}
      </div>
      {children || null}
    </section>
  );
};

export default PageShell;
