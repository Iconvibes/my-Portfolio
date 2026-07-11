import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const services = [
    { name: 'Solutions', href: '/solutions' },
    { name: 'Insights', href: '/insights' },
    { name: 'About', href: '/about' },
  ];

  const industries = [
    { name: 'Government Agencies', href: '/government-agencies' },
    { name: 'Security Organizations', href: '/security-organizations' },
    { name: 'NGOs', href: '/ngos' },
    { name: 'Healthcare', href: '/healthcare' },
    { name: 'Education', href: '/education' },
    { name: 'Faith Organizations', href: '/faith-organizations' },
  ];

  return (
    <footer className="border-t border-white/10 bg-slate-950">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-10 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="eyebrow">Codeferd Digital</p>
          <p className="mt-3 max-w-xl text-sm leading-7 text-slate-400">Secure digital platforms for governments, security organizations and institutions.</p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-slate-300">
          {services.map((service) => (
            <Link key={service.href} to={service.href} className="transition hover:text-white">
              {service.name}
            </Link>
          ))}
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-slate-300">
          {industries.map((industry) => (
            <Link key={industry.href} to={industry.href} className="transition hover:text-white">
              {industry.name}
            </Link>
          ))}
        </div>
        <div className="flex flex-col gap-4 text-sm text-slate-300">
          <p>Email: contact@codeferd.com</p>
          <p>Phone: +1 555-123-4567</p>
          <div className="flex gap-2">
            {/* Social icons placeholders */}
            <span className="bg-slate-800 p-2 rounded-full">Facebook</span>
            <span className="bg-slate-800 p-2 rounded-full">Twitter</span>
            <span className="bg-slate-800 p-2 rounded-full">LinkedIn</span>
          </div>
        </div>
      </div>
      <div className="text-center text-sm text-slate-400 py-6">
        © 2023 Codeferd Digital. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
