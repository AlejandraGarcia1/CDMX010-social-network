import { loginFacebook } from './loginFacebook.js';
import { loginGoogle } from './loginGoogle.js';
import { loginVisibility } from './loginVisibility.js';
import { openModal } from './modal.js';
import { loginGithub } from './loginGithub.js';
import { ErrorLoginMail } from './modalError.js';
import { navLinkVisibilityWithoutLogin } from './NavdisplayVisibilityFunctions.js';

export const templateLogin = () =>{
	const template = `<div class="container-login">
    <div id="A-logo-container">
        <img id="A-logo" src="./images/logoGris.png" alt="Logo"> 
    </div>
    <form class="input-section" id="input-section-login">
        <div class="input-login">
            <input id="login-mail-input" class="A-input-mail" type="email" maxlength=50 placeholder="Email" required></input><br>
        </div>
        <div class="input-login">
            <input id="login-password-input" class="A-input-password" type="password" maxlength=16 placeholder="Password" required></input>
            <img src="./images/visibility.png" class="visibility" id="visibility-login-password">
        </div>
        <div class="check-login">
        <br>
        <input type="checkbox" class="checkin">  &nbsp; Recordar usuario</input></div>
        <div class="button-login">
            <button class="account-button" id="login-mail-button"> Iniciar Sesión</button>
            <a href="#" class="new-password">Recuperar contraseña</a>
        </div>
    </form>
    <div class="socialNet-login">
        <div class="singin">
            <a>Ingresar con:</a>
        </div>
        <div class="social">
            <img src="./images/fb.png" class="users" id="facebook-login">
            <img src="./images/github.png" class="users" id="github-login">
            <img src="./images/google.png" class="users" id="google-login">
        </div> 
    </div>
    <div class="register-login">
        <p>¿No tienes cuenta? <a href="#" id="accountLink-login" class="beUser">Regístrate</a></p>
    </div>
</div>`;

  const rootDiv = document.getElementById('root');
  rootDiv.innerHTML = template;
}

//Funcionalidad del templateLogin
export const login =  (firebase) => {
	const auth = firebase.auth();	
	templateLogin();
  loginWithMail(auth);
  navLinkVisibilityWithoutLogin();
}

// Iniciar sesión con el e-mail registrado.
export const loginWithMail = (auth) => {
  const singupForm = document.getElementById('input-section-login');
  singupForm.addEventListener('submit', (e) => {    
    e.preventDefault();
  });
  // El e-mail no se encuentra registrado.
  const accountLinkLogin = document.getElementById('accountLink-login');
  accountLinkLogin.addEventListener('click', () => {
    const accountLink = document.getElementById('acc');  
    accountLink.click();
  });
 
  const submitAccountButton = document.getElementById('login-mail-button');
  submitAccountButton.addEventListener('click', () => {  
    const loginMail = document.getElementById('login-mail-input').value;
    const loginPassword = document.getElementById('login-password-input').value;
    
    auth
      .signInWithEmailAndPassword(loginMail, loginPassword)
      // En el parametro del .then definimos el "userCredential"
      .then(() => {
        const homelink = document.getElementById('hom');
        homelink.click();
      })   
      .catch(() => {
        openModal(ErrorLoginMail);
      });
  });
  
  const showLoginPassword = document.getElementById('visibility-login-password');
  const loginPasswordInput = document.getElementById('login-password-input');
 
  loginVisibility(showLoginPassword, loginPasswordInput); 
  loginGoogle(auth);  
  loginFacebook(auth);
  loginGithub(auth);
};
