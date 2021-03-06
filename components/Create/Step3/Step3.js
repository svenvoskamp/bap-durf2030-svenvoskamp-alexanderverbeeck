import React, { useState, useRef } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { withApollo } from '../../../lib/withApollo';
import style from './step3.module.css';
import Mouse from '../../../components/Mouse';
import Loading from '../../Loading/Loading';

const GET_PROJECT_BY_USER = gql`
  query getProjectByUser($id: String!) {
    users(where: { id: { _eq: $id } }) {
      id
      projects(order_by: { created_at: desc }, limit: 1) {
        id
      }
    }
  }
`;

const GET_NEEDS_BY_PROJECT = gql`
  query getNeedsByProject($id: Int!) {
    needs(where: { project_id: { _eq: $id } }) {
      id
      type
      need
      provided
    }
  }
`;

const ADD_NEED = gql`
  mutation addNeed(
    $project_id: Int!
    $type: String!
    $need: String!
    $provided: Boolean!
    $user_id: String!
  ) {
    insert_needs(
      objects: {
        project_id: $project_id
        type: $type
        need: $need
        provided: $provided
        user_id: $user_id
      }
    ) {
      affected_rows
      returning {
        id
        project_id
        type
        need
        provided
        user_id
      }
    }
  }
`;

const TOGGLE_NEED = gql`
  mutation toggleNeed($id: Int!, $provided: Boolean!) {
    update_needs(where: { id: { _eq: $id } }, _set: { provided: $provided }) {
      affected_rows
    }
  }
`;

