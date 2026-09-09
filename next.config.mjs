// This can point to a separately deployed Express service, including Render.
const backendUrl = (process.env.BACKEND_URL || 'http://127.0.0.1:4000').replace(/\/+$/, '');
if (process.env.VERCEL && !process.env.BACKEND_URL) {
  throw new Error('Set BACKEND_URL to your Render API origin before deploying to Vercel.');
}
const nextConfig = {
  distDir: process.env.NEXT_DIST_DIR || '.next',
  async rewrites() {
    return [{ source: '/api/:path*', destination: `${backendUrl}/api/:path*` }];
  },
};
export default nextConfig;
