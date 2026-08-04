const Badge = ({ children, className = '', tone = 'ink' }) => (
  <span
    className={`mono-label inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-medium ${
      tone === 'ink'
        ? 'border border-line bg-white/[0.04] text-slate-300'
        : tone === 'signal'
          ? 'border border-signal/40 bg-signal/10 text-signal'
          : 'border border-ink/10 bg-ink/5 text-ink'
    } ${className}`.trim()}
  >
    {children}
  </span>
);

export default Badge;
