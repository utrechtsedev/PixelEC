export async function load() {
    const siteSettings = await fetch('http://localhost/api/settings');
    return {
      siteTitle: siteSettings.title,
      siteDescription: siteSettings.description
    };
  }