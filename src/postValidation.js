// EVITAR QUE SE PUBLIQUEN POST EN BLANCO O VACÍOS
export const validPost = () => {
  const btnPublicar = document.getElementById('publicar');
  const newPostInput = document.getElementById('newPostPerfil');
  const marginBottomInput = document.querySelectorAll('.post')[0];
  marginBottomInput.style.marginBottom = '10%';
  btnPublicar.style.display = 'none';
  newPostInput.addEventListener('keyup', () => {
    const inputString = document.getElementById('newPostPerfil').value;
    // let asciiValidation = (/[u033-u255]/); /// También esta opción funciona(NO BORRAR :3)
    const asciiValidation = new RegExp(/[!-□]/g);
    const stringValidation = asciiValidation.test(inputString);
    if (stringValidation === true) {
      btnPublicar.style.display = 'block';
      marginBottomInput.style.marginBottom = '0%';
    } else {
      btnPublicar.style.display = 'none';
      marginBottomInput.style.marginBottom = '10%';
    }
  });
};

// EVITA QUE AL EDITAR UN POST, ESTE POST QUEDE VACÍO.
export const validEditedPost = (changeIcon, enableWrite) => {
  changeIcon.style.display = 'block';
  enableWrite.addEventListener('keyup', () => {
    const textEdit = enableWrite.value;
    const asciiValidation = new RegExp(/[!-□]/g);
    const stringValidation = asciiValidation.test(textEdit);
    if (stringValidation === true) {
      changeIcon.style.display = 'block';
    } else {
      changeIcon.style.display = 'none';
    }
  });
};

// FUNCIÓN PARA CANCELAR LA EDICIÓN DEL POST
export const cancelEditPost = (id, textPost) => {
  const enableWrite = document.getElementById(`text-post-${id}`);
  const changeIcon = document.getElementById(`btn-edit-${id}`);
  const interactionContainer = document.getElementById(`interaction-container-${id}`);
  const cancelEditContainer = document.getElementById(`cancelEdit-container-${id}`);
  const cancelEditbutton = document.getElementById(`cancelEdit-button-${id}`);
  cancelEditbutton.addEventListener('click', () => {
    enableWrite.value = textPost;
    changeIcon.src = './images/edit.png';
    // enableWrite.setAttribute('readonly',true); otra opcion de cómo se puede escribir
    enableWrite.readOnly = true;
    interactionContainer.style.display = 'flex';
    cancelEditContainer.style.display = 'none';
    changeIcon.style.display = 'block';
  });
};
