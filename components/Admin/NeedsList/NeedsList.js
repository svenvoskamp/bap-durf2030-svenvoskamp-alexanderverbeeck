import React from 'react';
import style from '../../Create/Step3/step3.module.css';
import styles from '../../../css/profile.module.css';

const NeedsList = ({ needs }) => {
  return (
    <div className={styles.needs}>
      <p className={`${styles.grid_title} ${style.subtitle_needs}`}>
        Benodigdheden
      </p>
      <div className={style.needs_list}>
        {needs.map((need) => (
          <div
            className={`${style.need_item}  need-item--${need.provided} need-user--${need.otheruser}`}
          >
            <li className={style.need_types}>
              <img
                src={`../../../../assets/images/${need.type.toLowerCase()}_icon__small.svg`}
                alt={need.need}
                className={style.need_image}
              />
              <div>
                <p className={style.need_type__text}>{need.need}</p>
                {need.other_user_id && (
                  <>
                    {need.provided && (
                      <>
                        <p>
                          Door: {need.otheruser.first_name}{' '}
                          {need.otheruser.last_name}
                        </p>
                      </>
                    )}
                    {!need.provided && (
                      <>
                        <p>
                          Door: {need.otheruser.first_name}{' '}
                          {need.otheruser.last_name}
                        </p>
                      </>
                    )}
                  </>
                )}
              </div>
            </li>
            {!need.other_user_id && (
              <div className={style.need_buttons}>
                {need.provided && (
                  <div className={style.need_toggles}>
                    <button className={`${style.button_toggles}`}>
                      <div
                        className={`${style.true_false} ${style.toggle_true} scale`}
                      >
                        <img src="./assets/images/true_icon.svg" />
                      </div>
                    </button>
                    <button className={`${style.button_toggles}`}>
                      <div className={`${style.true_false} scale`}>
                        <img src="./assets/images/false_icon.svg" />
                      </div>
                    </button>
                  </div>
                )}
                {!need.provided && (
                  <div className={style.need_toggles}>
                    <button className={`${style.button_toggles}`}>
                      <div className={`${style.true_false} scale`}>
                        <img src="./assets/images/true_icon.svg" />
                      </div>
                    </button>
                    <button className={`${style.button_toggles}`}>
                      <div
                        className={`${style.true_false} ${style.toggle_false} scale`}
                      >
                        <img src="./assets/images/false_icon.svg" />
                      </div>
                    </button>
                  </div>
                )}
              </div>
            )}
            {need.other_user_id && (
              <>
                {need.provided && (
                  <>
                    <div>
                      <img src="./assets/images/true_icon.svg" />
                    </div>
                  </>
                )}
                {!need.provided && (
                  <>
                    <div>
                      <img
                        className={`${styles.button_notification} scale `}
                        src="./assets/needs/needs_message.svg"
                      />
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NeedsList;
