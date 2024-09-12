/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode:false,
    typescript: {
        ignoreBuildErrors: true,
      },
    experimental:{
      serverActions:{
        bodySizeLimit:'10mb'
      }
    }  
};

export default nextConfig;
