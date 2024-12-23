import React from "react";
import SlugDetails from "@/Component/slugs/SlugDetails";
import { API_CONFIG } from "@/config/app_config";

async function fetchSlugData(slugName) {
    const response = await fetch(
        `${API_CONFIG.BASE_URL}/get_page_by_slug?slug=${slugName}`
    );

    if (!response.ok) {
        return null;
    }

    const data = await response.json();
    if (data.type === "success") {
        return data.data;
    }
    return null;
}

export async function generateMetadata({ params }) {
    if (!params || !params.slugName) {
        return {
            title: "Page Not Found",
            description: "The requested page could not be found.",
        };
    }

    const slugData = await fetchSlugData(params.slugName);

    if (!slugData) {
        return {
            title: "Page Not Found",
            description: "The requested page could not be found.",
        };
    }

    return {
        title: slugData.title,
        description: slugData.content.substring(0, 160),
    };
}

const Page = ({ params }) => {
    const { slugName } = params;

    return (
        <SlugDetails slugName={slugName} />
    );
};

export default Page;