const REMOVE_NEED = gql`
  mutation removeNeed($id: Int!) {
    delete_needs(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;

const Needs = ({ project_id, user }) => {
  let id = project_id;
  const [addNeed] = useMutation(ADD_NEED);
  const [toggleNeed] = useMutation(TOGGLE_NEED);
  const [removeNeed] = useMutation(REMOVE_NEED);

  const refNeed = useRef();

  const { data } = useQuery(GET_NEEDS_BY_PROJECT, {
    variables: { id: project_id },
  });

  const [typeNeed, setTypeNeed] = useState('');
  const [need, setNeed] = useState('');
  const [gotNeed, setGotNeed] = useState(false);

  const handleValidation = () => {
    if (need == '') {
      refNeed.current.innerHTML = `Vul de benodigdheid in`;
    } else {
      refNeed.current.innerHTML = ``;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (typeNeed !== '' && need !== '') {
      addNeed({
        variables: {
          project_id: project_id,
          type: typeNeed,
          need: need,
          provided: gotNeed,
          user_id: user.sub,
        },
        update: (cache, { data }) => {
          const cachedData = cache.readQuery({
            query: GET_NEEDS_BY_PROJECT,
            variables: { id },
          });
          const newNeed = data['insert_needs'].returning[0];
          cache.writeQuery({
            query: GET_NEEDS_BY_PROJECT,
            variables: { id },
            data: {
              ...cachedData,
              needs: [newNeed, ...cachedData.needs],
            },
          });
        },
      });
      setGotNeed(false);
      setNeed('');
      setTypeNeed('');
    }
  };

  const handleToggle = (need) => {
    toggleNeed({
      variables: { id: need.id, provided: !need.provided },
      optimisticResponse: true,
      update: (cache) => {
        const existingNeeds = cache.readQuery({
          query: GET_NEEDS_BY_PROJECT,
          variables: { id },
        });
        const newNeeds = existingNeeds.needs.map((n) => {
          if (n.id === need.id) {
            return { ...n, provided: !n.provided };
          } else {
            return n;
          }
        });
        cache.writeQuery({
          query: GET_NEEDS_BY_PROJECT,
          variables: { id },
          data: { needs: newNeeds },
        });
      },
    });
  };

  const handleDelete = (need) => {
    removeNeed({
      variables: { id: need.id },
      optimisticResponse: true,
      update: (cache) => {
        const existingNeeds = cache.readQuery({
          query: GET_NEEDS_BY_PROJECT,
          variables: { id },
        });
        const newNeeds = existingNeeds.needs.filter((n) => n.id !== need.id);
        cache.writeQuery({
          query: GET_NEEDS_BY_PROJECT,
          variables: { id },
          data: { needs: newNeeds },
        });
      },
    });
  };

  return (
    <>
      <Mouse></Mouse>
      <article className={style.part}>
        <div className={style.part_header}>
          <h1 className={style.title}>
            Project.
            <span className={style.title_outline}>benodigheden.</span>
          </h1>
          <p className={style.title_description}>
            Voeg benodigheden toe die het project nodig heeft!
          </p>
        </div>
        <div className={style.part_content}>
          <div className={style.form}>
            <form className={style.form_needs} onSubmit={handleSubmit}>
              <div className={style.checkboxes}>
                <div className={style.checkbox_container}>
                  <label htmlFor="food">
                    <input
                      id="food"
                      type="radio"
                      name="needs"
                      className={style.checkbox}
                      onClick={(e) => setTypeNeed('Eten')}
                    />
                    <p className={style.checkbox_text}>Eten</p>
                    <div className={`${style.checkbox_image} scale`}>
                      {/* <img src="./assets/images/eten_icon.svg" /> */}
                      <svg
                        width="47"
                        height="47"
                        viewBox="0 0 47 47"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M43.4553 15.6958L43.3974 15.6625C42.6146 15.2127 41.75 14.9229 40.854 14.8101C39.9579 14.6972 39.0483 14.7636 38.1782 15.0053L38.1759 15.0059C37.2714 15.2479 36.4292 15.68 35.7056 16.2735L35.5718 16.3832L35.422 16.2966L8.13317 0.531352L43.4553 15.6958ZM43.4553 15.6958H43.4763M43.4553 15.6958H43.4763M43.4763 15.6958C44.9634 16.5978 46.049 18.0348 46.5086 19.7123C46.974 21.4111 46.7612 23.2239 45.915 24.769C42.1344 31.427 36.6574 36.9675 30.0398 40.828C23.4216 44.6889 15.8984 46.732 8.23394 46.75H6.87347C5.10076 46.7019 3.4168 45.9649 2.17994 44.6957C0.942321 43.4258 0.250151 41.7235 0.250812 39.9515L0.250754 39.9476C0.22952 38.5375 0.65721 37.1571 1.4722 36.0053C2.2872 34.8535 3.44741 33.99 4.78559 33.5391L4.95578 33.4818V33.3022L4.95578 2.3593C4.95578 2.35921 4.95578 2.35913 4.95578 2.35904C4.95647 1.98716 5.05606 1.62212 5.24438 1.30126C5.43276 0.980328 5.70316 0.715105 6.02794 0.532775L6.02794 0.532789L6.03044 0.531352C6.35007 0.347043 6.71268 0.25 7.0818 0.25C7.45086 0.25 7.8134 0.347007 8.13299 0.53125L43.4763 15.6958ZM4.45578 39.9521C4.45597 40.6414 4.73022 41.3024 5.21814 41.7897C5.70541 42.2763 6.36592 42.55 7.05478 42.5509C14.1717 42.7436 21.2071 40.9995 27.4077 37.5053C33.5671 34.0345 38.6724 28.9666 42.1851 22.8384H42.2175L42.2868 22.7008C42.5913 22.0957 42.6475 21.3959 42.4433 20.7501C42.2393 20.1049 41.7915 19.5646 41.1951 19.244C40.6018 18.9156 39.9035 18.8316 39.2491 19.0098C38.9299 19.0859 38.63 19.2276 38.3685 19.4257C38.1061 19.6245 37.888 19.8759 37.7284 20.1638C34.7799 25.3779 30.4981 29.7167 25.3204 32.7366C20.1425 35.7567 14.2544 37.3494 8.25805 37.3519C8.25802 37.3519 8.25798 37.3519 8.25795 37.3519L7.05978 37.3519C7.05956 37.3519 7.05934 37.3519 7.05913 37.3519C6.3804 37.348 5.72693 37.6091 5.23814 38.0796L5.23665 38.0811C4.98759 38.3249 4.79012 38.6162 4.65597 38.9378C4.52192 39.2591 4.45384 39.604 4.45578 39.9521ZM4.45578 39.9521C4.45578 39.9524 4.45578 39.9526 4.45578 39.9529L4.70578 39.9514H4.45578C4.45578 39.9516 4.45578 39.9519 4.45578 39.9521ZM9.53566 6.20699L9.16078 5.99082V6.42356V32.9028V33.164L9.42174 33.1526C14.0928 32.9475 18.6502 31.6483 22.726 29.3599C26.8017 27.0715 30.2816 23.8579 32.8846 19.9787L33.0337 19.7565L32.8019 19.6228L9.53566 6.20699ZM14.1473 25.2364C14.4931 25.0056 14.8996 24.8824 15.3155 24.8824C15.8733 24.8824 16.4081 25.1037 16.8023 25.4975C17.1966 25.8913 17.418 26.4252 17.418 26.982C17.418 27.3972 17.2948 27.803 17.0638 28.1483C16.8328 28.4936 16.5045 28.7627 16.1202 28.9217C15.736 29.0806 15.3132 29.1222 14.9053 29.0412C14.4974 28.9601 14.1228 28.7601 13.8287 28.4665C13.5347 28.1728 13.3345 27.7987 13.2534 27.3915C13.1723 26.9843 13.214 26.5622 13.373 26.1786C13.5321 25.795 13.8016 25.4671 14.1473 25.2364ZM14.1473 14.7105C14.4931 14.4797 14.8996 14.3565 15.3155 14.3565C15.8733 14.3565 16.4081 14.5778 16.8023 14.9716C17.1966 15.3654 17.418 15.8993 17.418 16.4561C17.418 16.8712 17.2948 17.2771 17.0638 17.6224C16.8328 17.9676 16.5045 18.2368 16.1202 18.3957C15.736 18.5547 15.3132 18.5963 14.9053 18.5152C14.4974 18.4342 14.1228 18.2342 13.8287 17.9406C13.5347 17.6469 13.3345 17.2728 13.2534 16.8656C13.1723 16.4584 13.214 16.0363 13.373 15.6527C13.5321 15.2691 13.8016 14.9412 14.1473 14.7105ZM22.039 19.6707C22.4332 19.2769 22.968 19.0556 23.5258 19.0556C24.0835 19.0556 24.6183 19.2769 25.0126 19.6707C25.4068 20.0644 25.6283 20.5984 25.6283 21.1551V23.5047C25.6283 24.0614 25.4068 24.5954 25.0126 24.9892C24.6183 25.3829 24.0835 25.6042 23.5258 25.6042C22.968 25.6042 22.4332 25.3829 22.039 24.9892C21.6447 24.5954 21.4233 24.0614 21.4233 23.5047V21.1551C21.4233 20.5984 21.6447 20.0644 22.039 19.6707Z"
                          fill="#091422"
                          stroke="#FDECD2"
                          stroke-width="0.5"
                        />
                      </svg>
                    </div>
                  </label>
                </div>
                <div className={style.checkbox_container}>
                  <label htmlFor="person">
                    <input
                      id="person"
                      type="radio"
                      name="needs"
                      className={style.checkbox}
                      onClick={(e) => setTypeNeed('Persoon')}
                    />
                    <p className={style.checkbox_text}>Persoon</p>
                    <div className={`${style.checkbox_image} scale`}>
                      <svg
                        width="46"
                        height="47"
                        viewBox="0 0 46 47"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M41.2029 18.26V18.4367L41.3696 18.4957C42.6718 18.9563 43.7928 19.8001 44.5774 20.9084C45.3618 22.0166 45.7711 23.3343 45.7492 24.6782C45.7272 26.0221 45.2752 27.3267 44.4549 28.4102C43.6345 29.4938 42.4864 30.3026 41.1697 30.7229L41.017 30.7716L40.9976 30.9307C40.4821 35.1459 38.4481 39.0484 35.2548 41.9449C32.0627 44.8403 27.9187 46.543 23.5576 46.7497L23.034 46.7497L23.0327 46.7497C18.5214 46.7734 14.1634 45.1641 10.8057 42.2362C7.44819 39.3084 5.33097 35.2719 4.86359 30.912L4.84661 30.7537L4.69596 30.7021C3.39462 30.2567 2.26866 29.4297 1.47274 28.3364C0.676891 27.2432 0.25 25.9374 0.25 24.5993C0.25 23.2612 0.676891 21.9554 1.47274 20.8622C2.26866 19.7689 3.39462 18.9419 4.69596 18.4965L4.86395 18.439L4.86501 18.2615C4.89257 13.6427 6.73068 9.20701 10.0062 5.85995C13.281 2.5137 17.7459 0.507865 22.4905 0.253485C24.4824 0.215762 26.4679 0.4845 28.3735 1.04971L28.4083 1.06003H28.4445H28.5456C32.2209 2.17963 35.4312 4.4128 37.7081 7.43251C39.9921 10.4617 41.2167 14.123 41.2029 17.8782V17.8792V18.26ZM23.4554 42.7696L23.4554 42.7696L23.4609 42.7693C26.6742 42.6084 29.7381 41.3952 32.1547 39.3254C34.5715 37.2556 36.1992 34.4504 36.7717 31.365L36.8265 31.0694H36.5259H9.42697H9.12992L9.18064 31.3621C9.74558 34.6223 11.5032 37.5721 14.1271 39.6681C16.7509 41.7639 20.0641 42.865 23.4554 42.7696ZM8.97 17.8681L8.95842 18.1292H9.21975H11.5221C12.0686 18.1292 12.5914 18.3404 12.9758 18.7144C13.36 19.0882 13.5745 19.5937 13.5745 20.1192C13.5745 20.6448 13.36 21.1502 12.9758 21.524C12.5914 21.898 12.0686 22.1093 11.5221 22.1093H6.91738C6.24263 22.1093 5.59418 22.37 5.11502 22.8362C4.63564 23.3026 4.36501 23.9366 4.36501 24.5993C4.36501 25.2619 4.63564 25.896 5.11502 26.3624C5.59418 26.8286 6.24263 27.0893 6.91738 27.0893H39.1506C39.8253 27.0893 40.4738 26.8286 40.9529 26.3624C41.4323 25.896 41.7029 25.2619 41.7029 24.5993C41.7029 23.9366 41.4323 23.3026 40.9529 22.8362C40.4738 22.37 39.8253 22.1093 39.1506 22.1093H34.5458C33.9993 22.1093 33.4765 21.898 33.0921 21.524C32.708 21.1502 32.4935 20.6448 32.4935 20.1192C32.4935 19.5937 32.708 19.0882 33.0921 18.7144C33.4765 18.3404 33.9993 18.1292 34.5458 18.1292H36.8482H37.098L37.0982 17.8794C37.1 16.0446 36.7229 14.2284 35.9894 12.5386C35.256 10.8488 34.1813 9.32003 32.8296 8.04285L32.8296 8.0428L32.825 8.03863C31.9823 7.2813 31.0563 6.61705 30.0638 6.05792L29.6911 5.84795V6.27574V13.3991C29.6911 13.9246 29.4766 14.4301 29.0924 14.8038C28.708 15.1778 28.1852 15.3891 27.6387 15.3891C27.0922 15.3891 26.5694 15.1778 26.185 14.8038C25.8009 14.4301 25.5863 13.9246 25.5863 13.3991V4.6405V4.42784L25.3764 4.39374C24.6032 4.26813 23.8213 4.19966 23.0374 4.18892V4.1889H23.034H22.6196V4.18857L22.6066 4.18923C21.9648 4.22242 21.3254 4.2907 20.6915 4.39374L20.4816 4.42786V4.6405V13.3991C20.4816 13.9246 20.2671 14.4301 19.8829 14.8038C19.4985 15.1778 18.9757 15.3891 18.4292 15.3891C17.8827 15.3891 17.3599 15.1778 16.9755 14.8038C16.5914 14.4301 16.3769 13.9246 16.3769 13.3991V6.34294V5.89813L15.9969 6.12938C13.9359 7.3837 12.2188 9.10751 10.9943 11.1526C9.76983 13.1978 9.07491 15.5026 8.97 17.8681Z"
                          fill="#091422"
                          stroke="#FDECD2"
                          stroke-width="0.5"
                        />
                      </svg>
                    </div>
                  </label>
                </div>
                <div className={style.checkbox_container}>
                  <label htmlFor="item">
                    <input
                      id="item"
                      type="radio"
                      name="needs"
                      className={style.checkbox}
                      onClick={(e) => setTypeNeed('Item')}
                    />
                    <p className={style.checkbox_text}>Item</p>
                    <div className={`${style.checkbox_image} scale`}>
                      <svg
                        width="40"
                        height="47"
                        viewBox="0 0 40 47"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M39.1798 11.9103L39.2409 11.9488H39.3131H39.3367L39.477 12.0732C39.4773 12.0735 39.4775 12.0737 39.4778 12.074C39.5381 12.1286 39.5905 12.1913 39.6336 12.2601L39.75 12.5504V12.6919C39.7398 12.7538 39.7386 12.8169 39.7465 12.879C39.737 12.9478 39.7378 13.0177 39.7489 13.0863C39.7467 13.1077 39.7411 13.1409 39.7323 13.1803C39.7272 13.2032 39.722 13.2238 39.7182 13.2386L39.7136 13.2555L39.7125 13.2596L39.7123 13.2603L39.7123 13.2603L39.7123 13.2604L39.7123 13.2604L39.7122 13.2605L39.7026 13.2941V13.3291V33.9566V33.9571C39.7033 34.3161 39.6124 34.6693 39.4382 34.9835C39.2642 35.2974 39.0129 35.562 38.708 35.7523C38.7077 35.7525 38.7074 35.7527 38.7071 35.7529L21.1042 46.5388L20.8133 46.6549H20.6718H20.6332L20.5964 46.6666C20.2448 46.7778 19.8672 46.7778 19.5156 46.6666L19.4788 46.6549H19.4402H19.2987L19.0082 46.539L1.26278 35.5875C1.26255 35.5873 1.26231 35.5872 1.26207 35.587C0.957054 35.3967 0.705712 35.1321 0.531686 34.8181C0.357528 34.5039 0.266535 34.1507 0.267255 33.7917V33.7912V13.1638V13.1455L0.264603 13.1274C0.245132 12.9948 0.245132 12.8601 0.264603 12.7275L0.267255 12.7094V12.6912V12.385L0.376657 12.1122L0.448283 12.0264L0.6578 11.8801L0.669686 11.8718L0.680533 11.8622L0.887579 11.6786L1.08398 11.5263L18.7641 0.547608C18.9758 0.423385 19.2052 0.331962 19.4444 0.276438H19.6533H19.674L19.6944 0.273043C19.8789 0.242319 20.0673 0.242319 20.2518 0.273043L20.2722 0.276438H20.2929H20.4455C20.6518 0.34094 20.8446 0.44277 21.0141 0.57691L21.0256 0.585976L21.038 0.593646L29.8473 6.02684L29.8494 6.02815L39.1798 11.9103ZM20.0214 4.94096L19.8902 4.86009L19.759 4.94095L6.49461 13.1163L6.14837 13.3297L6.49512 13.5423L10.735 16.1414L10.8661 16.2218L10.997 16.141L24.2377 7.9656L24.5825 7.75271L24.2376 7.54007L20.0214 4.94096ZM17.3915 40.8096L17.7715 41.0413V40.5962V25.5922V25.4527L17.6528 25.3794L4.62522 17.3458L4.244 17.1107V17.5586V32.6571V32.7975L4.3639 32.8706L17.3915 40.8096ZM19.7615 21.648L19.8913 21.7259L20.0205 21.647L33.285 13.5425L33.632 13.3304L33.2861 13.1165L28.7383 10.3047L28.6067 10.2234L28.4752 10.3048L15.2345 18.5038L14.886 18.7196L15.2374 18.9307L19.7615 21.648ZM35.4182 32.7986L35.5364 32.7253V32.5862V17.5586V17.1107L35.1552 17.3458L22.1276 25.3794L22.0088 25.4527V25.5922V40.667V41.1163L22.3906 40.8795L35.4182 32.7986Z"
                          fill="#091422"
                          stroke="#FDECD2"
                          stroke-width="0.5"
                        />
                      </svg>
                    </div>
                  </label>
                </div>
                <div className={style.checkbox_container}>
                  <label htmlFor="drink">
                    <input
                      id="drink"
                      type="radio"
                      name="needs"
                      className={style.checkbox}
                      onClick={(e) => setTypeNeed('Drank')}
                    />
                    <p className={style.checkbox_text}>Drank</p>
                    <div className={`${style.checkbox_image} scale`}>
                      <svg
                        width="36"
                        height="47"
                        viewBox="0 0 36 47"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M34.6928 5.56716C34.436 4.76119 33.9224 3.95522 33.4088 3.14925C32.7667 2.47761 32.1247 1.9403 31.2258 1.53731C30.4554 1.13433 29.5566 1 28.6577 1H7.34228C6.44344 1 5.54459 1.13433 4.77416 1.53731C4.00372 1.9403 3.23328 2.61194 2.59125 3.28358C2.07762 3.95522 1.564 4.76119 1.30719 5.56716C1.05037 6.50746 0.921968 7.44776 1.05037 8.25373L4.51734 40.2239C4.64575 41.8358 5.41619 43.3134 6.57184 44.3881C7.7275 45.4627 9.26837 46 10.8092 46H25.1908C26.7316 46 28.2725 45.4627 29.4282 44.3881C30.5838 43.3134 31.3543 41.8358 31.4827 40.2239L34.9496 8.25373C35.078 7.44776 34.9496 6.50746 34.6928 5.56716ZM29.9418 19L27.6305 39.8209C27.5021 40.4925 27.2452 41.0298 26.7316 41.4328C26.218 41.8358 25.8328 42.1045 25.0623 42.1045H10.9377C10.0388 42.1045 9.65359 41.8358 9.26837 41.4328C8.75475 41.0298 8.36953 40.4925 8.36953 39.8209L6.05822 19V18.597H30.0702L29.9418 19ZM31.0974 7.85075L30.327 14.4328V14.7015H5.54459V14.4328L4.90256 7.85075C4.90256 7.71642 4.90256 7.71642 4.90256 7.58209C4.90256 7.31343 4.90256 7.04478 5.03097 6.77612C5.03097 6.37313 5.28778 6.10448 5.54459 5.83582C5.80141 5.56716 6.05822 5.29851 6.44344 5.16418C6.82866 5.02985 7.08547 5.02985 7.34228 5.02985H28.5293C28.9145 5.02985 29.2998 5.16418 29.5566 5.29851C29.8134 5.43284 30.1986 5.70149 30.4554 5.97015C30.7122 6.23881 30.8406 6.64179 30.969 6.91045C31.0974 7.1791 31.2258 7.44776 31.0974 7.85075ZM22.4942 36.3284C23.0078 36.3284 23.5215 36.0597 23.7783 35.791C24.1635 35.3881 24.2919 34.9851 24.2919 34.4478V25.3134C24.2919 24.7761 24.0351 24.2388 23.7783 23.9701C23.3931 23.5672 23.0078 23.4328 22.4942 23.4328C21.9806 23.4328 21.467 23.5672 21.2102 23.9701C20.8249 24.3731 20.6965 24.7761 20.6965 25.3134V34.3134C20.6965 34.8507 20.9533 35.3881 21.2102 35.6567C21.467 36.0597 21.9806 36.3284 22.4942 36.3284ZM13.5058 36.3284C14.0194 36.3284 14.533 36.0597 14.9182 35.791C15.3035 35.3881 15.4319 34.9851 15.4319 34.4478V25.3134C15.4319 24.7761 15.3035 24.2388 14.9182 23.9701C14.533 23.5672 14.0194 23.4328 13.5058 23.4328C12.9922 23.4328 12.4785 23.5672 12.2217 23.9701C11.8365 24.3731 11.7081 24.7761 11.7081 25.3134V34.3134C11.7081 34.8507 11.9649 35.3881 12.2217 35.6567C12.6069 36.0597 12.9922 36.3284 13.5058 36.3284Z"
                          fill="#091422"
                          stroke="#FDECD2"
                          stroke-width="0.5"
                        />
                      </svg>
                    </div>
                  </label>
                </div>
                <div className={style.checkbox_container}>
                  <label htmlFor="building">
                    <input
                      id="building"
                      type="radio"
                      name="needs"
                      className={style.checkbox}
                      onClick={(e) => setTypeNeed('Gebouw')}
                    />
                    <p className={style.checkbox_text}>Gebouw</p>
                    <div className={`${style.checkbox_image} scale`}>
                      <svg
                        width="47"
                        height="47"
                        viewBox="0 0 47 47"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M42.05 42.3V42.55H42.3H44.65C45.207 42.55 45.7411 42.7712 46.1349 43.1651C46.5288 43.5589 46.75 44.093 46.75 44.65C46.75 45.207 46.5288 45.7411 46.1349 46.1349C45.7411 46.5288 45.207 46.75 44.65 46.75H2.35C1.79304 46.75 1.2589 46.5288 0.865076 46.1349C0.471249 45.7411 0.25 45.207 0.25 44.65C0.25 44.093 0.471249 43.5589 0.865076 43.1651C1.2589 42.7712 1.79304 42.55 2.35 42.55H4.7H4.95V42.3V2.35C4.95 1.79305 5.17125 1.2589 5.56508 0.865076C5.9589 0.471249 6.49305 0.25 7.05 0.25H39.95C40.507 0.25 41.0411 0.471249 41.4349 0.865076C41.8288 1.2589 42.05 1.79304 42.05 2.35V42.3ZM25.85 42.55H26.1V42.3V32.9V32.65H25.85H21.15H20.9V32.9V42.3V42.55H21.15H25.85ZM37.6 42.55H37.85V42.3V4.7V4.45H37.6H9.4H9.15V4.7V42.3V42.55H9.4H16.45H16.7V42.3V30.55C16.7 29.993 16.9212 29.4589 17.3151 29.0651C17.7089 28.6712 18.243 28.45 18.8 28.45H28.2C28.757 28.45 29.2911 28.6712 29.6849 29.0651C30.0787 29.4589 30.3 29.993 30.3 30.55V42.3V42.55H30.55H37.6ZM30.55 13.85H28.2C27.643 13.85 27.1089 13.6287 26.7151 13.2349C26.3212 12.8411 26.1 12.307 26.1 11.75C26.1 11.193 26.3212 10.6589 26.7151 10.2651C27.1089 9.87125 27.643 9.65 28.2 9.65H30.55C31.107 9.65 31.6411 9.87125 32.0349 10.2651C32.4287 10.6589 32.65 11.193 32.65 11.75C32.65 12.307 32.4287 12.8411 32.0349 13.2349C31.6411 13.6287 31.107 13.85 30.55 13.85ZM30.55 23.25H28.2C27.643 23.25 27.1089 23.0287 26.7151 22.6349C26.3212 22.2411 26.1 21.707 26.1 21.15C26.1 20.593 26.3212 20.0589 26.7151 19.6651C27.1089 19.2712 27.643 19.05 28.2 19.05H30.55C31.107 19.05 31.6411 19.2712 32.0349 19.6651C32.4287 20.0589 32.65 20.593 32.65 21.15C32.65 21.707 32.4287 22.2411 32.0349 22.6349C31.6411 23.0287 31.107 23.25 30.55 23.25ZM18.8 13.85H16.45C15.893 13.85 15.3589 13.6287 14.9651 13.2349C14.5712 12.8411 14.35 12.307 14.35 11.75C14.35 11.193 14.5712 10.6589 14.9651 10.2651C15.3589 9.87125 15.893 9.65 16.45 9.65H18.8C19.357 9.65 19.8911 9.87125 20.2849 10.2651C20.6787 10.6589 20.9 11.193 20.9 11.75C20.9 12.307 20.6787 12.8411 20.2849 13.2349C19.8911 13.6287 19.357 13.85 18.8 13.85ZM18.8 23.25H16.45C15.893 23.25 15.3589 23.0287 14.9651 22.6349C14.5712 22.2411 14.35 21.707 14.35 21.15C14.35 20.593 14.5712 20.0589 14.9651 19.6651C15.3589 19.2712 15.893 19.05 16.45 19.05H18.8C19.357 19.05 19.8911 19.2712 20.2849 19.6651C20.6787 20.0589 20.9 20.593 20.9 21.15C20.9 21.707 20.6787 22.2411 20.2849 22.6349C19.8911 23.0287 19.357 23.25 18.8 23.25Z"
                          fill="#091422"
                          stroke="#FDECD2"
                          stroke-width="0.5"
                        />
                      </svg>
                    </div>
                  </label>
                </div>
                {!typeNeed == '' && (
                  <>
                    <div className={style.input_item}>
                      <div
                        className={`${style.input_container} ${style.input_title}`}
                      >
                        <label htmlFor="need" className={style.label}>
                          Wat voor {typeNeed.toLowerCase()} heb je nodig?
                          <span className={style.label_extra}>
                            (max 20 karakters)
                          </span>
                        </label>
                        <input
                          required
                          id="need"
                          minLength="0"
                          maxLength="20"
                          value={need}
                          type="text"
                          placeholder="De vraagstraat"
                          className={style.input}
                          onChange={(e) => setNeed(e.currentTarget.value)}
                        />
                      </div>
                      <div className={style.input_voorzien}>
                        <p
                          className={`${style.label_extra} ${style.label_extra__voorzien}`}
                        >
                          Is dit al voorzien?
                        </p>
                        <div className={style.need_buttons}>
                          <div className={style.need_toggles}>
                            <label
                              className={style.button_toggles}
                              htmlFor="true"
                            >
                              <input
                                id="true"
                                type="radio"
                                name="gotneed"
                                className={`${style.checkbox} ${style.checkbox_voorzien}`}
                                onClick={(e) => setGotNeed(true)}
                              />
                              <div
                                className={`${style.true_false} ${style.checkbox_true} scale`}
                              >
                                <img src="./assets/images/true_icon.svg" />
                              </div>
                            </label>
                            <label
                              className={style.button_toggles}
                              htmlFor="false"
                            >
                              <input
                                id="false"
                                type="radio"
                                name="gotneed"
                                className={`${style.checkbox} ${style.checkbox_voorzien}`}
                                defaultChecked
                                onClick={(e) => setGotNeed(false)}
                              />
                              <div
                                className={`${style.true_false} ${style.checkbox_false} scale`}
                              >
                                <img src="./assets/images/false_icon.svg" />
                              </div>
                            </label>
                          </div>

                          <label className={style.voorzien} htmlFor="voegtoe">
                            <input
                              id="voegtoe"
                              className={`${style.checkbox} scale`}
                              type="submit"
                              onClick={handleValidation}
                            />
                            <div className={style.button_voorzien}>
                              <p>Toevoegen</p>
                            </div>
                          </label>
                        </div>
                      </div>
                      <p className={style.error} ref={refNeed}></p>
                    </div>
                  </>
                )}
              </div>
              {data && (
                <>
                  {data.needs.length < 1 && (
                    <>
                      <p className={style.empty_add}>
                        Klik op een type om een benodigheid voor jouw project
                        toe te voegen!
                      </p>
                    </>
                  )}
                </>
              )}
              {data && (
                <>
                  {data.needs.length >= 1 && (
                    <>
                      <p className={style.empty_add}>
                        Bedankt voor het toevoegen! Je kan nog meer
                        benodigdheden toevoegen.
                      </p>
                    </>
                  )}
                </>
              )}
            </form>
            <div className={style.my_needs}>
              <div className={style.form_my__needs}>
                <h2 className={`${style.subtitle} ${style.subtitle_needs}`}>
                  Mijn benodigdheden
                </h2>
                {data && (
                  <div className={style.needs_list}>
                    {data.needs.map((need) => (
                      <div className={style.need_item}>
                        <li className={style.need_types}>
                          <img
                            src={`../../../../assets/images/${need.type.toLowerCase()}_icon__small.svg`}
                            alt={need.need}
                            className={style.need_image}
                          />
                          <p className={style.need_type__text}>{need.need}</p>
                        </li>
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
                              <button
                                className={`${style.button_toggles}`}
                                onClick={() => handleToggle(need)}
                              >
                                <div className={`${style.true_false} scale`}>
                                  <img src="./assets/images/false_icon.svg" />
                                </div>
                              </button>
                            </div>
                          )}
                          {!need.provided && (
                            <div className={style.need_toggles}>
                              <button
                                className={`${style.button_toggles}`}
                                onClick={() => handleToggle(need)}
                              >
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
                          <button
                            className={`${style.button} scale`}
                            onClick={() => handleDelete(need)}
                          >
                            <img src="./assets/images/delete_icon.svg" />
                          </button>
                        </div>
                      </div>
                    ))}
                    {data && (
                      <>
                        {data.needs.length < 1 && (
                          <div className={style.empty}>
                            <p className={style.need_empty}>
                              U heeft nog{' '}
                              <span className={style.need_empty__outline}>
                                geen
                              </span>{' '}
                              benodigdheden
                            </p>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className={style.part_end}>
          <div className={style.button_next}>
            <a href={'/profile'} className={style.button}>
              <div className={style.circle_button}>
                <img
                  className={style.button_image}
                  src="./assets/buttons/project_afronden_button.svg"
                />
              </div>
            </a>
          </div>
        </div>
      </article>
    </>
  );
};

const Step3 = ({ user }) => {
  const { loading, data } = useQuery(GET_PROJECT_BY_USER, {
    variables: { id: user.sub },
  });

  if (loading) {
    return <Loading props={'loading'} />;
  }
  if (data) {
    return <Needs project_id={data.users[0].projects[0].id} user={user} />;
  }
};
export default withApollo({ ssr: true })(Step3);
