import HomeComponent from "@/Component/homeComponent/HomeComponent";

export async function generateMetadata() {

  const metadata = {
      title: `Phloii Dating App`,
      description: `Find Matches Near you`,
  };

  return {
      title: metadata.title,
      description: metadata.description,
  };
}

export default function Home() {
  return (
    <HomeComponent />
  );
}
