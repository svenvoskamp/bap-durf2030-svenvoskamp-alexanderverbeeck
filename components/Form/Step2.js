import React, { useRef, useEffect } from 'react';

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
      <button onClick={handleBack}>Stap terug</button>
      {company == true && (
        <>
          <label htmlFor="firstName">Voornaam</label>
          <input
            required
            id="firstName"
            min="0"
            max="100"
            value={firstName}
            type="text"
            placeholder="Alex"
            onChange={(e) => setFirstName(e.currentTarget.value)}
          />
          <label htmlFor="firstName">Achternaam</label>
          <input
            required
            id="lastName"
            min="0"
            max="100"
            value={lastName}
            type="text"
            placeholder="Verbeeck"
            onChange={(e) => setLastName(e.currentTarget.value)}
          />
        </>
      )}

      <label htmlFor="streetName">Straatnaam</label>
      <input
        required
        id="streetName"
        min="0"
        max="100"
        value={streetName}
        type="text"
        placeholder="Kerkstraat"
        onChange={(e) => setStreetName(e.currentTarget.value)}
      />
      <label htmlFor="houseNumber">Huisnumer</label>
      <input
        required
        id="houseNumber"
        value={houseNumber}
        type="number"
        placeholder="10"
        onChange={(e) => setHouseNumber(e.currentTarget.value)}
      />
      <label htmlFor="addition">Toevoeging</label>
      <input
        id="addition"
        value={addition}
        type="text"
        placeholder="10A"
        onChange={(e) => setAddition(e.currentTarget.value)}
      />
      <label htmlFor="city">Woonplaats:</label>
      <input
        required
        id="city"
        min="0"
        max="100"
        value={city}
        type="text"
        placeholder="Kortrijk"
        onChange={(e) => setCity(e.currentTarget.value)}
      />
      <label htmlFor="zip">Postcode</label>
      <input
        required
        id="zip"
        min="0"
        max="100"
        value={zip}
        type="number"
        placeholder="8500"
        onChange={(e) => setZip(e.currentTarget.value)}
      />
      <label htmlFor="telephone">Telefoon (Optioneel)</label>
      <input
        id="telephone"
        value={telephone}
        type="number"
        placeholder="0424567453"
        onChange={(e) => setTelephone(e.currentTarget.value)}
      />
      <input type="submit" value="Verzend" />
    </>
  );
};

export default Step2;
