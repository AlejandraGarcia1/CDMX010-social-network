import { home } from './home.js';
import { login } from './login.js';
import { perfil } from './perfil.js';
import { account } from './account.js';

// OBJETO QUE CONTIENE LOS PATHNAMES DE LAS SECCIONES
export const routes = {
  '/home': home,
  '/': login,
  '/account': account,
  '/perfil': perfil,
};

// Navegamos en la ruta seleccionada, la renderizamos y llamamos sus funciones.
export const onNavigate = (pathname) => {
  window.history.pushState(		
    {},
    pathname,
    window.location.origin + pathname,
  );

  const builder = routes[pathname];
	console.log(builder);
	//Agregamos Firebase porque el pathname es una función
	builder(firebase);
};

// EVENTO CLICK, DONDE SE DEFINE SE RENDERIZARÁ EL PATHNAME AL QUE QUEREMOS ACCEDER
export function getRouter(linkId, PathName) {
  linkId.addEventListener('click', () => {
    onNavigate(PathName);    
  });
}
