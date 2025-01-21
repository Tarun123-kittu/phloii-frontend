import HomeComponent from "@/Component/homeComponent/HomeComponent";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Phloii App of Dating</title>
        <meta name="description" content="You can find your match here" />
        <meta property="og:title" content="Phloii App of Dating" />
        <meta property="og:description" content="You can find your match here" />
        <meta
          property="og:image"
          content="https://images.unsplash.com/photo-1737320372090-c61d2cb88ab3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw4fHx8ZW58MHx8fHx8"
        />
        <meta property="og:url" content="https://staging.phloii.com/" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Phloii App of Dating" />
        <meta name="twitter:description" content="You can find your match here" />
        <meta
          name="twitter:image"
          content="https://images.unsplash.com/photo-1737320372090-c61d2cb88ab3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw4fHx8ZW58MHx8fHx8"
        />
      </Head>
      <main>
        <HomeComponent />
      </main>
    </>
  );
}

