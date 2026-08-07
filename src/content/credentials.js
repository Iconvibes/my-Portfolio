// Credentials shown in the About "// credentials" card and mirrored into the
// Person JSON-LD (alumniOf + hasCredential).
//
// Only facts that can be verified belong here — nothing fabricated should
// ship. `education` maps to schema.org alumniOf; `certifications` maps to
// hasCredential. `currentlyLearning` is display-only (an in-progress line, not
// a completed credential, so it stays out of the structured data).
//
// Shape:
//   education: [{ degree, institution, location?, field?, year, url? }]
//   certifications: [{ name, issuer, year, url? }]
//   currentlyLearning: [string]

export const credentials = {
  education: [
    {
      degree: 'Diploma in Frontend Engineering',
      institution: 'Alt School Africa',
      location: 'Lagos, Nigeria',
      field: 'Full-Cycle Web Development · HTML · CSS · JavaScript · React.js',
      year: 2025
    },
    {
      degree: 'Diploma in Web Design',
      institution: 'HIIT Plc',
      location: 'Lagos, Nigeria',
      field: 'Responsive Web Design · UI/UX Principles',
      year: 2024
    },
    {
      degree: 'Senior Secondary School Certificate (S.S.C.E.)',
      institution: 'Surulere Senior Secondary School',
      location: 'Lagos, Nigeria',
      year: 2021
    }
  ],
  certifications: [],
  currentlyLearning: ['Backend development — deepening Node.js, Express & MongoDB at Ts Academy']
};
