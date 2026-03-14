export default function SchemaMarkup() {
  const schema = {
    "@context": "https://schema.org",
    "@type": ["Person", "LegalService"],
    "name": "José Guillermo Vásquez Guzmán",
    "alternateName": "Jose Guillermo",
    "url": "https://avocadocenter.co",
    "image": "https://avocadocenter.co/profile.png",
    "jobTitle": ["Abogado Corporativo", "Desarrollador Fullstack", "AI Developer"],
    "description": "Abogado certificado especializado en LegalTech, Propiedad Intelectual, y Cumplimiento Normativo (SaaS). Desarrollador Fullstack experto en crear agentes de Inteligencia Artificial.",
    "knowsAbout": [
      "LegalTech",
      "Corporate Law",
      "Intellectual Property",
      "SaaS Compliance",
      "Artificial Intelligence",
      "Next.js",
      "React",
      "Python",
      "LangChain",
      "Supabase"
    ],
    "alumniOf": {
      "@type": "CollegeOrUniversity",
      "name": "Universidad de San Buenaventura"
    },
    "sameAs": [
      "https://github.com/JoseGuillermoVG",
      "https://www.linkedin.com/in/jose-vg/"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
