import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { Command, CornerDownLeft } from 'lucide-react';
import { contactChannels } from '../../content';
import { RESUME_URL } from '../ui/ResumeButton';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const EMAIL = contactChannels.find((channel) => channel.label === 'Email')?.value ?? '';

const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback for non-secure contexts (older Safari / http).
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    let ok = false;
    try {
      ok = document.execCommand('copy');
    } catch {
      ok = false;
    }
    textarea.remove();
    return ok;
  }
};

const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const [output, setOutput] = useState('');
  const reduced = useReducedMotion();
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const previouslyFocusedRef = useRef(null);
  const openRef = useRef(false);

  useEffect(() => {
    openRef.current = open;
  }, [open]);

  const commands = useMemo(
    () => [
      {
        name: 'home',
        hint: 'go to homepage',
        run: () => navigate('/')
      },
      {
        name: 'work',
        hint: 'see selected projects',
        run: () => navigate('/work')
      },
      {
        name: 'about',
        hint: 'read my story',
        run: () => navigate('/about')
      },
      {
        name: 'case-study',
        hint: 'so-safe corps deep dive',
        run: () => navigate('/case-study')
      },
      {
        name: 'insights',
        hint: 'notes from the field',
        run: () => navigate('/insights')
      },
      {
        name: 'contact',
        hint: 'start a conversation',
        run: () => navigate('/contact')
      },
      {
        name: 'resume',
        hint: 'open the résumé (new tab)',
        run: () => window.open(RESUME_URL, '_blank', 'noopener,noreferrer')
      },
      {
        name: 'email',
        hint: 'copy email address',
        keepsOpen: true,
        run: async () => {
          const ok = await copyToClipboard(EMAIL);
          setOutput(ok ? `email copied → ${EMAIL}` : `email: ${EMAIL}`);
        }
      },
      {
        name: 'whoami',
        hint: 'identity check',
        keepsOpen: true,
        run: () => setOutput('ferdinard ashonibare — full-stack web developer, lagos')
      },
      {
        name: 'status',
        hint: 'availability',
        keepsOpen: true,
        run: () => setOutput('{ status: "open to work", scope: "projects & roles" }')
      },
      {
        name: 'help',
        hint: 'list available commands',
        keepsOpen: true,
        run: () =>
          setOutput('home · work · about · case-study · insights · contact · resume · email · whoami · status · clear')
      },
      {
        name: 'clear',
        hint: 'clear the terminal',
        keepsOpen: true,
        run: () => setOutput('')
      }
    ],
    [navigate]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return commands;
    }
    return commands.filter(
      (command) => command.name.includes(q) || command.hint.includes(q)
    );
  }, [commands, query]);

  const close = () => {
    setOpen(false);
    setQuery('');
    setOutput('');
    setActiveIndex(0);
  };

  const runCommand = (command) => {
    // Navigation + resume close the palette; terminal-style commands keep it open.
    if (command.keepsOpen) {
      command.run();
      return;
    }
    close();
    command.run();
  };

  // Global shortcut: ⌘K / Ctrl+K (uses openRef so the listener stays mounted once).
  useEffect(() => {
    const onKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        if (openRef.current) {
          close();
        } else {
          setOpen(true);
        }
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  // Focus + scroll-lock while open; restore on close.
  useEffect(() => {
    if (!open) {
      return undefined;
    }

    previouslyFocusedRef.current = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    inputRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      previouslyFocusedRef.current?.focus?.();
    };
  }, [open]);

  // Keep the active option visible while navigating the list.
  useEffect(() => {
    const active = listRef.current?.querySelector('[data-active="true"]');
    active?.scrollIntoView({ block: 'nearest' });
  }, [activeIndex]);

  const onPaletteKeyDown = (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      close();
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex((index) => (filtered.length ? (index + 1) % filtered.length : 0));
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((index) =>
        filtered.length ? (index - 1 + filtered.length) % filtered.length : 0
      );
      return;
    }

    if (event.key === 'Enter') {
      event.preventDefault();
      const command = filtered[activeIndex];
      if (command) {
        runCommand(command);
      }
      return;
    }

    // Minimal focus trap: Tab cycles within the palette.
    if (event.key === 'Tab') {
      const focusables = dialogRef.current?.querySelectorAll(
        'input, button:not([disabled])'
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

  const dialogRef = useRef(null);

  const openPalette = () => {
    setOpen(true);
    setActiveIndex(0);
  };

  return (
    <>
      <button
        type="button"
        onClick={openPalette}
        aria-label="Open command palette"
        aria-haspopup="dialog"
        title="Command palette (⌘K)"
        className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-line bg-ink-2/90 text-signal shadow-[0_16px_40px_rgba(0,0,0,0.45)] backdrop-blur transition hover:border-signal/60 hover:text-signal-ink hover:bg-signal focus-visible:outline-none"
      >
        <Command className="h-5 w-5" aria-hidden="true" />
        <span className="mono-label absolute -top-2 -right-2 rounded-full border border-line bg-ink px-1.5 py-0.5 text-[0.55rem] text-slate-400">
          ⌘K
        </span>
      </button>

      {open
        ? createPortal(
            <div
              className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-[14vh] sm:pt-[18vh]"
              role="dialog"
              aria-modal="true"
              aria-label="Command palette"
            >
              <div
                className="absolute inset-0 bg-ink/85 backdrop-blur-sm"
                onClick={close}
                aria-hidden="true"
              />
              <div
                ref={dialogRef}
                onKeyDown={onPaletteKeyDown}
                className={`relative w-full max-w-lg overflow-hidden rounded-2xl border border-line bg-ink-2/95 shadow-[0_40px_120px_rgba(0,0,0,0.65)] backdrop-blur ${
                  reduced ? '' : 'animate-enter'
                }`}
              >
                {/* Terminal chrome */}
                <div className="flex items-center gap-2 border-b border-line-soft px-4 py-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                  <span className="mono-label ml-2 text-slate-500">ferdinard — palette</span>
                  <kbd className="mono-label ml-auto rounded-md border border-line bg-ink px-1.5 py-0.5 text-[0.6rem] text-slate-400">
                    esc
                  </kbd>
                </div>

                {/* Prompt */}
                <div className="flex items-center gap-3 border-b border-line-soft px-4">
                  <span className="font-mono text-sm text-signal" aria-hidden="true">
                    $
                  </span>
                  <input
                    ref={inputRef}
                    value={query}
                    onChange={(event) => {
                      setQuery(event.target.value);
                      setActiveIndex(0);
                    }}
                    placeholder="type a command…"
                    aria-label="Command"
                    role="combobox"
                    aria-expanded="true"
                    aria-controls="command-palette-list"
                    aria-activedescendant={filtered[activeIndex] ? `command-${filtered[activeIndex].name}` : undefined}
                    autoComplete="off"
                    spellCheck="false"
                    className="w-full bg-transparent py-3.5 font-mono text-sm text-white outline-none placeholder:text-slate-600"
                  />
                </div>

                {/* Results */}
                <div
                  ref={listRef}
                  id="command-palette-list"
                  role="listbox"
                  aria-label="Commands"
                  className="max-h-72 overflow-y-auto p-2"
                >
                  {filtered.length === 0 ? (
                    <p className="px-3 py-4 font-mono text-sm text-slate-500">
                      command not found: <span className="text-slate-300">{query}</span>
                    </p>
                  ) : (
                    filtered.map((command, index) => {
                      const active = index === activeIndex;
                      return (
                        <button
                          key={command.name}
                          id={`command-${command.name}`}
                          type="button"
                          role="option"
                          aria-selected={active}
                          data-active={active}
                          onMouseEnter={() => setActiveIndex(index)}
                          onClick={() => runCommand(command)}
                          className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition ${
                            active ? 'bg-signal/10' : 'hover:bg-white/5'
                          }`}
                        >
                          <span
                            className={`font-mono text-sm ${
                              active ? 'text-signal' : 'text-slate-300'
                            }`}
                          >
                            {command.name}
                          </span>
                          <span className="mono-label ml-auto text-[0.6rem] text-slate-500">
                            {command.hint}
                          </span>
                        </button>
                      );
                    })
                  )}
                </div>

                {/* Terminal output */}
                {output ? (
                  <div className="border-t border-line-soft bg-ink/60 px-4 py-2.5">
                    <p className="font-mono text-xs text-slate-400">
                      <span className="mr-2 text-signal">↳</span>
                      {output}
                    </p>
                  </div>
                ) : null}

                {/* Footer hints */}
                <div className="flex items-center gap-4 border-t border-line-soft px-4 py-2.5">
                  <span className="mono-label flex items-center gap-1.5 text-[0.6rem] text-slate-500">
                    <CornerDownLeft className="h-3 w-3" aria-hidden="true" /> run
                  </span>
                  <span className="mono-label text-[0.6rem] text-slate-500">↑↓ navigate</span>
                  <span className="mono-label text-[0.6rem] text-slate-500">esc close</span>
                </div>
              </div>
            </div>,
            document.body
          )
        : null}
    </>
  );
};

export default CommandPalette;
