const Badge = ({ children, className = '' }) => (
  <span
    className={`inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-300 ${className}`.trim()}
  >
    {children}
  </span>
);

export default Badge;
