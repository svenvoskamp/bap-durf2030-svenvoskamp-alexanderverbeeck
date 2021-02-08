import React, { useRef, useEffect } from "react";
import style from "./step2.module.css";
import Mouse from "../../../components/Mouse";

const Step2 = ({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  company,
  companyName,
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
  const handleBack = (e) => {
    e.preventDefault();
    setCurrentIndex(0);
  };

  const refFirstName = useRef();
  const refLastName = useRef();
  const refStreetName = useRef();
  const refHouseNumber = useRef();
  const refCity = useRef();
  const refZip = useRef();

  const handleValidation = () => {
    if (company == true) {
      if (firstName == "") {
        refFirstName.current.innerHTML = `Gelieve een voornaam in te vullen`;
      } else {
        refFirstName.current.innerHTML = ``;
      }
      if (lastName == "") {
        refLastName.current.innerHTML = `Gelieve een achternaam in te vullen`;
      } else {
        refLastName.current.innerHTML = ``;
      }
      if (streetName == "") {
        refStreetName.current.innerHTML = `Gelieve een straatnaam in te vullen`;
      } else {
        refStreetName.current.innerHTML = ``;
      }
      if (houseNumber == "") {
        refHouseNumber.current.innerHTML = `Gelieve een huisnummer in te vullen`;
      } else {
        refHouseNumber.current.innerHTML = ``;
      }
      if (city == "") {
        refCity.current.innerHTML = `Gelieve een woonplaats in te vullen`;
      } else {
        refCity.current.innerHTML = ``;
      }
      if (zip == "") {
        refZip.current.innerHTML = `Gelieve een postcode in te vullen`;
      } else {
        refZip.current.innerHTML = ``;
      }
    }
    if (company == false) {
      if (streetName == "") {
        refStreetName.current.innerHTML = `Gelieve een straatnaam in te vullen`;
      } else {
        refStreetName.current.innerHTML = ``;
      }
      if (houseNumber == "") {
        refHouseNumber.current.innerHTML = `Gelieve een huisnummer in te vullen`;
      } else {
        refHouseNumber.current.innerHTML = ``;
      }
      if (city == "") {
        refCity.current.innerHTML = `Gelieve een woonplaats in te vullen`;
      } else {
        refCity.current.innerHTML = ``;
      }
      if (zip == "") {
        refZip.current.innerHTML = `Gelieve een postcode in te vullen`;
      } else {
        refZip.current.innerHTML = ``;
      }
    }
  };

  return (
    <>
      <Mouse></Mouse>
      <article className={style.part}>
        <div className={style.part_header}>
          <h1 className={style.title}>
            Registreer.
            {company && (
              <span className={style.title_outline}>{companyName}.</span>
            )}
            {!company && (
              <span className={style.title_outline}>{firstName}.</span>
            )}
          </h1>
          <p className={style.title_description}>
            Kies hoe je je wilt registreren als durver.
          </p>
        </div>
        <div className={style.part_content}>
          <div className={style.form}>
            <div className={style.form_content}>
              {company == true && (
                <div className={style.form_grid}>
                  <h2 className={style.subtitle}>Accountgegevens</h2>
                  <div
                    className={`${style.input_container} ${style.input_firstname}`}
                  >
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
                      className={style.input}
                      onChange={(e) => setFirstName(e.currentTarget.value)}
                    />
                  </div>
                  <div
                    className={`${style.input_container} ${style.input_lastname}`}
                  >
                    <div className={style.input_label}>
                      <label htmlFor="firstName" className={style.label}>
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
                      className={style.input}
                      onChange={(e) => setLastName(e.currentTarget.value)}
                    />
                  </div>
                </div>
              )}
              <div className={style.form_grid}>
                <h2 className={style.subtitle}>Adresgegevens</h2>
                <div
                  className={`${style.input_container} ${style.input_streetname}`}
                >
                  <div className={style.input_label}>
                    <label htmlFor="streetName" className={style.label}>
                      Straatnaam
                    </label>
                    <p className={style.error} ref={refStreetName}></p>
                  </div>
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
                <div
                  className={`${style.input_container} ${style.input_housenumber}`}
                >
                  <div className={style.input_label}>
                    <label htmlFor="houseNumber" className={style.label}>
                      Huisnumer
                    </label>
                    <p className={style.error} ref={refHouseNumber}></p>
                  </div>
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
                <div
                  className={`${style.input_container} ${style.input_addition}`}
                >
                  <label htmlFor="addition" className={style.label}>
                    Toevoeging
                  </label>
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
                  <div className={style.input_label}>
                    <label htmlFor="city" className={style.label}>
                      Woonplaats:
                    </label>
                    <p className={style.error} ref={refCity}></p>
                  </div>
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
                  <div className={style.input_label}>
                    <label htmlFor="zip" className={style.label}>
                      Postcode
                    </label>
                    <p className={style.error} ref={refZip}></p>
                  </div>
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
                <div
                  className={`${style.input_container} ${style.input_telephone}`}
                >
                  <label htmlFor="telephone" className={style.label}>
                    Telefoonnnummer{" "}
                    <span className={style.label_extra}>(Optioneel)</span>
                  </label>
                  <input
                    id="telephone"
                    value={telephone}
                    type="number"
                    placeholder="0424567453"
                    className={style.input}
                    onChange={(e) => setTelephone(e.currentTarget.value)}
                  />
                </div>
                <p className={style.telephone_extra}>
                  Als je wilt dat andere leden snel contact met jou kunnen
                  opnemen kan je je telefoon-gegevens achterlaten. (Je nummer
                  zal openbaar te zien zijn.)
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className={style.part_end}>
          <button className={style.button_back} onClick={handleBack}>
            <img
              className={style.back_image}
              src="./assets/images/button_back.svg"
            />
            <span className={style.back_text}>Terug</span>
          </button>
          <label className={style.button_next} htmlFor="button">
            <input
              className={style.input_submit}
              onClick={handleValidation}
              type="submit"
              value="Verzend"
              id="button"
            />
            <div className={style.button}>
              <div className={style.circle_button}>
                <img
                  className={style.button_image}
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
