import { useEffect, useState } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const lines = [
  { prompt: '$', text: 'whoami', dim: false },
  { text: 'ferdinard ashonibare', dim: false },
  { prompt: '$', text: 'cat status.json', dim: false },
  { text: '{ role: "full-stack developer" }', dim: true },
  { text: '{ stack: "react, tailwind, node, express, mongo" }', dim: true },
  { text: '{ base: "lagos, nigeria" }', dim: true },
  { text: '{ status: "open to work" }', dim: false }
];

const useTypewriter = ({ total, reduced = false, speed = 34, startDelay = 700 } = {}) => {
  const [started, setStarted] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (reduced) {
      setStarted(true);
      setCount(total);
      return undefined;
    }

    const timer = setTimeout(() => setStarted(true), startDelay);
    return () => clearTimeout(timer);
  }, [reduced, startDelay, total]);

  useEffect(() => {
    if (!started || count >= total) {
      return undefined;
    }

    const timer = setTimeout(() => setCount((value) => Math.min(value + 1, total)), speed);
    return () => clearTimeout(timer);
  }, [started, count, total, speed]);

  return { count };
};

const TerminalCard = () => {
  const reduced = useReducedMotion();
  const total = lines.reduce((sum, line) => sum + line.text.length, 0);
  const { count } = useTypewriter({ total, reduced });

  let budget = count;
  let activeIndex = 0;
  const rendered = lines.map((line, index) => {
    if (budget <= 0) {
      return { showPrefix: false, text: '' };
    }
    activeIndex = index;
    const typed = line.text.slice(0, budget);
    budget -= line.text.length;
    return { showPrefix: true, text: typed };
  });

  const done = count >= total;
  const isActiveLine = (index) => index === activeIndex && (done || count < total);

  return (
    <div
      className="w-full max-w-md overflow-hidden rounded-2xl border border-line bg-ink-2 shadow-[0_32px_80px_rgba(0,0,0,0.5)]"
      aria-hidden="true"
    >
      <div className="flex items-center gap-2 border-b border-line-soft px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="mono-label ml-2 text-slate-500">ferdinard, status</span>
      </div>
      <div className="min-h-[15.5rem] space-y-1.5 px-5 py-5 font-mono text-[0.8rem] leading-6">
        {lines.map((line, index) => (
          <p key={index} className={line.dim ? 'text-slate-500' : 'text-slate-200'}>
            {rendered[index].showPrefix ? (
              <span className="mr-2 text-signal">{line.prompt ?? '\u21B3'}</span>
            ) : (
              <span className="mr-2" aria-hidden="true" />
            )}
            {rendered[index].text}
            {isActiveLine(index) ? (
              <span className="ml-1 inline-block h-4 w-2 animate-pulse rounded-[1px] bg-signal align-middle" aria-hidden="true" />
            ) : null}
          </p>
        ))}
      </div>
    </div>
  );
};

export default TerminalCard;
