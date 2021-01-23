import React, { useRef, useEffect } from 'react';
import style from "./step1.module.css";

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
  const handleIndividuClick = (e) => {
    e.preventDefault();
    if (firstName !== '' && lastName !== '' && sector !== '') {
      setCurrentIndex(1);
    }
  };

  const handleCompanyClick = (e) => {
    e.preventDefault();
    if (companyName !== '' && department !== '' && sector !== '') {
      setCurrentIndex(1);
    }
  };
  return (
    <>
    <article className={style.part}>
      <div className={style.part_header}>
        <h1 className={style.title}>Registreer
          <span className={style.title_outline}>Wie?</span>
        </h1>
        <p className={style.title_description}>Kies hoe je je wilt registreren als durver.</p>
      </div>
      <div className={style.part_content}>
        <div className={style.form_individu}>
          <label htmlFor = "individu">
            <input className={style.checkbox}  defaultChecked id = "individu" type = "radio" value = "0" name = "type" onClick={(e) => setCompany(false)}/>
            <p className={style.checkbox_text}>Individu</p>
          </label>
        </div>
        <div className={style.form_company}>
          <label htmlFor = "company">
            <input className={style.checkbox}  id = "company" type = "radio" value = "1" name = "type" onClick={(e) => setCompany(true)}/>
            <p className={style.checkbox_text}>Bedrijf/Organisatie</p>
          </label>
        </div>
      {company == false && (
        <>
        <div className={style.form}>
          <h2 className={style.subtitle}>Accountgegevens</h2>
          <div className={style.input_container}>
            <label htmlFor="firstName" className={style.label}>Voornaam</label>
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
            <label htmlFor="lastName" className={style.label}>Achternaam</label>
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
            <label for="sectors" className={style.label}>U bent werkzaam in de sector: </label>
              <select
                name="sectors"
                id="sectors"
                onChange={(e) => setSector(e.currentTarget.value)}
                className={style.input}
                required
              >
                <option value="Niet werkzaam">Niet werkzaam</option>
                <option value="Ambachten">Ambachten</option>
                <option value="Dans">Dans</option>
                <option value="Design">Design</option>
                <option value="Film en Video">Film en video</option>
                <option value="Fotografie">Fotografie</option>
                <option value="Games">Games</option>
                <option value="Journalistiek">Journalistiek</option>
                <option value="Kunst">Kunst</option>
                <option value="Mode">Mode</option>
                <option value="Muziek">Muziek</option>
                <option value="Publicatie">Publicatie</option>
                <option value="Technologie">Technologie</option>
                <option value="Theater">Theater</option>
                <option value="Voeding">Voeding</option>
                <option value="Overig">Overig</option>
              </select>
          </div>
        </div>
        <div className={style.part_end}>
          <div>
            <button onClick={handleIndividuClick} className={style.button}>
              <div className={style.circle_button}>
              <img className={style.button_image}
                src="./assets/images/account_aanmaken.svg"
              />
              </div>
            </button>
          </div>
        </div>
        </>
      )}
      {company == true && (
        <>
          <div className={style.form}>
            <h2 className={style.subtitle}>Bedrijfsgegevens</h2>
            <div className={style.input_container}>
              <label htmlFor="companyName">Bedrijfsnaam:</label>
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
              <label htmlFor="department">Bedrijfsafdeling:</label>
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
              <label for="sectors">Bedrijfssector </label>
              <select
                name="sectors"
                id="sectors"
                required
                onChange={(e) => setSector(e.currentTarget.value)}
                            className={style.input}
              >
                <option value="Ambachten">Ambachten</option>
                <option value="Dans">Dans</option>
                <option value="Design">Design</option>
                <option value="Film en Video">Film en video</option>
                <option value="Fotografie">Fotografie</option>
                <option value="Games">Games</option>
                <option value="Journalistiek">Journalistiek</option>
                <option value="Kunst">Kunst</option>
                <option value="Mode">Mode</option>
                <option value="Muziek">Muziek</option>
                <option value="Publicatie">Publicatie</option>
                <option value="Technologie">Technologie</option>
                <option value="Theater">Theater</option>
                <option value="Voeding">Voeding</option>
                <option value="Overig">Overig</option>
              </select>
            </div>
          </div>
          <div className={style.part_end}>
            <div>
              <button onClick={handleCompanyClick} className={style.button}>
                <div className={style.circle_button}>
                <img className={style.button_image}
                  src="./assets/images/account_aanmaken.svg"
                />
                </div>
              </button>
            </div>
          </div>
        </>
      )}
      </div>
      </article>
    </>
    
  );
};

export default Step1;
