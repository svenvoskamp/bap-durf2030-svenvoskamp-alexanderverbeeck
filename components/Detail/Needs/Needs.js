import React from 'react';
import style from './needs.module.css';
import { useFetchUser } from '../../../lib/user';
import { useQuery } from '@apollo/react-hooks';

const Needs = ({ needs }) => {
  const { user } = useFetchUser();
  console.log(user);
  const handleClick = (id) => {
    console.log(id);
  };
  console.log(needs);
  return (
    <>
      <div className={style.project_needs}>
        <div className={style.needs_header}>
          <p className={style.needs_title}>Durf mee te helpen</p>
          <p></p>
        </div>
        <div className={style.needs_list}>
          {needs.map((need) => (
            <>
              {!need.provided && (
                <div className={style.need}>
                  <div className={style.need_item}>
                    <p className={style.need_item__text}>{need.need}</p>
                    <div>
                      <div
                        className={`${style.needs_item__image} ${style.provided}`}
                      >
                        <img
                          src={`../../../../assets/needs/needs_${need.type.toLowerCase()}.svg`}
                          alt="upload hier"
                        />
                      </div>
                    </div>
                  </div>
                  {/* <div className={style.need_button}>
                    <a
                      onClick={(e) => handleClick(need.id)}
                      className={style.button}
                    >
                      <div className={style.circle_button}>
                        <img
                          className={style.button_image}
                          src="../../../../assets/needs/needs_help.svg"
                        />
                      </div>
                    </a>
                  </div> */}
                </div>
              )}
              {need.provided && (
                <div className={style.need}>
                  <div className={style.need_item}>
                    <p className={style.need_item__text}>{need.need}</p>
                    <div>
                      <div
                        className={`${style.needs_item__image} ${style.not_provided}`}
                      >
                        <img
                          src={`../../../../assets/needs/needs_${need.type.toLowerCase()}.svg`}
                          alt="upload hier"
                        />
                      </div>
                    </div>
                  </div>
                  {/* <div className={style.need_button}>
                    <a href={'/'} className={style.button}>
                      <div className={style.circle_button}>
                        <img
                          className={style.button_image}
                          src="../../../../assets/needs/needs_provided.svg"
                        />
                      </div>
                    </a>
                  </div> */}
                </div>
              )}
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default Needs;
