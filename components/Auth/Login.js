import Router from 'next/router';

const Login = () => {
  return (
<button class="profile-button scale" onClick={() => Router.push('/api/login')}>
<div class="nav-item">
  <img
  class="nav-item--image scale"
  src="./assets/images/login_icon.svg"
  alt=""
  />
</div>
<p class="nav-item--small">Inloggen</p>
</button>
  );
};

export default Login;
