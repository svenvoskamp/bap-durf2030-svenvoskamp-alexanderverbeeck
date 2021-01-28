import Router from 'next/router';

const Login = () => {
  return (
<button class="profile-button scale" onClick={() => Router.push('/api/login')}>
<div class="nav-item">
  <svg className="nav-item--image scale" width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.998 7.19955L11.9988 4.00016L11.9988 6.3997L4.80021 6.3997L4.80021 7.99939L11.9988 7.99939L11.9988 10.3989L15.998 7.19955Z" fill="#FDECD2"/>
    <path d="M7.19885 14.3989C8.14464 14.4015 9.08156 14.2164 9.95532 13.8544C10.8291 13.4923 11.6223 12.9605 12.2891 12.2897L11.1581 11.1587C10.1007 12.2161 8.69456 12.7992 7.19885 12.7992C5.70314 12.7992 4.29701 12.2161 3.23961 11.1587C2.18222 10.1013 1.59913 8.6952 1.59913 7.19949C1.59913 5.70378 2.18222 4.29765 3.23962 3.24026C4.29701 2.18286 5.70314 1.59978 7.19885 1.59978C8.69456 1.59978 10.1007 2.18286 11.1581 3.24026L12.2891 2.10928C10.9301 0.74954 9.12248 8.63694e-05 7.19885 8.62012e-05C5.27522 8.6033e-05 3.46757 0.749539 2.10863 2.10928C0.748898 3.46821 -0.000558151 5.27586 -0.000558319 7.19949C-0.000558487 9.12312 0.748897 10.9308 2.10863 12.2897C2.77539 12.9605 3.56862 13.4923 4.44238 13.8544C5.31614 14.2164 6.25305 14.4015 7.19885 14.3989V14.3989Z" fill="#FDECD2"/>
  </svg>
</div>
<p class="nav-item--small">Inloggen</p>
</button>
  );
};

export default Login;
