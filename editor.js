let selectedFilter = null; // Cambiado de array a variable única
const video = document.getElementById("selectedVideo");
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d", { willReadFrequently: true });
let animationFrame;
let isFilterActive = false;
const videoWrapper = document.getElementById("videoWrapper");

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
  }

  const displayCanvas = document.getElementById("displayCanvas");
  const displayCtx = displayCanvas.getContext("2d");

  function processFrame() {

    if (video.videoWidth === 0) {
      animationFrame = requestAnimationFrame(processFrame);
      return;
    }

    displayCanvas.width = video.videoWidth;
    displayCanvas.height = video.videoHeight;

    displayCtx.drawImage(
      video,
      0,
      0,
      displayCanvas.width,
      displayCanvas.height
    );

    switch (selectedFilter) {

      case 'filter1': // blur

        displayCtx.filter = "blur(6px)";
        displayCtx.drawImage(video, 0, 0);
        displayCtx.filter = "none";

      break;

      case 'filter2': // verde

        displayCtx.filter =
          "sepia(100%) hue-rotate(50deg) saturate(300%)";

        displayCtx.drawImage(video, 0, 0);
        displayCtx.filter = "none";

      break;

      case 'filter3': // saturación

        displayCtx.filter =
          "saturate(300%) contrast(120%)";

        displayCtx.drawImage(video, 0, 0);
        displayCtx.filter = "none";

      break;

      case 'filter4': // pixelado

        pixelate(displayCtx);

      break;

    }

    animationFrame =
      requestAnimationFrame(processFrame);

  }

  processFrame();
}

function pixelate(ctx) {

  const pixelSize = 15;

  const w = ctx.canvas.width;
  const h = ctx.canvas.height;

  const tempCanvas = document.createElement("canvas");
  const tempCtx = tempCanvas.getContext("2d");

  tempCanvas.width = w / pixelSize;
  tempCanvas.height = h / pixelSize;

  tempCtx.drawImage(
    video,
    0,
    0,
    tempCanvas.width,
    tempCanvas.height
  );

  ctx.imageSmoothingEnabled = false;

  ctx.drawImage(
    tempCanvas,
    0,
    0,
    tempCanvas.width,
    tempCanvas.height,
    0,
    0,
    w,
    h
  );

  ctx.imageSmoothingEnabled = true;
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
    let displayCanvas = document.getElementById('displayCanvas');
    if (!displayCanvas) {
      displayCanvas = document.createElement('canvas');
      displayCanvas.id = 'displayCanvas';
      displayCanvas.width = canvas.width;
      displayCanvas.height = canvas.height;
      displayCanvas.style.width = '100%';
      displayCanvas.style.maxWidth = '800px';
      videoWrapper.appendChild(displayCanvas);
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

const playPauseBtn = document.getElementById("playPauseBtn");
const progressBar = document.getElementById("progressBar");
const volumeSlider = document.getElementById("volumeSlider");
const volumeBtn = document.getElementById("volumeBtn");
const fullscreenBtn = document.getElementById("fullscreenBtn");
const timeDisplay = document.getElementById("timeDisplay");
const videoContainer = document.getElementById("videoContainer");

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2,"0")}:${secs.toString().padStart(2,"0")}`;
}

playPauseBtn.addEventListener("click", () => {
  if (video.paused) {
    video.play();
    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
  } else {
    video.pause();
    playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
  }
});

video.addEventListener("timeupdate", () => {
  progressBar.value = (video.currentTime / video.duration) * 100;
  timeDisplay.textContent = `${formatTime(video.currentTime)} / ${formatTime(video.duration)}`;
});

progressBar.addEventListener("input", () => {
  video.currentTime = (progressBar.value / 100) * video.duration;
});

volumeSlider.addEventListener("input", () => {
  video.volume = volumeSlider.value;
});

volumeBtn.addEventListener("click", () => {
  video.muted = !video.muted;
  if (video.muted) {
    volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
  } else {
    volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
  }
});

fullscreenBtn.addEventListener("click", () => {
  if (!document.fullscreenElement) {
    videoContainer.requestFullscreen();
    fullscreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
  } else {
    document.exitFullscreen();
    fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
  }
});

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

  const displayCanvas = document.createElement("canvas");
  displayCanvas.id = "displayCanvas";
  displayCanvas.style.position = "absolute";
  displayCanvas.style.top = "0";
  displayCanvas.style.left = "0";
  displayCanvas.style.width = "100%";
  displayCanvas.style.pointerEvents = "none";
  displayCanvas.style.zIndex = "2";
  video.style.zIndex = "1";

  video.parentNode.style.position = "relative";
  video.parentNode.appendChild(displayCanvas);

  //updateFilterCount();

  window.addEventListener('beforeunload', cleanupFilters);
});