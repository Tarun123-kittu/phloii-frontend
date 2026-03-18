/**
 * Global fetch interceptor to handle 401 Unauthorized responses.
 */
export const initAuthInterceptor = () => {
    const { fetch: originalFetch } = window;

    window.fetch = async (...args) => {
        const response = await originalFetch(...args);

        if (response.status === 401) {
            console.warn("Unauthorized request (401). Logging out and redirecting...");

            // Clear local storage
            localStorage.clear();

            // Clear authentication cookie (matching the name used in ProfileContent.js)
            document.cookie = "phloii_token_auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Lax";

            // Redirect to login page
            // Using window.location.href to ensure a hard jump and reload if necessary
            window.location.href = "/establishment/login";
        }

        return response;
    };
};
