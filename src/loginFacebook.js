import { ErrorLoginFacebook } from './modalError.js';
import { openModal } from './modal.js';

export const loginFacebook = (auth) => {  
  const btnFacebook = document.getElementById('facebook-login');
  btnFacebook.addEventListener('click', () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    auth.signInWithPopup(provider)    
      .then(() => {
        const homelink = document.getElementById('hom');
        homelink.click();
      })
      .catch(() => {
        openModal(ErrorLoginFacebook);
      });
  });
};
