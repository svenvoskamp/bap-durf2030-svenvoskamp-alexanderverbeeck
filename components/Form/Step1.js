import React, { useRef, useEffect } from 'react';

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
      <input
        type="radio"
        id="individu"
        name="type"
        value="0"
        onClick={(e) => setCompany(false)}
      />
      <label for="individu">Individu</label>
      <input
        type="radio"
        id="company"
        name="type"
        value="1"
        onClick={(e) => setCompany(true)}
      />
      <label for="company">Bedrijf/Organisatie</label>

      {company == false && (
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
          <label for="sectors">U bent werkzaam in de sector: </label>
          <select
            name="sectors"
            id="sectors"
            onChange={(e) => setSector(e.currentTarget.value)}
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
          <button onClick={handleIndividuClick}>Ga verder als individu</button>
        </>
      )}
      {company == true && (
        <>
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
          />
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
          />
          <label for="sectors">Bedrijfssector </label>
          <select
            name="sectors"
            id="sectors"
            required
            onChange={(e) => setSector(e.currentTarget.value)}
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
          <button onClick={handleCompanyClick}>Ga verder als bedrijf</button>
        </>
      )}
    </>
  );
};

export default Step1;
