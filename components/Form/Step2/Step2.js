import React, { useRef, useEffect } from 'react';
import style from "./step2.module.css";


const Step2 = ({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  company,
  streetName,
  setStreetName,
  houseNumber,
  setHouseNumber,
  addition,
  setAddition,
  city,
  setCity,
  zip,
  setZip,
  telephone,
  setTelephone,
  setCurrentIndex,
}) => {
  console.log(company);
  const handleBack = (e) => {
    e.preventDefault();
    setCurrentIndex(0);
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
          <div className={style.form}>
            <div className={style.form_content}>
              {company == true && (
              <div className={style.form_grid}>
                  <h2 className={style.subtitle}>Accountgegevens</h2>
                  <div className={`${style.input_container} ${style.input_firstname}`}>
                    <label htmlFor="firstName" className={style.label}>Voornaam</label>
                    <input
                      required
                      id="firstName"
                      min="0"
                      max="100"
                      value={firstName}
                      type="text"
                      placeholder="Alex"
                      className={style.input}
                      onChange={(e) => setFirstName(e.currentTarget.value)}
                    />
                  </div>
                  <div className={`${style.input_container} ${style.input_lastname}`}>
                    <label htmlFor="firstName" className={style.label}>Achternaam</label>
                    <input
                      required
                      id="lastName"
                      min="0"
                      max="100"
                      value={lastName}
                      type="text"
                      placeholder="Verbeeck"
                      className={style.input}
                      onChange={(e) => setLastName(e.currentTarget.value)}
                    />
                  </div>
                </div>
              )}
              <div className={style.form_grid}>
                <h2 className={style.subtitle}>Adresgegevens</h2>
                <div className={`${style.input_container} ${style.input_streetname}`}>
                    <label htmlFor="streetName" className={style.label}>Straatnaam</label>
                    <input
                      required
                      id="streetName"
                      min="0"
                      max="100"
                      value={streetName}
                      type="text"
                      placeholder="Kerkstraat"
                      className={style.input}
                      onChange={(e) => setStreetName(e.currentTarget.value)}
                    />
                  </div>
                <div className={`${style.input_container} ${style.input_housenumber}`}>
                    <label htmlFor="houseNumber" className={style.label}>Huisnumer</label>
                    <input
                      required
                      id="houseNumber"
                      value={houseNumber}
                      type="number"
                      placeholder="10"
                      className={style.input}
                      onChange={(e) => setHouseNumber(e.currentTarget.value)}
                    />
                  </div>
                <div className={`${style.input_container} ${style.input_addition}`}>
                    <label htmlFor="addition" className={style.label}>Toevoeging</label>
                    <input
                      id="addition"
                      value={addition}
                      type="text"
                      placeholder="10A"
                      className={style.input}
                      onChange={(e) => setAddition(e.currentTarget.value)}
                    />
                  </div>
                <div className={`${style.input_container} ${style.input_city}`}>
                  <label htmlFor="city" className={style.label}>Woonplaats:</label>
                  <input
                    required
                    id="city"
                    min="0"
                    max="100"
                    value={city}
                    type="text"
                    placeholder="Kortrijk"
                    className={style.input}
                    onChange={(e) => setCity(e.currentTarget.value)}
                  />
                </div>
                <div className={`${style.input_container} ${style.input_zip}`}>
                  <label htmlFor="zip" className={style.label}>Postcode</label>
                  <input
                    required
                    id="zip"
                    value={zip}
                    type="number"
                    placeholder="8500"
                    className={style.input}
                    onChange={(e) => setZip(e.currentTarget.value)}
                  />
                </div>
              </div>
              <div className={style.form_grid}>
                <h2 className={style.subtitle}>Contactgegevens</h2>
                <div className={`${style.input_container} ${style.input_telephone}`}>
                  <label htmlFor="telephone" className={style.label}>Telefoonnnummer <span className={style.label_extra}>(Optioneel)</span></label>
                  <input
                    id="telephone"
                    value={telephone}
                    type="number"
                    placeholder="0424567453"
                    className={style.input}
                    onChange={(e) => setTelephone(e.currentTarget.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={style.part_end}>
          <button className={style.button_back} onClick={handleBack}>
            <img className={style.back_image} src="./assets/images/button_back.svg" />
            <span className={style.back_text}>Terug</span>  
          </button>

          <label htmlFor = "button">
            <input className={style.input_submit} type = "submit" value = "Verzend" id="button" />
            <div>
              <div className={style.circle_button}>
                <img className={style.button_image}
                  src="./assets/images/account_aanmaken.svg"
                />
              </div>
            </div>
          </label>

        </div>
      </article>    
    </>
  );
};

export default Step2;
