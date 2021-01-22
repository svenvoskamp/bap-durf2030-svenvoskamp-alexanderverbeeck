import React, { useRef, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import * as firebase from 'firebase/app';
import 'firebase/storage';

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
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    console.log(error);
  }
  districts = data.districts;
  console.log(district);

  const handleBack = (e) => {
    e.preventDefault();
    setCurrentIndex(0);
  };

  const handleChange = async (e) => {
    if (e.target.files[0]) {
      console.log(e.target.files[0]);
      const img = document.getElementById('id_img');
      img.src = URL.createObjectURL(e.target.files[0]);
      img.onload = function () {
        URL.revokeObjectURL(img.src);
      };
    }
  };
  return (
    <>
      <label htmlFor="title">Titel</label>
      <input
        required
        id="title"
        min="0"
        max="100"
        value={title}
        type="text"
        placeholder="De vraagstraat"
        onChange={(e) => setTitle(e.currentTarget.value)}
      />

      <label for="districts">Waar gaat uw project plaatsvinden: </label>
      <select
        name="districts"
        id="districts"
        onChange={(e) => setDistrict(e.currentTarget.value)}
        required
      >
        {districts.map((district) => (
          <>
            <option value={district.id}>{district.district}</option>
          </>
        ))}
      </select>

      <label htmlFor="tagline">Tagline</label>
      <input
        required
        id="tagline"
        min="0"
        max="100"
        value={tagline}
        type="text"
        placeholder="Met dit project wil ik laten zien dat de wijk “Walle” een prachtige buurt is."
        onChange={(e) => setTagline(e.currentTarget.value)}
      />
      <img id="id_img" src="" alt="" />
      <label htmlFor="img"> Kies uw foto: </label>
      <input
        type="file"
        id="img"
        name="filename"
        accept="image/*"
        onChange={(e) => {
          setImage(e.target.files[0]);
          handleChange(e);
        }}
      />
      <label htmlFor="impact">Impact</label>
      <input
        required
        id="impact"
        min="0"
        max="100"
        value={impact}
        type="text"
        placeholder="Vertel wat over de impact dat uw project kan hebben"
        onChange={(e) => setImpact(e.currentTarget.value)}
      />

      <label htmlFor="description">description</label>
      <input
        required
        id="description"
        min="0"
        max="100"
        value={description}
        type="text"
        placeholder="Vertel kort wat uw project inhoudt"
        onChange={(e) => setDescription(e.currentTarget.value)}
      />

      <button onClick={handleBack}>Ga terug</button>
      <input type="submit" value="Ga verder" />
    </>
  );
};

export default Step2;
