import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const PageShell = ({ title, eyebrow, children, intro }) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="mx-auto flex min-h-[70vh] max-w-7xl flex-col gap-10 px-6 py-16 lg:px-8 lg:py-24">
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
        animate={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        className="max-w-3xl"
      >
        <p className="text-sm uppercase tracking-[0.35em] text-sky-300">{eyebrow}</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">{title}</h1>
        {intro ? <p className="mt-6 text-lg text-slate-300">{intro}</p> : null}
      </motion.div>
      {children}
    </section>
  );
};

export default PageShell;
