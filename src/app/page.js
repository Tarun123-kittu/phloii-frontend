import HomeComponent from "@/Component/homeComponent/HomeComponent";

export async function generateMetadata() {
  const metadata = {
    title: "Phloii Dating App",
    description: "Find Matches Near you",
    image: "/black.svg", // Replace with your image URL
  };

  return {
    title: metadata.title,
    description: metadata.description,
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      images: [
        {
          url: metadata.image,
          width: 1200, // Optional: Specify image width
          height: 630, // Optional: Specify image height
        },
      ],
    },
  };
}

export default function Home() {
  return <HomeComponent />;
}
