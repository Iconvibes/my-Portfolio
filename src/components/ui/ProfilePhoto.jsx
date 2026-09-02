import { useEffect, useRef, useState } from 'react';

/**
 * Profile photo slot.
 *
 * Renders the portrait from /profile.jpg with a responsive fallback at /profile-sm.jpg.
 * Falls back to an on-brand monogram card if no image is found.
 */
const ProfilePhoto = ({ className = '', priority = false }) => {
  const [status, setStatus] = useState('loading');
  const imgRef = useRef(null);

  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete) {
      setStatus(img.naturalWidth > 0 ? 'ok' : 'missing');
    }
  }, []);

  if (status === 'missing') {
    return (
      <div
        className={`relative flex aspect-[4/5] w-full items-center justify-center overflow-hidden rounded-2xl border border-line bg-ink-2 ${className}`.trim()}
      >
        <div className="bg-grid-ink absolute inset-0 opacity-40" aria-hidden="true" />
        <div className="relative flex flex-col items-center gap-3">
          <span className="display-ink text-7xl text-signal">FA</span>
          <span className="mono-label text-slate-500">Ferdinard Ashonibare</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`.trim()}>
      {/* Subtle glow behind the photo */}
      <div
        className="absolute -inset-3 rounded-3xl opacity-30 blur-2xl"
        style={{ background: 'radial-gradient(ellipse at center, rgba(200,241,53,0.15), transparent 70%)' }}
        aria-hidden="true"
      />
      <img
        ref={imgRef}
        src="/profile.jpg"
        srcSet="/profile-sm.jpg 600w, /profile.jpg 900w"
        sizes="(max-width: 1024px) 280px, 360px"
        alt="Portrait of Ferdinard Ashonibare"
        width={768}
        height={1024}
        onLoad={() => setStatus('ok')}
        onError={() => setStatus('missing')}
        loading={priority ? 'eager' : 'lazy'}
        {...(priority ? { fetchPriority: 'high', decoding: 'async' } : {})}
        className={`relative aspect-[3/4] w-full rounded-2xl border border-line object-cover transition-opacity duration-300 ${
          status === 'ok' ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
};

export default ProfilePhoto;
