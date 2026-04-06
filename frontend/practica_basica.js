const API_URL = '/api/proyectos';
const lista = document.getElementById('listaProyectos');
const formProyecto = document.getElementById('formProyecto');

const filtroFecha = document.getElementById('filtroFecha');
const filtroNombre = document.getElementById('filtroNombre');
const filtroPrioridad = document.getElementById('filtroPrioridad');

const btnFiltrar = document.getElementById('btnFiltrar');
const btnLimpiar = document.getElementById('btnLimpiar');


document.addEventListener('DOMContentLoaded', () => {
    cargarProyectos();
});

formProyecto.addEventListener('submit', guardarProyecto);
btnFiltrar.addEventListener('click', aplicarFiltros);
btnLimpiar.addEventListener('click', limpiarFiltros);


async function cargarProyectos(filtros = {}) {

    const token = localStorage.getItem('token');

    if (!token) {
        alert('Debes iniciar sesión');
        window.location.href = 'login.html';
        return;
    }

    try {

        const params = new URLSearchParams();

        if (filtros.fecha) params.append('fecha', filtros.fecha);
        if (filtros.nombre) params.append('nombre', filtros.nombre);
        if (filtros.prioridad) params.append('prioridad', filtros.prioridad);

        const url = params.toString() ? `${API_URL}?${params}` : API_URL;

        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.status === 401) {
            localStorage.clear();
            alert('Sesión expirada');
            window.location.href = 'login.html';
            return;
        }

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error);
        }

        mostrarProyectos(data);

    } catch (error) {
        console.error(error);
        alert(error.message);
    }
}


function mostrarProyectos(proyectos) {

    lista.innerHTML = '';

    if (proyectos.length === 0) {
        lista.innerHTML = '<p class="text-center">No hay resultados</p>';
        return;
    }

    proyectos.forEach(p => {

        const fecha = new Date(p.fecha).toLocaleDateString();

        const color =
            p.prioridad === 'alta' ? 'danger' :
            p.prioridad === 'media' ? 'warning' : 'success';

        lista.innerHTML += `
            <div class="card mb-3 border-${color}">
                <div class="card-body">
                    <h5>${p.nombre}</h5>
                    <p>${p.descripcion || 'Sin descripción'}</p>

                    <div class="d-flex justify-content-between">
                        <span class="badge bg-${color}">${p.prioridad}</span>
                        <small>${fecha}</small>
                    </div>
                </div>
            </div>
        `;
    });
}


async function guardarProyecto(e) {

    e.preventDefault();

    const token = localStorage.getItem('token');

    const proyecto = {
        nombre: document.getElementById('nombre').value,
        descripcion: document.getElementById('descripcion').value,
        fecha: document.getElementById('fecha').value,
        prioridad: document.getElementById('prioridad').value
    };

    try {

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(proyecto)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error);
        }

        alert('Proyecto guardado');

        formProyecto.reset();
        cargarProyectos();

        const modal = bootstrap.Modal.getInstance(document.getElementById('modalProyecto'));
        modal.hide();

    } catch (error) {
        console.error(error);
        alert(error.message);
    }
}


function aplicarFiltros() {

    const filtros = {
        fecha: filtroFecha.value,
        nombre: filtroNombre.value.trim(),
        prioridad: filtroPrioridad.value
    };

    cargarProyectos(filtros);
}

function limpiarFiltros() {

    filtroFecha.value = '';
    filtroNombre.value = '';
    filtroPrioridad.value = '';

    cargarProyectos();
}