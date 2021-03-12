import { cancelEditPost, validEditedPost, validPost } from './postValidation.js';
import { templatePost } from './templatePost.js';
import { confirmDelete } from './modalError.js';
import { openModal, closeModalLink } from './modal.js';
import { navLinkVisibilityLogin } from './NavdisplayVisibilityFunctions.js';
import { onAuthDataUser } from './userColection.js';

export const perfil = (firebase) =>{
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
        <div class="container">
            <div class="imgContainer">
                <img src="./images/avatarProfile.png" class="image-perfil">
            </div>
            <div class="info-perfil">
                    <div class="userName-perfil" id="p-userName">Nombre de usuario</div>
                    <div class="about">Información sobre el usuario</div>
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
	navLinkVisibilityLogin();
	onAuthDataUser(auth);
	validPost();
	createPost(auth, firestore);
	reloadPost(auth,firestore);
}


// ENVIAR LA INFORMACIÓN OBTENIDA AL FIREBASE
const savePost = (post, usermail, uid, likes, firestore) => {
  firestore.collection('posts').doc().set({
    post,
    usermail,
    uid,
    likes,
  });
};

// DA EL ID A FIREBASE PARA ELIMINAR POSTS
const deletePosts = (id, firestore) => firestore.collection('posts').doc(id).delete();
// OBTIENE EL DATO DEL POST DEPENDIENDO DEL ID QUE SE LE ESTE PASANDO
const getpost = (id, firestore) => firestore.collection('posts').doc(id).get();
// ACTUALIZA EL POST
const updatePosts = (id, updatedPost, firestore) => firestore.collection('posts').doc(id).update(updatedPost);
// Cuando de crea un nuevo post. --> onSnapshot se refiere a que cada vez que algun post se agregue,
// elimine o cambie se ejecutará la fucnión de "callback"
const onGetPost = (firestore, callback) => firestore.collection('posts').onSnapshot(callback);

// ELIMINAR POSTS
const EliminarPost = (firestore) => {
  const btnsDelete = document.querySelectorAll('.btn-delete');
  btnsDelete.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      openModal(confirmDelete);
      const btnAcept = document.getElementById('btnAcept');
      btnAcept.addEventListener('click', () => {
        deletePosts(e.target.dataset.id, firestore);
        closeModalLink();
      });
    });
  });
};

let editStatus = true;
const EditPosts = (firestore) => {
  const btnEdit = document.querySelectorAll('.btn-edit');
  btnEdit.forEach((btn) => {
    btn.addEventListener('click', async (e) => {
      // define los ids individuales
      const postEdit = await getpost(e.target.dataset.id, firestore);			
      const id = postEdit.id;
      const enableWrite = document.getElementById(`text-post-${id}`);
      const changeIcon = document.getElementById(`btn-edit-${id}`);
      const interactionContainer = document.getElementById(`interaction-container-${id}`);
      const cancelEditContainer = document.getElementById(`cancelEdit-container-${id}`);
      if (editStatus === true) {
        changeIcon.src = './images/save.png';
        enableWrite.removeAttribute('readonly');
        enableWrite.focus();
        validEditedPost(changeIcon, enableWrite);
        interactionContainer.style.display = 'none';
        cancelEditContainer.style.display = 'flex';
        editStatus = false;
      } else if (!editStatus) {
        await updatePosts(id, {
          post: enableWrite.value,
        }, firestore);
        changeIcon.src = './images/edit.png';
        // enableWrite.setAttribute('readonly',true); // OTRAOPCIÓN(NO BORRAR)
        enableWrite.readOnly = true;
        editStatus = true;
        interactionContainer.style.display = 'flex';
        cancelEditContainer.style.display = 'none';
      }
      const dataPost = postEdit.data();
      const textPost = dataPost.post;
      cancelEditPost(id, textPost);
    });
  });
};

const likesInteraction = (auth, firestore) => {
  const imgLike = document.querySelectorAll('.like');
  imgLike.forEach((btn) => {
    btn.addEventListener('click', async (e) => {
      // define los ids indivisuales
      const postData = await getpost(e.target.dataset.id, firestore);
      const id = postData.id;
      const user = auth.currentUser;
      const mailUser = user.email;
      const dataPost = postData.data();
      const likesArray = dataPost.likes;
      let likeUser = '';
      likesArray.forEach((mailU) => {
        if (mailU === mailUser) {
          likeUser = mailU;
        }
      });
      if (likeUser === '') {
        likesArray.push(mailUser);
      } else {
        const positionMail = likesArray.indexOf(likeUser);
        likesArray.splice(positionMail, 1);
      }
      await updatePosts(id, {
        likes: likesArray,
      }, firestore);
    });
  });
};

// RENDERIZAR LA INFORMACIÓN OBTENIDA DE COLLECIÓN POSTS
export const reloadPost = (auth, firestore) => {
  const postContainer = document.getElementById('postsContainer');
  postContainer.innerHTML = '';
  // SE EJECUTA CADA QUE DETECTA UN CAMBIO EN LA COLECCIÓN
  onGetPost(firestore, (querySnapshot) => {
    postContainer.innerHTML = '';
    querySnapshot.forEach((doc) => {
      const idPost = doc.id;
      const postsData = doc.data();
      const likesArray = postsData.likes;
      const likesCounter = likesArray.length;
      const user = auth.currentUser;
      const mailUser = user.email;
      const likeUser = likesArray.indexOf(mailUser);
      let srcLike = './images/like.png';
      if (likeUser === -1) {
        srcLike = './images/like.png';
      } else {
        srcLike = './images/likeAzul.png';
      }
      postContainer.innerHTML += templatePost(postsData, idPost, likesCounter, srcLike);
      const postOwner = postsData.usermail;
      if (postOwner !== mailUser) {
        document.getElementById(`btn-delete-${idPost}`).style.display = 'none';
        document.getElementById(`btn-edit-${idPost}`).style.display = 'none';
        document.getElementById(`namePostOwner-container-${idPost}`).style.paddingTop = '5%';
      }
    });
    EliminarPost(firestore);
    EditPosts(firestore);
    likesInteraction(auth, firestore);
  });
};

// Crear un post en la colección 'posts' en Friebase //
export const createPost = (auth,firestore) => {
  const btnPublicar = document.getElementById('publicar');
  const newPostInput = document.getElementById('newPostPerfil');
  btnPublicar.addEventListener('click', async () => {
    const newPostText = newPostInput.value;
    const user = auth.currentUser;
    const likes = [];
    await savePost(newPostText, user.email, user.uid, likes, firestore);
    document.getElementById('newPostPerfil').value = '';
    btnPublicar.style.display = 'none';
    document.querySelectorAll('.post')[0].style.marginBottom = '10%';
  });
};
