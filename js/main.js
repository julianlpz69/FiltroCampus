import {mostrarDepartamentos,mostrarOpcionesDepa,mostrarCiudades} from "./mostrar.js"
import {mostrarOpcionesClimas,mostrarClima} from "./clima.js"


const headers = new Headers ({'Content-Type': 'application/json'});





//---------------------------------- Imagen por defecto -------------------------------------------------

window.imagenDefecto = function(imagen){

 
    console.log(imagen)

    imagen.src = "https://www.howlanders.com/blog/wp-content/uploads/2021/01/calle-ciudad-colombia.jpg"
}



//---------------------------------- Tema de La PAgina -------------------------------------------------

const body = document.querySelector('body'),
      modeSwitch = body.querySelector(".toggle-switch"),
      modeText = body.querySelector(".mode-text"),
      tablasLight = body.querySelector(".tablasLight"),
      textoTema = document.getElementById("textoTema");

      body.classList.add("light");



if(localStorage.getItem("tema")=="dark"){
    textoTema.innerText = "Light mode"
    body.classList.add("dark");
    body.classList.remove("light");
    localStorage.setItem("tema","dark")
}
if(localStorage.getItem("tema")=="light"){
    textoTema.innerText = "Dark mode"
    localStorage.setItem("tema","light")

}
if(localStorage.getItem("tema")==null){
    textoTema.innerText = "Dark mode"
    localStorage.setItem("tema","light")
}
    

function tema(){
    if(localStorage.getItem("tema")=="light"){
        body.classList.remove("light");
        body.classList.add("dark");
        localStorage.setItem("tema","dark")
    }

    else if(localStorage.getItem("tema")=="dark"){
        body.classList.remove("dark");
        body.classList.add("light");
        localStorage.setItem("tema","light")
    }

    if(body.classList.contains("dark")){
        modeText.innerText = "Light mode";
    }else{
        modeText.innerText = "Dark mode";
    }}

modeSwitch.addEventListener("click" , () =>{
    tema()
});





// ----------------------------------- Navar ------------------------------------------------------------------

const navHome = document.getElementById("navHome"),
        nav1 =  document.getElementById("navOpcion1"), 
        nav2 =  document.getElementById("navOpcion2"), 
        nav3 =  document.getElementById("navOpcion3"), 
        paginaHome =  document.getElementById("home"), 
        pagina1 =  document.getElementById("Opcion1"), 
        pagina2 =  document.getElementById("Opcion2"), 
        pagina3 =  document.getElementById("Opcion3");

function ocultar(parametroBtn,parametro1,parametro2,parametro3,parametro4){
    parametroBtn.addEventListener('click', function() {
        parametro1.classList.remove('d-none');
        parametro2.classList.add('d-none');
        parametro3.classList.add('d-none');
        parametro4.classList.add('d-none');
    })}

ocultar(navHome,paginaHome,pagina1,pagina2,pagina3)
ocultar(nav1,pagina1,paginaHome,pagina2,pagina3)
ocultar(nav2,pagina2,pagina1,paginaHome,pagina3)
ocultar(nav3,pagina3,pagina1,pagina2,paginaHome)



// ----------------------------------- Agregar y Mostrar Departamentos ------------------------------------------------------------------

const formuDepartamento = document.getElementById("formuDepartamento");

formuDepartamento.addEventListener('submit',async (e) => {
    e.preventDefault();

    let data = Object.fromEntries(new FormData(e.target));
    postDepartamento(data)
    formuDepartamento.reset()
    mostrarDepa()
});

async function postDepartamento(data){
    try{
        let config = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        };
        console.log(JSON.stringify(data))
        await fetch(`http://localhost:3000/Departamentos`,config)
    }
    catch(err){
        console.log(err)
    }}

async function mostrarDepa(){
    let data = await (await fetch(`http://localhost:3000/Departamentos`)).json();
    mostrarDepartamentos(data);
}
mostrarDepa()

// ----------------------------------- Editar y Eliminar Departamentos ------------------------------------------------------------------


async function editarDepartamento(data,id) {

    let config = {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(data)
    }
    await (await fetch(`http://localhost:3000/Departamentos/${id}`,config)).json();}

window.editarDepa = async function(id){

    const depa = await (await fetch(`http://localhost:3000/Departamentos/${id}`)).json()
    const nombre = document.getElementById("datoNobreEditar");
    nombre.value = depa.nomDepartamento


    const formu = document.getElementById("formEditarDepartamento");

    formu.addEventListener("submit", (e) => {
        e.preventDefault();
        let data = Object.fromEntries(new FormData(e.target));
        editarDepartamento(data,id);
})}





async function EliminarDepa(id){

let config = {
    method: 'DELETE',
    headers: headers};

await(await fetch(`http://localhost:3000/Departamentos/${id}`,config)).json();
}

