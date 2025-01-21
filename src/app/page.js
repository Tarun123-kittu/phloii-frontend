import HomeComponent from "@/Component/homeComponent/HomeComponent";
import image from "next/image";

export async function generateMetadata() {

  const metadata = {
    title: `Phloii Dating App`,
    description: `Find Matches Near you`,
    image: "https://images.unsplash.com/photo-1737320372090-c61d2cb88ab3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw4fHx8ZW58MHx8fHx8",
  };

  return {
    title: metadata.title,
    description: metadata.description,
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      images: [
        {
          url: `${metadata.image}`, 
          width: 1200,
          height: 630,
        },
      ],
    },
    icons: {
      icon: metadata.image,
    },
  };
}

export default function Home() {
  return (
    <HomeComponent />
  );
}
