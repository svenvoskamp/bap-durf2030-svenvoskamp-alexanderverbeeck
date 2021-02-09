import React, { useState } from 'react';
import { useFetchUser } from '../lib/user';
import { withApollo } from '../lib/withApollo';
import Nav from '../components/Nav';
import Mouse from '../components/Mouse';
import style from '../css/about.module.css';

const About = () => {
  const { user, loading } = useFetchUser();
  const [currentIndex, setCurrentIndex] = useState('');
  return (
    <>
      <Mouse></Mouse>
      {/* <Nav user={user}></Nav> */}
      <main>
        <section>
          <div>
            <p>Durf.</p>
            <p>Wat?</p>
            <p>Lees hier alles over wat DURF2030 is en wat ons doel is. </p>
          </div>
          <div>
            <div>
              <p>
                Wij als inwoners, ondernemers, jongeren, (hoge) scholen,
                kunstenaars, verbinders en veranderaars met een creatieve
                mindset willen hier een antwoord op bieden. DURF 2030 is een
                platform waarbinnen we jou willen betrekken om de krachten te
                bundelen voor een veerkrachtige regio.
              </p>
              <p>
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
            <img src="" alt="" />
          </div>
        </section>
        <section>
          <div>
            <p>Durf.</p>
            <p>Faq?</p>
            <p>Antwoord op de meest gestelde vragen.</p>
          </div>
          <div>
            <div>
              <div>
                <p>Wat is het doel van durf? </p>
                {currentIndex == 1 && (
                  <button onClick={(e) => setCurrentIndex('')}>
                    X
                  </button> /* IK HEB BUTTONS GEBRUIKT MAAR DIT MOETEN IMG WORDEN DENK IK */
                )}
                {currentIndex == '' && (
                  <button onClick={(e) => setCurrentIndex(1)}>V</button>
                )}
              </div>
              {currentIndex == 1 && (
                <p>
                  DURF 2030 heeft als doel om in 2030 culturele hoofdstad te
                  worden van Europa. In 2024 moeten wij ons hier voor kandidaat
                  stellen. Tegen die tijd willen wij 2030 projecten voorzien die
                  een positieve uitkomst hebben op de gemeente Kortrijk.
                </p>
              )}
            </div>
            <div>
              <div>
                <p>Hoe kan ik bijdragen? </p>
                {currentIndex == 2 && (
                  <button onClick={(e) => setCurrentIndex('')}>X</button>
                )}
                {currentIndex == '' && (
                  <button onClick={(e) => setCurrentIndex(2)}>V</button>
                )}
              </div>
              {currentIndex == 2 && (
                <p>
                  Je kan bijdragen aan DURF 2030 op verschillende manieren. Je
                  kan zelf een project starten, maar je kan ook andere projecten
                  steunen. Je kan meedenken in de vorm van feedback,
                  benodigheden leveren die gevraagd worden voor een project of
                  een donatie doen om het project te realiseren!
                </p>
              )}
            </div>
            <div>
              <div>
                <p>Aan welke criteria moet mijn project voldoen? </p>
                {currentIndex == 3 && (
                  <button onClick={(e) => setCurrentIndex('')}>X</button>
                )}
                {currentIndex == '' && (
                  <button onClick={(e) => setCurrentIndex(3)}>V</button>
                )}
              </div>
              {currentIndex == 3 && (
                <ul>
                  <li>
                    Het project zorgt voor een positieve verandering op het
                    leven in een bepaalde buurt, in Stad Kortrijk of de regio.
                  </li>
                  <li>
                    Kunst of creativiteit zet je in als tool om de
                    maatschappelijke uitdaging aan te pakken.
                  </li>
                  <li>
                    Je betrekt anderen bij je project van actieve burgers tot
                    creatieve ondernemers, organisaties,...
                  </li>
                </ul>
              )}
            </div>
            <div>
              <div>
                <p>Wat wordt van mij verwacht als ik een project start?</p>
                {currentIndex == 4 && (
                  <button onClick={(e) => setCurrentIndex('')}>X</button>
                )}
                {currentIndex == '' && (
                  <button onClick={(e) => setCurrentIndex(4)}>V</button>
                )}
              </div>
              {currentIndex == 4 && (
                <ul>
                  <li>
                    Je zet je idee om naar een concreet uitgewerkt plan van
                    aanpak en voert het project samen met je partners zelf uit.
                  </li>
                  <li>
                    Je brengt je project op één of andere manier in beeld zodat
                    de impact ervan zichtbaar wordt. 
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

export default withApollo({ ssr: true })(About);
