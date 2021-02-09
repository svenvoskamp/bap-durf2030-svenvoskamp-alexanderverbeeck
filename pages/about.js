import React, { useState, useRef, useEffect } from 'react';
import { useFetchUser } from '../lib/user';
import { withApollo } from '../lib/withApollo';
import Nav from '../components/Nav';
import Mouse from '../components/Mouse';
import style from '../css/about.module.css';

const About = () => {
  const { user, loading } = useFetchUser();
  const scrollRef = useRef();
  const [currentIndex, setCurrentIndex] = useState('');

  useEffect(() => {
    import('locomotive-scroll').then((locomotiveModule) => {
      const lscroll = new locomotiveModule.default({
        el: scrollRef.current,
        smooth: true,
        direction: 'vertical',
      });
    });
  }, []);

  const onScroll = () => {
    const div = document.getElementsByTagName('html');
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
    window.addEventListener('wheel', onScroll);
  }, []);

  return (
    <>
      <Mouse></Mouse>
      <Nav user={user}></Nav>
      <main ref={scrollRef}>
        <section className={style.part}>
          <div>
            <h1 className={style.title}>
              Durf.
              <span className={style.title_outline}>wat?</span>
            </h1>
            <p className={style.title_description}>
              Lees hier alles over wat DURF2030 is en wat ons doel is.{' '}
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
                geheel. Zo maken wij het verschil.{' '}
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
          <h1 className={`${style.title} faq`} data-scroll data-scroll-repeat>
            Durf.
            <span className={style.title_outline}>Faq.</span>
          </h1>
          <p className={style.title_description}>
            Antwoord op de meest gestelde vragen.
          </p>
          <div>
            <div className={style.faq__div}>
              <div className={style.faq__content}>
                <p className={style.faq__text__bold}>
                  Wat is het doel van durf?{' '}
                </p>
                {currentIndex == 1 && (
                  <img
                    className={style.button__open}
                    src="./assets/about/close.svg"
                    alt="close"
                    onClick={(e) => setCurrentIndex('')}
                  />
                )}
                {currentIndex != 1 && (
                  <img
                    className={style.button__open}
                    src="./assets/about/open.svg"
                    alt="close"
                    onClick={(e) => setCurrentIndex(1)}
                  />
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
                <p className={style.faq__text__bold}>Hoe kan ik bijdragen? </p>
                {currentIndex == 2 && (
                  <img
                    className={style.button__open}
                    src="./assets/about/close.svg"
                    alt="close"
                    onClick={(e) => setCurrentIndex('')}
                  />
                )}
                {currentIndex != 2 && (
                  <img
                    className={style.button__open}
                    src="./assets/about/open.svg"
                    alt="close"
                    onClick={(e) => setCurrentIndex(2)}
                  />
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
                <p className={style.faq__text__bold}>
                  Aan welke criteria moet mijn project voldoen?{' '}
                </p>
                {currentIndex == 3 && (
                  <img
                    className={style.button__open}
                    src="./assets/about/close.svg"
                    alt="close"
                    onClick={(e) => setCurrentIndex('')}
                  />
                )}
                {currentIndex != 3 && (
                  <img
                    className={style.button__open}
                    src="./assets/about/open.svg"
                    alt="close"
                    onClick={(e) => setCurrentIndex(3)}
                  />
                )}
              </div>
              {currentIndex == 3 && (
                <ul className={style.faq__ul}>
                  <li className={style.text}>
                    {' '}
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
                <p className={style.faq__text__bold}>
                  Wat wordt van mij verwacht als ik een project start?
                </p>
                {currentIndex == 4 && (
                  <img
                    className={style.button__open}
                    src="./assets/about/close.svg"
                    alt="close"
                    onClick={(e) => setCurrentIndex('')}
                  />
                )}
                {currentIndex != 4 && (
                  <img
                    className={style.button__open}
                    src="./assets/about/open.svg"
                    alt="close"
                    onClick={(e) => setCurrentIndex(4)}
                  />
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
