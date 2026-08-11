export default function sitemap() {
  const baseUrl = "https://musaconsulting.com";

  return ["", "/book", "/login"].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7
  }));
}
