import React, { useRef, useEffect } from 'react';

import style from '../../../css/users.module.css';

const User = ({ user, key }) => {
  const maxLength = 12;
  console.log(user);
  let companyName;
  let department;
  let firstName;
  let lastName;
  if (user.company) {
    if (user.company_name.length > 12) {
      companyName = user.company_name.substring(0, maxLength) + '...';
    } else {
      companyName = user.company_name;
    }
    if (user.department.length > 12) {
      department = user.department.substring(0, maxLength) + '...';
    } else {
      department = user.department;
    }
  }
  if (!user.company) {
    if (user.first_name.length > 12) {
      firstName = user.first_name.substring(0, maxLength) + '...';
    } else {
      firstName = user.first_name;
    }
    if (user.last_name.length > 12) {
      lastName = user.last_name.substring(0, maxLength) + '...';
    } else {
      lastName = user.last_name;
    }
  }
  //   var result = yourString.substring(0, maxLength) + '...';
  return (
    <a href={`/user/${user.id}`} key={key}>
      <li className={`${style.card} scale`} key={user.id}>
        {user.company && (
          <div className={`${style.card_info} ${style.card_info__company}`}>
            <div className={style.info_titles}>
              <p className={style.company_title}>{companyName}</p>
              <p className={style.company_title__outline}>{department}</p>
            </div>
            <div className={style.company_extra}>
              <div className={style.company_left}>
                <div className={style.company_circle}></div>
                <p className={style.company_subtitle}>{user.sector}</p>
              </div>
              <p className={style.company_subtitle__light}>
                {user.first_name} {user.last_name}
              </p>
            </div>
          </div>
        )}
        {!user.company && (
          <div className={`${style.card_info} ${style.card_info__individu}`}>
            <div className={style.info_titles}>
              <p className={style.individu_title}>{firstName}</p>
              <p className={style.individu_title__outline}>{lastName}</p>
            </div>
            <div className={style.individu_left}>
              <div className={style.individu_circle}></div>
              <p className={style.individu_subtitle}>{user.sector}</p>
            </div>
          </div>
        )}
      </li>
    </a>
  );
};

export default User;
