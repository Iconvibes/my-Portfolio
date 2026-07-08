const Card = ({ children, className = '', hover = true }) => (
  <div className={`rounded-2xl border border-white/10 bg-[#111827] p-6 shadow-[0_20px_80px_rgba(0,0,0,0.28)] ${hover ? 'transition duration-300 hover:-translate-y-1 hover:border-sky-400/40' : ''} ${className}`.trim()}>
    {children}
  </div>
);

export default Card;
