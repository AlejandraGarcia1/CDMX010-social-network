// importamos la funcion que vamos a testear
import { renderRoutes, rootDiv } from '../src/routing.js';
import { login } from '../src/login.js'
import { createAccount } from '../src/account.js'



//Navegar entre las pantallas
describe('navegacion', () => {
	const navegacion = renderRoutes('/', rootDiv);
	const loginPage = login;
	console.log(rootDiv)
//	console.log(navegacion);
	console.log(loginPage);
  it('Asegurarnos que el usuario pueda navegar entre las pantallas', () => {
    expect(navegacion.outerHTML).toBe(loginPage);
  });
});

// //Mensaje de error cuando un usuario confirma mal su contraseña al momento de registrarse
// describe('confirm', () => {
// 	const confirm = createAccount();
// 	it('Asegurarnos que el usuario escriba su contraseña igual', () => {
// 		expect(createPassword).toEqual(inputConfirmPassword);
// 	});
// });