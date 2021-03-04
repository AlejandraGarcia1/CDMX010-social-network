import { home } from './home.js';
import { login, loginWithMail } from './login.js';
import { createPost, perfil, reloadPost } from './perfil.js';
import { account, createAccount } from './account.js';
import { navLinkVisibilityLogin, navLinkVisibilityWithoutLogin } from './NavdisplayVisibilityFunctions.js';
import { validPost } from './postValidation.js';
import { onAuthDataUser } from './userColection.js';

// OBJETO QUE CONTIENE LOS PATHNAMES DE LAS SECCIONES
export const routes = {
  '/home': home,
  '/': login,
  '/account': account,
  '/perfil': perfil,
};

// AQUI INDICAMOS QUE EN EL DIV DEL HTML, SE VAN A RENDARIZAN TODAS LAS SECCIONES
export const rootDiv = document.getElementById('root');


// FUNCIÓN QUE RENDERIZA EL PATHNAME INDICADO
// El pathname nos muestra la "route" en la que nos encontramos actualmente


export const renderRoutes = (pathname, rootDiv) => {
 rootDiv.innerHTML = routes[pathname];
 console.log(rootDiv)
}

export const onNavigate = (pathname) => {
  // Con "history.pushState()", vamos a poder navegar entre secciones.
  // Cuenta con 3 parámetros: 1.Estado ({}): Es el objeto con el nuevo
  // registro del historial, 2.Titulo (pathname): El nombre que le vamos
  // a dar, 3. Ruta (window.location.origin + pathname): Ruta que vamos a
  // empujar, para poder navegar en ella.
  window.history.pushState(
    {},
    pathname,
    window.location.origin + pathname,
  );
  // Definimos que en el Div del HTML, se van a mostrar las páginas
  // en donde vamos a estar navegando.
  // rootDiv.innerHTML = routes[pathname];
  renderRoutes(pathname);
  if (pathname === '/') {
    // console.log('Ingresar')
    loginWithMail();
    navLinkVisibilityWithoutLogin();
  } else if (pathname === '/account') {
    // console.log('Registrarse');
    createAccount();
    navLinkVisibilityWithoutLogin();
  } else if (pathname === '/home') {
    navLinkVisibilityLogin();
    // console.log('Home');
    onAuthDataUser();
    validPost();
    createPost();
    reloadPost();
  } else if (pathname === '/perfil') {
    // console.log('Perfil');
    navLinkVisibilityLogin();
    onAuthDataUser();
    validPost();
    createPost();
    reloadPost();
  }
};

// EVENTO CLICK, DONDE SE DEFINE SE RENDERIZARÁ EL PATHNAME AL QUE QUEREMOS ACCEDER
export function getRouter(linkId, PathName) {
  linkId.addEventListener('click', () => {
    onNavigate(PathName);
    return false;
  });
}
