import Image from "next/image";
import styles from "./page.module.css";
import Testimonials from "@/Component/Testimonials";
import Link from "next/link";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
export default function HomeComponent() {
  return (
    <div className={styles.homeWrapper}>
     <Header/>
      <div className={`${styles.mainBanner}`}>
        <div className="container position-relative">
          <h1>
            Experience <span>Safe</span> <br />
            Dating with <span>Phloii</span>
          </h1>
          <p className={styles.cmn_desc}>
            Connect Privately, Meet Authentically – Your Journey to <br />{" "}
            Discreet Relationships Starts Here
          </p>
          <div className={styles.navImmages}>
            <img width={180} src="assets/playstoreMb.png" alt="" />
            <img
              width={180}
              src="assets/appstoreMb.png"
              className="ms-4"
              alt=""
            />
          </div>
        </div>
        <div className={styles.image_grid}>
          <ul>
            <li className="mt-5">
              <img src="assets/oneImage.png" alt="" className="floating" />
            </li>
            <li>
              <img src="assets/imgeone.png" className="floating mb-3" alt="" />
              <img src="assets/imagetwo.png" className="floating" alt="" />
            </li>
            <li className="mt-5">
              <img
                src="assets/imagethree.png"
                className="floating mb-3"
                alt=""
              />
              <img src="assets/imagefour.png" className="floating" alt="" />
            </li>
            <li>
              <img
                src="assets/imagefive.png"
                className="floating mb-3"
                alt=""
              />
              <img src="assets/imgeone.png" className="floating mb-3" alt="" />
              <img src="assets/imagesix.png" className="floating" alt="" />
            </li>
            <li className="mt-5">
              <img
                src="assets/imageseven.png"
                className="floating mb-3"
                alt=""
              />
              <img src="assets/imageeight.png" className="floating" alt="" />
            </li>
            <li>
              <img
                src="assets/imagenine.png"
                className="floating mb-3"
                alt=""
              />
              <img src="assets/imageten.png" className="floating" alt="" />
            </li>
            <li className="mt-5">
              <img
                src="assets/imagetweleve.png"
                className="floating mb-3"
                alt=""
              />
              <img src="assets/imgeone.png" className="floating" alt="" />
            </li>
          </ul>
        </div>
      </div>
      <div
        className={`${styles.about} ${styles.bg_black} ${styles.padding} overflow-hidden`}
      >
        <div className="container">
          <div className="row align-items-center row-gap-3">
            <div className="col-lg-6">
              <span className={`${styles.sub_heading} inline-block`}>
                About Us
              </span>
              <h2 className={`${styles.cmn_heading}`}>
                <span>Dating</span> Made Simple, Connections Made Real
              </h2>
              <p className={styles.cmn_desc}>
                At Phloii, we believe that meaningful connections should be
                easy, safe, and genuine. Our mission is to redefine modern
                dating by creating a space where real people can build real
                relationships.
              </p>
              <p className={styles.cmn_desc}>
                Phloii is designed with your safety and authenticity in mind. We
                go beyond just swipes and matches, providing features that
                ensure every connection is as secure as it is promising. From
                verified profiles to approved meeting locations, Phloii takes
                the guesswork out of meeting new people and gives you the
                confidence to explore relationships in a safe, trusted
                environment.
              </p>
              <p className={styles.cmn_desc}>
                Whether you&apos;re looking for friendship, love, or something in
                between, Phloii is here to make your dating experience simple,
                seamless, and enjoyable.
              </p>
              <p className={styles.cmn_desc}>
                Join us and discover a better way to connect. With Phloii, your
                next great connection is just a tap away.
              </p>
            </div>
            <div className="col-lg-6">
              <div className={`${styles.about_image} position-relative `}>
                <Image
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
      <div
        className={`${styles.features} ${styles.padding} position-relative overflow-hidden`}
      >
        <div className="container">
          <span
            className={`${styles.sub_heading}  text-center d-block position-relative z-2`}
          >
            Secret Feature
          </span>
          {/* <h2
            className={`${styles.cmn_heading} text-center position-relative z-2`}
          >
             A discreet and secure way to connect and meet someone special, ensuring your privacy every step of the way.<span>Private</span> Way to Meet Someone Special
          </h2> */}
          <p className={`${styles.cmn_desc} text-center mb-5 pt-2`}>
            A discreet and secure way to connect and meet someone special, <br/>
            ensuring your privacy every step of the way.
          </p>
          <div className="row row-gap-4 position-relative z-2 row-gap-3">
            <div className="col-lg-6">
              <div className={styles.features_card}>
                <div
                  className={`${styles.card_image} d-flex align-items-center justify-content-center`}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M10.7054 2.51953C10.0351 2.51953 9.46477 2.98535 9.30469 3.6132H14.6874C14.5273 2.98535 13.957 2.51953 13.2867 2.51953H10.7054ZM16.2071 3.61264H18.1881C20.2891 3.61264 22 5.34428 22 7.47085C22 7.47085 21.94 8.3711 21.92 9.62477C21.918 9.72401 21.8699 9.82122 21.7909 9.87996C21.3097 10.2354 20.8694 10.5291 20.8294 10.5493C19.1686 11.6632 17.2386 12.447 15.1826 12.8369C15.0485 12.8632 14.9165 12.7934 14.8484 12.6739C14.2721 11.6754 13.1956 11.0253 11.995 11.0253C10.8024 11.0253 9.71586 11.6683 9.12256 12.6678C9.05353 12.7853 8.92346 12.8531 8.7904 12.8278C6.75138 12.4369 4.82141 11.6541 3.17059 10.5594L2.21011 9.89109C2.13007 9.84046 2.08004 9.74932 2.08004 9.64806C2.05003 9.13161 2 7.47085 2 7.47085C2 5.34428 3.71086 3.61264 5.81191 3.61264H7.78289C7.97299 2.1443 9.2036 1 10.7044 1H13.2856C14.7864 1 16.017 2.1443 16.2071 3.61264ZM21.6613 12.8623L21.6213 12.8826C19.6003 14.2395 17.1691 15.1408 14.6178 15.5155C14.2576 15.5661 13.8975 15.3332 13.7974 14.9686C13.5773 14.1382 12.8669 13.5914 12.0165 13.5914H12.0065H11.9865C11.1361 13.5914 10.4257 14.1382 10.2056 14.9686C10.1056 15.3332 9.74538 15.5661 9.3852 15.5155C6.83393 15.1408 4.40271 14.2395 2.3817 12.8826C2.3717 12.8724 2.27165 12.8117 2.19161 12.8623C2.10156 12.9129 2.10156 13.0345 2.10156 13.0345L2.1716 18.199C2.1716 20.3256 3.87245 22.0471 5.9735 22.0471H18.0195C20.1206 22.0471 21.8214 20.3256 21.8214 18.199L21.9015 13.0345C21.9015 13.0345 21.9015 12.9129 21.8114 12.8623C21.7614 12.8319 21.7014 12.8421 21.6613 12.8623ZM12.7469 17.1053C12.7469 17.5306 12.4167 17.8648 11.9965 17.8648C11.5863 17.8648 11.2461 17.5306 11.2461 17.1053V15.799C11.2461 15.3838 11.5863 15.0395 11.9965 15.0395C12.4167 15.0395 12.7469 15.3838 12.7469 15.799V17.1053Z"
                      fill="black"
                    />
                  </svg>
                </div>
                <h3>Anonymous Profiles</h3>
                <p className={`${styles.cmn_desc} mb-0`}>
                  Interact with potential matches using limited-profile
                  visibility, ensuring privacy until you’re ready to share more.
                </p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className={styles.features_card}>
                <div
                  className={`${styles.card_image} d-flex align-items-center justify-content-center`}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M2 10.6699C2 5.88166 5.84034 2 10.5776 2C12.8526 2 15.0343 2.91344 16.6429 4.53936C18.2516 6.16529 19.1553 8.37052 19.1553 10.6699C19.1553 15.4582 15.3149 19.3399 10.5776 19.3399C5.84034 19.3399 2 15.4582 2 10.6699ZM19.0143 17.6551L21.569 19.7173H21.6133C22.1302 20.2397 22.1302 21.0866 21.6133 21.609C21.0965 22.1314 20.2585 22.1314 19.7417 21.609L17.6217 19.1793C17.4212 18.9774 17.3086 18.7032 17.3086 18.4172C17.3086 18.1312 17.4212 17.857 17.6217 17.6551C18.0082 17.2712 18.6278 17.2712 19.0143 17.6551Z"
                      fill="black"
                    />
                  </svg>
                </div>
                <h3>Secure Messaging</h3>
                <p className={`${styles.cmn_desc} mb-0`}>
                  Communicate through end-to-end encrypted chats, keeping your
                  conversations private and secure.
                </p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className={styles.features_card}>
                <div
                  className={`${styles.card_image} d-flex align-items-center justify-content-center`}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="Send">
                      <g id="Send_2">
                        <path
                          id="Send_3"
                          d="M21.4354 2.58198C20.9352 2.0686 20.1949 1.87734 19.5046 2.07866L3.408 6.75952C2.6797 6.96186 2.16349 7.54269 2.02443 8.28055C1.88237 9.0315 2.37858 9.98479 3.02684 10.3834L8.0599 13.4768C8.57611 13.7939 9.24238 13.7144 9.66956 13.2835L15.4329 7.4843C15.723 7.18231 16.2032 7.18231 16.4934 7.4843C16.7835 7.77623 16.7835 8.24935 16.4934 8.55134L10.72 14.3516C10.2918 14.7814 10.2118 15.4508 10.5269 15.9702L13.6022 21.0538C13.9623 21.6577 14.5826 22 15.2628 22C15.3429 22 15.4329 22 15.513 21.9899C16.2933 21.8893 16.9135 21.3558 17.1436 20.6008L21.9156 4.52479C22.1257 3.84028 21.9356 3.09537 21.4354 2.58198Z"
                          fill="black"
                        />
                        <circle
                          id="Ellipse 12"
                          cx="20"
                          cy="4"
                          r="3.5"
                          fill="#E33939"
                          stroke="#ED8E1F"
                        />
                      </g>
                    </g>
                  </svg>
                </div>
                <h3>Safe Meet Locations</h3>
                <p className={`${styles.cmn_desc} mb-0`}>
                  Plan your first meetings at pre-approved, trusted locations to
                  ensure a comfortable and secure experience.
                </p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className={styles.features_card}>
                <div
                  className={`${styles.card_image} d-flex align-items-center justify-content-center`}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20.7489 15.9512C18.9711 16.7554 16.9905 16.9987 15.0709 16.6488C13.1514 16.2989 11.384 15.3723 10.0043 13.9926C8.6246 12.6129 7.69807 10.8456 7.34816 8.92601C6.99824 7.00645 7.24156 5.02583 8.04568 3.24805C6.63036 3.88766 5.39133 4.86108 4.43489 6.0848C3.47845 7.30851 2.83316 8.74599 2.55437 10.2739C2.27559 11.8018 2.37164 13.3746 2.83427 14.8572C3.29691 16.3399 4.11233 17.6881 5.21057 18.7864C6.3088 19.8846 7.65708 20.7 9.13972 21.1627C10.6224 21.6253 12.1951 21.7213 13.723 21.4426C15.2509 21.1638 16.6884 20.5185 17.9121 19.562C19.1358 18.6056 20.1093 17.3666 20.7489 15.9512Z"
                      fill="black"
                    />
                  </svg>
                </div>
                <h3>Selective Match Visibility</h3>
                <p className={`${styles.cmn_desc} mb-0`}>
                  Your profile is only visible to those you choose to connect
                  with, ensuring a curated and private dating experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`${styles.phlooi_rights} ${styles.padding} ${styles.bg_black}`}
      >
        <div className="container">
          <h2 className={`${styles.cmn_heading} text-center`}>
            What Makes <span>Phloii the Right</span> <br /> Dating App for You?
          </h2>
          <p className={`${styles.cmn_desc} mt-5 m-auto text-center`}>
            Phloii is more than just a dating app – it’s your trusted partner in
            finding genuine connections. We combine innovative features with a
            commitment to safety, privacy, and authenticity, ensuring every
            interaction feels secure and meaningful. Whether you’re exploring
            new relationships or looking for someone special, Phloii’s unique
            approach prioritizes real connections, verified profiles, and
            approved meeting locations. With tools like anonymous browsing,
            secure messaging, and curated matches, we make it easy for you to
            meet the right person, on your terms, in a safe and supportive
            environment. At Phloii, dating isn’t just simplified – it’s
            redefined.
          </p>
        </div>
      </div>
      <div
        className={`${styles.realstories}  ${styles.bg_black} overflow-hidden position-relative`}
      >
        <div className={`${styles.stories_wrapper} ${styles.padding}`}>
          <h2
            className={`${styles.cmn_heading} text-center position-relative z-2`}
          >
            {" "}
            Real love <span>stories</span> last forever
          </h2>
          <p
            className={`${styles.cmn_desc} text-center mb-5 position-relative z-2 px-2`}
          >
            Real love stories last forever because they’re built on genuine
            connections, trust, and shared <br /> moments that stand the test of
            time.
          </p>
          <div className="container pt-2 position-relative z-2">
            <div className={`${styles.stories_grid}`}>
              <div className={styles.features_card}>
                <div className={`${styles.private_image} overflow-hidden mb-4`}>
                  <img src="assets/jacob.png" alt="jacob" />
                </div>
                <h3>
                  Emily <span className="text-white">/</span> <span>Ryan</span>
                </h3>

                <p className={`${styles.cmn_desc} mb-0`}>
                  Emily and Ryan&apos;s love story began on Phloii, where their
                  shared love for hiking and adventure brought them together.
                  After weeks of meaningful conversations and getting to know
                  each other through the app, they decided to meet at a
                  Phloii-approved café. What started as a casual coffee date
                  soon turned into a lifelong connection. Today, they often
                  reflect on how Phloii’s focus on safety and authenticity gave
                  them the confidence to take that first step toward forever.
                </p>
              </div>

              <div className={styles.features_card}>
                <div className={`${styles.private_image} overflow-hidden mb-4`}>
                  <img src="assets/angel.png" alt="jacob" />
                </div>
                <h3>
                  Emma <span className="text-white">/</span> <span>Chris</span>
                </h3>
                <p className={`${styles.cmn_desc} mb-0`}>
                  Emma was hesitant about online dating until she joined Phloii
                  and matched with Chris, whose thoughtful messages stood out.
                  Their first date at a Phloii-approved park turned into hours
                  of easy conversation. Now happily engaged, they credit the
                  app’s focus on genuine connections for helping them discover
                  their perfect match.
                </p>
              </div>

              <div className={styles.features_card}>
                <div className={`${styles.private_image} overflow-hidden mb-4`}>
                  <img src="assets/jaxson.png" alt="jacob" />
                </div>
                <h3>
                  Sophia <span className="text-white">/</span>{" "}
                  <span>James</span>
                </h3>
                <p className={`${styles.cmn_desc} mb-0`}>
                  Sophia and James connected on Phloii over their mutual passion
                  for cooking. Their first meeting, at a cozy Phloii-approved
                  restaurant, was filled with laughter and shared dreams of
                  traveling the world. Now, they enjoy creating new recipes
                  together in their kitchen, grateful that Phloii helped them
                  find a bond they never thought possible.
                </p>
              </div>

              <div className={styles.features_card}>
                <div className={`${styles.private_image} overflow-hidden mb-4`}>
                  <img src="assets/mia.png" alt="jacob" />
                </div>
                <h3>
                  Mia <span className="text-white">/</span> <span>Alex</span>
                </h3>
                <p className={`${styles.cmn_desc} mb-0`}>
                  Mia and Alex met on Phloii after discovering their shared love
                  for photography. Their conversations quickly turned into
                  shared photo walks, starting with a safe meeting at a
                  Phloii-approved art gallery. What began as a friendship rooted
                  in creativity blossomed into a beautiful relationship. Today,
                  they travel together, capturing the world and each other, all
                  thanks to Phloii.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`${styles.padding} ${styles.bg_black} ${styles.appDownload} position-relative`}
      >
        <div className="container z-2 position-relative">
          <h2
            className={`${styles.cmn_heading} text-start position-relative z-2`}
          >
           Start your journey to meaningful connections today <br/>
           <span> download Phloii and let your love story begin! </span>
          </h2>
          <div className={`${styles.appwraper} position-relative`}>
            <div className={`${styles.floatingtext} mt-2`}>
              {/* <p
                className={`${styles.cmn_desc} text-start mb-3 position-relative z-2 pt-md-2 pt-lg-3`}
              >
                Kerjarodi.com is an application for job seekers and workers who
                prioritize <br />
                user comfort and the quality of services provided by our team
              </p> */}
              <div className={styles.navImmages}>
                <img width={180} src="assets/playstoreMb-dark.png" alt="" />
                <img
                  width={180}
                  src="assets/appstoreMb-dark.png"
                  className="ms-2"
                  alt=""
                />
              </div>
            </div>
            <div className={`${styles.screenimage}`}>
              <img
                src="assets/floii.png"
                alt=""
                className="img-fluid d-none d-md-block"
              />
              <img
                src="assets/phlioo-mobile.png"
                alt=""
                className="img-fluid d-block d-md-none mt-4"
              />
            </div>
          </div>
        </div>
      </div>
      <div
        className={`${styles.features} ${styles.padding} position-relative overflow-hidden`}
      >
        <div className="container">
          <div className="row align-items-center row-gap-3">
            <div className="col-lg-6">
              <div className={`${styles.about_image} position-relative `}>
                <Image
                  src="/assets/veirfied_image.png"
                  height={524}
                  width={596}
                  className="img-fluid position-relative z-2"
                  alt="About Image"
                />
              </div>
            </div>
            <div className="col-lg-6">
              <span className={`${styles.sub_heading} inline-block`}>
                Verified
              </span>
              <h2 className={`${styles.cmn_heading}`}>
                Become a Phloii Verified <br />
                <span>Location!</span>
              </h2>
              <p className={styles.cmn_desc}>
                Phloii is a new dating app designed with a focus on safe dating.
                One of its unique features is Phloii Verified, which allows
                businesses to become recognized as premium safe locations within
                the app. When couples match, your verified location will be
                recommended as a great spot to meet, encouraging safe and
                enjoyable meetups. By becoming a Phloii Verified location, your
                business can benefit from increased foot traffic, as it helps
                drive more customers to your establishment. The service is
                offering a great opportunity to boost
                sales while promoting safety for all users.
              </p>
             <div className="">
             <Link href={'/establishment/login'} className={styles.rister_est}>Register Establishment</Link>
             </div>
            </div>
          </div>
        </div>
      </div>
      <Testimonials />
      <Footer/>
    </div>
  );
}
