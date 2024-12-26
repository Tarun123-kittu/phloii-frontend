/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NEXT_PUBLIC_API_URL: (() => {
            const isProduction = process.env.VERCEL_ENV === "production";
            const isPreview = process.env.VERCEL_ENV === "preview";
            return isProduction
                ? "https://services.phloii.com/api/v1" // Production URL
                : isPreview
                    ? "https://dev.phloii.com/api/v1" // Preview URL
                    : "https://dev.phloii.com/api/v1";    // Development URL
        })(),
    },
};

export default nextConfig;
