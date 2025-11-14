import { useEffect } from 'react';

const SEO = ({ 
  title = 'AutoChoice - Find Your Dream Car',
  description = 'Browse thousands of quality used, new, and certified pre-owned cars. Trusted car marketplace in Pakistan with transparent pricing and verified sellers.',
  keywords = 'cars for sale, used cars, new cars, certified cars, car marketplace, buy cars Pakistan, sell cars',
  image = 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&h=630&fit=crop',
  url = 'https://autochoice.pk',
  type = 'website',
  schema
}) => {
  const siteTitle = 'AutoChoice';
  const fullTitle = title.includes(siteTitle) ? title : `${title} | ${siteTitle}`;

  useEffect(() => {
    // Update document title
    document.title = fullTitle;

    // Update or create meta tags
    const updateMetaTag = (name, content, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('robots', 'index, follow');
    updateMetaTag('language', 'English');
    updateMetaTag('author', 'AutoChoice');

    // Open Graph tags
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:url', url, true);
    updateMetaTag('og:title', fullTitle, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', image, true);
    updateMetaTag('og:site_name', siteTitle, true);

    // Twitter tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:url', url);
    updateMetaTag('twitter:title', fullTitle);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);

    // Canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);

    // Schema.org JSON-LD
    if (schema) {
      let schemaScript = document.querySelector('script[type="application/ld+json"]');
      if (!schemaScript) {
        schemaScript = document.createElement('script');
        schemaScript.setAttribute('type', 'application/ld+json');
        document.head.appendChild(schemaScript);
      }
      schemaScript.textContent = JSON.stringify(schema);
    }
  }, [fullTitle, description, keywords, image, url, type, schema, siteTitle]);

  return null;
};

export default SEO;
