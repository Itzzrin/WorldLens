let selectedFilter = null; // Cambiado de array a variable única
const video = document.getElementById("selectedVideo");
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d", { willReadFrequently: true });
let animationFrame;
let isFilterActive = false;

function toggleFilter(element) {
  const filter = element.getAttribute('data-filter');
  
  // Si ya hay un filtro seleccionado y es el mismo, lo deseleccionamos
  if (selectedFilter === filter) {
    // Deseleccionar
    selectedFilter = null;
    element.classList.remove('selected');
  } else {
    // Si hay otro filtro seleccionado, lo deseleccionamos
    if (selectedFilter) {
      const previousElement = document.querySelector(`.filter-option[data-filter="${selectedFilter}"]`);
      if (previousElement) {
        previousElement.classList.remove('selected');
      }
    }
    
    // Seleccionar el nuevo filtro
    selectedFilter = filter;
    element.classList.add('selected');
  }

  //updateActiveFilters();
  //updateFilterCount();
  applyFilters();
}

function updateActiveFilters() {
  const container = document.getElementById('activeFilters');
  container.innerHTML = '';

  if (selectedFilter) {
    const filterName = getFilterName(selectedFilter);
    const tag = document.createElement('div');
    tag.className = 'filter-tag';
    tag.innerHTML = `
      ${filterName}
      <button onclick="removeFilter('${selectedFilter}')">
        <i class="fas fa-times"></i>
      </button>
    `;
    container.appendChild(tag);
  }
}

function getFilterName(filter) {
  switch (filter) {
    case 'filter1':
      return 'Desenfoque';
    case 'filter2':
      return 'Tinte Verde';
    case 'filter3':
      return 'Alta saturación';
    case 'filter4':
      return 'Pixeleado';
    default:
      return filter;
  }
}

function updateFilterCount() {
  document.getElementById('filterCount').textContent = selectedFilter ? 1 : 0;
}

function applyFilters() {
  if (animationFrame) {
    cancelAnimationFrame(animationFrame);
    animationFrame = null;
  }

  // Limpiar estilos previos
  video.style.filter = 'none';
  video.style.opacity = '1';
  video.style.display = 'block';
  
  const displayCanvas = document.getElementById('displayCanvas');
  if (displayCanvas) {
    displayCanvas.remove();
  }

  // Si no hay filtro seleccionado, salir
  if (!selectedFilter) {
    return;
  }

  // Aplicar filtro según el tipo
  switch(selectedFilter) {
    case 'filter1': // Desenfoque
      video.style.filter = 'blur(6px)';
      break;
      
    case 'filter2': // Tinte verde
      video.style.filter = 'sepia(100%) hue-rotate(50deg) saturate(300%)';
      break;
      
    case 'filter3': // Alta saturación
      video.style.filter = 'saturate(300%) contrast(120%)';
      break;
      
    case 'filter4': // Pixeleado - requiere canvas
      startPixelatedEffect();
      break;
  }
}

function startPixelatedEffect() {
  if (!video.videoWidth || !video.videoHeight) {
    setTimeout(startPixelatedEffect, 100);
    return;
  }

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  function processFrame() {
    if (video.paused || video.ended) {
      animationFrame = requestAnimationFrame(processFrame);
      return;
    }
    
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Aplicar efecto pixelado
    const pixelSize = 15;
    const smallWidth = Math.max(1, Math.floor(canvas.width / pixelSize));
    const smallHeight = Math.max(1, Math.floor(canvas.height / pixelSize));
    
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, smallWidth, smallHeight);
    ctx.drawImage(canvas, 0, 0, smallWidth, smallHeight, 0, 0, canvas.width, canvas.height);
    ctx.imageSmoothingEnabled = true;

    // Mostrar el canvas
    video.style.display = 'none';
    let displayCanvas = document.getElementById('displayCanvas');
    if (!displayCanvas) {
      displayCanvas = document.createElement('canvas');
      displayCanvas.id = 'displayCanvas';
      displayCanvas.width = canvas.width;
      displayCanvas.height = canvas.height;
      displayCanvas.style.width = '100%';
      displayCanvas.style.maxWidth = '800px';
      video.parentNode.appendChild(displayCanvas);
    }

    const displayCtx = displayCanvas.getContext('2d');
    displayCtx.drawImage(canvas, 0, 0, displayCanvas.width, displayCanvas.height);

    // Solo continuar si este filtro sigue seleccionado
    if (selectedFilter === 'filter4') {
      animationFrame = requestAnimationFrame(processFrame);
    }
  }

  processFrame();
}

function removeFilter(filter) {
  if (selectedFilter === filter) {
    // Deseleccionar el filtro
    selectedFilter = null;
    
    // Quitar clase selected del elemento
    const filterElement = document.querySelector(`.filter-option[data-filter="${filter}"]`);
    if (filterElement) {
      filterElement.classList.remove('selected');
    }

    //updateActiveFilters();
    //updateFilterCount();
    applyFilters();
  }
}

function cleanupFilters() {
  if (animationFrame) {
    cancelAnimationFrame(animationFrame);
    animationFrame = null;
  }

  video.style.filter = 'none';
  video.style.opacity = '1';
  video.style.display = 'block';

  const displayCanvas = document.getElementById('displayCanvas');
  if (displayCanvas) {
    displayCanvas.remove();
  }
}

document.addEventListener('DOMContentLoaded', function () {

  const videoSrc = localStorage.getItem('selectedVideo');
  const videoTitle = localStorage.getItem('selectedVideoTitle') || 'Video seleccionado';
  const videoElement = document.getElementById('selectedVideo');
  const titleSpan = document.getElementById('videoTitle');

  if (videoSrc && videoElement) {
    videoElement.src = videoSrc;
    titleSpan.textContent = videoTitle;

    videoElement.addEventListener('loadedmetadata', function () {
      canvas.width = videoElement.videoWidth;
      canvas.height = videoElement.videoHeight;
    });

    videoElement.play().catch(e => console.log('Autoplay prevented:', e));
  } else {
    titleSpan.textContent = 'Ningún video seleccionado';
    setTimeout(() => { window.location.href = 'video-select.html'; }, 2000);
  }

  //updateFilterCount();

  window.addEventListener('beforeunload', cleanupFilters);
});