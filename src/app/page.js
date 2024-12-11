import Image from "next/image";
import styles from "./page.module.css";
import Testimonials from "@/Component/Testimonials";
export default function Home() {
  return (
    <div className={styles.homeWrapper}>
      <header className={styles.header}>
        <Image src="/assets/logo.png" width={139} height={57} alt="logo" />
      </header>
      <div className={`${styles.mainBanner}`}>
        <div className="container position-relative">
          <h1>
            Experience <span>Secret</span> <br />
            Dating with <span>Phloii</span>
          </h1>
          <p className={styles.cmn_desc}>
            Connect Privately, Meet Authentically – Your Journey to <br />{" "}
            Discreet Relationships Starts Here
          </p>
          <div className={styles.navImmages}>
            <img width={150} src="assets/playstoreMb.png" alt="" />
            <img width={150} src="assets/appstoreMb.png" className="ms-4" alt="" />
          </div>
        </div>
        <div className={styles.image_grid}>
          <ul>
            <li className="mt-5">
              <img src="assets/oneImage.png" alt="" />
            
            </li>
            <li>
            <img src="assets/imgeone.png" className="mb-3" alt="" />
              <img src="assets/imagetwo.png" alt="" />
            
            </li>
            <li className="mt-5">
            <img src="assets/imagethree.png" className="mb-3" alt="" />
              <img src="assets/imagefour.png" alt="" />
              
            </li>
            <li>
            <img src="assets/imagefive.png" className="mb-3" alt="" />
            <img src="assets/imgeone.png" className="mb-3" alt="" />
              <img src="assets/imagesix.png" alt="" />
           
            </li>
            <li className="mt-5">
            <img src="assets/imageseven.png" className="mb-3" alt="" />
              <img src="assets/imageeight.png" alt="" />
           
            </li>
            <li >
            <img src="assets/imagenine.png" className="mb-3" alt="" />
              <img src="assets/imageten.png" alt="" />
           
            </li>
            <li className="mt-5">
              <img src="assets/imagetweleve.png" className="mb-3" alt="" />
              <img src="assets/imgeone.png" alt="" />
            </li>
            
          </ul>
        </div>
      </div>
      <div
        className={`${styles.about} ${styles.bg_black} ${styles.padding} overflow-hidden`}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <span className={`${styles.sub_heading} inline-block`}>
                About Us
              </span>
              <h2 className={`${styles.cmn_heading}`}>
                <span>Dating</span> Made Simple, Connections Made Real
              </h2>
              <p className={styles.cmn_desc}>
                In publishing and graphic design, Lorem ipsum is text commonly
                used to demonstrate the visual form of a document or a without
                relying on meaningful content.
              </p>
              <p className={styles.cmn_desc}>
                In publishing and graphic design, Lorem ipsum is text commonly
                used to demonstrate the visual form of a document or a typeface
                without relying on meaningful content. In publishing and graphic
                design, Lorem ipsum is text commonly used to demonstrate the
                visual form of a document or a typeface without relying on
                meaningful content.
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
          <h2
            className={`${styles.cmn_heading} text-center position-relative z-2`}
          >
            A <span>Private</span> Way to Meet Someone Special
          </h2>
          <p className={`${styles.cmn_desc} text-center mb-5 pt-2`}>
            We shall never deny a guest, even the most ridiculous request. We
            provide excellent features from us
          </p>
          <div className="row row-gap-4 position-relative z-2">
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
                <h3>Lorem Ipsum</h3>
                <p className={`${styles.cmn_desc} mb-0`}>
                  Kerjarodi.com is an application for job seekers and workers
                  who prioritize user comfort and the quality of services
                  provided by our team
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
                <h3>Lorem Ipsum</h3>
                <p className={`${styles.cmn_desc} mb-0`}>
                  Kerjarodi.com is an application for job seekers and workers
                  who prioritize user comfort and the quality of services
                  provided by our team
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
                <h3>Lorem Ipsum</h3>
                <p className={`${styles.cmn_desc} mb-0`}>
                  Kerjarodi.com is an application for job seekers and workers
                  who prioritize user comfort and the quality of services
                  provided by our team
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
                <h3>Lorem Ipsum</h3>
                <p className={`${styles.cmn_desc} mb-0`}>
                  Kerjarodi.com is an application for job seekers and workers
                  who prioritize user comfort and the quality of services
                  provided by our team
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
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
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
          <p className={`${styles.cmn_desc} text-center mb-5 position-relative z-2`}>
            Kerjarodi.com is an application for job seekers and workers who
            prioritize <br /> user comfort and the quality of services provided
            by our team
          </p>
          <div className="container pt-2 position-relative z-2">
            <div className={`${styles.stories_grid}`}>
              <div className={styles.features_card}>
                <div className={`${styles.private_image} overflow-hidden mb-4`}>
                  <img src="assets/jacob.png" alt="jacob" />
                </div>
                <h3>
                  Jakob <span className="text-white">/</span> <span>Rayna</span>
                </h3>
                
                 <p className={`${styles.cmn_desc} mb-0`}>
                  Kerjarodi.com is an application for job seekers and workers
                  who prioritize user comfort and the quality of services
                  provided by our team
                </p>
              </div>

              <div className={styles.features_card}>
                <div className={`${styles.private_image} overflow-hidden mb-4`}>
                  <img src="assets/angel.png" alt="jacob" />
                </div>
                <h3>
                  Angel <span className="text-white">/</span>{" "}
                  <span>kierra</span>
                </h3>
                 <p className={`${styles.cmn_desc} mb-0`}>
                  Kerjarodi.com is an application for job seekers and workers
                  who prioritize user comfort and the quality of services
                  provided by our team
                </p>
              </div>

              <div className={styles.features_card}>
                <div className={`${styles.private_image} overflow-hidden mb-4`}>
                  <img src="assets/jaxson.png" alt="jacob" />
                </div>
                <h3>
                  Jaxson <span className="text-white">/</span>{" "}
                  <span>Aspen</span>
                </h3>
                 <p className={`${styles.cmn_desc} mb-0`}>
                  Kerjarodi.com is an application for job seekers and workers
                  who prioritize user comfort and the quality of services
                  provided by our team
                </p>
              </div>

              <div className={styles.features_card}>
                <div className={`${styles.private_image} overflow-hidden mb-4`}>
                  <img src="assets/jacob.png" alt="jacob" />
                </div>
                <h3>
                  Cristofer <span className="text-white">/</span>{" "}
                  <span>Dulce</span>
                </h3>
                 <p className={`${styles.cmn_desc} mb-0`}>
                  Kerjarodi.com is an application for job seekers and workers
                  who prioritize user comfort and the quality of services
                  provided by our team
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`${styles.padding} ${styles.bg_black} ${styles.appDownload}`}
      >
        <h2
          className={`${styles.cmn_heading} text-center position-relative z-2`}
        >
          Phloii is Just a Download Away – Get it on <br />{" "}
          <span>Google Play or the App Store</span>
        </h2>
        <p className={`${styles.cmn_desc} text-center mb-5 position-relative z-2 pt-3`}>
          Kerjarodi.com is an application for job seekers and workers who
          prioritize <br />
          user comfort and the quality of services provided by our team
        </p>
        <div className={`${styles.dowloadGrid}`}>
          <div
            className={`${styles.mobile_screen} ${styles.borderEnd} text-center`}
          >
            <img src="assets/appscreen.png" className="mb-4" alt="" />
            <img src="assets/playstore.png" alt="" />
          </div>
          <div className={`${styles.centered_screen}`}>
            <img src="assets/multiscreen.png" alt="" />
          </div>
          <div
            className={`${styles.mobile_screen} ${styles.borderStart} text-center`}
          >
            <img src="assets/appscreen.png" className="mb-4" alt="" />
            <img src="assets/appStore.png" alt="" />
          </div>
        </div>
      </div>
      <div
        className={`${styles.features} ${styles.padding} position-relative overflow-hidden`}
      >
        <div className="container">
          <div className="row align-items-center">
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
                available for $99 a month, offering a great opportunity to boost
                sales while promoting safety for all users.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Testimonials />
      <footer className={styles.footer}>
        <p className="text-center mb-0">© Copyright 2022 phloii.com</p>
      </footer>
    </div>
  );
}
