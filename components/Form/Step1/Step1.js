import React, { useRef, useEffect } from 'react';
import style from './step1.module.css';
import Mouse from '../../../components/Mouse';
import Empty from '../../Empty/Empty';

const Step1 = ({
  company,
  setCompany,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  sector,
  setSector,
  companyName,
  setCompanyName,
  department,
  setDepartment,
  setCurrentIndex,
}) => {
  const refWho = useRef();
  const refFirstName = useRef();
  const refLastName = useRef();
  const refSectorOne = useRef();
  const refCompanyName = useRef();
  const refDepartment = useRef();
  const refSectorTwo = useRef();

  const handleIndividuClick = (e) => {
    console.log(sector);
    e.preventDefault();
    if (company == 'not') {
      refWho.current.innerHTML = `Gelieve een keus te maken`;
    } else {
      refWho.current.innerHTML = ``;
    }
    if (firstName == '') {
      refFirstName.current.innerHTML = `Gelieve een voornaam in te vullen`;
    } else {
      refFirstName.current.innerHTML = ``;
    }
    if (lastName == '') {
      refLastName.current.innerHTML = `Gelieve een achternaam in te vullen`;
    } else {
      refLastName.current.innerHTML = ``;
    }
    if (sector == '') {
      refSectorOne.current.innerHTML = `Gelieve een sector te selecteren`;
    } else {
      refSectorOne.current.innerHTML = ``;
    }
    if (firstName !== '' && lastName !== '' && sector !== '') {
      setCurrentIndex(1);
    }
  };

  const handleCompanyClick = (e) => {
    e.preventDefault();
    if (company == 'not') {
      refWho.current.innerHTML = `Gelieve een keus te maken`;
    } else {
      refWho.current.innerHTML = ``;
    }
    if (companyName == '') {
      refCompanyName.current.innerHTML = `Gelieve een bedrijfsnaam in te vullen`;
    } else {
      refCompanyName.current.innerHTML = ``;
    }
    if (department == '') {
      refDepartment.current.innerHTML = `Gelieve een afdeling in te vullen`;
    } else {
      refDepartment.current.innerHTML = ``;
    }
    if (sector == '') {
      refSectorTwo.current.innerHTML = `Gelieve een sector te selecteren`;
    } else {
      refSectorTwo.current.innerHTML = ``;
    }
    if (companyName !== '' && department !== '' && sector !== '') {
      setCurrentIndex(1);
    }
  };
  return (
    <>
      <Mouse></Mouse>

      <article className={style.part}>
        <div className={style.part_header}>
          <h1 className={style.title}>
            Registreer.
            <span className={style.title_outline}>Wie?</span>
          </h1>
          <p className={style.title_description}>
            Kies hoe je je wilt registreren als durver.
          </p>
          <p className={style.error} ref={refWho}></p>
        </div>
        <div className={style.part_content}>
          <div className={style.individu}>
            <label className={style.form_individu} htmlFor="individu">
              <input
                className={style.checkbox}
                id="individu"
                type="radio"
                value="0"
                name="type"
                onClick={(e) => setCompany(false)}
              />
              <div className={`${style.individu_image} scale`}>
                <svg
                  width="68"
                  height="68"
                  viewBox="0 0 68 68"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M24.8 44.2V43.2H23.8C23.1635 43.2 22.553 42.9471 22.103 42.497C21.6529 42.047 21.4 41.4365 21.4 40.8C21.4 40.1635 21.6529 39.553 22.103 39.1029C22.553 38.6528 23.1635 38.4 23.8 38.4H44.2C44.8365 38.4 45.447 38.6528 45.8971 39.1029C46.3471 39.553 46.6 40.1635 46.6 40.8C46.6 41.4365 46.3471 42.047 45.8971 42.497C45.447 42.9471 44.8365 43.2 44.2 43.2H43.2V44.2C43.2 46.64 42.2307 48.98 40.5054 50.7054C38.7801 52.4307 36.44 53.4 34 53.4C31.56 53.4 29.22 52.4307 27.4946 50.7054C25.7693 48.98 24.8 46.64 24.8 44.2ZM30.6 43.2H29.6V44.2C29.6 45.3669 30.0636 46.4861 30.8887 47.3113C31.7139 48.1364 32.8331 48.6 34 48.6C35.167 48.6 36.2861 48.1364 37.1113 47.3113C37.9364 46.4861 38.4 45.3669 38.4 44.2V43.2H37.4H30.6ZM15.6662 6.5615C21.093 2.93542 27.4732 1 34 1C38.3336 1 42.6248 1.85357 46.6286 3.51198C50.6323 5.17038 54.2702 7.60114 57.3345 10.6655C60.3989 13.7298 62.8296 17.3677 64.488 21.3714C66.1464 25.3752 67 29.6664 67 34C67 40.5268 65.0646 46.907 61.4385 52.3338C57.8124 57.7606 52.6585 61.9903 46.6286 64.488C40.5986 66.9857 33.9634 67.6392 27.562 66.3659C21.1607 65.0926 15.2806 61.9496 10.6655 57.3345C6.05036 52.7194 2.90741 46.8393 1.6341 40.438C0.360789 34.0366 1.0143 27.4014 3.51199 21.3714C6.00968 15.3415 10.2394 10.1876 15.6662 6.5615ZM18.3329 57.4474C22.9704 60.5461 28.4226 62.2 34 62.2C41.4791 62.2 48.6519 59.2289 53.9404 53.9404C59.2289 48.6519 62.2 41.4791 62.2 34C62.2 28.4226 60.5461 22.9704 57.4474 18.3329C54.3488 13.6954 49.9446 10.081 44.7917 7.9466C39.6388 5.81221 33.9687 5.25375 28.4985 6.34185C23.0282 7.42996 18.0034 10.1157 14.0596 14.0596C10.1158 18.0034 7.42997 23.0282 6.34187 28.4984C5.25377 33.9687 5.81222 39.6388 7.94661 44.7917C10.081 49.9445 13.6955 54.3488 18.3329 57.4474ZM45.9 22.3665C48.321 22.3665 50.6498 23.2935 52.4084 24.9567C52.8494 25.4054 53.0967 26.0095 53.0967 26.639C53.0967 27.272 52.8466 27.8793 52.401 28.3288C51.9515 28.7745 51.3441 29.0247 50.711 29.0247C50.078 29.0247 49.4706 28.7746 49.0211 28.3289C48.6127 27.9179 48.1271 27.5915 47.5921 27.3687C47.056 27.1453 46.4809 27.0303 45.9 27.0303C45.3192 27.0303 44.744 27.1453 44.2079 27.3687C43.6861 27.5861 43.2112 27.9019 42.8091 28.2988C42.3539 28.6774 41.7743 28.8746 41.1818 28.8518C40.5778 28.8284 40.0048 28.578 39.5774 28.1506C39.15 27.7232 38.8996 27.1502 38.8762 26.5462C38.8535 25.9584 39.0475 25.3833 39.4203 24.9297C41.1756 23.2835 43.4922 22.3665 45.9 22.3665ZM25.1334 29.1955C24.7387 29.4592 24.2747 29.6 23.8 29.6C23.1635 29.6 22.553 29.3471 22.103 28.897C21.6529 28.447 21.4 27.8365 21.4 27.2C21.4 26.7253 21.5408 26.2613 21.8045 25.8666C22.0682 25.4719 22.443 25.1643 22.8816 24.9827C23.3201 24.801 23.8027 24.7535 24.2682 24.8461C24.7338 24.9387 25.1614 25.1673 25.4971 25.5029C25.8327 25.8386 26.0613 26.2662 26.1539 26.7318C26.2465 27.1973 26.199 27.6799 26.0173 28.1184C25.8357 28.557 25.5281 28.9318 25.1334 29.1955Z"
                    fill="#091422"
                    stroke="#FDECD2"
                    stroke-width="2"
                  />
                </svg>
              </div>
              <p className={style.checkbox_text}>Individu</p>
            </label>
          </div>
          <div className={style.company}>
            <label className={style.form_company} htmlFor="company">
              <input
                className={style.checkbox}
                id="company"
                type="radio"
                value="1"
                name="type"
                onClick={(e) => setCompany(true)}
              />
              <div className={`${style.company_image} scale`}>
                <svg
                  width="76"
                  height="70"
                  viewBox="0 0 76 70"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.90909 27.37V26.666L7.24631 26.4286C5.42681 25.7768 3.84853 24.57 2.72938 22.9713C1.61037 21.3727 1.00572 19.4611 1 17.4986V3.5C1 2.83277 1.26174 2.19546 1.72353 1.7276C2.18488 1.26017 2.80781 1 3.45455 1H72.5455C73.1922 1 73.8151 1.26017 74.2765 1.72759L74.9882 1.02513L74.2765 1.7276C74.7383 2.19546 75 2.83277 75 3.5L75 17.4972C75 17.4981 75 17.499 75 17.4998C74.994 19.462 74.3894 21.373 73.2706 22.9713C72.1515 24.57 70.5732 25.7768 68.7537 26.4286L68.0909 26.666V27.37V66.5C68.0909 67.1672 67.8292 67.8045 67.3674 68.2724C66.906 68.7398 66.2831 69 65.6364 69H10.3636C9.7169 69 9.09397 68.7398 8.63262 68.2724C8.17083 67.8045 7.90909 67.1672 7.90909 66.5V27.37ZM48.3636 6H47.3636V7V17.5C47.3636 18.6893 47.8298 19.8325 48.6637 20.6773C49.4981 21.5227 50.6325 22 51.8182 22C53.0039 22 54.1383 21.5227 54.9726 20.6773C55.8065 19.8325 56.2727 18.6893 56.2727 17.5V7V6H55.2727H48.3636ZM34.5455 6H33.5455V7V17.5C33.5455 18.6893 34.0116 19.8325 34.8456 20.6773C35.6799 21.5227 36.8143 22 38 22C39.1857 22 40.3201 21.5227 41.1544 20.6773C41.9884 19.8325 42.4545 18.6893 42.4545 17.5V7V6H41.4545H34.5455ZM20.7273 6H19.7273V7V17.5C19.7273 18.6893 20.1935 19.8325 21.0274 20.6773C21.8617 21.5227 22.9961 22 24.1818 22C25.3675 22 26.5019 21.5227 27.3363 20.6773C28.1702 19.8325 28.6364 18.6893 28.6364 17.5V7V6H27.6364H20.7273ZM6.90909 6H5.90909V7V17.5C5.90909 18.6893 6.37527 19.8325 7.20919 20.6773C8.04354 21.5227 9.17797 22 10.3636 22C11.5493 22 12.6837 21.5227 13.5181 20.6773C14.352 19.8325 14.8182 18.6893 14.8182 17.5V7V6H13.8182H6.90909ZM44.9091 64H45.9091V63V49C45.9091 46.8825 45.0789 44.849 43.5972 43.3478C42.115 41.8461 40.1019 41 38 41C35.8981 41 33.885 41.8461 32.4028 43.3478C30.9211 44.849 30.0909 46.8825 30.0909 49V63V64H31.0909H44.9091ZM62.1818 64H63.1818V63V27.37V26.6777L62.5338 26.434C61.381 26.0005 60.3168 25.3537 59.3956 24.5261L58.7244 23.9231L58.0558 24.529C56.3384 26.0852 54.1176 26.9438 51.8182 26.9438C49.5188 26.9438 47.2979 26.0852 45.5806 24.529L44.9091 23.9205L44.2376 24.529C42.5203 26.0852 40.2994 26.9438 38 26.9438C35.7006 26.9438 33.4797 26.0852 31.7624 24.529L31.0909 23.9205L30.4194 24.529C28.7021 26.0852 26.4812 26.9438 24.1818 26.9438C21.8824 26.9438 19.6616 26.0852 17.9442 24.529L17.2756 23.9231L16.6044 24.5261C15.6832 25.3537 14.619 26.0005 13.4662 26.434L12.8182 26.6777V27.37V63V64H13.8182H24.1818H25.1818V63V49C25.1818 45.548 26.5354 42.24 28.9408 39.803C31.3457 37.3664 34.6047 36 38 36C41.3953 36 44.6543 37.3664 47.0592 39.803C49.4646 42.24 50.8182 45.548 50.8182 49V63V64H51.8182H62.1818ZM62.1818 6H61.1818V7V17.5C61.1818 18.6893 61.648 19.8325 62.4819 20.6773C63.3163 21.5227 64.4507 22 65.6364 22C66.822 22 67.9565 21.5227 68.7908 20.6773L68.0791 19.9749L68.7908 20.6773C69.6247 19.8325 70.0909 18.6893 70.0909 17.5V7V6H69.0909H62.1818Z"
                    fill="#091422"
                    stroke="#FDECD2"
                    stroke-width="2"
                  />
                </svg>
              </div>
              <p className={style.checkbox_text}>Bedrijf/Organisatie</p>
            </label>
          </div>
          {company == 'not' && (
            <>
              <div className={style.empty}>
                <Empty props={'emptyoption'} />
              </div>
            </>
          )}
          {company == false && (
            <>
              <div className={style.form}>
                <h2 className={style.subtitle}>Accountgegevens</h2>
                <div className={style.input_container}>
                  <div className={style.input_label}>
                    <label htmlFor="firstName" className={style.label}>
                      Voornaam
                    </label>
                    <p className={style.error} ref={refFirstName}></p>
                  </div>
                  <input
                    required
                    id="firstName"
                    min="0"
                    max="100"
                    value={firstName}
                    type="text"
                    placeholder="Alex"
                    onChange={(e) => setFirstName(e.currentTarget.value)}
                    className={style.input}
                  />
                </div>
                <div className={style.input_container}>
                  <div className={style.input_label}>
                    <label htmlFor="lastName" className={style.label}>
                      Achternaam
                    </label>
                    <p className={style.error} ref={refLastName}></p>
                  </div>
                  <input
                    required
                    id="lastName"
                    min="0"
                    max="100"
                    value={lastName}
                    type="text"
                    placeholder="Verbeeck"
                    onChange={(e) => setLastName(e.currentTarget.value)}
                    className={style.input}
                  />
                </div>
                <div className={style.input_container}>
                  <div className={style.input_label}>
                    <label for="sectors" className={style.label}>
                      U bent werkzaam in de sector:{' '}
                    </label>
                    <p className={style.error} ref={refSectorOne}></p>
                  </div>
                  <select
                    name="sectors"
                    id="sectors"
                    onChange={(e) => setSector(e.currentTarget.value)}
                    className={style.input}
                    required
                  >
                    <option value="">Seleteer een sector</option>
                    <option value="Niet werkzaam">Niet werkzaam</option>
                    <option value="Ambachten">Ambachten</option>
                    <option value="Bouw">Bouw</option>
                    <option value="Dans">Dans</option>
                    <option value="Design">Design</option>
                    <option value="Farmaceutica">Farmaceutica</option>
                    <option value="Film en Video">Film en video</option>
                    <option value="Financiën">Financiën</option>
                    <option value="Fotografie">Fotografie</option>
                    <option value="Horeca">Horeca</option>
                    <option value="Games">Games</option>
                    <option value="Journalistiek">Journalistiek</option>
                    <option value="Kunst">Kunst</option>
                    <option value="Kleding">Kleding</option>
                    <option value="Landbouw">Landbouw</option>
                    <option value="Muziek">Muziek</option>
                    <option value="Onderwijs">Onderwijs</option>
                    <option value="Publicatie">Publicatie</option>
                    <option value="Sociaal-Cultureel">Sociaal-Cultureel</option>
                    <option value="Sport">Sport</option>
                    <option value="Technologie">Technologie</option>
                    <option value="Theater">Theater</option>
                    <option value="Verzekering">Verzekering</option>
                    <option value="Voeding">Voeding</option>
                    <option value="Zorg">Zorg</option>
                    <option value="Overig">Overig</option>
                  </select>
                </div>
              </div>
            </>
          )}
          {company == true && (
            <>
              <div className={style.form}>
                <h2 className={style.subtitle}>Bedrijfsgegevens</h2>
                <div className={style.input_container}>
                  <div className={style.input_label}>
                    <label htmlFor="companyName" className={style.label}>
                      Bedrijfsnaam:
                    </label>
                    <p className={style.error} ref={refCompanyName}></p>
                  </div>
                  <input
                    required
                    id="companyName"
                    min="0"
                    max="100"
                    value={companyName}
                    type="text"
                    placeholder="Devine"
                    onChange={(e) => setCompanyName(e.currentTarget.value)}
                    className={style.input}
                  />
                </div>
                <div className={style.input_container}>
                  <div className={style.input_label}>
                    <label htmlFor="department" className={style.label}>
                      Bedrijfsafdeling:
                    </label>
                    <p className={style.error} ref={refDepartment}></p>
                  </div>
                  <input
                    required
                    id="department"
                    min="0"
                    max="100"
                    value={department}
                    type="text"
                    placeholder="Developer"
                    onChange={(e) => setDepartment(e.currentTarget.value)}
                    className={style.input}
                  />
                </div>
                <div className={style.input_container}>
                  <div className={style.input_label}>
                    <label for="sectors" className={style.label}>
                      Bedrijfssector{' '}
                    </label>
                    <p className={style.error} ref={refSectorTwo}></p>
                  </div>
                  <select
                    name="sectors"
                    id="sectors"
                    required
                    onChange={(e) => setSector(e.currentTarget.value)}
                    className={style.input}
                  >
                    <option value="">Seleteer een sector</option>
                    <option value="Ambachten">Ambachten</option>
                    <option value="Bouw">Bouw</option>
                    <option value="Dans">Dans</option>
                    <option value="Design">Design</option>
                    <option value="Farmaceutica">Farmaceutica</option>
                    <option value="Film en Video">Film en video</option>
                    <option value="Financiën">Financiën</option>
                    <option value="Fotografie">Fotografie</option>
                    <option value="Horeca">Horeca</option>
                    <option value="Games">Games</option>
                    <option value="Journalistiek">Journalistiek</option>
                    <option value="Kunst">Kunst</option>
                    <option value="Kleding">Kleding</option>
                    <option value="Landbouw">Landbouw</option>
                    <option value="Muziek">Muziek</option>
                    <option value="Onderwijs">Onderwijs</option>
                    <option value="Publicatie">Publicatie</option>
                    <option value="Sociaal-Cultureel">Sociaal-Cultureel</option>
                    <option value="Sport">Sport</option>
                    <option value="Technologie">Technologie</option>
                    <option value="Theater">Theater</option>
                    <option value="Verzekering">Verzekering</option>
                    <option value="Voeding">Voeding</option>
                    <option value="Zorg">Zorg</option>
                    <option value="Overig">Overig</option>
                  </select>
                </div>
              </div>
            </>
          )}
        </div>
        {company == true && (
          <>
            <div className={style.part_end}>
              <div className={style.button_next}>
                <button
                  onClick={handleCompanyClick}
                  className={`${style.button} scale`}
                >
                  <div className={style.circle_button}>
                    <img
                      className={style.button_image}
                      src="./assets/images/account_aanmaken.svg"
                    />
                  </div>
                </button>
              </div>
            </div>
          </>
        )}
        {company == false && (
          <>
            <div className={style.part_end}>
              <div className={style.button_next}>
                <button
                  onClick={handleIndividuClick}
                  className={`${style.button} scale`}
                >
                  <div className={style.circle_button}>
                    <img
                      className={style.button_image}
                      src="./assets/images/account_aanmaken.svg"
                    />
                  </div>
                </button>
              </div>
            </div>
          </>
        )}

        {company == 'not' && (
          <>
            <div className={style.part_end}>
              <div className={style.button_next}></div>
            </div>
          </>
        )}
      </article>
    </>
  );
};

export default Step1;
