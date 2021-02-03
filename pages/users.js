import React, { useRef, useState, useEffect } from 'react';
import Mouse from '../components/Mouse';
import Project from '../components/Project';
import gql from 'graphql-tag';
import { withApollo } from '../lib/withApollo';
import { ApolloClient } from 'apollo-client';
import { useQuery } from '@apollo/react-hooks';
import Nav from '../components/Nav';
import { set } from 'mobx';
import style from '../css/projects.module.css';
import Loading from '../components/Loading/Loading';
import { useFetchUser } from '../lib/user';

const Projects = ({ users }) => {
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
  console.log(sectors);

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
    console.log(type);
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
      {/* <Nav user={user}></Nav> */}
      <div>
        <label htmlFor="alles">
          <input
            id="alles"
            type="radio"
            name="type"
            defaultChecked
            onClick={(e) => handleType('alles')}
          />
          <p>Alle fase's</p>
        </label>
        <label htmlFor="individu">
          <input
            id="individu"
            type="radio"
            name="type"
            className="type"
            onClick={(e) => handleType(false)}
          />
          <p>individu</p>
        </label>
        <label htmlFor="bedrijven">
          <input
            id="bedrijven"
            type="radio"
            name="type"
            className="type"
            onClick={(e) => handleType(true)}
          />
          <p>bedrijf</p>
        </label>
      </div>
      <div>
        <select
          name="sector"
          id="sector"
          className="type"
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
      <input
        required
        id="search"
        min="0"
        max="100"
        value={search}
        type="text"
        placeholder="Zoek gebruiker"
        onChange={(e) => setSearch(e.currentTarget.value)}
      />
      <button onClick={reset}>Reset</button>
      <ul>
        {newUsers.map((user) => (
          <>
            {user.first_name && user.first_name != 'Admin' && (
              <a href={`/user/${user.id}`}>
                <li key={user.id}>
                  {user.company && (
                    <>
                      <p>{user.company_name}</p>
                      <p>{user.department}</p>
                    </>
                  )}
                  {!user.company && (
                    <>
                      <p>{user.first_name}</p>
                      <p>{user.last_name}</p>
                    </>
                  )}
                  <p>{user.sector}</p>
                </li>
              </a>
            )}
          </>
        ))}
      </ul>
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

export default withApollo({ ssr: false })(Projects);
