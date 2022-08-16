const firebaseConfig = {
    
    apiKey: "AIzaSyCsAs0MDrQGyOb-9IZk1OORLLXJ-9BKAk4",
    authDomain: "agendacontactos-ad587.firebaseapp.com",
    projectId: "agendacontactos-ad587",
    storageBucket: "agendacontactos-ad587.appspot.com",
    messagingSenderId: "85098462978",
    appId: "1:85098462978:web:11fa1d39d5739e7b540c1b"
  };
  
    firebase.initializeApp(firebaseConfig);

const email = document.getElementById("email");
const pwd = document.getElementById("pwd");
const cpwd= document.getElementById("cpwd");

function registrar(){
    if(pwd.value!=cpwd.value){
        alert("Las contraseñas no coinciden")
    }else if(pwd.value.length<=5){
        alert("La contraseña debe tener mas de 6 caracteres")
    }else{
        firebase.auth().createUserWithEmailAndPassword(email.value, pwd.value)
        .then((userCredential) => {
            alert("Usuario Registrado Exitosamente");
            window.open("index.html");
          // Signed in
          var user = userCredential.user;
          // ...
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          alert(errorMessage);
          // ..
        });
        console.log(email.value);
        console.log(pwd.value);
       
    }
   
}
