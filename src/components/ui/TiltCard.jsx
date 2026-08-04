import { useRef } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const TiltCard = ({ children, className = '', maxTilt = 10, ...props }) => {
  const reduced = useReducedMotion();
  const ref = useRef(null);

  const handleMouseMove = (event) => {
    if (reduced || !ref.current) {
      return;
    }

    const rect = ref.current.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;

    ref.current.style.transform = `perspective(900px) rotateX(${(-py * maxTilt).toFixed(2)}deg) rotateY(${(px * maxTilt).toFixed(2)}deg)`;
  };

  const handleMouseLeave = () => {
    if (ref.current) {
      ref.current.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)';
    }
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`tilt-card ${className}`.trim()}
      {...props}
    >
      {children}
    </div>
  );
};

export default TiltCard;
