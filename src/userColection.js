// CREA UN NUEVO USUARIO/OBJETO EN LA COLECCIÓN 'PROCFILE' DE FIRESTORE
export const saveInfoUser = (usermail, uid, password, name, aboutUser, imgUser, firestore) => {
  firestore.collection('procfile').doc(usermail).set({
    usermail,
    uid,
    password,
    name,
    aboutUser,
    imgUser,
  });
};

export const onAuthDataUser = (auth) => {
  // Cuando el usuario se acaba de logear y se encuentra en Firebase
  auth.onAuthStateChanged((userAuth) => {
    if (userAuth) {
      const user = auth.currentUser;
      // Obtenemos su correo electronico para mostrarlo
      const userEmail = user.email;
      document.getElementById('p-userName').innerHTML = userEmail;
    } else {
      
    }
  });
};
