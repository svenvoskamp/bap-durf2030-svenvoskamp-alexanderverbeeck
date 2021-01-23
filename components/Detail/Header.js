import React from 'react';

const Header = ({
  theme,
  category,
  title,
  name,
  lastName,
  companyName,
  company,
  phase,
  district,
}) => {
  console.log(company);
  console.log(companyName);
  return (
    <>
      <div>
        <p>{theme}</p>
        <p>{category}</p>
      </div>
      <div>
        <p>{title}</p>
        {company && (
          <>
            <p>{companyName}</p>
          </>
        )}
        {!company && (
          <>
            <p>
              {name} {lastName}
            </p>
          </>
        )}
      </div>
      <div>
        <p>{phase}</p>
        <p>{district}</p>
        {!company && <></>}
        {company && (
          <>
            <p>
              {name} {lastName}
            </p>
          </>
        )}
      </div>
    </>
  );
};

export default Header;
