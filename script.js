let componenteLista = document.getElementById("componente-lista");
let tarjetas = JSON.parse(localStorage.getItem("tarjetas")) || [];
const form = document.getElementById("tarjeta-form");
const submitBtn = document.getElementById("submit-btn");
const cancelarBtn = document.getElementById("cancelar-btn");
let editandoId = null;

function crearTarjeta(titulo, descripcion) {
  const nuevaTarjeta = {
    id: Date.now(),
    titulo,
    descripcion,
  };
  tarjetas.push(nuevaTarjeta);
  guardarTarjetas();
  mostrarTarjetas();
}

function actualizarTarjeta(id, titulo, descripcion) {
  const index = tarjetas.findIndex((tarjeta) => tarjeta.id === id);
  if (index !== -1) {
    tarjetas[index] = { ...tarjetas[index], titulo, descripcion };
    guardarTarjetas();
    mostrarTarjetas();
  }
}

function eliminarTarjeta(id) {
  tarjetas = tarjetas.filter((tarjeta) => tarjeta.id !== id);
  guardarTarjetas();
  mostrarTarjetas();
}

// Funciones de utilidad
function guardarTarjetas() {
  localStorage.setItem("tarjetas", JSON.stringify(tarjetas));
}

function mostrarTarjetas() {
  componenteLista.innerHTML = "";
  tarjetas.forEach((tarjeta) => {
    const elemento = document.createElement("div");
    elemento.className = "tarjeta";
    elemento.innerHTML = `
        <h3>${tarjeta.titulo}</h3>
        <p>${tarjeta.descripcion}</p>
        <div class="acciones">
              <button onclick="iniciarEdicion(${tarjeta.id})" class="btn-editar">Editar</button>
              <button onclick="eliminarTarjeta(${tarjeta.id}) "class="btn-eliminar">Eliminar</button>
        </div>
    `;
    componenteLista.appendChild(elemento);
  });
}

function iniciarEdicion(id) {
  const tarjeta = tarjetas.find((t) => t.id === id);
  if (tarjeta) {
    document.getElementById("tarjeta-id").value = tarjeta.id;
    document.getElementById("titulo").value = tarjeta.titulo;
    document.getElementById("descripcion").value = tarjeta.descripcion;
    submitBtn.textContent = "Actualizar Ticket";
    cancelarBtn.style.display = "inline-block";
    editandoId = id;
  }
}

function cancelarEdicion() {
  form.reset();
  editandoId = null;
  submitBtn.textContent = "Agregar Ticket";
  cancelarBtn.style.display = "none";
}

// Event Listeners
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const titulo = document.getElementById("titulo").value;
  const descripcion = document.getElementById("descripcion").value;

  if (editandoId) {
    actualizarTarjeta(editandoId, titulo, descripcion);
    cancelarEdicion();
  } else {
    crearTarjeta(titulo, descripcion);
  }
  form.reset();
});

cancelarBtn.addEventListener("click", cancelarEdicion);

// Inicialización
mostrarTarjetas();
