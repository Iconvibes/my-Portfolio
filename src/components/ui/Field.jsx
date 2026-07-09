const fieldClasses =
  'w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20';

export const Field = ({ id, label, required = false, className = '', ...props }) => (
  <label className={`block text-sm text-slate-300 ${className}`.trim()} htmlFor={id}>
    <span className="mb-2 block">
      {label}
      {required ? <span className="text-sky-300"> *</span> : null}
    </span>
    <input id={id} required={required} className={fieldClasses} {...props} />
  </label>
);

export const TextareaField = ({ id, label, required = false, className = '', ...props }) => (
  <label className={`block text-sm text-slate-300 ${className}`.trim()} htmlFor={id}>
    <span className="mb-2 block">
      {label}
      {required ? <span className="text-sky-300"> *</span> : null}
    </span>
    <textarea id={id} required={required} className={`${fieldClasses} min-h-36 resize-y`} {...props} />
  </label>
);
