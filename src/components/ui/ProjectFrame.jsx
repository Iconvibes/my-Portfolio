import { ArrowUpRightIcon, ShieldCheckIcon, BuildingOffice2Icon, AcademicCapIcon, TruckIcon } from '@heroicons/react/24/outline';

const accentStyles = {
  emerald: { from: '#0b2a1e', to: '#0e1a2e', ring: 'rgba(52,211,153,0.35)', icon: <ShieldCheckIcon className="h-10 w-10 text-emerald-300" strokeWidth={1.5} /> },
  amber: { from: '#2a1e0b', to: '#1a0f06', ring: 'rgba(251,191,36,0.35)', icon: <BuildingOffice2Icon className="h-10 w-10 text-amber-300" strokeWidth={1.5} /> },
  violet: { from: '#1d1230', to: '#0e0a1e', ring: 'rgba(167,139,250,0.35)', icon: <AcademicCapIcon className="h-10 w-10 text-violet-300" strokeWidth={1.5} /> },
  cyan: { from: '#0b2a33', to: '#0a1622', ring: 'rgba(34,211,238,0.35)', icon: <TruckIcon className="h-10 w-10 text-cyan-300" strokeWidth={1.5} /> }
};

/**
 * ProjectFrame renders a browser-chrome frame around a project screenshot.
 *
 * Props:
 *   project: project object from content/projects.js
 *   eager: boolean — true for above-the-fold images (hero). Sets loading="eager" + fetchPriority="high"
 *   className: additional CSS classes
 */
const ProjectFrame = ({ project, eager = false, className = '' }) => {
  const accent = accentStyles[project.accent] ?? accentStyles.emerald;
  const isLive = project.status === 'live';
  const hasImage = Boolean(project.image);
  const hasResponsive = Boolean(project.imageSm);
  const hasWebp = Boolean(project.imageWebp);

  return (
    <div className={`overflow-hidden rounded-xl border border-line bg-ink-3 shadow-[0_24px_60px_rgba(0,0,0,0.4)] ${className}`.trim()}>
      {/* Browser chrome */}
      <div className="flex items-center gap-3 border-b border-line-soft bg-ink-2 px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="mono-label flex min-w-0 flex-1 items-center gap-2 truncate rounded-md bg-ink px-3 py-1 text-slate-400">
          <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${isLive ? 'bg-emerald-400' : 'bg-slate-600'}`} />
          <span className="truncate">{project.domain || project.name}</span>
        </div>
        {isLive ? (
          <span className="mono-label shrink-0 text-emerald-300">LIVE</span>
        ) : (
          <span className="mono-label shrink-0 text-slate-500">SOON</span>
        )}
      </div>

      {/* Scene: real image when available, designed visual otherwise */}
      <div className="relative aspect-[16/10] overflow-hidden bg-ink">
        {hasImage ? (
          hasWebp ? (
            /* Modern browsers: serve WebP via picture element with responsive sizes */
            <picture>
              <source
                srcSet={`${project.imageWebp} 1200w`}
                type="image/webp"
              />
              <img
                src={project.image}
                alt={`${project.name}. ${project.tagline}`}
                width={project.imageWidth || 1200}
                height={project.imageHeight || 750}
                loading={eager ? 'eager' : 'lazy'}
                decoding="async"
                fetchPriority={eager ? 'high' : 'auto'}
                className="absolute inset-0 h-full w-full object-cover object-top"
              />
            </picture>
          ) : (
            /* Fallback: responsive JPG with srcset */
            <img
              src={hasResponsive ? project.imageSm : project.image}
              srcSet={hasResponsive ? `${project.imageSm} 800w, ${project.image} 1200w` : undefined}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
              alt={`${project.name}. ${project.tagline}`}
              width={project.imageWidth || 1200}
              height={project.imageHeight || 750}
              loading={eager ? 'eager' : 'lazy'}
              decoding="async"
              fetchPriority={eager ? 'high' : 'auto'}
              className="absolute inset-0 h-full w-full object-cover object-top"
            />
          )
        ) : (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: `linear-gradient(135deg, ${accent.from}, ${accent.to})` }}
          >
            <div className="bg-grid-ink absolute inset-0 opacity-60" aria-hidden="true" />
            <div
              className="absolute inset-0"
              style={{ boxShadow: `inset 0 0 120px rgba(0,0,0,0.45)` }}
              aria-hidden="true"
            />
            <div className="relative flex flex-col items-center gap-3 px-6 text-center">
              <div
                className="flex h-20 w-20 items-center justify-center rounded-2xl border bg-ink/40"
                style={{ boxShadow: `0 0 0 1px ${accent.ring}, 0 16px 40px rgba(0,0,0,0.35)` }}
              >
                {accent.icon}
              </div>
              <p className="display-ink text-lg text-white sm:text-xl">{project.name}</p>
              <p className="mono-label flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-slate-300">
                <ArrowUpRightIcon className="h-3 w-3" aria-hidden="true" />
                Preview coming soon
              </p>
            </div>
          </div>
        )}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ boxShadow: `inset 0 0 80px rgba(0,0,0,0.35)` }}
          aria-hidden="true"
        />
      </div>
    </div>
  );
};

export default ProjectFrame;
