import PillNav from './Ui/PillNav';
import logo from '../assets/images/logo.jpg';


const Navigation = () => {
  return (
  
<PillNav
  logo={logo}
  logoAlt="CodeFerd Logo"
  items={[
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Contact', href: '/contact' }
  ]}
  activeHref="/"
  className="custom-nav"
  ease="power2.easeOut"
  baseColor="#1c1c1c"
  pillColor="#fde4c3"
  hoveredPillTextColor="#fde4c3"
  pillTextColor="#1c1c1c"
/>
  )
}

export default Navigation