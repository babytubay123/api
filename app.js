// Inicializamos la variable 'pagina' en 1, que representa la página actual de resultados.
let pagina = 1;

// Obtenemos los elementos del DOM para los botones de navegación.
const btnAnterior = document.getElementById("btnAnterior");
const btnSiguiente = document.getElementById("btnSiguiente");

// Agregamos un evento al botón "Siguiente".
btnSiguiente.addEventListener("click", () => {
  // Verificamos si la página actual es menor a 1000.
  if (pagina < 1000) {
    // Incrementamos la página en 1.
    pagina += 1;
    // Llamamos a la función para cargar las películas.
    cargarPeliculas();
  }
});

// Agregamos un evento al botón "Anterior".
btnAnterior.addEventListener("click", () => {
  // Verificamos si la página actual es mayor a 1.
  if (pagina > 1) {
    // Decrementamos la página en 1.
    pagina -= 1;
    // Llamamos a la función para cargar las películas.
    cargarPeliculas();
  }
});

// Definimos una función asíncrona para cargar las películas.
const cargarPeliculas = async () => {
  try {
    // Hacemos una petición a la API de películas populares.
    const respuesta = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=d951e991783f89acc067e91737931fed&language=es-MX&page=${pagina}`
    );

    // Imprimimos la respuesta en la consola para depuración.
    console.log(respuesta);

    // Si la respuesta es correcta (código 200).
    if (respuesta.status === 200) {
      // Convertimos la respuesta en formato JSON.
      const datos = await respuesta.json();

      // Inicializamos una variable para almacenar las películas.
      let peliculas = "";
      // Iteramos sobre cada película en los resultados.
      datos.results.forEach((pelicula) => {
        // Construimos el HTML para cada película.
        peliculas += `
					<div class="pelicula">
						<img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
						<h3 class="titulo">${pelicula.title}</h3>
					</div>
				`;
      });

      // Insertamos el HTML de las películas en el contenedor del DOM.
      document.getElementById("contenedor").innerHTML = peliculas;
    } else if (respuesta.status === 401) {
      // Manejo de error: clave API incorrecta.
      console.log("Pusiste la llave mal");
    } else if (respuesta.status === 404) {
      // Manejo de error: película no encontrada.
      console.log("La pelicula que buscas no existe");
    } else {
      // Manejo de error: otro tipo de error.
      console.log("Hubo un error y no sabemos que paso");
    }
  } catch (error) {
    // Capturamos cualquier error que ocurra durante la ejecución.
    console.log(error);
  }
};

// Llamamos a la función para cargar las películas al iniciar la aplicación.
cargarPeliculas();
