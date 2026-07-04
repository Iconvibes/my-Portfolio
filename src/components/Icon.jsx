const commonProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": "true"
};

const paths = {
  envelope: (
    <>
      <path d="M4 6h16v12H4z" />
      <path d="m4 7 8 6 8-6" />
    </>
  ),
  phone: (
    <>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.62a2 2 0 0 1-.45 2.11L8 9.77a16 16 0 0 0 6.23 6.23l1.32-1.28a2 2 0 0 1 2.11-.45c.84.29 1.72.5 2.62.62A2 2 0 0 1 22 16.92z" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-6-5.33-6-11a6 6 0 1 1 12 0c0 5.67-6 11-6 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  github: (
    <>
      <path d="M9 19c-4.5 1.5-5-2-7-2" />
      <path d="M15 22v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 19 4.77 5.07 5.07 0 0 0 18.91 1S17.73.65 15 2.48a13.38 13.38 0 0 0-6 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77 5.44 5.44 0 0 0 3.5 8.53c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </>
  ),
  linkedin: (
    <>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6Z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </>
  ),
  tiktok: (
    <>
      <path d="M14 3v10.5a3.5 3.5 0 1 1-3.5-3.5" />
      <path d="M14 3c1.2 2.4 3.1 3.8 5 4" />
    </>
  ),
  whatsapp: (
    <>
      <path d="M20 11.5A8.5 8.5 0 0 1 7.64 19L3 20l1.05-4.47A8.5 8.5 0 1 1 20 11.5Z" />
      <path d="M8.5 9.5c.2 2 2 4 4 4.5" />
      <path d="M12.2 14c.7-.1 1.5-.6 2-.9" />
    </>
  )
};

const Icon = ({ name, className = "h-5 w-5" }) => (
  <svg {...commonProps} className={className}>
    {paths[name]}
  </svg>
);

export default Icon;
