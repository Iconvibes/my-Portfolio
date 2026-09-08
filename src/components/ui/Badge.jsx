const Badge = ({ children, className = '', tone = 'ink' }) => (
  <span
    className={`mono-label inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-medium ${
      tone === 'ink'
        ? 'border border-line bg-ink-2 text-secondary'
        : tone === 'signal'
          ? 'border border-accent/20 bg-accent/10 text-accent'
          : 'border border-ink/10 bg-ink/5 text-ink'
    } ${className}`.trim()}
  >
    {children}
  </span>
);

export default Badge;
