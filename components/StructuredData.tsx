export default function StructuredData() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://mouadas.me/#person",
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
      "addressRegion": "Souss-Massa",
      "addressCountry": "MA"
    },
    "description": "Transforming Morocco's institutions through strategic communication and smart technology. Expert in Digital Transformation, GovTech, Public Affairs, and AI Solutions.",
    "knowsAbout": [
      "Digital Transformation",
      "GovTech",
      "Public Affairs",
      "Strategic Communication",
      "AI Solutions",
      "Smart Cities",
      "Political Communication",
      "Data Analytics"
    ]
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://mouadas.me/#website",
    "url": "https://mouadas.me",
    "name": "Mouad Assargual - Digital Transformation & GovTech Consultant",
    "description": "Expert in Digital Transformation, GovTech, Strategic Communication, and AI Solutions for Morocco's public sector.",
    "publisher": {
      "@id": "https://mouadas.me/#person"
    }
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://mouadas.me/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://mouadas.me/blog"
      }
    ]
  }

  const allSchemas = [
    personSchema,
    websiteSchema,
    breadcrumbSchema
  ]

  return (
    <>
      {allSchemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  )
}
