import HomeComponent from "@/Component/homeComponent/HomeComponent";

export async function generateMetadata() {
  const metadata = {
    title: "Phloii - A Dating App",
    description: "Find your perfect match on Phloii, the leading dating app!",
    image: "/assets/phloii_fav_icon.png",
    url: `${process.env.NODE_ENV === "production" ? "https://www.phloii.com" : "https://staging.phloii.com/"}`, 
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
