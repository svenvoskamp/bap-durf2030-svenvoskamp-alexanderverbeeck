import React, { useRef, useState, useEffect } from 'react';
import Mouse from '../../components/Mouse';

import { withApollo } from '../../lib/withApollo';

import { useRouter } from 'next/router';

const User = ({}) => {
  const router = useRouter();
  console.log(router.query.id);
  return (
    <>
      <Mouse></Mouse>
      {/* <Nav user={user}></Nav> */}
    </>
  );
};

export default withApollo({ ssr: true })(User);
