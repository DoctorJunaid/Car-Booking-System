// Schema.org structured data generators

export const generateCarSchema = (car) => {
  return {
    "@context": "https://schema.org/",
    "@type": "Car",
    "name": car.title,
    "brand": {
      "@type": "Brand",
      "name": car.brand || car.make
    },
    "model": car.model,
    "vehicleModelDate": car.year,
    "mileageFromOdometer": {
      "@type": "QuantitativeValue",
      "value": car.mileage,
      "unitCode": "KMT"
    },
    "fuelType": car.fuelType,
    "vehicleTransmission": car.transmission,
    "vehicleEngine": {
      "@type": "EngineSpecification",
      "name": car.engine
    },
    "color": car.color,
    "bodyType": car.bodyType,
    "offers": {
      "@type": "Offer",
      "price": car.price,
      "priceCurrency": "PKR",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "AutoChoice"
      }
    },
    "image": car.imageUrl || car.image,
    "description": car.description
  };
};

export const generateOrganizationSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "AutomotiveBusiness",
    "name": "AutoChoice",
    "description": "Trusted car marketplace in Pakistan offering used, new, and certified pre-owned vehicles",
    "url": "https://autochoice.pk",
    "logo": "https://autochoice.pk/logo.png",
    "image": "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200",
    "telephone": "+92-91-123-4567",
    "email": "info@autochoice.pk",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Saddar Road",
      "addressLocality": "Peshawar",
      "addressRegion": "Khyber Pakhtunkhwa",
      "addressCountry": "PK"
    },
    "sameAs": [
      "https://facebook.com/autochoicepk",
      "https://twitter.com/autochoicepk",
      "https://instagram.com/autochoicepk",
      "https://linkedin.com/company/autochoice-pakistan"
    ],
    "priceRange": "PKR 500,000 - PKR 10,000,000"
  };
};

export const generateBreadcrumbSchema = (items) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
};

export const generateProductListingSchema = (cars) => {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": cars.map((car, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": generateCarSchema(car)
    }))
  };
};

export const generateWebPageSchema = (page) => {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": page.title,
    "description": page.description,
    "url": page.url,
    "publisher": {
      "@type": "Organization",
      "name": "AutoChoice"
    }
  };
};
