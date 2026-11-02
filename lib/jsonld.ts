import { site, siteConfig, unwrap } from "@/content/site";
import { siteOrigin } from "@/lib/site-url";

export function localBusinessJsonLd() {
  const origin = siteOrigin();
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.name,
    legalName: siteConfig.billing.company,
    url: origin,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    image: `${origin}/og-image-1200x630.png`,
    address: {
      "@type": "PostalAddress",
      // Provozovna v Poběžovicích; sídlo (Zbuzany) je jen v patičce a zásadách.
      streetAddress: "Žižkova 188",
      addressLocality: "Poběžovice",
      postalCode: "345 22",
      addressCountry: "CZ",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.lat,
      longitude: site.geo.lng,
    },
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: site.geo.lat,
        longitude: site.geo.lng,
      },
      geoRadius: site.geo.radiusM,
    },
    priceRange: "$$",
    openingHours: unwrap(site.openingHours),
  };
}

export function faqPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: site.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: unwrap(item.a),
      },
    })),
  };
}
