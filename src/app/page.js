import image from "next/image";

export async function generateMetadata() {
  const metadata = {
    title: "Phloii Dating App",
    description: "Find Matches Near you",
    image: "/phloii_fav_icon.png", // Static image for all routes
  };

  return {
    title: metadata.title,
    description: metadata.description,
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      images: [
        {
          url: `https://www.phloii.com${metadata.image}`, // Absolute path for OpenGraph image
          width: 1200,
          height: 630,
        },
      ],
    },
    icons: {
      icon: metadata.image, // Set favicon
    },
  };
}

export default function Home({ params }) {
  return <div>This is a dynamic page for {params.slug}</div>;
}

