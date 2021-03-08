import { createPost, reloadPost } from './perfil.js';
import { navLinkVisibilityLogin } from "./NavdisplayVisibilityFunctions.js";
import { validPost } from './postValidation.js';
import { onAuthDataUser } from './userColection.js';

export const home = (firebase)=>{
	const auth = firebase.auth();
	const firestore = firebase.firestore();
  const template = `<div class="flex-container">
    <div class="flex-menu">
        <div class="subject">
            <h3 class="title">GirlTechSOS</h3>
            <p class="menu1"><img class="menuIcons" src="./images/friendsIcon.png">&nbsp;&nbsp; Amigos</p>
            <p class="menu1"><img class="menuIcons" src="./images/favFolderIcon.png">&nbsp;&nbsp; Favoritos</p>
            <p class="menu1"><img class="menuIcons" src="./images/helpIcon.png">&nbsp;&nbsp; Ayuda</p>
            <p class="menu1"><img class="menuIcons" src="./images/configIcon.png">&nbsp;&nbsp; Configuración</p>            
            <p class="menu1"><img class="menuIcons" src="./images/woman.png">&nbsp;&nbsp;GirlTechSOS</p>
        </div>
    </div>
    <div class="flex-perfil">
        <div class="container-home">
            <div class="head-home">
                <div class="imgContainer-home">
                    <input type="file" id="my-file" style="display-none"></input>
                    <img src="./images/avatarProfile.png" class="image-home">                
                </div>
                <div class="info-home">
                    <div class="userName-home"><p class="pNameUser-home" id="p-userName">Nombre de usuario</p></div>
                </div>
            </div>
            <div class="content">       
            <div class="post">
                <input type="text" placeholder="Nueva publicación" class="newPost" id="newPostPerfil"></input>
                <button class="enter" type"submit" id="publicar">Publicar</button>
            </div>
            <div id="postsContainer"></div>
            </div>
        </div>
        </div>
        <div class="flex-noticias">
            <div class="noticias-section">
                <p class="title">Noticias</p>
                <p>Junto con <strong>Citibanamex</strong> hemos recaudado <strong>$24.6 MDP</strong> para la educación en Laboratoria...</p>
                <img src="./images/Laboratoria1.jpg" class="notice"> 
                <p>¡Bienvenidas a la generación <strong>MX010!</strong></p>
                <img src="./images/Dia1.png" class="notice">                
            </div>
        </div>
    </div>`;

		const rootDiv = document.getElementById('root');
		rootDiv.innerHTML = template;

		// renderRoutes(template);
		navLinkVisibilityLogin();
		onAuthDataUser(auth);
		validPost();
		createPost(auth, firestore);
		reloadPost(auth,firestore);
};

// export const renderRoutes= (template) => {
// 	const rootDiv = document.getElementById('root');
//   rootDiv.innerHTML = template;
// };