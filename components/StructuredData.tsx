export default function StructuredData() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://mouadas.me/#person",
    "name": "Mouad Assargual",
    "url": "https://mouadas.me",
    "image": {
      "@type": "ImageObject",
      "url": "https://mouadas.me/profile.jpg",
      "width": 400,
      "height": 400
    },
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
    ],
    "alumniOf": [
      {
        "@type": "EducationalOrganization",
        "name": "Faculty of Applied Sciences - Ait Melloul",
        "description": "Master's in Embedded Artificial Intelligence"
      }
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
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://mouadas.me/blog?search={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  }

  const siteNavigationSchema = {
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",
    "@id": "https://mouadas.me/#navigation",
    "name": "Main Navigation",
    "hasPart": [
      {
        "@type": "SiteNavigationElement",
        "name": "Home",
        "url": "https://mouadas.me/"
      },
      {
        "@type": "SiteNavigationElement",
        "name": "About",
        "url": "https://mouadas.me/#about"
      },
      {
        "@type": "SiteNavigationElement",
        "name": "Expertise",
        "url": "https://mouadas.me/#expertise"
      },
      {
        "@type": "SiteNavigationElement",
        "name": "Experience",
        "url": "https://mouadas.me/#experience"
      },
      {
        "@type": "SiteNavigationElement",
        "name": "Blog",
        "url": "https://mouadas.me/blog"
      },
      {
        "@type": "SiteNavigationElement",
        "name": "Contact",
        "url": "https://mouadas.me/#contact"
      }
    ]
  }

  const professionalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://mouadas.me/#service",
    "name": "Mouad Assargual - Digital Transformation Consulting",
    "url": "https://mouadas.me",
    "logo": "https://mouadas.me/profile.jpg",
    "image": "https://mouadas.me/profile.jpg",
    "description": "Expert consulting services in Digital Transformation, GovTech solutions, Strategic Communication, and AI integration for Morocco's public and private sectors.",
    "founder": {
      "@id": "https://mouadas.me/#person"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Morocco"
    },
    "serviceType": [
      "Digital Transformation Consulting",
      "GovTech Solutions",
      "Strategic Communication",
      "Political Communication",
      "AI Solutions & Automation",
      "Smart Cities Consulting"
    ],
    "priceRange": "$$"
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
    siteNavigationSchema,
    professionalServiceSchema,
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
