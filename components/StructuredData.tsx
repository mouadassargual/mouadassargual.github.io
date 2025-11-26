export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Mouad Assargual",
    "url": "https://mouadas.me",
    "image": "https://mouadas.me/profile.jpg",
    "sameAs": [
      "https://www.linkedin.com/in/mouadassargual/",
      "https://x.com/mouadassargual",
      "https://github.com/mouadassargual",
      "https://www.instagram.com/mouadassargual/"
    ],
    "jobTitle": "Digital Transformation & GovTech Consultant",
    "worksFor": {
      "@type": "Organization",
      "name": "Independent Consultancy"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Agadir",
      "addressCountry": "MA"
    },
    "description": "Transforming Morocco's institutions through strategic communication and smart technology. Expert in Digital Transformation, GovTech, Public Affairs, and AI Solutions.",
    "knowsAbout": [
      "Digital Transformation",
      "GovTech",
      "Public Affairs",
      "Strategic Communication",
      "AI Solutions",
      "Smart Cities"
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
