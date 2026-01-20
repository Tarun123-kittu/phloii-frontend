import Image from "next/image";
import styles from "./page.module.css";
import Testimonials from "@/Component/Testimonials";
import Link from "next/link";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

// ============ HERO SECTION ============
function HeroSection() {
  return (
    <div className={`${styles.mainBanner}`}>
      <div className="container position-relative z-3">
        <h1>
          Connect Your <span>Word.</span> <br />
          Share Your <span>Flow.</span>
        </h1>
        <p className={styles.cmn_desc}>
          Phloii is where your interests live. Join communities, start conversations, <br /> and find your place in the flow of the world.
        </p>
        <AppDownloadLinks />
      </div>
      <ImageGrid />
    </div>
  );
}

// ============ IMAGE GRID ============
function ImageGrid() {
  const imageGrid = [
    ["oneImage.png"],
    ["imgeone.png", "imagetwo.png"],
    ["imagethree.png", "imagefour.png"],
    ["imagefive.png", "sixone.png", "imagesix.png"],
    ["imageseven.png", "imageeight.png"],
    ["imagenine.png", "imageten.png"],
    ["imagetweleve.png", "imgethirteen.png"]
  ];

  return (
    <div className={styles.image_grid}>
      <ul>
        {imageGrid.map((column, idx) => (
          <li key={idx} className={idx % 2 === 0 ? "mt-5" : ""}>
            {column.map((img, imgIdx) => (
              <img
                key={imgIdx}
                src={`assets/${img}`}
                alt={img}
                className={`floating ${imgIdx > 0 ? "" : "pb-3"}`}
              />
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ============ APP DOWNLOAD LINKS ============
function AppDownloadLinks() {
  return (
    <div className={styles.navImmages}>
      <a href="https://play.google.com/store/apps/details?id=com.phloii" target="_blank" rel="noopener noreferrer">
        <img title="Download Android App" width={180} src="assets/playstoreMb.png" alt="Google Play" />
      </a>
       <a href="https://apps.apple.com/us/app/phloii-connect/id6736832123" target="_blank" rel="noopener noreferrer">
      <img
        title="iOS App Coming Soon"
        width={180}
        src="assets/ios_download.png"
        className="ms-4"
        alt="Download iOS App"
      />
      </a>
    </div>
  );
}

// ============ ABOUT SECTION ============
function AboutSection() {
  return (
    <div className={`${styles.about} ${styles.bg_black} ${styles.padding} overflow-hidden`}>
      <div className="container">
        <div className="row align-items-center row-gap-3">
          <div className="col-lg-6">
            <span className={`${styles.sub_heading} inline-block`}>About Us</span>
            <h2 className={`${styles.cmn_heading}`}>
              <span>Socially</span> Inspired. <br />
              Humanly <span>Connected.</span>
            </h2>
            <p className={styles.cmn_desc}>
              At Phloii, we believe every thought deserves a home and every moment is worth sharing. We've built a space where you can find your flow, join the groups that move you, and connect with people who see the world exactly—or entirely—differently than you do.
            </p>
          </div>
          <div className="col-lg-6">
            <div className={`${styles.about_image} position-relative`}>
              <img
                src="/assets/aboutImage.png"
                height={524}
                width={596}
                className="img-fluid position-relative z-2"
                alt="About Image"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ FEATURES SECTION ============
function FeaturesSection() {
  const features = [
    {
      icon: "share",
      title: "Share Your Story",
      desc: "Express yourself through high-fidelity photos and deep captions. Whether it's a fleeting thought or a life milestone, your flow is the canvas for your unique story."
    },
    {
      icon: "search",
      title: "Find Your Tribe",
      desc: "Discover communities built around the things you love. Join active conversations and connect with people who share your vision."
    },
    {
      icon: "people",
      title: "Live the Moment",
      desc: "Turn digital connections into real-world experiences. Explore and join exclusive group events, workshops, and local gatherings happening in your community right now."
    },
    {
      icon: "send",
      title: "Direct Connection",
      desc: "Skip the friction of friend requests with instant direct messaging. Coordinate safe meetups at Phloii Verified venues with integrated invitations and one-tap responses."
    }
  ];

  return (
    <div className={`${styles.features} ${styles.padding} position-relative overflow-hidden`}>
      <div className="container">
        <span className={`${styles.sub_heading} text-center d-block position-relative z-2`}>
          Core Experience
        </span>
        <h2 className={`${styles.cmn_heading} text-center`}>
          The <span>New Standard</span> of Social.
        </h2>
        <p className={`${styles.cmn_desc} text-center mb-5 pt-2`}>
          Experience a platform where connection is effortless. Share your journey, join your tribe, and meet <br /> with confidence in a world built around your flow.
        </p>
        <div className="row row-gap-4 position-relative z-2 row-gap-3">
          {features.map((feature, idx) => (
            <FeatureCard key={idx} feature={feature} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ============ FEATURE CARD COMPONENT ============
function FeatureCard({ feature }) {
  return (
    <div className="col-lg-6">
      <div className={styles.features_card}>
        <div className={`${styles.card_image} d-flex align-items-center justify-content-center`}>
          <FeatureIcon type={feature.icon} />
        </div>
        <h3>{feature.title}</h3>
        <p className={`${styles.cmn_desc} mb-0`}>{feature.desc}</p>
      </div>
    </div>
  );
}

// ============ FEATURE ICONS ============
function FeatureIcon({ type }) {
  const icons = {
    share: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_5696_5021)">
          <mask id="mask0_5696_5021" style={{ maskType: "luminance" }} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
            <path d="M24 0H0V24H24V0Z" fill="white" />
          </mask>
          <g mask="url(#mask0_5696_5021)">
            <path d="M18 2H6C4.34 2 3 3.33 3 4.97V15.88C3 17.52 4.34 18.85 6 18.85H6.76C7.56 18.85 8.32 19.16 8.88 19.72L10.59 21.41C11.37 22.18 12.64 22.18 13.42 21.41L15.13 19.72C15.69 19.16 16.46 18.85 17.25 18.85H18C19.66 18.85 21 17.52 21 15.88V4.97C21 3.33 19.66 2 18 2ZM12.28 14.96C12.13 15.01 11.88 15.01 11.72 14.96C10.42 14.51 7.5 12.66 7.5 9.51C7.51 8.12 8.62 7 10 7C10.82 7 11.54 7.39 12 8C12.46 7.39 13.18 7 14 7C15.38 7 16.5 8.12 16.5 9.51C16.49 12.66 13.58 14.51 12.28 14.96Z" fill="black" />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_5696_5021">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    ),
    search: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M2 10.6699C2 5.88166 5.84034 2 10.5776 2C12.8526 2 15.0343 2.91344 16.6429 4.53936C18.2516 6.16529 19.1553 8.37052 19.1553 10.6699C19.1553 15.4582 15.3149 19.3399 10.5776 19.3399C5.84034 19.3399 2 15.4582 2 10.6699ZM19.0143 17.6551L21.569 19.7173H21.6133C22.1302 20.2397 22.1302 21.0866 21.6133 21.609C21.0965 22.1314 20.2585 22.1314 19.7417 21.609L17.6217 19.1793C17.4212 18.9774 17.3086 18.7032 17.3086 18.4172C17.3086 18.1312 17.4212 17.857 17.6217 17.6551C18.0082 17.2712 18.6278 17.2712 19.0143 17.6551Z" fill="black" />
      </svg>
    ),
    people: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_5696_5039)">
          <mask id="mask0_5696_5039" style={{ maskType: "luminance" }} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
            <path d="M24 0H0V24H24V0Z" fill="white" />
          </mask>
          <g mask="url(#mask0_5696_5039)">
            <path d="M17.5291 7.77C17.4591 7.76 17.3891 7.76 17.3191 7.77C15.7691 7.72 14.5391 6.45 14.5391 4.89C14.5391 3.3 15.8291 2 17.4291 2C19.0191 2 20.3191 3.29 20.3191 4.89C20.3091 6.45 19.0791 7.72 17.5291 7.77Z" fill="black" />
            <path d="M20.7916 14.7004C19.6716 15.4504 18.1016 15.7304 16.6516 15.5404C17.0316 14.7204 17.2316 13.8104 17.2416 12.8504C17.2416 11.8504 17.0216 10.9004 16.6016 10.0704C18.0816 9.8704 19.6516 10.1504 20.7816 10.9004C22.3616 11.9404 22.3616 13.6504 20.7916 14.7004Z" fill="black" />
            <path d="M6.44016 7.77C6.51016 7.76 6.58016 7.76 6.65016 7.77C8.20016 7.72 9.43016 6.45 9.43016 4.89C9.43016 3.29 8.14016 2 6.54016 2C4.95016 2 3.66016 3.29 3.66016 4.89C3.66016 6.45 4.89016 7.72 6.44016 7.77Z" fill="black" />
            <path d="M6.55109 12.8496C6.55109 13.8196 6.76109 14.7396 7.14109 15.5696C5.73109 15.7196 4.26109 15.4196 3.18109 14.7096C1.60109 13.6596 1.60109 11.9496 3.18109 10.8996C4.25109 10.1796 5.76109 9.88962 7.18109 10.0496C6.77109 10.8896 6.55109 11.8396 6.55109 12.8496Z" fill="black" />
            <path d="M12.1207 15.87C12.0407 15.86 11.9507 15.86 11.8607 15.87C10.0207 15.81 8.55078 14.3 8.55078 12.44C8.56078 10.54 10.0907 9 12.0007 9C13.9007 9 15.4407 10.54 15.4407 12.44C15.4307 14.3 13.9707 15.81 12.1207 15.87Z" fill="black" />
            <path d="M8.87078 17.9396C7.36078 18.9496 7.36078 20.6096 8.87078 21.6096C10.5907 22.7596 13.4107 22.7596 15.1307 21.6096C16.6407 20.5996 16.6407 18.9396 15.1307 17.9396C13.4207 16.7896 10.6007 16.7896 8.87078 17.9396Z" fill="black" />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_5696_5039">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    ),
    send: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="Send">
          <path d="M21.4354 2.58198C20.9352 2.0686 20.1949 1.87734 19.5046 2.07866L3.408 6.75952C2.6797 6.96186 2.16349 7.54269 2.02443 8.28055C1.88237 9.0315 2.37858 9.98479 3.02684 10.3834L8.0599 13.4768C8.57611 13.7939 9.24238 13.7144 9.66956 13.2835L15.4329 7.4843C15.723 7.18231 16.2032 7.18231 16.4934 7.4843C16.7835 7.77623 16.7835 8.24935 16.4934 8.55134L10.72 14.3516C10.2918 14.7814 10.2118 15.4508 10.5269 15.9702L13.6022 21.0538C13.9623 21.6577 14.5826 22 15.2628 22C15.3429 22 15.4329 22 15.513 21.9899C16.2933 21.8893 16.9135 21.3558 17.1436 20.6008L21.9156 4.52479C22.1257 3.84028 21.9356 3.09537 21.4354 2.58198Z" fill="black" />
          <circle cx="20" cy="4" r="3.5" fill="#E33939" stroke="#ED8E1F" />
        </g>
      </svg>
    )
  };
  return icons[type] || null;
}

// ============ RIGHTS SECTION ============
function RightsSection() {
  return (
    <div className={`${styles.phlooi_rights} ${styles.padding} ${styles.bg_black}`}>
      <div className="container">
        <h2 className={`${styles.cmn_heading} text-center`}>
          <span>Redefining</span> the Digital Social <br /> Experience.
        </h2>
        <p className={`${styles.cmn_desc} mt-5 m-auto text-center`}>
          Phloii empowers you to share your world through high-fidelity photos and expressive captions that turn daily thoughts into an inspiring personal narrative. You can discover your tribe by joining specialized interest groups designed to foster a sense of belonging through meaningful conversations and shared passions. The experience moves beyond the screen as you join exclusive group events and local gatherings that bridge the gap between digital discovery and living in the moment. Communication is made effortless with a frictionless messaging system that removes the barrier of friend requests, allowing for instant and authentic social interaction.
        </p>
      </div>
    </div>
  );
}

// ============ STORIES SECTION ============
function StoriesSection() {
  const stories = [
    {
      image: "jacob.jpg",
      title: "The Explorers",
      desc: "What began as a simple exchange of travel tips within a private group evolved into a full-scale mountain expedition coordinated through our Phloii Verified venues."
    },
    {
      image: "jaxson.png",
      title: "The Gastronomes",
      desc: "Turning a digital passion for culinary discovery into a thriving weekly dinner club, these members have grown their local foodie tribe to over fifty active participants."
    },
    {
      image: "creative.jpg",
      title: "Creative Hub",
      desc: "By bypassing the noise of traditional social media, this community found a focused home on Phloii to host monthly live art workshops and collaborative creative events."
    },
    {
      image: "trek.png",
      title: "Trekking Tribe",
      desc: "Starting with a single direct message, this group has transformed into a massive city-wide community that meets every weekend to explore new trails and outdoor adventures."
    }
  ];

  return (
    <div className={`${styles.realstories} ${styles.bg_black} overflow-hidden position-relative`}>
      <div className={`${styles.stories_wrapper} ${styles.padding}`}>
        <h2 className={`${styles.cmn_heading} text-center position-relative z-2`}>
          Real <span>Connections</span> Real <span>Moments</span>
        </h2>
        <p className={`${styles.cmn_desc} text-center mb-5 position-relative z-2 px-2`}>
          Real love stories last forever because they&apos;re built on genuine connections, trust, and shared <br /> moments that stand the test of time.
        </p>
        <div className="container pt-2 position-relative z-2">
          <div className={`${styles.stories_grid}`}>
            {stories.map((story, idx) => (
              <StoryCard key={idx} story={story} />
            ))}
          </div>
        </div>
      </div>
    </div>  
  );
}

// ============ STORY CARD COMPONENT ============
function StoryCard({ story }) {
  return (
    <div className={styles.features_card}>
      <div className={`${styles.private_image} overflow-hidden mb-4`}>
        <img src={`assets/${story.image}`} alt={story.title} />
      </div>
      <h3><span>{story.title}</span></h3>
      <p className={`${styles.cmn_desc} mb-0`}>{story.desc}</p>
    </div>
  );
}

// ============ APP DOWNLOAD SECTION ============
function AppDownloadSection() {
  return (
    <div className={`${styles.padding} ${styles.bg_black} ${styles.appDownload} position-relative overflow-hidden`}>
      <div className="container z-2 position-relative">
        <h2 className={`${styles.cmn_heading} text-start position-relative z-2`}>
          Phloii is Just a Download Away – Get it on <br />
          <span>Google Play or the App Store</span>
        </h2>
        <p className="text-white">
          Join a vibrant community where you can find your flow, explore your passions, and turn <br /> digital connections into real-world moments.
        </p>
        <div className={`${styles.appwraper} position-relative`}>
          <div className={`${styles.floatingtext} mt-2`}>
            <AppDownloadLinks />
          </div>
          <div className={`${styles.screenimage}`}>
            <img src="assets/pholio_app.svg" alt="App" className="img-fluid d-none d-md-block" />
            <img src="assets/pholio_app_mobile.svg" alt="App Mobile" className="img-fluid d-block d-md-none mt-4" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ VERIFIED LOCATION SECTION ============
function VerifiedLocationSection() {
  return (
    <div className={`${styles.features} ${styles.padding} position-relative overflow-hidden`}>
      <div className="container">
        <div className="row align-items-center row-gap-3">
          <div className="col-lg-6">
            <div className={`${styles.about_image} position-relative`}>
              <Image src="/assets/verified.png" height={524} width={596} className="img-fluid position-relative z-2" alt="Verified Location" />
            </div>
          </div>
          <div className="col-lg-6">
            <span className={`${styles.sub_heading} inline-block`}>Verified</span>
            <h2 className={`${styles.cmn_heading}`}>
              Become a Phloii Verified <br />
              <span>Location!</span>
            </h2>
            <p className={styles.cmn_desc}>
              Phloii is a premier social ecosystem designed to bridge the gap between digital community building and real-world hospitality experiences. Our &quot;Phloii Verified&quot; status allows your hotel to be recognized as a premium, safe destination for our global network of groups and event organizers. When users coordinate meetups, your venue is recommended as a top-tier location, driving consistent foot traffic from high-value social circles and professional tribes. By becoming a verified partner, your business benefits from increased visibility and a boosted local presence within our interactive map and community feeds. This partnership offers a unique opportunity to grow your brand's reach while promoting a culture of safe, premium, and authentic social connection.
            </p>
            <div>
              <Link href="/establishment/login" target="_blank" className="rister_est">
                Register Establishment
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ MAIN COMPONENT ============
export default function HomeComponent() {
  return (
    <div className={styles.homeWrapper}>
      <Header />
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <RightsSection />
      <StoriesSection />
      <AppDownloadSection />
      <VerifiedLocationSection />
      <Testimonials />
      <Footer />
    </div>
  );
}