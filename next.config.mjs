/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/dno3ruh4b/image/upload/**"
      },
      {
        protocol: "https",
        hostname: "i.vimeocdn.com",
        pathname: "/video/**"
      }
    ]
  }
};

export default nextConfig;
