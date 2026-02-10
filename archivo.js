// Buscar datos por nombre
function buscarDatos(valorBusqueda) {
  const busqueda = valorBusqueda.trim().toLowerCase();
  const resultados = datos.filter(d => d.causalidad.toLowerCase().includes(busqueda));
  const resultsDiv = document.getElementById('resultados');

  resultsDiv.innerHTML = resultados.length
    ? resultados.map(d => `
      <div class="resultado">
        <p><strong>Causalidad:</strong> ${d.causalidad}</p>
        <p><strong>Tipo SR:</strong> ${d.tipoSR}</p>
        <p><strong>Código Entorno:</strong> ${d.codigoEntorno}</p>
        <p><strong>Código de Reparación:</strong> ${d.codigoReparacion}</p>
        <p><strong>Categoría:</strong> ${d.categoria}</p>
        <p><strong>Mayor:</strong> ${d.mayor}</p>
        <p><strong>Menor:</strong> ${d.menor}</p>
        <p><strong>Observación:</strong> ${d.description ?? 'N/A'}</p>
        <p><strong>Comentario:</strong> ${d.comentario}</p>
      </div>
      `).join('')
    : '<p>No se encontraron resultados.</p>';
    
  document.getElementById("busqueda-input").value = "";

  return resultados.length > 0;
}

function ocultarMedoto(tieneResultado) {
  const metodo = document.querySelector('.metodo');
  metodo.style.display = tieneResultado ? 'none' : 'block';
}

document.getElementById('busqueda').addEventListener('submit', function (e) {
  e.preventDefault();
  const query = document.getElementById('busqueda-input').value;
  const tieneResultado = buscarDatos(query);
  ocultarMedoto(tieneResultado)
});

const recomendaciones = [
    "Comunicaciones", "Dispensador", "Error Operativo", "Impresora", "Lectora", "Papel", "Sin falla", "Vandalismo", "Llaves"
];

// Crear burbujas de recomendaciones
recomendaciones.forEach(recomendacion => {
  const item = document.createElement('div');
  item.classList.add('cloud-item');
  item.textContent = recomendacion;
  item.onclick = () => {
    const tieneResultado = buscarDatos(recomendacion);
    ocultarMedoto(tieneResultado)
  };
  cloudContainer.appendChild(item);
});
