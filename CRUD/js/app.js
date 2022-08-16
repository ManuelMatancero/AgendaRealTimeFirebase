
const firebaseConfig = {
    
    apiKey: "AIzaSyCsAs0MDrQGyOb-9IZk1OORLLXJ-9BKAk4",
    authDomain: "agendacontactos-ad587.firebaseapp.com",
    projectId: "agendacontactos-ad587",
    storageBucket: "agendacontactos-ad587.appspot.com",
    messagingSenderId: "85098462978",
    appId: "1:85098462978:web:11fa1d39d5739e7b540c1b"
  };
  
    firebase.initializeApp(firebaseConfig);

const openModal= document.getElementById("openRegisterModal");
const modal = document.getElementById("modal");
const closeModal= document.getElementById("closeRegisterModal");
const closeUpdateModal= document.getElementById("closeUpdateModal");
const registerForm = document.getElementById("register-form");
const updateForm = document.getElementById("update-form");
const contactsTable = document.getElementById("contactsTable");
const contactRef = firebase.database().ref('contacts');
const database = firebase.database();
let tableContacts=document.getElementById('contactsTable'), rIndex;
const updateModal = document.getElementById('modal-update');
const buscar = document.getElementById("buscar");
const bodyTable = document.getElementById("bodyContacts");
let id;
const cerrar = document.getElementById("cerrarSesion");



    


const showRegisterModal = () =>{
    modal.classList.toggle('is-active')
}

const showUpdateModal = () =>{
    updateModal.classList.toggle('is-active')
}

closeUpdateModal.addEventListener("click", ()=> showUpdateModal());
closeModal.addEventListener("click", ()=> showRegisterModal());
openModal.addEventListener("click", ()=> showRegisterModal());


window.addEventListener('DOMContentLoaded', async(e)=>{
    await contactRef.on('value', (contacts)=>{
        bodyTable.innerHTML = '';
        contacts.forEach((contact) => {
            let contactData = contact.val();
            bodyTable.innerHTML += 
            `<tr>
            <td>${contactData.Uid}</td>
            <td>${contactData.Nombre}</td>
            <td>${contactData.Apellido}</td>
            <td>${contactData.Email}</td>
            <td>${contactData.Telefono}</td>
            <td><button class="button is-warning" data-id="${contactData.Uid}" onclick = "updateRow()"><i class="fas fa-pencil-alt"></i></button>
            <button class="button is-danger" data-id="${contactData.Uid}" onclick = "deleteRow()" ><i class="fas fa-trash"></i></button>
            <button class="button is-info" onclick="sendEmail()" ><i class="fa-regular fa-envelope"></i></button>
            </td>
            </tr>`
            
         
           
        });
    })
});

function updateRow(){        
    for(var i = 1; i < tableContacts.rows.length; i++)
    {
        tableContacts.rows[i].onclick = function()
        {
            rIndex = this.rowIndex;
            id = this.cells[0].innerHTML;
            console.log(id);
            showUpdateModal();
            firebase
            .database()
            .ref(`contacts/${id}`)
            .once('value')
            .then((contact)=>{
                const data = contact.val();
                updateForm['nombre'].value = data.Nombre;
                updateForm['apellido'].value = data.Apellido;
                updateForm['email'].value = data.Email;
                updateForm['telefono'].value = data.Telefono;
            })
            updateForm.addEventListener("submit", (e) =>{
                e.preventDefault();
                const nombre = updateForm['nombre'].value;
                const apellido = updateForm['apellido'].value;
                const email = updateForm['email'].value;
                const telefono = updateForm['telefono'].value;

                firebase.database().ref(`contacts/${id}`).update({
                    Nombre: nombre,
                    Apellido: apellido,
                    Email: email,
                    Telefono: telefono
                });
                showUpdateModal();
            })
        };
    }
}

function deleteRow(){        
    for(var i = 1; i < tableContacts.rows.length; i++)
    {
        tableContacts.rows[i].onclick = function()
        {
            rIndex = this.rowIndex;
            id = this.cells[0].innerHTML;
            console.log(id);
            firebase.database().ref(`contacts/${id}`).remove();
        };
    }
}



registerForm.addEventListener("submit", (e)=>{
    e.preventDefault();

    const nombre = registerForm['nombre'].value;
    const apellido = registerForm['apellido'].value;
    const email = registerForm['email'].value;
    const telefono = registerForm['telefono'].value;

    const registerContact = contactRef.push();
  registerContact.set({
        Uid: registerContact.path.pieces_[1],
        Nombre: nombre,
        Apellido: apellido,
        Email: email,
        Telefono: telefono,
    });
    showRegisterModal();
});

async function listarContactos(e){
    await contactRef.on('value', (contacts)=>{
        bodyTable.innerHTML = '';
        contacts.forEach((contact) => {
            let contactData = contact.val();
            if(contactData.Nombre==buscar.value){
                bodyTable.innerHTML += 
                `<tr>
                <td>${contactData.Uid}</td>
                <td>${contactData.Nombre}</td>
                <td>${contactData.Apellido}</td>
                <td>${contactData.Email}</td>
                <td>${contactData.Telefono}</td>
                <td><button class="button is-warning" data-id="${contactData.Uid}" onclick = "updateRow()"><i class="fas fa-pencil-alt"></i></button>
                <button class="button is-danger" data-id="${contactData.Uid}" onclick = "deleteRow()" ><i class="fas fa-trash"></i></button>
                <button class="button is-info" onclick="sendEmail()"><i class="fa-regular fa-envelope"></i></button>
                </td>
                </tr>`
            }
         
        });
    })
}
function sendEmail(){
    let emails = '';
    let mensaje='';
    for(var i = 1; i < tableContacts.rows.length; i++)
    {
        tableContacts.rows[i].onclick = function()
        {
            rIndex = this.rowIndex;
            id = this.cells[0].innerHTML;
            firebase
            .database()
            .ref(`contacts/${id}`)
            .once('value')
            .then((contact)=>{
                const data = contact.val();
                emails = data.Email;
                mensaje='mailto:'+ emails;
                console.log(mensaje);

               window.open(mensaje);

            })
        };
    }
   
   
}


cerrar.addEventListener("click", ()=>{
    window.close();
})



