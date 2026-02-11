/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NEXT_PUBLIC_API_URL: (() => {
            const isProduction = process.env.VERCEL_ENV === "production";
            const isPreview = process.env.VERCEL_ENV === "preview";
            const devUrl = process.env.NEXT_PUBLIC_API_URL;
            return isProduction
                ? "https://services.phloii.com/api/v1" // Production URL
                : isPreview
                    ? devUrl // Preview URL
                    : "https://dev.phloii.com/api/v1";    // Development URL
        })(),
    },
};

export default nextConfig;
