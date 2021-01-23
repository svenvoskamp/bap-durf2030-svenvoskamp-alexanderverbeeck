import Router from 'next/router';
import style from "./login.module.css";

const Login = () => {
  return (
<button className={`${style.profile_button} ${style.scale}`} onClick={() => Router.push('/api/login')}>
<div className={style.nav_item}>
  <img
  className={`${style.nav_item__image} ${style.scale}`}
  src="./assets/images/login_icon.svg"
  alt=""
  />
</div>
<p className={style.nav_item__small}>Inloggen</p>
</button>
  );
};

export default Login;
