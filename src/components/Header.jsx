//Carlos Flores Hernández DAW 2 - PROYECTO DESARROLLO WEW EN ENTORNO CLIENTE
import { useEffect, useState } from "react";

function Header() {
  //Creamos un array clientesIniciales donde meteremos los clientes
  const clientesIniciales = [
    { id: 1, nombre: "Laura González", telefono: "644123123" },
    { id: 2, nombre: "Carlos Ruiz", telefono: "655321321" },
    { id: 3, nombre: "Marta Pérez", telefono: "699112233" },
    { id: 4, nombre: "Carlos Flores", telefono: "622354201" },
    { id: 5, nombre: "Amelia Flores", telefono: "633810486" },
    { id: 6, nombre: "Claudia Montiel", telefono: "622723019" },
    { id: 7, nombre: "Joaquin Bizcochito", telefono: "677416390" },
  ];

  // Usamos useState para guardar la lista de clientes original y poder modificarla
  const [clientes, setClientes] = useState(clientesIniciales);

  // Usamos useState para crear una constante busqueda con valor vacio (Por el momento)
  const [busqueda, setBusqueda] = useState("");

  //Usamos useState para guardar el criterio por el que se ordenará la lista (por defecto será "nombre")
  const [criterioOrden, setCriterioOrden] = useState("nombre");

  //Usamos useState para guardar el tipo de orden (ascendente o descendente), empezando por "asc"
  const [orden, setOrden] = useState("asc");

  //Usamos useState para definir cuántos clientes se muestran por pagina (por defecto 3)
  const [porPagina, setPorPagina] = useState(3);

  // Usamos useState para guardar en qué página está el usuario actualmente (por defecto la primera)
  const [paginaActual, setPaginaActual] = useState(1);

  // Creamos una constante con useState para ver si esta cargando o no la pagina,
  // esto lo usaremos para mostrar o no lo datos en pantalla dependiendo de sii esta "cargando" los datos o no
  const [cargando, setCargando] = useState(true);

  // Creamos una constante filtraClientes
  // Esta constante usa el metodo filter para iterar sobre el array clientes
  // Y crear un nuevo array con los clientes que pasen el filtro que nosotros pondremos.
  // En este caso, el filtro comprueba si el nombre o el telefono contienen lo que el usuario escribió en "busqueda"
  const filtraClientes = clientes.filter(
    (cliente) =>
      cliente.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      cliente.telefono.includes(busqueda)
  );

  // Creamos una constante ordenaClientes
  // Esta constante hace una copia del array filtrado y lo ordena con el método sort()
  // Según el criterio de orden seleccionado (nombre o telefono) y el tipo de orden (asc o desc)
  const ordenaClientes = [...filtraClientes].sort((a, b) => {
    if (orden === "asc") {
      if (a[criterioOrden] > b[criterioOrden]) return 1;
      if (a[criterioOrden] < b[criterioOrden]) return -1;
      return 0;
    } else {
      if (a[criterioOrden] < b[criterioOrden]) return 1;
      if (a[criterioOrden] > b[criterioOrden]) return -1;
      return 0;
    }
  });

  // Calculamos el numero total de páginas dividiendo los resultados filtrados entre los resultados por página
  // Esto nos servira luego para paginar la lista de clientes
  // Usamos el metodo Math.ceil para redondear el resultado.
  const totalPaginas = Math.ceil(ordenaClientes.length / porPagina);

  // Calculamos el índice inicial y final de los resultados que se mostrarán en la página actual
  const inicio = (paginaActual - 1) * porPagina;
  const fin = inicio + porPagina;

  // Creamos un nuevo array que solo contiene los clientes de la página actual
  const clientesPagina = ordenaClientes.slice(inicio, fin);

  //Usamos un setTimeout para poner poner la propiedad setCargando a true tras 2 segundos
  //Esto simula el efecto de cargando clientes...
  useEffect(() => {
    setTimeout(() => {
      setCargando(false);
    }, 2000);
  }, []);

  //Usamos un if para mostrar la lista de clientes o no dependiendo de si la propiedad cargando es true o no
  if (cargando) {
    return (
      <div>
        <h1>Cargando clientes...</h1>
      </div>
    );
  } else {
    return (
      <div>
        <h1>PeluControl</h1>
        {/* Mostramos la lista completa de clientes */}
        {/* Usamos map para recorrer el array clientes y por cada cliente mostramos su nombre y telefono */}
        <h2>Lista completa de clientes:</h2>
        <ul>
          {clientes.map((cliente) => (
            // Cada cliente se muestra como un item de la lista, usamos "key" para que React identifique cada elemento
            <li key={cliente.id}>
              {cliente.nombre} - {cliente.telefono}
            </li>
          ))}
        </ul>
        <br />
        <br />
        <h2>Buscar clientes:</h2>
        <h3>Introduce el nombre o el telefono</h3>
        {/* Creamos un input donde el usuario puede escribir un nombre o telefono para filtrar los clientes */}
        <input
          type="text"
          value={busqueda}
          // Usamos onChange para que cada vez que el usuario escribe algo, se actualice la variable "busqueda"
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <br />
        {/* Creamos un select para que el usuario pueda seleccionar el criterio por el que se ordenara la lista (nombre o teléfono) */}
        <h3>Como quieres ordenar la lista?</h3>
        <select
          value={criterioOrden}
          // Usamos onChange para que cada vez que el usuario cambie el select, se actualice "criterioOrden"
          onChange={(e) => setCriterioOrden(e.target.value)}
        >
          <option value="nombre">Nombre</option>
          <option value="telefono">Telefono</option>
        </select>
        <br />
        {/* Creamos un select para que el usuario pueda seleccionar si el orden es ascendente o descendente */}
        <select value={orden} onChange={(e) => setOrden(e.target.value)}>
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>
        <br />
        <h3>Indica el numero de resultados por pagina</h3>
        {/* Creamos un select para que el usuario pueda seleccionar el numero de clientes que se muestran por pagina */}
        <select
          value={porPagina}
          // Usamos onChange para que cada vez que el usuario cambie el select, se actualice "porPagina"
          onChange={(e) => setPorPagina(Number(e.target.value))}
        >
          <option value={3}>3</option>
          <option value={5}>5</option>
          <option value={10}>10</option>
        </select>
        {/*
        Comprobamos si hay clientes en la página actual usando operadores ternarios
        Si el array clientesPagina tiene al menos un elemento (length > 0) mostramos la lista
        Si no tiene elementos, mostramos un mensaje indicando que no se encontraron resultados
      */}
        {clientesPagina.length > 0 ? (
          <ul>
            {/*
            Recorremos el array clientesPagina con map() para mostrar cada cliente
            Por cada cliente creamos un <li> que contiene su nombre y teléfono 
          */}
            {clientesPagina.map((cliente) => (
              <li key={cliente.id}>
                {cliente.nombre} - {cliente.telefono}
              </li>
            ))}
          </ul>
        ) : (
          /*
        Si clientesPagina está vacío, mostramos un mensaje <p> avisando que no hay resultados
        Esto ocurre cuando la búsqueda no coincide con ningún cliente
        */
          <p>No se encontraron resultados</p>
        )}
        <br />
        {/*
        Creamos los botones para la paginación. Estos botones nos permiten navegar entre las disintas paginas (paginaActual).
        Simplemente suman o restan 1 a la página actual usando setPaginaActual.
      */}
        <button
          // Usamos disabled para deshabilitar el boton cuando estemos en la primera pagina
          disabled={paginaActual === 1}
          onClick={() => setPaginaActual(paginaActual - 1)}
        >
          Anterior
        </button>
        <button
          // Usamos disabled para deshabilitar el boton cuando estemos en la ultima pagina
          disabled={paginaActual === totalPaginas}
          onClick={() => setPaginaActual(paginaActual + 1)}
        >
          Siguiente
        </button>
      </div>
    );
  }
}

export default Header;
