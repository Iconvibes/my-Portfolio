import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Download, ExternalLink, FileText, X } from 'lucide-react';

const RESUME_URL = '/resume/resume.pdf';
const RESUME_FILENAME = 'Ferdinard-Ashonibare-Resume.pdf';

const useCoarsePointer = () => {
  const [coarse, setCoarse] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return undefined;
    }

    const query = window.matchMedia('(pointer: coarse)');
    const update = () => setCoarse(query.matches);
    update();
    query.addEventListener?.('change', update);
    return () => query.removeEventListener?.('change', update);
  }, []);

  return coarse;
};

const variantClasses = {
  outline:
    'border-white/15 bg-white/[0.03] text-white hover:border-signal/60 hover:text-signal',
  primary: 'border-signal bg-signal text-signal-ink hover:bg-transparent hover:text-signal'
};

const ResumeButton = ({ variant = 'outline', className = '', children = 'View my résumé' }) => {
  const coarse = useCoarsePointer();
  const [open, setOpen] = useState(false);
  const dialogRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
        return;
      }

      if (event.key === 'Tab') {
        const focusables = dialogRef.current?.querySelectorAll(
          'a[href], button:not([disabled])'
        );
        if (!focusables || focusables.length === 0) {
          return;
        }
        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    const previousOverflow = document.body.style.overflow;
    const trigger = triggerRef.current;

    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    dialogRef.current?.querySelector('button')?.focus();

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      trigger?.focus();
    };
  }, [open]);

  const classes = `inline-flex min-h-11 items-center justify-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition duration-200 ${variantClasses[variant]} ${className}`.trim();

  // Mobile / touch devices: download the PDF straight away.
  if (coarse) {
    return (
      <a href={RESUME_URL} download={RESUME_FILENAME} className={classes}>
        <FileText className="h-4 w-4" aria-hidden="true" />
        {children}
      </a>
    );
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        className={classes}
      >
        <FileText className="h-4 w-4" aria-hidden="true" />
        {children}
      </button>

      {open
        ? createPortal(
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
              role="dialog"
              aria-modal="true"
              aria-label="Résumé preview"
            >
              <div
                className="absolute inset-0 bg-ink/85 backdrop-blur-sm"
                onClick={() => setOpen(false)}
                aria-hidden="true"
              />
              <div
                ref={dialogRef}
                className="relative flex h-[86vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-line bg-ink-2 shadow-[0_40px_120px_rgba(0,0,0,0.65)]"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line-soft px-5 py-3">
                  <p className="mono-label text-slate-400">// résumé — ferdinard ashonibare</p>
                  <div className="flex items-center gap-2">
                    <a
                      href={RESUME_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mono-label inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-slate-300 transition hover:border-signal/60 hover:text-signal"
                    >
                      Open in new tab <ExternalLink className="h-3 w-3" aria-hidden="true" />
                    </a>
                    <a
                      href={RESUME_URL}
                      download={RESUME_FILENAME}
                      className="mono-label inline-flex items-center gap-1.5 rounded-full border border-signal/50 bg-signal/10 px-3 py-1.5 text-signal transition hover:bg-signal hover:text-signal-ink"
                    >
                      Download <Download className="h-3 w-3" aria-hidden="true" />
                    </a>
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      aria-label="Close résumé preview"
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-slate-300 transition hover:border-signal/60 hover:text-signal"
                    >
                      <X className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <iframe
                  src={RESUME_URL}
                  title="Ferdinard Ashonibare résumé"
                  className="h-full w-full border-0 bg-white"
                />
              </div>
            </div>,
            document.body
          )
        : null}
    </>
  );
};

export default ResumeButton;