window.eliminarDepartamento = async function (id){


    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
        title: '¿Estas Seguro?',
        text: "Despues de borrar este Departamento no podras recuperarla",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, Eliminar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            setTimeout(() => {
                EliminarDepa(id);
                mostrarDepa()
                }, 1000);
        swalWithBootstrapButtons.fire(
            'Eliminado!',
            'Proceso realizado Correctamente',
            'success',
        )
        } 
        
    })

    
}



// ----------------------------------- Mostrar Opciones de Departamentos ------------------------------------------------------------------


async function mostrarOpciones(){
    let data = await (await fetch(`http://localhost:3000/Departamentos`)).json();
    mostrarOpcionesDepa(data)
}
mostrarOpciones()




// ----------------------------------- Mostrar Ciudades ------------------------------------------------------------------
const btnCiudades = document.getElementById("btnCiudades")

btnCiudades.addEventListener('click', (e) => {
    mostrarCiudades()
});




    // --------------------------- Agregar Ciudad -----------------------------------------

const formuAgregarCiudad = document.getElementById("formuAgregarCiudad")


formuAgregarCiudad.addEventListener('submit', (e) => {
e.preventDefault();

const btnAgregarCiudad = document.getElementById("btnAgregarCiudad"),
    nombre = document.getElementById("nombreCiudad"),
    latitud = document.getElementById("datoLatituc"),  
    longitud = document.getElementById("datoLongitud"),
    imagen = document.getElementById("imgaenCiudad");

let data = {"nomCiudad": `${nombre.value}`, "DepartamentoId": `${btnAgregarCiudad.value}`, "imagen": `${imagen.value}`,"coordenadas": { "lat": `${latitud.value}`, "lon": `${longitud.value}`}}

postCiudad(data)
formuAgregarCiudad.reset()
mostrarCiudades()


});

async function postCiudad(data){
    try{
        let config = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        };
        console.log(JSON.stringify(data))
        await fetch(`http://localhost:3000/Ciudades`,config)
    }
    catch(err){
        console.log(err)
    }}




// --------------------------- Eliminar Ciudad -----------------------------------------------------------------------

async function eliminarCiudad(id){

    let config = {
        method: 'DELETE',
        headers: headers};

    await(await fetch(`http://localhost:3000/Ciudades/${id}`,config)).json();
    }

window.deleteCiudad = function async (e){

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
        })
        
        swalWithBootstrapButtons.fire({
        title: '¿Estas Seguro?',
        text: "Despues de borrar esta Ciudad no podras recuperarla",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, Eliminar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true
        }).then((result) => {
        if (result.isConfirmed) {
            setTimeout(() => {
                eliminarCiudad(e);
                mostrarPuntos()
                }, 1000);
            swalWithBootstrapButtons.fire(
            'Eliminado!',
            'Proceso realizado Correctamente',
            'success',
            )
        } 
        
        })

    
}


//--------------------------------------------Editar Ciudad -------------------------------------------


window.editarCiudad = async function(id){


    let ciudad =  await (await fetch(`http://localhost:3000/Ciudades/${id}`)).json()
    
    const formuEditarCiudad = document.getElementById("formuEditarCiudad");
    const nombre = document.getElementById("nombreCiudadEditar");
    const link = document.getElementById("imagenCiudadEditar");
    const latitud = document.getElementById("datoLatitucEditar");
    const longitud = document.getElementById("datoLongitudEditar");
    
    const id2 =ciudad.departamentoId
    
    nombre.value = ciudad.nomCiudad
    link.value = ciudad.imagen
    latitud.value = ciudad.coordenadas.lat
    longitud.value = ciudad.coordenadas.lon

    $('#editarCiudad').modal('show')
    
    
    formuEditarCiudad.addEventListener("submit", (e) => {
      e.preventDefault();
    
    
      let data = {"nomCiudad": `${nombre.value}`, "departamentoId": `${id2}`, "imagen": `${link.value}`,"coordenadas": { "lat": `${latitud.value}`, "lon": `${longitud.value}`}}
      data.departamentoId = id2
      actualizarPuto(data,id)
      $('#editarCiudad').modal('hide')
    })
    
    
    }
    
    async function actualizarPuto(data,id) {
    
    
    
      let config = {
          method: 'PUT',
          headers: headers,
          body: JSON.stringify(data)
      }
    
      await (await fetch(`http://localhost:3000/ciudades/${id}`,config)).json();
    }



// ----------------------------------- Mostrar Opciones de Departamentos ------------------------------------------------------------------


async function mostraropcionesCiudades(){
    let data = await (await fetch(`http://localhost:3000/Ciudades`)).json();
    mostrarOpcionesClimas(data)
}
mostraropcionesCiudades()



// ----------------------------------- Mostrar Clima ------------------------------------------------------------------
const btnClima = document.getElementById("btnClima")

btnClima.addEventListener('click', (e) => {
    mostrarClima()
});