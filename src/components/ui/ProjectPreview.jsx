import { createPortal } from 'react-dom';

/**
 * Floating image preview that follows the cursor on project row hover.
 * Renders through a React portal so it's never clipped by parent overflow.
 */
const ProjectPreview = ({ src, alt, visible, x, y }) => {
  if (!src) return null;

  return createPortal(
    <div
      className={`project-preview ${visible ? 'project-preview--visible' : ''}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        transform: `translate3d(${x}px, ${y}px, 0)`,
        pointerEvents: 'none',
        zIndex: 50,
      }}
      aria-hidden="true"
    >
      <img
        src={src}
        alt={alt}
        draggable={false}
        className="h-40 w-64 rounded-xl border border-ink/10 object-cover object-top shadow-[0_24px_60px_rgba(0,0,0,0.35)] sm:h-48 sm:w-72"
      />
    </div>,
    document.body
  );
};

export default ProjectPreview;
