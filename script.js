const CLAVE = "duendeNotes";

function cargarNotas(){

    let datos = localStorage.getItem(CLAVE);

    if(datos === null){
        return [];
    }

    return JSON.parse(datos);

}

let notas = cargarNotas();

function guardarNotas(){

    localStorage.setItem(
        CLAVE,
        JSON.stringify(notas)
    );

}

function renderizarNotas(lista){

    const contenedor = document.getElementById("contenedorNotas");

    contenedor.innerHTML = "";

    if(lista.length === 0){

        contenedor.innerHTML = `
        
            <div class="vacio">
                👹 El duende no encontró notas...
            </div>

        `;

        return;
    }

    lista.forEach(function(nota){

        contenedor.innerHTML += `
        
            <div class="nota">

                <div class="estrella">
                    ${nota.favorita ? "⭐" : ""}
                </div>

                <h2>${nota.titulo}</h2>

                <p>${nota.contenido}</p>

                <div class="fecha">
                    📅 ${nota.fecha}
                </div>

                <div class="acciones">

                    <button
                        class="favorita"
                        onclick="toggleFavorita(${nota.id})"
                    >
                        ⭐ Favorita
                    </button>

                    <button
                        class="eliminar"
                        onclick="eliminarNota(${nota.id})"
                    >
                        ❌ Eliminar
                    </button>

                </div>

            </div>

        `;

    });

}

function agregarNota(){

    const titulo = document.getElementById("titulo").value;

    const contenido = document.getElementById("contenido").value;

    if(
        titulo.trim() === "" ||
        contenido.trim() === ""
    ){
        alert("⚠️ Completa todos los campos");
        return;
    }

    let nuevaNota = {

        id: Date.now(),

        titulo: titulo,

        contenido: contenido,

        favorita: false,

        fecha: new Date().toLocaleDateString("es-CO")

    };

    notas.push(nuevaNota);

    guardarNotas();

    renderizarNotas(notas);

    document.getElementById("titulo").value = "";
    document.getElementById("contenido").value = "";

}

function eliminarNota(id){

    notas = notas.filter(function(nota){

        return nota.id !== id;

    });

    guardarNotas();

    renderizarNotas(notas);

}

function toggleFavorita(id){

    let nota = notas.find(function(nota){

        return nota.id === id;

    });

    if(nota){

        nota.favorita = !nota.favorita;

    }

    guardarNotas();

    renderizarNotas(notas);

}

function buscarNotas(texto){

    let resultado = notas.filter(function(nota){

        return(

            nota.titulo
            .toLowerCase()
            .includes(texto.toLowerCase())

            ||

            nota.contenido
            .toLowerCase()
            .includes(texto.toLowerCase())

        );

    });

    renderizarNotas(resultado);

}

function purgarNotas(){

    let confirmar = confirm(
        "⚠️ ¿Seguro que quieres borrar todas las notas?"
    );

    if(!confirmar){
        return;
    }

    localStorage.removeItem(CLAVE);

    notas = [];

    renderizarNotas(notas);

}

renderizarNotas(notas);