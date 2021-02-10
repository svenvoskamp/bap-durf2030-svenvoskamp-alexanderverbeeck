import React, { useRef, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import * as firebase from "firebase/app";
import "firebase/storage";
import style from "./step2.module.css";
import Mouse from "../../../components/Mouse";
import Loading from "../../Loading/Loading";

const GET_DISTRICTS = gql`
  query getDistricts {
    districts {
      id
      district
    }
  }
`;

const Step2 = ({
  title,
  setTitle,
  district,
  setDistrict,
  tagline,
  setTagline,
  impact,
  setImpact,
  description,
  setDescription,
  image,
  setImage,
  setCurrentIndex,
}) => {
  let districts;
  const { loading, error, data } = useQuery(GET_DISTRICTS);
  const refTitle = useRef();
  const refDistrict = useRef();
  const refImg = useRef();
  const refTagline = useRef();
  const refImpact = useRef();
  const refDescription = useRef();
  if (loading) {
    return <Loading props={"loading"} />;
  }
  if (error) {
    console.log(error);
  }
  districts = data.districts;

  const handleBack = (e) => {
    e.preventDefault();
    setCurrentIndex(0);
  };

  const handleValidation = (e) => {
    if (title == "") {
      refTitle.current.innerHTML = `Vul een titel in`;
    } else {
      refTitle.current.innerHTML = ``;
    }
    if (district == "") {
      refDistrict.current.innerHTML = `Vul een locatie in`;
    } else {
      refDistrict.current.innerHTML = ``;
    }
    if (image == "") {
      refImg.current.innerHTML = `Upload een foto voor het project`;
    } else {
      refImg.current.innerHTML = ``;
    }
    if (tagline == "") {
      refTagline.current.innerHTML = `Vul een tagline in voor het project`;
    } else {
      refTagline.current.innerHTML = ``;
    }
    if (impact == "") {
      refImpact.current.innerHTML = `Vul een doel in van het project`;
    } else {
      refImpact.current.innerHTML = ``;
    }
    if (description == "") {
      refDescription.current.innerHTML = `Vul een beschrijving in van het project`;
    } else {
      refDescription.current.innerHTML = ``;
    }
  };

  const handleChange = async (e) => {
    if (e.target.files[0]) {
      const img = document.getElementById("id_img");
      img.src = URL.createObjectURL(e.target.files[0]);
      img.onload = function () {
        URL.revokeObjectURL(img.src);
      };
    }
  };
  return (
    <>
      <Mouse> </Mouse>
      <article className={style.part}>
        <div className={style.part_header}>
          <h1 className={style.title}>
            Project.
            <span className={style.title_outline}> beschrijving. </span>
          </h1>
          <p className={style.title_description}>
            Super dat je een project wilt starten voor DURF 2030, we beginnen
            met de basis.
          </p>
        </div>
        <div className={style.part_content}>
          <div className={style.form}>
            <div className={`${style.form_grid} ${style.form_project}`}>
              <h2 className={`${style.subtitle} ${style.subtitle_project}`}>
                Project
              </h2>
              <div className={`${style.input_container} ${style.input_title}`}>
                <div className={style.input_label}>
                  <label htmlFor="title" className={style.label}>
                    Titel
                    <span className={style.label_extra}>
                      (max 20 karakters)
                    </span>
                  </label>
                  <p className={style.error} ref={refTitle}></p>
                </div>
                <input
                  required
                  id="title"
                  min="0"
                  max="100"
                  value={title}
                  type="text"
                  placeholder="De vraagstraat"
                  className={style.input}
                  onChange={(e) => setTitle(e.currentTarget.value)}
                />
              </div>
              <div
                className={`${style.input_container} ${style.input_district}`}
              >
                <div className={style.input_label}>
                  <label for="districts" className={style.label}>
                    Waar gaat uw project plaatsvinden:
                  </label>
                  <p className={style.error} ref={refDistrict}></p>
                </div>
                <select
                  name="districts"
                  id="districts"
                  className={style.input}
                  onChange={(e) => setDistrict(e.currentTarget.value)}
                  required
                >
                  <option value=""> --Kies jouw buurt-- </option>
                  {districts.map((district) => (
                    <>
                      <option value={district.id}> {district.district} </option>
                    </>
                  ))}
                </select>
              </div>
              <div
                className={`${style.input_container} ${style.input_tagline}`}
              >
                <div className={style.input_label}>
                  <label htmlFor="tagline" className={style.label}>
                    Tagline
                    <span className={style.label_extra}>
                      (max 50 karakters)
                    </span>
                  </label>
                  <p className={style.error} ref={refTagline}></p>
                </div>
                <input
                  required
                  id="tagline"
                  min="0"
                  max="100"
                  value={tagline}
                  type="text"
                  placeholder="Met dit project wil ik laten zien dat de wijk “Walle” een prachtige buurt is."
                  className={style.input}
                  onChange={(e) => setTagline(e.currentTarget.value)}
                />
              </div>
              <div className={style.subtitle_image}>
                <h2 className={`${style.subtitle}`}>Projectfoto</h2>
                <label htmlFor="img" className={style.label}>
                  <img
                    className={style.label_image}
                    src="./assets/images/upload_icon.svg"
                    alt="upload hier"
                  />
                </label>
                <input
                  type="file"
                  id="img"
                  name="filename"
                  accept="image/x-png,image/jpeg"
                  className={style.input_none}
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                    handleChange(e);
                  }}
                />
              </div>

              <label htmlFor="img" className={`${style.input_image} scale`}>
                <div className={style.image}>
                  <img
                    id="id_img"
                    className={style.input_image__picture}
                    class
                    alt=""
                    src="./assets/images/add_image.svg"
                  />
                </div>
                <p
                  className={`${style.error} ${style.error_center}`}
                  ref={refImg}
                ></p>
              </label>
            </div>
            <div className={`${style.form_grid} ${style.form_description}`}>
              <h2 className={style.subtitle}>Projectbeschrijving</h2>
              <div className={`${style.input_container} ${style.input_impact}`}>
                <div className={style.input_label}>
                  <label htmlFor="impact" className={style.label}>
                    Welke positieve impact gaat jouw project teweeg brengen ?
                    <span className={style.label_extra}>
                      (max 250 karakters)
                    </span>
                  </label>
                  <p className={style.error} ref={refImpact}></p>
                </div>
                <textarea
                  rows="6"
                  required
                  id="impact"
                  minLength="50"
                  max="300"
                  value={impact}
                  placeholder="Vertel hier wat over de impact dat uw project kan hebben.."
                  className={style.input_text}
                  onChange={(e) => setImpact(e.currentTarget.value)}
                />
              </div>
              <div
                className={`${style.input_container} ${style.input_description}`}
              >
                <div className={style.input_label}>
                  <label htmlFor="description" className={style.label}>
                    Beschrijf kort jouw project.
                    <span className={style.label_extra}>
                      (max 500 karakters)
                    </span>
                  </label>
                  <p className={style.error} ref={refDescription}></p>
                </div>
                <textarea
                  rows="10"
                  required
                  id="description"
                  minLength="50"
                  maxLength="500"
                  value={description}
                  placeholder="Vertel hier kort wat uw project inhoudt.."
                  className={style.input_text}
                  onChange={(e) => setDescription(e.currentTarget.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={style.part_end}>
          <div className={style.button_back}>
            <button className={style.button_arrow} onClick={handleBack}>
              <img
                className={style.back_image}
                src="./assets/images/button_back.svg"
              />
              <span className={style.back_text}> Terug </span>
            </button>
          </div>
          <label className={style.button_next} htmlFor="button">
            <input
              className={style.input_submit}
              type="submit"
              onClick={handleValidation}
              value="Ga verder"
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
