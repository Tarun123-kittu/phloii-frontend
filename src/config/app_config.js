export const API_CONFIG = {
    BASE_URL:
      process.env.NEXT_PUBLIC_API_URL ||
      (process.env.NODE_ENV === "production"
        ? "https://services.phloii.com/api/v1" // Production URL
        : process.env.VERCEL_ENV === "preview"
        ? "https://dev.phloii.com/api/v1" // Staging URL
        : "https://dev.phloii.com/api/v1"), // Development URL
  };
  