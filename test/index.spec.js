// importamos la funcion que vamos a testear
// // import { renderRoutes } from '../src/routing.js';
// import { login } from '../src/login.js'



// describe('navegacion', () => {
// 	// const navegacion = renderRoutes('/');
// 	const loginPage = login;
// //	console.log(navegacion);
// 	console.log(loginPage);
//   it('Asegurarnos que el usuario pueda navegar entre las pantallas', () => {
//     expect(navegacion.outerHTML).toBe(loginPage);
//   });
// });

import { login } from '../src/login.js';

describe('login', () => {
  it('debería ser una función', () => {
    expect(typeof login).toBe('function')

  });
});