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

import { templateLogin } from '../src/login.js';

describe('templateLogin', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="root"></div>';
  });

	test('renderiza templateLogin', () => {
		const div = document.getElementById('root');
		// const mockFirebase = {
		// 	auth: jest.fn() 
		// };
		templateLogin();		
		expect(div.innerHTML).toMatchSnapshot();
	})
})


// describe('login', () => {
// 	const mockFirebase = {
// 		auth: jest.fn() 
// 	};

//   it('debería ser una función', () => {
//     expect(typeof login(mockFirebase)).toBe('function');
//   });
// })