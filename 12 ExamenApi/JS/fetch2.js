class StarWarsAPI {
    constructor() {
        this.pagina = 1;
        this.modoBusqueda = false;
        this.apiBase = 'https://swapi.dev/api/people/';
        this.personajeSeleccionado = null;
        
        if (this.verificarElementos()) {
            this.inicializarEventos();
            this.cargarPersonajesIniciales();
        } else {
            console.error('No se encontraron todos los elementos HTML necesarios');
        }
    }

    verificarElementos() {
        const elementosRequeridos = ['personajes', 'verMas', 'busqueda', 'buscar', 'personajeData'];
        return elementosRequeridos.every(id => document.getElementById(id));
    }

    inicializarEventos() {
        const botonBuscar = document.getElementById('buscar');
        const botonVerMas = document.getElementById('verMas');
        const inputBusqueda = document.getElementById('busqueda');

        if (botonBuscar) {
            botonBuscar.addEventListener('click', () => this.buscarPersonajes());
        }
        
        if (botonVerMas) {
            botonVerMas.addEventListener('click', () => this.cargarMasPersonajes());
        }
        
        if (inputBusqueda) {
            inputBusqueda.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.buscarPersonajes();
            });
        }
    }

    async cargarPersonajesIniciales() {
        await this.obtenerPersonajes(`${this.apiBase}?page=${this.pagina}`);
    }

    async obtenerPersonajes(url, limpiar = false) {
        try {
            this.mostrarLoading(true);
            const respuesta = await fetch(url);
            
            if (!respuesta.ok) {
                throw new Error(`Error HTTP: ${respuesta.status}`);
            }
            
            const datos = await respuesta.json();

            if (!datos.results || datos.results.length === 0) {
                this.mostrarMensaje('No se encontraron personajes');
                return;
            }

            if (limpiar) {
                this.limpiarContenedor();
                this.pagina = 1;
            }
            
            this.renderizarPersonajes(datos.results);
            this.actualizarBotonVerMas(datos.next);

        } catch (error) {
            console.error('Error al obtener personajes:', error);
            this.mostrarMensaje('Error al cargar los personajes: ' + error.message);
        } finally {
            this.mostrarLoading(false);
        }
    }

    limpiarContenedor() {
        const contenedor = document.getElementById('personajes');
        if (contenedor) {
            contenedor.innerHTML = '';
        }
    }

    renderizarPersonajes(personajes) {
        const contenedor = document.getElementById('personajes');
        if (!contenedor) return;

        personajes.forEach(personaje => {
            const card = this.crearCardPersonaje(personaje);
            contenedor.appendChild(card);
        });
    }

    crearCardPersonaje(personaje) {
        const card = document.createElement('div');
        card.classList.add('personaje-card');
        
        const id = this.obtenerIdPersonaje(personaje.url);
        const color = this.generarColorDesdeNombre(personaje.name);
        const iniciales = this.obtenerIniciales(personaje.name);
        
        if (id) {
            card.innerHTML = `
                <div class="imagen-container">
                    <img src="https://starwars-visualguide.com/assets/img/characters/${id}.jpg" 
                         alt="${personaje.name}"
                         onerror="this.style.display='none'; this.parentNode.querySelector('.avatar-placeholder').style.display='flex'">
                    <div class="avatar-placeholder" style="background-color: ${color}; display: none">
                        ${iniciales}
                    </div>
                </div>
                <h4>${personaje.name}</h4>
                <p>${personaje.gender} | ${personaje.birth_year}</p>
            `;
        } else {
            card.innerHTML = `
                <div class="avatar-placeholder" style="background-color: ${color}">
                    ${iniciales}
                </div>
                <h4>${personaje.name}</h4>
                <p>${personaje.gender} | ${personaje.birth_year}</p>
            `;
        }

        card.addEventListener('click', this.mostrarDetallesPersonaje.bind(this, personaje, id));
        return card;
    }

    generarColorDesdeNombre(nombre) {
        let hash = 0;
        for (let i = 0; i < nombre.length; i++) {
            hash = nombre.charCodeAt(i) + ((hash << 5) - hash);
        }
        
        const colores = [
            '#1e3a8a', '#7c2d12', '#064e3b', '#701a75', 
            '#831843', '#9f1239', '#854d0e', '#374151',
            '#0f766e', '#4338ca', '#86198f', '#ca8a04'
        ];
        
        return colores[Math.abs(hash) % colores.length];
    }

    obtenerIniciales(nombre) {
        return nombre.split(' ')
            .map(palabra => palabra.charAt(0))
            .join('')
            .toUpperCase()
            .substring(0, 2);
    }

    obtenerIdPersonaje(url) {
        if (!url) return null;
        const regex = /\/people\/(\d+)\//;
        const match = url.match(regex);
        return match ? match[1] : null;
    }

    mostrarDetallesPersonaje(personaje, id) {
        this.personajeSeleccionado = personaje;
        this.actualizarVistaDetalles(personaje, id);
        
        const seccionDetalles = document.getElementById('personajeData');
        if (seccionDetalles) {
            seccionDetalles.classList.remove('d-none');
            
            seccionDetalles.scrollIntoView({ behavior: 'smooth' });
        }
    }

    actualizarVistaDetalles(personaje, id) {
        this.actualizarElemento('personajeName', personaje.name);
        this.actualizarElemento('personajeGender', personaje.gender);
        this.actualizarElemento('personajeBirthYear', personaje.birth_year);
        this.actualizarElemento('personajeHeight', `${personaje.height} cm`);
        this.actualizarElemento('personajeMass', `${personaje.mass} kg`);
        this.actualizarElemento('personajeHairColor', personaje.hair_color);
        this.actualizarElemento('personajeEyeColor', personaje.eye_color);
        this.actualizarElemento('personajeSkinColor', personaje.skin_color);

        const imgElement = document.getElementById('personajeImagen');
        if (imgElement) {
            if (id) {
                imgElement.src = `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`;
                imgElement.alt = personaje.name;
                imgElement.onerror = () => {
                    // Si falla la imagen, usar placeholder
                    const color = this.generarColorDesdeNombre(personaje.name);
                    const iniciales = this.obtenerIniciales(personaje.name);
                    imgElement.style.display = 'none';
                    
                    const placeholder = document.createElement('div');
                    placeholder.className = 'avatar-placeholder-detalle';
                    placeholder.style.backgroundColor = color;
                    placeholder.textContent = iniciales;
                    
                    imgElement.parentNode.appendChild(placeholder);
                };
            } else {
                const color = this.generarColorDesdeNombre(personaje.name);
                const iniciales = this.obtenerIniciales(personaje.name);
                imgElement.style.display = 'none';
                
                const placeholder = document.createElement('div');
                placeholder.className = 'avatar-placeholder-detalle';
                placeholder.style.backgroundColor = color;
                placeholder.textContent = iniciales;
                
                imgElement.parentNode.appendChild(placeholder);
            }
        }

        this.limpiarListas();
        this.cargarInformacionAdicional(personaje);
    }

    actualizarElemento(id, valor) {
        const elemento = document.getElementById(id);
        if (elemento) {
            elemento.textContent = valor || '-';
        }
    }

    limpiarListas() {
        this.limpiarLista('personajeFilms');
        this.limpiarLista('personajeVehicles');
        this.actualizarElemento('personajeHomeworld', 'Cargando...');
    }

    limpiarLista(id) {
        const lista = document.getElementById(id);
        if (lista) {
            lista.innerHTML = '';
        }
    }

    async cargarInformacionAdicional(personaje) {
        try {
            if (personaje.homeworld && personaje.homeworld !== 'unknown') {
                const respuestaHomeworld = await fetch(personaje.homeworld);
                const homeworldData = await respuestaHomeworld.json();
                this.actualizarElemento('personajeHomeworld', homeworldData.name);
            } else {
                this.actualizarElemento('personajeHomeworld', 'Desconocido');
            }

            if (personaje.films && personaje.films.length > 0) {
                const filmsPromises = personaje.films.slice(0, 5).map(url => fetch(url).then(r => r.json()));
                const filmsData = await Promise.all(filmsPromises);
                
                const filmsList = document.getElementById('personajeFilms');
                filmsData.forEach(film => {
                    const li = document.createElement('li');
                    li.textContent = film.title;
                    filmsList.appendChild(li);
                });
            }

            if (personaje.vehicles && personaje.vehicles.length > 0) {
                const vehiclesPromises = personaje.vehicles.slice(0, 5).map(url => fetch(url).then(r => r.json()));
                const vehiclesData = await Promise.all(vehiclesPromises);
                
                const vehiclesList = document.getElementById('personajeVehicles');
                vehiclesData.forEach(vehicle => {
                    const li = document.createElement('li');
                    li.textContent = vehicle.name;
                    vehiclesList.appendChild(li);
                });
            }

        } catch (error) {
            console.error('Error al cargar información adicional:', error);
            this.actualizarElemento('personajeHomeworld', 'Error al cargar');
        }
    }

    buscarPersonajes() {
        const inputBusqueda = document.getElementById('busqueda');
        if (!inputBusqueda) return;

        const nombre = inputBusqueda.value.trim();
        if (nombre) {
            this.modoBusqueda = true;
            this.obtenerPersonajes(`${this.apiBase}?search=${encodeURIComponent(nombre)}`, true);
        } else {
            this.modoBusqueda = false;
            this.pagina = 1;
            this.obtenerPersonajes(`${this.apiBase}?page=${this.pagina}`, true);
        }
    }

    cargarMasPersonajes() {
        if (!this.modoBusqueda) {
            this.pagina++;
            this.obtenerPersonajes(`${this.apiBase}?page=${this.pagina}`);
        }
    }

    actualizarBotonVerMas(hayMas) {
        const botonVerMas = document.getElementById('verMas');
        if (botonVerMas) {
            botonVerMas.style.display = hayMas && !this.modoBusqueda ? 'block' : 'none';
        }
    }

    mostrarMensaje(mensaje) {
        const contenedor = document.getElementById('personajes');
        if (contenedor) {
            contenedor.innerHTML = `<p class="mensaje-error">${mensaje}</p>`;
        }
    }

    mostrarLoading(mostrar) {
        const contenedor = document.getElementById('personajes');
        const botonVerMas = document.getElementById('verMas');
        
        if (contenedor) {
            if (mostrar && contenedor.children.length === 0) {
                contenedor.innerHTML = `
                    <div class="loading-spinner">
                        <div class="spinner"></div>
                        <p>Cargando personajes...</p>
                    </div>
                `;
            } else if (!mostrar) {
                const loadingElement = contenedor.querySelector('.loading-spinner');
                if (loadingElement) {
                    loadingElement.remove();
                }
            }
        }
        
        if (botonVerMas) {
            botonVerMas.disabled = mostrar;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    try {
        new StarWarsAPI();
        console.log('Star Wars API inicializada correctamente');
    } catch (error) {
        console.error('Error al inicializar Star Wars API:', error);
        const contenedor = document.getElementById('personajes');
        if (contenedor) {
            contenedor.innerHTML = '<p class="mensaje-error">Error al inicializar la aplicación</p>';
        }
    }
});

