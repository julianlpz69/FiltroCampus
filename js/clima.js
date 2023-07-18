export const climaCiudad = async (lon,lag) => {

    try{

        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lag}&lon=${lon}&appid=2f76fc33907e98eb542e3a1a90d01702`)
        const data = await res.json()
        return data
    }

    catch (error) {
            return("La Logitud y Latituc No correspode a ninguna en la base de Dato")
    }
}


export const mostrarClima = async () =>{

    let lugarClima = document.getElementById("lugarClima");
    let ids = document.getElementById("opcionesClima");



    let data = await (await fetch(`http://localhost:3000/Ciudades/${ids.value}`)).json();

    let ciudad = await climaCiudad(data.coordenadas.lon,data.coordenadas.lat)

    console.log(ciudad)

    lugarClima.innerHTML =`
        <div id="${data.id}" class="card m-3" style="width: 30rem;">
        <img class="card-img-top mt-3" src="${data.imagen}" id="img${data.id}" onerror="imagenDefecto(img${data.id})" alt="Card image cap">
        <div class="card-body text-center">
          <h3 class="card-title text-black mt-3 fs-3">Clima De ${data.nomCiudad}</h3>
          <br>
            <h4 class="text-black">Longitud: ${data.coordenadas.lon}</h4>
            <h4 class="text-black">Latitud: ${data.coordenadas.lat}</h4>
           <h4 class="text-black">Teperatura: ${ciudad.main.temp}</h4>
           <h4 class="text-black">Humedad: ${ciudad.main.humidity}</h4>
           <h4 class="text-black">Velocidad Del Aire: ${ciudad.wind.speed}</h4>
           <h4 class="text-black">Presion: ${ciudad.main.pressure}</h4>
        </div>
      </div>`;

}

export function mostrarOpcionesClimas(data){
    const opcionesCiudades = document.getElementById("opcionesClima");
    
    opcionesCiudades.innerHTML = "<option value='nada'>Seleciona una opcion</option>";

    

    data.forEach((depa)=>{
        let tr = document.createElement("option");
        tr.setAttribute("value",`${depa.id}`);
        tr.setAttribute("id",`${depa.nomCiudad}`);
        tr.innerHTML = `${depa.id} ${depa.nomCiudad}`;

        opcionesCiudades.appendChild(tr);
    });
}

