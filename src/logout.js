import { onNavigate } from './routing.js';
import { auth } from './firebase.js';

export const logoutfunction = () => {
  const btnlogout = document.getElementById('logout');
  btnlogout.addEventListener('click', () => {
    auth.signOut().then(() => {
      onNavigate('/');
    });
  });
};
