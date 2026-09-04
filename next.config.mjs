/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      { source: "/partners", destination: "/partners/index.html" },
      { source: "/partners/venues", destination: "/partners/venues.html" },
      { source: "/partners/sponsorship", destination: "/partners/sponsorship.html" },
      { source: "/partners/practitioners", destination: "/partners/practitioners.html" },
      { source: "/access", destination: "/access.html" }
    ];
  },
  async redirects() {
    return [
      { source: "/", destination: "/en", permanent: true },
      { source: "/about", destination: "/en/about", permanent: true },
      { source: "/dien-chan", destination: "/en/dien-chan", permanent: true },
      { source: "/attend", destination: "/en/attend", permanent: true },
      { source: "/facilitate", destination: "/en/facilitate", permanent: true },
      { source: "/terms", destination: "/en/terms", permanent: true },
      { source: "/privacy", destination: "/en/privacy", permanent: true },
      { source: "/partners/index.html", destination: "/partners", permanent: true },
      { source: "/partners/venues.html", destination: "/partners/venues", permanent: true },
      { source: "/partners/sponsorship.html", destination: "/partners/sponsorship", permanent: true },
      { source: "/partners/practitioners.html", destination: "/partners/practitioners", permanent: true },
      { source: "/attendance", destination: "/en/attend", permanent: true },
      { source: "/facilitators", destination: "/en/facilitate", permanent: true },
      { source: "/practitioners", destination: "/en/facilitate", permanent: true },
      { source: "/retreat", destination: "/en/#program", permanent: true },
      { source: "/retreat/index.html", destination: "/en/#program", permanent: true }
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/dno3ruh4b/image/upload/**"
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/dno3ruh4b/video/upload/**"
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        pathname: "/vi/**"
      }
    ]
  }
};

export default nextConfig;
