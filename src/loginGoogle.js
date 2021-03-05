import { openModal } from './modal.js';
import { ErrorLoginGoogle } from './modalError.js';

export const loginGoogle = (auth) => { 
  const btnGoogle = document.getElementById('google-login');
  btnGoogle.addEventListener('click', () => {    
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)      
      .then(() => {
        const homelink = document.getElementById('hom');
        homelink.click();
      })      
      .catch(() => {
        openModal(ErrorLoginGoogle);
      });
  });
};
