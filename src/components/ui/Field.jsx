const fieldClasses =
  'w-full rounded-xl border border-line bg-ink-2 px-4 py-3 text-paper outline-none transition placeholder:text-secondary/50 focus:border-accent/60 focus:ring-2 focus:ring-accent/20';

export const Field = ({ id, label, required = false, className = '', ...props }) => (
  <label className={`block text-sm text-secondary ${className}`.trim()} htmlFor={id}>
    <span className="mb-2 block">
      {label}        {required ? <span className="text-accent"> *</span> : null}
    </span>
    <input id={id} required={required} className={fieldClasses} {...props} />
  </label>
);

export const TextareaField = ({ id, label, required = false, className = '', ...props }) => (
  <label className={`block text-sm text-secondary ${className}`.trim()} htmlFor={id}>
    <span className="mb-2 block">
      {label}        {required ? <span className="text-accent"> *</span> : null}
    </span>
    <textarea id={id} required={required} className={`${fieldClasses} min-h-36 resize-y`} {...props} />
  </label>
);
