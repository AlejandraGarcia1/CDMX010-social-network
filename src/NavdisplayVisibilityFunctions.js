// LI-LINKS DEL NAV//
const logoutLinkLi = document.getElementById('logoutLinkLi');
const loginLinkLi = document.getElementById('loginLinkLi');
const accountLinkLi = document.getElementById('accountLinkLi');
const homeLink = document.getElementById('hom');
const perfilLinkLi = document.getElementById('perfilLinkLi');

// Cuando el usuario se logea y entra al home esto es lo que ve:
export const navLinkVisibilityLogin = () => {
  logoutLinkLi.style.display = 'block';
  homeLink.style.display = 'block';
  perfilLinkLi.style.display = 'block';
  loginLinkLi.style.display = 'none';
  accountLinkLi.style.display = 'none';
};

// Cuando el usuario sale del home esto es lo que se ve
export const navLinkVisibilityWithoutLogin = () => {
  logoutLinkLi.style.display = 'none';
  homeLink.style.display = 'none';
  perfilLinkLi.style.display = 'none';
  loginLinkLi.style.display = 'block';
  accountLinkLi.style.display = 'block';
};
