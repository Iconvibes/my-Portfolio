import { useEffect, useRef, useState } from 'react';

// The photo is picked up from either location — `public/profile.jpg` is the
// canonical spot, but a photo placed in `public/images/` works too.
const CANDIDATES = ['/profile.jpg', '/images/profile.jpg'];

/**
 * Profile photo slot.
 *
 * Drop a 4:5 portrait (~800×1000) into `public/profile.jpg` (or
 * `public/images/profile.jpg`) and it will render automatically. Until then,
 * an on-brand monogram card is shown instead.
 */
const ProfilePhoto = ({ className = '', priority = false }) => {
  const [status, setStatus] = useState('loading');
  const [srcIndex, setSrcIndex] = useState(0);
  const imgRef = useRef(null);

  // If the image is already cached (loaded before hydration), onLoad may never fire
  // again — check the element's completed state on mount so the photo never stays
  // stuck invisible.
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete) {
      if (img.naturalWidth > 0) {
        setStatus('ok');
      } else if (srcIndex < CANDIDATES.length - 1) {
        setSrcIndex(srcIndex + 1);
      } else {
        setStatus('missing');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    <img
      ref={imgRef}
      src={CANDIDATES[srcIndex]}
      alt="Portrait of Ferdinard Ashonibare"
      onLoad={() => setStatus('ok')}
      onError={() => {
        if (srcIndex < CANDIDATES.length - 1) {
          setSrcIndex(srcIndex + 1);
        } else {
          setStatus('missing');
        }
      }}
      loading={priority ? 'eager' : 'lazy'}
      {...(priority ? { fetchPriority: 'high', decoding: 'sync' } : {})}
      className={`aspect-[4/5] w-full rounded-2xl border border-line object-cover transition-opacity duration-300 ${
        status === 'ok' ? 'opacity-100' : 'opacity-0'
      } ${className}`.trim()}
    />
  );
};

export default ProfilePhoto;
