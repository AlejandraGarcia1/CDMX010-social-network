export const loginVisibility = (btnVisibility, inputPassword) => {
  btnVisibility.addEventListener('click', function showPassword() {
    if (inputPassword.type === 'password') {
      inputPassword.type = 'text';
      btnVisibility.src = './images/visibility_off.png';
    } else {
      inputPassword.type = 'password';
      btnVisibility.src = './images/visibility.png';
    }
  });
};
