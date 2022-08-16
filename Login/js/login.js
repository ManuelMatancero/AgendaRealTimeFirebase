const firebaseConfig = {
    
    apiKey: "AIzaSyCsAs0MDrQGyOb-9IZk1OORLLXJ-9BKAk4",
    authDomain: "agendacontactos-ad587.firebaseapp.com",
    projectId: "agendacontactos-ad587",
    storageBucket: "agendacontactos-ad587.appspot.com",
    messagingSenderId: "85098462978",
    appId: "1:85098462978:web:11fa1d39d5739e7b540c1b"
  };
  
    firebase.initializeApp(firebaseConfig);


    //Login Function
    function ingresar(){
        const email = document.getElementById("email").value;
        const pwd = document.getElementById("pwd").value;
        //validacion
        firebase.auth().signInWithEmailAndPassword(email, pwd)
        .then((userCredential) => {
            var user = userCredential.user;
            window.open("index.html");
        })
        .catch((error)=>{
            var error_code= error.code;
            var error_mesage= error.message;
            alert(error_mesage);
        });

    }