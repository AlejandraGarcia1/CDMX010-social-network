import { ErrorAccount, ErrorLoginMail } from './modalError.js';
// Tache para cerrar el modal
const modal = document.querySelectorAll('.modal')[0];
const modalContainer = document.getElementById('modal-container');
const modalAlert = document.getElementById('modal-alert');

// EFECTO QUE VA A TENER EL MODAL CUANDO LE DEMOS CLICK PARA QUE SE CIERREN
export function closeModalLink() {
  modal.classList.toggle('modal-close');
  modalContainer.style.opacity = '0';
  modalContainer.style.visibility = 'hidden';
}

// FUNCION PARA QUE SE PUEDAN CERRAR LOS MODALES
export function closeModal() {
  const close = document.getElementById('close');
  close.addEventListener('click', closeModalLink);
}

// QUE APAREZCAN LOS MODALES, SEGUN LAS REGLAS QUE LES DEFINIMOS
export const openModal = (mensajeError) => {
  modalContainer.style.opacity = '1';
  modalContainer.style.visibility = 'visible';
  modal.classList.toggle('modal-close');
  modalAlert.innerHTML = mensajeError;
  closeModal();
  if (mensajeError === ErrorLoginMail) {
    const otherUserLogin = document.getElementById('otherUser');
    otherUserLogin.addEventListener('click', () => {
      const accountlink = document.getElementById('acc');
      accountlink.click();
      closeModalLink();
    });
  } else if (mensajeError === ErrorAccount) {
    document.getElementById('modalErrorLogin-link').addEventListener('click', () => {
      const loginlink = document.getElementById('log');
      loginlink.click();
      closeModalLink();
    });
    document.getElementById('modalErrorAccount-link').addEventListener('click', () => {
      const accountlink = document.getElementById('acc');
      accountlink.click();
      closeModalLink();
    });
  }
};
