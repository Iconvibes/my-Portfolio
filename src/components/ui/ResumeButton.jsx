import { ArrowDownTrayIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

export const RESUME_URL = '/resume/resume.pdf';
export const RESUME_FILENAME = "FERDINARD'S_RESUME.pdf";

const variantClasses = {
  outline:
    'border-line bg-ink-2 text-paper hover:border-accent/60 hover:text-accent',
  primary: 'border-accent bg-accent text-accent-ink hover:bg-accent-hover'
};

/**
 * Resume button — downloads on mobile and opens the PDF in a new tab on desktop.
 * No iframe/modal: avoids CSP and cross-origin issues on Netlify.
 */
const ResumeButton = ({ variant = 'outline', className = '', children = 'View my resume' }) => {
  const classes = `min-h-11 items-center justify-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition duration-150 ${variantClasses[variant]} ${className}`.trim();

  return (
    <>
      <a href={RESUME_URL} download={RESUME_FILENAME} className={`inline-flex lg:hidden ${classes}`.trim()}>
        <DocumentTextIcon className="h-4 w-4" aria-hidden="true" />
        {children}
      </a>
      <a
        href={RESUME_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`hidden lg:inline-flex ${classes}`.trim()}
      >
        <DocumentTextIcon className="h-4 w-4" aria-hidden="true" />
        {children}
      </a>
    </>
  );
};

export default ResumeButton;

