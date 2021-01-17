import Router from 'next/router';

const Login = () => {
  return (
    <button
      onClick={() => {
        Router.push('/api/login');
      }}
    >
      Log In
    </button>
  );
};

export default Login;
