import Router from 'next/router';

const Login = () => {
  return (
<button class="scale profile-button" onClick={() => Router.push('/api/login')}>
<div class="nav-item">
  <img
  class="scale nav-item--image"
  src="./assets/images/login_icon.svg"
  alt=""
  />
</div>
<p class="nav-item--small">Inloggen</p>
</button>
  );
};

export default Login;
