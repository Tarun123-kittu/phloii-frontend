import HomeComponent from "@/Component/homeComponent/HomeComponent";

export async function generateMetadata() {
  const metadata = {
    title: "Phloii - A Dating App",
    description: "Find your perfect match on Phloii, the leading dating app!",
    image: "https://images.unsplash.com/photo-1737320372090-c61d2cb88ab3?w=1200&h=630&auto=format&fit=crop&q=60",
    url: "https://staging.phloii.com", // Replace with your actual website URL
  };

  return {
    title: metadata.title,
    description: metadata.description,
    openGraph: {
      type: "website",
      title: metadata.title,
      description: metadata.description,
      url: metadata.url,
      images: [
        {
          url: metadata.image,
          width: 1200,
          height: 630,
          alt: "Phloii Dating App",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: metadata.title,
      description: metadata.description,
      images: [metadata.image],
    },
  };
}


export default function Home() {
  return (
    <HomeComponent />
  );
}
