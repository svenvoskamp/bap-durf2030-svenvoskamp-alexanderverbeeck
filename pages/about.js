import React, { useState, useRef, useEffect } from "react";
import { useFetchUser } from "../lib/user";
import { withApollo } from "../lib/withApollo";
import Nav from "../components/Nav";
import Mouse from "../components/Mouse";
import style from "../css/about.module.css";

const About = () => {
  const { user, loading } = useFetchUser();
  const scrollRef = useRef();
  const [currentIndex, setCurrentIndex] = useState("");

  useEffect(() => {
    import("locomotive-scroll").then((locomotiveModule) => {
      const lscroll = new locomotiveModule.default({
        el: scrollRef.current,
        smooth: true,
        direction: "vertical",
      });
    });
  }, []);

  const onScroll = () => {
    const div = document.getElementsByTagName("html");
    const el = document.querySelector(`.faq`);

    if (el.classList.contains(`is-inview`)) {
      if (div[0].classList.contains(`dark-mode`)) {
      } else {
        div[0].classList.add(`dark-mode`);
      }
    }
    if (!el.classList.contains(`is-inview`)) {
      if (div[0].classList.contains(`dark-mode`)) {
        div[0].classList.remove(`dark-mode`);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("wheel", onScroll);
  }, []);

  return (
    <>
      <Mouse></Mouse>
      <Nav user={user}></Nav>
      <main ref={scrollRef}>
        <section className={style.part}>
          <div className={style.durf_wat}>
            <h1 className={style.title}>
              Durf.
              <span className={style.title_outline}>wat?</span>
            </h1>
            <p className={style.title_description}>
              Lees hier alles over wat DURF2030 is en wat ons doel is.{" "}
            </p>
          </div>
          <div className={style.grid__about}>
            <div>
              <p className={style.text__bold}>
                Wij als inwoners, ondernemers, jongeren, (hoge) scholen,
                kunstenaars, verbinders en veranderaars met een creatieve
                mindset willen hier een antwoord op bieden. DURF 2030 is een
                platform waarbinnen we jou willen betrekken om de krachten te
                bundelen voor een veerkrachtige regio.
              </p>
              <p className={style.text}>
                Door kunst en creativiteit als tool in te zetten, doorbreken we
                vaste patronen en zetten onze verbeeldingskracht en
                vindingrijkheid in voor een positieve impact op ons sociaal
                weefsel. Door niet op eilandjes te werken, maar kennis en
                ervaring te delen, bundelen we onze krachten. Door anderen
                actief te betrekken bij onze plannen, scheppen we nieuwe
                relaties. Ieder is uniek, maar samen vormen we een groter
                geheel. Zo maken wij het verschil.{" "}
              </p>
            </div>
            <img
              className={style.img__about}
              src="./assets/about/about.svg"
              alt="projects"
            />
          </div>
        </section>
        <section className={style.part}>
          <h1
            className={`${style.title} ${style.title__outline__faq}  faq`}
            data-scroll
            data-scroll-repeat
          >
            Durf.
            <span className={`${style.title_outline} ${style.title__faq}`}>
              Faq.
            </span>
          </h1>
          <p className={style.title_description}>
            Antwoord op de meest gestelde vragen.
          </p>
          <div>
            <div className={style.faq__div}>
              <div className={style.faq__content}>
                <p
                  className={style.faq__text__bold}
                  onClick={(e) => setCurrentIndex(1)}
                >
                  Wat is het doel van durf?{" "}
                </p>
                {currentIndex == 1 && (
                  // <img
                  //   className={style.button__open}
                  //   src="./assets/about/close.svg"
                  //   alt="close"
                  //   onClick={(e) => setCurrentIndex("")}
                  // />
                  <svg
                    className={style.button__open}
                    onClick={(e) => setCurrentIndex("")}
                    width="26"
                    height="26"
                    viewBox="0 0 26 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.7645 8.23555C17.6451 8.11518 17.503 8.01964 17.3465 7.95444C17.19 7.88924 17.0222 7.85568 16.8527 7.85568C16.6831 7.85568 16.5153 7.88924 16.3588 7.95444C16.2023 8.01964 16.0602 8.11518 15.9409 8.23555L13 11.1892L10.0591 8.23555C9.81731 7.99372 9.48933 7.85787 9.14734 7.85787C8.80535 7.85787 8.47737 7.99372 8.23555 8.23555C7.99372 8.47737 7.85787 8.80535 7.85787 9.14734C7.85787 9.48933 7.99372 9.81731 8.23555 10.0591L11.1892 13L8.23555 15.9409C8.11518 16.0602 8.01964 16.2023 7.95444 16.3588C7.88924 16.5153 7.85568 16.6831 7.85568 16.8527C7.85568 17.0222 7.88924 17.19 7.95444 17.3465C8.01964 17.503 8.11518 17.6451 8.23555 17.7645C8.35493 17.8848 8.49697 17.9804 8.65346 18.0456C8.80995 18.1108 8.97781 18.1443 9.14734 18.1443C9.31687 18.1443 9.48473 18.1108 9.64122 18.0456C9.79772 17.9804 9.93975 17.8848 10.0591 17.7645L13 14.8107L15.9409 17.7645C16.0602 17.8848 16.2023 17.9804 16.3588 18.0456C16.5153 18.1108 16.6831 18.1443 16.8527 18.1443C17.0222 18.1443 17.19 18.1108 17.3465 18.0456C17.503 17.9804 17.6451 17.8848 17.7645 17.7645C17.8848 17.6451 17.9804 17.503 18.0456 17.3465C18.1108 17.19 18.1443 17.0222 18.1443 16.8527C18.1443 16.6831 18.1108 16.5153 18.0456 16.3588C17.9804 16.2023 17.8848 16.0602 17.7645 15.9409L14.8107 13L17.7645 10.0591C17.8848 9.93975 17.9804 9.79772 18.0456 9.64122C18.1108 9.48473 18.1443 9.31687 18.1443 9.14734C18.1443 8.97781 18.1108 8.80995 18.0456 8.65346C17.9804 8.49697 17.8848 8.35493 17.7645 8.23555ZM22.0794 3.92057C20.8948 2.69401 19.4777 1.71566 17.9109 1.04262C16.3441 0.36957 14.659 0.0153024 12.9538 0.000484879C11.2486 -0.0143327 9.55755 0.310597 7.97929 0.956313C6.40103 1.60203 4.96718 2.5556 3.76139 3.76139C2.5556 4.96718 1.60203 6.40103 0.956313 7.97929C0.310597 9.55755 -0.0143327 11.2486 0.000484879 12.9538C0.0153024 14.659 0.36957 16.3441 1.04262 17.9109C1.71566 19.4777 2.69401 20.8948 3.92057 22.0794C5.10522 23.306 6.52229 24.2843 8.08909 24.9574C9.65589 25.6304 11.341 25.9847 13.0462 25.9995C14.7514 26.0143 16.4424 25.6894 18.0207 25.0437C19.599 24.398 21.0328 23.4444 22.2386 22.2386C23.4444 21.0328 24.398 19.599 25.0437 18.0207C25.6894 16.4424 26.0143 14.7514 25.9995 13.0462C25.9847 11.341 25.6304 9.65589 24.9574 8.08909C24.2843 6.52229 23.306 5.10522 22.0794 3.92057ZM20.2687 20.2687C18.589 21.9503 16.3782 22.9974 14.013 23.2318C11.6478 23.4661 9.27449 22.8731 7.29745 21.5539C5.32042 20.2346 3.86196 18.2707 3.17055 15.9967C2.47915 13.7227 2.59757 11.2793 3.50566 9.08285C4.41374 6.88638 6.05529 5.0727 8.15065 3.95083C10.246 2.82895 12.6655 2.46828 14.997 2.93027C17.3284 3.39226 19.4276 4.64833 20.9368 6.48446C22.446 8.3206 23.2719 10.6232 23.2738 13C23.2783 14.3501 23.0151 15.6877 22.4993 16.9353C21.9835 18.183 21.2253 19.316 20.2687 20.2687Z"
                      fill="#091422"
                    />
                  </svg>
                )}
                {currentIndex != 1 && (
                  <svg
                    className={style.button__open}
                    onClick={(e) => setCurrentIndex(1)}
                    width="22"
                    height="13"
                    viewBox="0 0 22 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21.3827 0.605178C20.9917 0.217565 20.4627 0 19.9114 0C19.36 0 18.8311 0.217565 18.44 0.605178L10.9478 7.9724L3.55995 0.605178C3.16893 0.217565 2.63998 0 2.08864 0C1.53729 0 1.00834 0.217565 0.617322 0.605178C0.421714 0.798647 0.266455 1.02882 0.160502 1.28243C0.0545492 1.53603 0 1.80805 0 2.08278C0 2.35752 0.0545492 2.62954 0.160502 2.88314C0.266455 3.13675 0.421714 3.36692 0.617322 3.56039L9.46608 12.3844C9.66009 12.5795 9.89091 12.7343 10.1452 12.8399C10.3995 12.9456 10.6723 13 10.9478 13C11.2233 13 11.4961 12.9456 11.7504 12.8399C12.0047 12.7343 12.2356 12.5795 12.4296 12.3844L21.3827 3.56039C21.5783 3.36692 21.7335 3.13675 21.8395 2.88314C21.9454 2.62954 22 2.35752 22 2.08278C22 1.80805 21.9454 1.53603 21.8395 1.28243C21.7335 1.02882 21.5783 0.798647 21.3827 0.605178Z"
                      fill="#091422"
                    />
                  </svg>
                )}
              </div>
              {currentIndex == 1 && (
                <p className={style.text}>
                  DURF 2030 heeft als doel om in 2030 culturele hoofdstad te
                  worden van Europa. In 2024 moeten wij ons hier voor kandidaat
                  stellen. Tegen die tijd willen wij 2030 projecten voorzien die
                  een positieve uitkomst hebben op de gemeente Kortrijk.
                </p>
              )}
            </div>
            <div className={style.faq__div}>
              <div className={style.faq__content}>
                <p
                  className={style.faq__text__bold}
                  onClick={(e) => setCurrentIndex(2)}
                >
                  Hoe kan ik bijdragen?{" "}
                </p>
                {currentIndex == 2 && (
                  <svg
                    className={style.button__open}
                    onClick={(e) => setCurrentIndex("")}
                    width="26"
                    height="26"
                    viewBox="0 0 26 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.7645 8.23555C17.6451 8.11518 17.503 8.01964 17.3465 7.95444C17.19 7.88924 17.0222 7.85568 16.8527 7.85568C16.6831 7.85568 16.5153 7.88924 16.3588 7.95444C16.2023 8.01964 16.0602 8.11518 15.9409 8.23555L13 11.1892L10.0591 8.23555C9.81731 7.99372 9.48933 7.85787 9.14734 7.85787C8.80535 7.85787 8.47737 7.99372 8.23555 8.23555C7.99372 8.47737 7.85787 8.80535 7.85787 9.14734C7.85787 9.48933 7.99372 9.81731 8.23555 10.0591L11.1892 13L8.23555 15.9409C8.11518 16.0602 8.01964 16.2023 7.95444 16.3588C7.88924 16.5153 7.85568 16.6831 7.85568 16.8527C7.85568 17.0222 7.88924 17.19 7.95444 17.3465C8.01964 17.503 8.11518 17.6451 8.23555 17.7645C8.35493 17.8848 8.49697 17.9804 8.65346 18.0456C8.80995 18.1108 8.97781 18.1443 9.14734 18.1443C9.31687 18.1443 9.48473 18.1108 9.64122 18.0456C9.79772 17.9804 9.93975 17.8848 10.0591 17.7645L13 14.8107L15.9409 17.7645C16.0602 17.8848 16.2023 17.9804 16.3588 18.0456C16.5153 18.1108 16.6831 18.1443 16.8527 18.1443C17.0222 18.1443 17.19 18.1108 17.3465 18.0456C17.503 17.9804 17.6451 17.8848 17.7645 17.7645C17.8848 17.6451 17.9804 17.503 18.0456 17.3465C18.1108 17.19 18.1443 17.0222 18.1443 16.8527C18.1443 16.6831 18.1108 16.5153 18.0456 16.3588C17.9804 16.2023 17.8848 16.0602 17.7645 15.9409L14.8107 13L17.7645 10.0591C17.8848 9.93975 17.9804 9.79772 18.0456 9.64122C18.1108 9.48473 18.1443 9.31687 18.1443 9.14734C18.1443 8.97781 18.1108 8.80995 18.0456 8.65346C17.9804 8.49697 17.8848 8.35493 17.7645 8.23555ZM22.0794 3.92057C20.8948 2.69401 19.4777 1.71566 17.9109 1.04262C16.3441 0.36957 14.659 0.0153024 12.9538 0.000484879C11.2486 -0.0143327 9.55755 0.310597 7.97929 0.956313C6.40103 1.60203 4.96718 2.5556 3.76139 3.76139C2.5556 4.96718 1.60203 6.40103 0.956313 7.97929C0.310597 9.55755 -0.0143327 11.2486 0.000484879 12.9538C0.0153024 14.659 0.36957 16.3441 1.04262 17.9109C1.71566 19.4777 2.69401 20.8948 3.92057 22.0794C5.10522 23.306 6.52229 24.2843 8.08909 24.9574C9.65589 25.6304 11.341 25.9847 13.0462 25.9995C14.7514 26.0143 16.4424 25.6894 18.0207 25.0437C19.599 24.398 21.0328 23.4444 22.2386 22.2386C23.4444 21.0328 24.398 19.599 25.0437 18.0207C25.6894 16.4424 26.0143 14.7514 25.9995 13.0462C25.9847 11.341 25.6304 9.65589 24.9574 8.08909C24.2843 6.52229 23.306 5.10522 22.0794 3.92057ZM20.2687 20.2687C18.589 21.9503 16.3782 22.9974 14.013 23.2318C11.6478 23.4661 9.27449 22.8731 7.29745 21.5539C5.32042 20.2346 3.86196 18.2707 3.17055 15.9967C2.47915 13.7227 2.59757 11.2793 3.50566 9.08285C4.41374 6.88638 6.05529 5.0727 8.15065 3.95083C10.246 2.82895 12.6655 2.46828 14.997 2.93027C17.3284 3.39226 19.4276 4.64833 20.9368 6.48446C22.446 8.3206 23.2719 10.6232 23.2738 13C23.2783 14.3501 23.0151 15.6877 22.4993 16.9353C21.9835 18.183 21.2253 19.316 20.2687 20.2687Z"
                      fill="#091422"
                    />
                  </svg>
                )}
                {currentIndex != 2 && (
                  <svg
                    className={style.button__open}
                    onClick={(e) => setCurrentIndex(2)}
                    width="22"
                    height="13"
                    viewBox="0 0 22 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21.3827 0.605178C20.9917 0.217565 20.4627 0 19.9114 0C19.36 0 18.8311 0.217565 18.44 0.605178L10.9478 7.9724L3.55995 0.605178C3.16893 0.217565 2.63998 0 2.08864 0C1.53729 0 1.00834 0.217565 0.617322 0.605178C0.421714 0.798647 0.266455 1.02882 0.160502 1.28243C0.0545492 1.53603 0 1.80805 0 2.08278C0 2.35752 0.0545492 2.62954 0.160502 2.88314C0.266455 3.13675 0.421714 3.36692 0.617322 3.56039L9.46608 12.3844C9.66009 12.5795 9.89091 12.7343 10.1452 12.8399C10.3995 12.9456 10.6723 13 10.9478 13C11.2233 13 11.4961 12.9456 11.7504 12.8399C12.0047 12.7343 12.2356 12.5795 12.4296 12.3844L21.3827 3.56039C21.5783 3.36692 21.7335 3.13675 21.8395 2.88314C21.9454 2.62954 22 2.35752 22 2.08278C22 1.80805 21.9454 1.53603 21.8395 1.28243C21.7335 1.02882 21.5783 0.798647 21.3827 0.605178Z"
                      fill="#091422"
                    />
                  </svg>
                )}
              </div>
              {currentIndex == 2 && (
                <p className={style.text}>
                  Je kan bijdragen aan DURF 2030 op verschillende manieren. Je
                  kan zelf een project starten, maar je kan ook andere projecten
                  steunen. Je kan meedenken in de vorm van feedback,
                  benodigheden leveren die gevraagd worden voor een project of
                  een donatie doen om het project te realiseren!
                </p>
              )}
            </div>
            <div className={style.faq__div}>
              <div className={style.faq__content}>
                <p
                  className={style.faq__text__bold}
                  onClick={(e) => setCurrentIndex(3)}
                >
                  Aan welke criteria moet mijn project voldoen?{" "}
                </p>
                {currentIndex == 3 && (
                  <svg
                    className={style.button__open}
                    onClick={(e) => setCurrentIndex("")}
                    width="26"
                    height="26"
                    viewBox="0 0 26 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.7645 8.23555C17.6451 8.11518 17.503 8.01964 17.3465 7.95444C17.19 7.88924 17.0222 7.85568 16.8527 7.85568C16.6831 7.85568 16.5153 7.88924 16.3588 7.95444C16.2023 8.01964 16.0602 8.11518 15.9409 8.23555L13 11.1892L10.0591 8.23555C9.81731 7.99372 9.48933 7.85787 9.14734 7.85787C8.80535 7.85787 8.47737 7.99372 8.23555 8.23555C7.99372 8.47737 7.85787 8.80535 7.85787 9.14734C7.85787 9.48933 7.99372 9.81731 8.23555 10.0591L11.1892 13L8.23555 15.9409C8.11518 16.0602 8.01964 16.2023 7.95444 16.3588C7.88924 16.5153 7.85568 16.6831 7.85568 16.8527C7.85568 17.0222 7.88924 17.19 7.95444 17.3465C8.01964 17.503 8.11518 17.6451 8.23555 17.7645C8.35493 17.8848 8.49697 17.9804 8.65346 18.0456C8.80995 18.1108 8.97781 18.1443 9.14734 18.1443C9.31687 18.1443 9.48473 18.1108 9.64122 18.0456C9.79772 17.9804 9.93975 17.8848 10.0591 17.7645L13 14.8107L15.9409 17.7645C16.0602 17.8848 16.2023 17.9804 16.3588 18.0456C16.5153 18.1108 16.6831 18.1443 16.8527 18.1443C17.0222 18.1443 17.19 18.1108 17.3465 18.0456C17.503 17.9804 17.6451 17.8848 17.7645 17.7645C17.8848 17.6451 17.9804 17.503 18.0456 17.3465C18.1108 17.19 18.1443 17.0222 18.1443 16.8527C18.1443 16.6831 18.1108 16.5153 18.0456 16.3588C17.9804 16.2023 17.8848 16.0602 17.7645 15.9409L14.8107 13L17.7645 10.0591C17.8848 9.93975 17.9804 9.79772 18.0456 9.64122C18.1108 9.48473 18.1443 9.31687 18.1443 9.14734C18.1443 8.97781 18.1108 8.80995 18.0456 8.65346C17.9804 8.49697 17.8848 8.35493 17.7645 8.23555ZM22.0794 3.92057C20.8948 2.69401 19.4777 1.71566 17.9109 1.04262C16.3441 0.36957 14.659 0.0153024 12.9538 0.000484879C11.2486 -0.0143327 9.55755 0.310597 7.97929 0.956313C6.40103 1.60203 4.96718 2.5556 3.76139 3.76139C2.5556 4.96718 1.60203 6.40103 0.956313 7.97929C0.310597 9.55755 -0.0143327 11.2486 0.000484879 12.9538C0.0153024 14.659 0.36957 16.3441 1.04262 17.9109C1.71566 19.4777 2.69401 20.8948 3.92057 22.0794C5.10522 23.306 6.52229 24.2843 8.08909 24.9574C9.65589 25.6304 11.341 25.9847 13.0462 25.9995C14.7514 26.0143 16.4424 25.6894 18.0207 25.0437C19.599 24.398 21.0328 23.4444 22.2386 22.2386C23.4444 21.0328 24.398 19.599 25.0437 18.0207C25.6894 16.4424 26.0143 14.7514 25.9995 13.0462C25.9847 11.341 25.6304 9.65589 24.9574 8.08909C24.2843 6.52229 23.306 5.10522 22.0794 3.92057ZM20.2687 20.2687C18.589 21.9503 16.3782 22.9974 14.013 23.2318C11.6478 23.4661 9.27449 22.8731 7.29745 21.5539C5.32042 20.2346 3.86196 18.2707 3.17055 15.9967C2.47915 13.7227 2.59757 11.2793 3.50566 9.08285C4.41374 6.88638 6.05529 5.0727 8.15065 3.95083C10.246 2.82895 12.6655 2.46828 14.997 2.93027C17.3284 3.39226 19.4276 4.64833 20.9368 6.48446C22.446 8.3206 23.2719 10.6232 23.2738 13C23.2783 14.3501 23.0151 15.6877 22.4993 16.9353C21.9835 18.183 21.2253 19.316 20.2687 20.2687Z"
                      fill="#091422"
                    />
                  </svg>
                )}
                {currentIndex != 3 && (
                  <svg
                    className={style.button__open}
                    onClick={(e) => setCurrentIndex(3)}
                    width="22"
                    height="13"
                    viewBox="0 0 22 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21.3827 0.605178C20.9917 0.217565 20.4627 0 19.9114 0C19.36 0 18.8311 0.217565 18.44 0.605178L10.9478 7.9724L3.55995 0.605178C3.16893 0.217565 2.63998 0 2.08864 0C1.53729 0 1.00834 0.217565 0.617322 0.605178C0.421714 0.798647 0.266455 1.02882 0.160502 1.28243C0.0545492 1.53603 0 1.80805 0 2.08278C0 2.35752 0.0545492 2.62954 0.160502 2.88314C0.266455 3.13675 0.421714 3.36692 0.617322 3.56039L9.46608 12.3844C9.66009 12.5795 9.89091 12.7343 10.1452 12.8399C10.3995 12.9456 10.6723 13 10.9478 13C11.2233 13 11.4961 12.9456 11.7504 12.8399C12.0047 12.7343 12.2356 12.5795 12.4296 12.3844L21.3827 3.56039C21.5783 3.36692 21.7335 3.13675 21.8395 2.88314C21.9454 2.62954 22 2.35752 22 2.08278C22 1.80805 21.9454 1.53603 21.8395 1.28243C21.7335 1.02882 21.5783 0.798647 21.3827 0.605178Z"
                      fill="#091422"
                    />
                  </svg>
                )}
              </div>
              {currentIndex == 3 && (
                <ul className={style.faq__ul}>
                  <li className={style.text}>
                    {" "}
                    1. Het project zorgt voor een positieve verandering op het
                    leven in een bepaalde buurt, in Stad Kortrijk of de regio.
                  </li>
                  <li className={style.text}>
                    2. Kunst of creativiteit zet je in als tool om de
                    maatschappelijke uitdaging aan te pakken.
                  </li>
                  <li className={style.text}>
                    3. Je betrekt anderen bij je project van actieve burgers tot
                    creatieve ondernemers, organisaties,...
                  </li>
                </ul>
              )}
            </div>
            <div className={style.faq__div}>
              <div className={style.faq__content}>
                <p
                  className={style.faq__text__bold}
                  onClick={(e) => setCurrentIndex(4)}
                >
                  Wat wordt van mij verwacht als ik een project start?
                </p>
                {currentIndex == 4 && (
                  <svg
                    className={style.button__open}
                    onClick={(e) => setCurrentIndex("")}
                    width="26"
                    height="26"
                    viewBox="0 0 26 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.7645 8.23555C17.6451 8.11518 17.503 8.01964 17.3465 7.95444C17.19 7.88924 17.0222 7.85568 16.8527 7.85568C16.6831 7.85568 16.5153 7.88924 16.3588 7.95444C16.2023 8.01964 16.0602 8.11518 15.9409 8.23555L13 11.1892L10.0591 8.23555C9.81731 7.99372 9.48933 7.85787 9.14734 7.85787C8.80535 7.85787 8.47737 7.99372 8.23555 8.23555C7.99372 8.47737 7.85787 8.80535 7.85787 9.14734C7.85787 9.48933 7.99372 9.81731 8.23555 10.0591L11.1892 13L8.23555 15.9409C8.11518 16.0602 8.01964 16.2023 7.95444 16.3588C7.88924 16.5153 7.85568 16.6831 7.85568 16.8527C7.85568 17.0222 7.88924 17.19 7.95444 17.3465C8.01964 17.503 8.11518 17.6451 8.23555 17.7645C8.35493 17.8848 8.49697 17.9804 8.65346 18.0456C8.80995 18.1108 8.97781 18.1443 9.14734 18.1443C9.31687 18.1443 9.48473 18.1108 9.64122 18.0456C9.79772 17.9804 9.93975 17.8848 10.0591 17.7645L13 14.8107L15.9409 17.7645C16.0602 17.8848 16.2023 17.9804 16.3588 18.0456C16.5153 18.1108 16.6831 18.1443 16.8527 18.1443C17.0222 18.1443 17.19 18.1108 17.3465 18.0456C17.503 17.9804 17.6451 17.8848 17.7645 17.7645C17.8848 17.6451 17.9804 17.503 18.0456 17.3465C18.1108 17.19 18.1443 17.0222 18.1443 16.8527C18.1443 16.6831 18.1108 16.5153 18.0456 16.3588C17.9804 16.2023 17.8848 16.0602 17.7645 15.9409L14.8107 13L17.7645 10.0591C17.8848 9.93975 17.9804 9.79772 18.0456 9.64122C18.1108 9.48473 18.1443 9.31687 18.1443 9.14734C18.1443 8.97781 18.1108 8.80995 18.0456 8.65346C17.9804 8.49697 17.8848 8.35493 17.7645 8.23555ZM22.0794 3.92057C20.8948 2.69401 19.4777 1.71566 17.9109 1.04262C16.3441 0.36957 14.659 0.0153024 12.9538 0.000484879C11.2486 -0.0143327 9.55755 0.310597 7.97929 0.956313C6.40103 1.60203 4.96718 2.5556 3.76139 3.76139C2.5556 4.96718 1.60203 6.40103 0.956313 7.97929C0.310597 9.55755 -0.0143327 11.2486 0.000484879 12.9538C0.0153024 14.659 0.36957 16.3441 1.04262 17.9109C1.71566 19.4777 2.69401 20.8948 3.92057 22.0794C5.10522 23.306 6.52229 24.2843 8.08909 24.9574C9.65589 25.6304 11.341 25.9847 13.0462 25.9995C14.7514 26.0143 16.4424 25.6894 18.0207 25.0437C19.599 24.398 21.0328 23.4444 22.2386 22.2386C23.4444 21.0328 24.398 19.599 25.0437 18.0207C25.6894 16.4424 26.0143 14.7514 25.9995 13.0462C25.9847 11.341 25.6304 9.65589 24.9574 8.08909C24.2843 6.52229 23.306 5.10522 22.0794 3.92057ZM20.2687 20.2687C18.589 21.9503 16.3782 22.9974 14.013 23.2318C11.6478 23.4661 9.27449 22.8731 7.29745 21.5539C5.32042 20.2346 3.86196 18.2707 3.17055 15.9967C2.47915 13.7227 2.59757 11.2793 3.50566 9.08285C4.41374 6.88638 6.05529 5.0727 8.15065 3.95083C10.246 2.82895 12.6655 2.46828 14.997 2.93027C17.3284 3.39226 19.4276 4.64833 20.9368 6.48446C22.446 8.3206 23.2719 10.6232 23.2738 13C23.2783 14.3501 23.0151 15.6877 22.4993 16.9353C21.9835 18.183 21.2253 19.316 20.2687 20.2687Z"
                      fill="#091422"
                    />
                  </svg>
                )}
                {currentIndex != 4 && (
                  <svg
                    className={style.button__open}
                    onClick={(e) => setCurrentIndex(4)}
                    width="22"
                    height="13"
                    viewBox="0 0 22 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21.3827 0.605178C20.9917 0.217565 20.4627 0 19.9114 0C19.36 0 18.8311 0.217565 18.44 0.605178L10.9478 7.9724L3.55995 0.605178C3.16893 0.217565 2.63998 0 2.08864 0C1.53729 0 1.00834 0.217565 0.617322 0.605178C0.421714 0.798647 0.266455 1.02882 0.160502 1.28243C0.0545492 1.53603 0 1.80805 0 2.08278C0 2.35752 0.0545492 2.62954 0.160502 2.88314C0.266455 3.13675 0.421714 3.36692 0.617322 3.56039L9.46608 12.3844C9.66009 12.5795 9.89091 12.7343 10.1452 12.8399C10.3995 12.9456 10.6723 13 10.9478 13C11.2233 13 11.4961 12.9456 11.7504 12.8399C12.0047 12.7343 12.2356 12.5795 12.4296 12.3844L21.3827 3.56039C21.5783 3.36692 21.7335 3.13675 21.8395 2.88314C21.9454 2.62954 22 2.35752 22 2.08278C22 1.80805 21.9454 1.53603 21.8395 1.28243C21.7335 1.02882 21.5783 0.798647 21.3827 0.605178Z"
                      fill="#091422"
                    />
                  </svg>
                )}
              </div>
              {currentIndex == 4 && (
                <ul className={style.faq__ul}>
                  <li className={style.text}>
                    1. Je zet je idee om naar een concreet uitgewerkt plan van
                    aanpak en voert het project samen met je partners zelf uit.
                  </li>
                  <li className={style.text}>
                    2. Je brengt je project op één of andere manier in beeld
                    zodat de impact ervan zichtbaar wordt. 
                  </li>
                </ul>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default withApollo({ ssr: false })(About);
