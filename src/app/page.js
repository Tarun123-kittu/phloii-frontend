import HomeComponent from "@/Component/homeComponent/HomeComponent";

export async function generateMetadata() {
  const metadata = {
    title: "Phloii Dating App",
    description: "Find Matches Near you",
    image: "/assets/phloii_fav_icon.png", 
  };

  return {
    title: metadata.title,
    description: metadata.description,
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      images: [
        {
          url: "https://staging.phloii.com"+metadata.image,
          width: 1200, 
          height: 630, 
        },
      ],
    },
  };
}

export default function Home() {
  return <HomeComponent />;
}
