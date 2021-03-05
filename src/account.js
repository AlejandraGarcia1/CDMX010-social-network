import { loginVisibility } from './loginVisibility.js';
import { openModal } from './modal.js';
import { ErrorAccount, SuccessAccount } from './modalError.js';
import { navLinkVisibilityWithoutLogin } from './NavdisplayVisibilityFunctions.js';
import { saveInfoUser } from './userColection.js';

export const account = (firebase) => {
	const auth = firebase.auth();
	const firestore = firebase.firestore();
	const template = `<div class="container-login">
    <div id="A-logo-container">
        <img id="A-logo" src="./images/logoGris.png" alt="Logo"> 
    </div>
    <form class="input-section" id="input-section-account">
        <div class="input-login">
            <input id="A-input-nameUser" class="A-input-nameUser" type="text" maxlength=30 placeholder="Nombre de usuario" required></input>
            <br>
        </div>
        <div class="input-login">
            <input id="A-input-mail" class="A-input-mail" type="email" maxlength=50 placeholder="Correo electrónico" required></input>
        </div>
        <div class="input-login">
            <input id="A-input-password" class="A-input-password" type="password" maxlength=16 placeholder="Contraseña" required></input>
            <img src="./images/visibility.png" class="visibility" id="visibility-account-password">          
        </div>
        <div class="error-input-container"><p class="A-error-input" id="A-error-password">La contraseña debe tener al menos 8 caracteres</p></div>
        <div class="input-login">
            <input id="A-input-password-confirm" class="A-input-password-confirm" type="password" maxlength=16 placeholder="Confirmar contraseña" required></input>
            <img src="./images/visibility.png" class="visibility" id="visibility-confirm-password"> 
        </div>
        <div class="error-input-container"><p class="A-error-input" id="A-error-confirmPassworrd">Las contraseñas no coinciden</p></div>
        <div class="singin">
            <a class="aboutUser">La siguiente información aparecerá en tu perfil:</a>
        </div>
        <div class="input-login">
            <input id="A-input-aboutme" class="A-input-aboutme" type="text" maxlength=140 placeholder="Sobre mi"></input>
        </div>
        <div class="button-login">
            <button class="account-button" id="A-createAcount-button" type"submit">Crear cuenta</button>
        </div>
      </form>
  </div>`;
	
	const rootDiv = document.getElementById('root');
  rootDiv.innerHTML = template; 
	createAccount(auth, firestore);
  navLinkVisibilityWithoutLogin();
} 

// Usuario se registra con correo y contraseña.
export const createAccount = (auth, firestore) => {  
  const accountForm = document.getElementById('input-section-account');  
  accountForm.addEventListener('submit', (e) => {
    e.preventDefault();
  });
  
  const submitAccountButton = document.getElementById('A-createAcount-button');
  submitAccountButton.addEventListener('click', () => {

    const newMail = document.getElementById('A-input-mail').value;
    const createPassword = document.getElementById('A-input-password').value;
    const inputConfirmPassword = document.getElementById('A-input-password-confirm').value;
    const nameUser = document.getElementById('A-input-nameUser').value;
    const aboutUser = document.getElementById('A-input-aboutme').value;    
    document.getElementById('A-error-password').style.display = 'none';
    document.getElementById('A-error-confirmPassworrd').style.display = 'none';
    
    if (nameUser !== '' && createPassword.length >= 8) {      
      if (createPassword === inputConfirmPassword) {        
        auth
          // Creación del usuario en Firebase, obteniendo el userCredential.
          .createUserWithEmailAndPassword(newMail, createPassword)          
          .then((userCredential) => {
            openModal(SuccessAccount);            
            const loginlink = document.getElementById('log');
            loginlink.click();
            const uidUser = userCredential.user.uid;
            saveInfoUser(newMail, uidUser, createPassword, nameUser, aboutUser, 'urlImg', firestore);
          })
          .catch(() => {
            openModal(ErrorAccount);
          });
      } else {        
        document.getElementById('A-error-confirmPassworrd').style.display = 'block';
      }
    } else if (createPassword.length < 8) {      
      document.getElementById('A-error-password').style.display = 'block';
    }
  });
  
  const showAccountPassword = document.getElementById('visibility-account-password');
  const accountPasswordInput = document.getElementById('A-input-password');
  const showConfirmPassword = document.getElementById('visibility-confirm-password');
  const confirmPasswordInput = document.getElementById('A-input-password-confirm');
 
  loginVisibility(showAccountPassword, accountPasswordInput);
  loginVisibility(showConfirmPassword, confirmPasswordInput);
};
