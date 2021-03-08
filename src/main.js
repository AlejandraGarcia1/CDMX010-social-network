import { getRouter, onNavigate } from './routing.js';
import { logoutfunction } from './logout.js';

// RENDERIZAR EL PATHNAME ACTUAL POR DEFAULT AL RECARGAR LA PÁGINA//
const currentPathname = window.location.pathname;
onNavigate(currentPathname);

// Enlaces para acceder a las secciones
const loginLink = document.getElementById('log');
const accountLink = document.getElementById('acc');
const homeLink = document.getElementById('hom');
const perfilLink = document.getElementById('per');

// Te llevan al pathname, según el link que se seleccione.
getRouter(loginLink, '/');
getRouter(accountLink, '/account');
getRouter(homeLink, '/home');
getRouter(perfilLink, '/perfil');
logoutfunction();

// Mostrar el navbar hamburguesa
const desplegar = document.getElementById('menu');
desplegar.onclick = () => {
  const navbar = document.getElementById('nav');
  navbar.classList.toggle('show');
};
