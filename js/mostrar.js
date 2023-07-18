export function mostrarDepartamentos(data){
    let tbody = document.getElementById("tbodyDepartamentos");

    tbody.innerHTML = "";

    data.forEach((departamento)=>{
        let tr = document.createElement("tr");
        tr.setAttribute("id",`${departamento.id}`);
        tr.setAttribute("class","tr");
        tr.innerHTML = `
        <td class="text-center">${departamento.id}</td>
        <td class="text-center">${departamento.nomDepartamento}</td>
        <td class="text-center">
            <button type="button"  onclick="editarDepa(${departamento.id})" data-bs-toggle="modal" data-bs-target="#departamentoEditar" class="btn-guardar bg-warning border-0 rounded bg-secondary px-2 w-25 fw-bold">Editar</button>
            <button type="button"  onclick="eliminarDepartamento(${departamento.id})" class="btn-eliminar bg-danger border-0 rounded bg-secondary px-2 w-25 fw-bold">Eliminar</button>
        </td>
        `;

        tbody.appendChild(tr);
    });
}



export function mostrarOpcionesDepa(data){
    const opcionesDepa = document.getElementById("opcionesDepartamento");
    
    opcionesDepa.innerHTML = "<option value='nada'>Seleciona una opcion</option>";

    

    data.forEach((depa)=>{
        let tr = document.createElement("option");
        tr.setAttribute("value",`${depa.id}`);
        tr.setAttribute("id",`${depa.nomDepartamento}`);
        tr.innerHTML = `${depa.id} ${depa.nomDepartamento}`;

        opcionesDepa.appendChild(tr);
    });
}







export async function mostrarCiudades(){

    

    let lugarCiudades = document.getElementById("lugarCiudades");
    let ids = document.getElementById("opcionesDepartamento");



    let data = await (await fetch(`http://localhost:3000/Ciudades`)).json();
    let nombre = await (await fetch(`http://localhost:3000/Departamentos/${ids.value}`)).json();


    if (ids.value == "nada"){
        alert("Seleciona una opcion Valida")
        
    }


    else{
        lugarCiudades.innerHTML = "";



        lugarCiudades.innerHTML += `<h1 class="text-black letraLight text-start">${nombre.nomDepartamento} Ciudades</h1>
    <div class="justify-content-start text-start align-items-start">             
    <button type="button" id="btnAgregarCiudad" value="${nombre.id}" data-bs-toggle="modal" data-bs-target="#agregarCiudad" class="btn-guardar text-black w-25 fs-5 bg-warning border-0 rounded bg-secondary fw-bold">Agregar Ciudad</button>
    </div>
    `

    data.forEach((ciudad)=>{

        

        if (ciudad.DepartamentoId == ids.value){
    


        const lugarCiudades = document.getElementById('lugarCiudades');

        lugarCiudades.innerHTML +=`
        <div id="${ciudad.id}" class="card m-3" style="width: 18rem;">
        <img class="card-img-top mt-3" src="${ciudad.imagen}" id="img${ciudad.id}" onerror="imagenDefecto(img${ciudad.id})" alt="Card image cap">
        <div class="card-body text-center">
          <h5 class="card-title mt-3">${ciudad.nomCiudad}</h5>
          <br>
           <button type="button" onclick="deleteCiudad(${ciudad.id})" class="btn bg-danger border-0 rounded bg-secondary  w-100 fw-bold mb-3">Eliminar</button>
        
            <button type="button" onclick="editarCiudad(${ciudad.id})" class="btn bg-warning border-0 rounded bg-secondary w-100 fw-bold">Editar</button>

        </div>
      </div>`;

    }

    
;})};}
