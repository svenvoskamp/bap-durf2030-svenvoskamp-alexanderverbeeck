import React, { useRef, useState, useEffect } from 'react';
import Mouse from '../components/Mouse';
import Project from '../components/Project';
import gql from 'graphql-tag';
import { withApollo } from '../lib/withApollo';
import { ApolloClient } from 'apollo-client';
import { useQuery } from '@apollo/react-hooks';
import Nav from '../components/Nav';
import { set } from 'mobx';
import style from '../css/users.module.css';
import Loading from '../components/Loading/Loading';
import { useFetchUser } from '../lib/user';
import User from '../components/Users/User/User';
const Users = ({ users }) => {
  const { user, loading } = useFetchUser();
  const [newUsers, setNewUsers] = useState(users);
  const [type, setType] = useState('alles');
  const [sector, setSector] = useState(0);
  const [search, setSearch] = useState('');

  let sectorlist = [];
  users.map((user) => {
    if (user.first_name) {
      sectorlist.push(user.sector);
    }
  });

  const sectors = [...new Set(sectorlist)];

  useEffect(() => {
    filter();
  }, [type]);

  useEffect(() => {
    filter();
  }, [sector]);

  useEffect(() => {
    filter();
  }, [search]);

  const handleType = (type) => {
    setType(type);
  };

  const handleSector = (sector) => {
    setSector(sector);
  };

  const reset = () => {
    const types = document.querySelectorAll('.type');
    types.forEach((type) => {
      if (type.checked) {
        type.checked = false;
      }
    });
    const sectors = document.querySelectorAll('.sector');
    sectors.forEach((sector) => {
      if (sector.selected) {
        sector.selected = false;
      }
    });

    setSector(0);
    setType('alles');
    setSearch('');
  };

  const filter = () => {
    if (sector == 0 && type != false && type != true && search == '') {
      setNewUsers(users);
    } else {
      let filter = users;
      if (search != '') {
        const keyword = search.toLowerCase();
        filter = filter.filter(function (x) {
          if (x.first_name) {
            if (x.company) {
              x = x.company_name.toLowerCase();
              return x.indexOf(keyword) > -1;
            }
            if (!x.company) {
              if (x.first_name) {
                x = x.first_name.toLowerCase();
                return x.indexOf(keyword) > -1;
              }
            }
          }
        });
      }
      if (type != 'alles') {
        filter = filter.filter((x) => x.company == type);
      }
      if (sector != 0) {
        filter = filter.filter((x) => x.sector == sector);
      }
      setNewUsers(filter);
    }
  };
  return (
    <>
      <Mouse></Mouse>
      <Nav user={user}></Nav>
      <article className={style.part}>
        <div className={style.part_header}>
          <h1 className={style.title}>
            durf 2030.
            <span className={style.title_outline}>community.</span>
          </h1>

          <div className={style.part_filter}>
            <div class={style.filter_search}>
              <label htmlFor="search">
                <img
                  className={style.search_image}
                  src="./assets/images/search_icon.svg"
                />
              </label>
              <input
                required
                id="search"
                min="0"
                max="100"
                value={search}
                type="text"
                placeholder="Zoek gebruiker"
                className={`${style.input_search} scale`}
                onChange={(e) => setSearch(e.currentTarget.value)}
              />
            </div>
            <div className={style.filter_fase}>
              <label htmlFor="alles">
                <input
                  id="alles"
                  type="radio"
                  name="type"
                  defaultChecked
                  className={`${style.input_none} ${style.input_radio}`}
                  onClick={(e) => handleType('alles')}
                />
                <p className={`${style.filter_radio} scale`}>Iedereen</p>
              </label>
              <label htmlFor="bedrijven">
                <input
                  id="bedrijven"
                  type="radio"
                  name="type"
                  className={`${style.input_none} ${style.input_radio}`}
                  onClick={(e) => handleType(true)}
                />
                <p className={`${style.filter_radio} scale`}>Bedrijven</p>
              </label>
              <label htmlFor="individu">
                <input
                  id="individu"
                  type="radio"
                  name="type"
                  className={`${style.input_none} ${style.input_radio}`}
                  onClick={(e) => handleType(false)}
                />
                <p
                  className={`${style.filter_radio} ${style.filter_radio__last} scale`}
                >
                  Individuen
                </p>
              </label>
            </div>
            <div className={style.filter_selects}>
              <select
                name="sector"
                id="sector"
                className={`${style.filter_select} scale`}
                onChange={(e) => handleSector(e.currentTarget.value)}
              >
                <option value="">Sector</option>
                {sectors.map((sector) => (
                  <option className="sector" value={sector}>
                    {sector}
                  </option>
                ))}
              </select>
            </div>
            <div className={style.filter_delete}>
              <button
                className={`${style.delete_button} scale`}
                onClick={reset}
              >
                <img
                  className={style.delete_filter}
                  src="./assets/images/delete_filter.svg"
                />
                <p className={style.delete_filter__small}>Verwijder filter</p>
              </button>
            </div>
          </div>
        </div>
        <div className={style.part_content}>
          <ul className={style.users}>
            {newUsers.map((user) => (
              <>
                {user.first_name && user.first_name != 'Admin' && (
                  <User key={user.id} user={user}></User>
                )}
              </>
            ))}
          </ul>
          {newUsers.length < 1 && (
            <div className={style.empty_state}>
              <p className={style.empty_state__text}>
                Er zijn{' '}
                <span className={style.empty_state__text__outline}>geen</span>{' '}
                gebruikers gevonden
              </p>
              <div className={style.empty_button}>
                <div className={style.empty_state__buttons}>
                  <button
                    className={`${style.empty_state__button} scale`}
                    onClick={reset}
                  >
                    Verwijder filter
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </article>
    </>
  );
};

export async function getServerSideProps() {
  const apollo = require('../lib/apolloClient'); // import client
  var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
  var xhr = new XMLHttpRequest();
  const GET_USERS = gql`
    query MyQuery {
      users {
        name
        nickname
        sector
        company
        company_name
        department
        city
        first_name
        last_name
        id
      }
    }
  `;
  const client = apollo.default(); //initialize client

  const { data, error } = await client.query({
    query: GET_USERS,
  });

  if (!data || error) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      users: data.users,
    }, // will be passed to the page component as props
  };
}

export default withApollo({ ssr: false })(Users);
