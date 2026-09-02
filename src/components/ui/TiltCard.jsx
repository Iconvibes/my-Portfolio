/**
 * TiltCard has been removed per design requirements.
 * This is a passthrough wrapper that renders children without any 3D transform.
 */
const TiltCard = ({ children, className = '', maxTilt, ...props }) => (
  <div className={className} {...props}>
    {children}
  </div>
);

export default TiltCard;
