import { ErrorLoginGithub } from './modalError.js';
import { openModal } from './modal.js';

export const loginGithub = (auth) => {  
  const btnGithub = document.getElementById('github-login');
  btnGithub.addEventListener('click', () => {   
    const provider = new firebase.auth.GithubAuthProvider();
    auth
      .signInWithPopup(provider)
      .then(() => {
        const homelink = document.getElementById('hom');
        homelink.click();
      })
      .catch(() => {
        openModal(ErrorLoginGithub);
      });
  });
};
