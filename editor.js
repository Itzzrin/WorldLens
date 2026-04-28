let selectedFilter = null; // Cambiado de array a variable única
const video = document.getElementById("selectedVideo");
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d", { willReadFrequently: true });
let animationFrame;
let isFilterActive = false;
const intensitySlider = document.getElementById('filter-intensity');
const advancedControls = document.getElementById('advanced-controls');
const sliderLabel = document.getElementById('slider-label');

intensitySlider.addEventListener('input', applyFilters);

function toggleFilter(element) {
  const filter = element.getAttribute('data-filter');

  if (selectedFilter === filter) {
    // Deseleccionar
    selectedFilter = null;
    element.classList.remove('selected');
  } else {
    if (selectedFilter) {
      const previousElement = document.querySelector(`.filter-option[data-filter="${selectedFilter}"]`);
      if (previousElement) {
        previousElement.classList.remove('selected');
      }
    }

    selectedFilter = filter;
    element.classList.add('selected');
  }
  applyFilters();
}

function applyFilters() {
  if (animationFrame) {
    cancelAnimationFrame(animationFrame);
    animationFrame = null;
  }

  video.style.filter = "none";
  const oldCanvas = document.getElementById("displayCanvas");

  if (oldCanvas) {
    oldCanvas.remove();
  }

  if (!selectedFilter) {
    advancedControls.style.display = "none";
    return;
  }

  const value = intensitySlider.value;

  switch (selectedFilter) {

    case 'filter1': // desenfoque
      advancedControls.style.display = "none";
      video.style.filter = "blur(4px)";
      break;

    case 'filter2': // verde
      advancedControls.style.display = "block";
      sliderLabel.textContent = "Cambiar Color";
      const hueValue = value * 3.6;
      Math.floor(hueValue);
      video.style.filter = `sepia(100%) hue-rotate(${hueValue}deg) saturate(300%)`;
      break;

    case 'filter3': // saturación
      advancedControls.style.display = "none";
      video.style.filter = "saturate(300%) contrast(120%)";
      break;

    case 'filter4': // pixelado
      advancedControls.style.display = "none";
      startPixelatedEffect();
      break;

    case 'filter5':
      advancedControls.style.display = "block";
      sliderLabel.textContent = "Intensidad Térmica";
      video.style.filter = `invert(${value}%) hue-rotate(250deg) saturate(200%) contrast(150%)`;
      break;

    case 'filter6':
      advancedControls.style.display = "block";
      sliderLabel.textContent = "Intensidad de Ruido";
      startNoiseEffect();
      break;
  }

}

function startPixelatedEffect() {

  if (!video.videoWidth) {
    setTimeout(
      startPixelatedEffect,
      100
    );
    return;
  }

  const canvas =
    document.createElement("canvas");

  canvas.id = "displayCanvas";

  const ctx =
    canvas.getContext("2d");

  canvas.width =
    video.videoWidth;

  canvas.height =
    video.videoHeight;

  canvas.style.position = "absolute";

  canvas.style.top = "0";
  canvas.style.left = "0";

  canvas.style.width = "100%";

  canvas.style.pointerEvents = "none";

  video.parentNode.appendChild(canvas);

  function processFrame() {

    ctx.drawImage(
      video,
      0,
      0,
      canvas.width,
      canvas.height
    );

    const pixelSize = 15;

    const smallWidth =
      Math.floor(
        canvas.width / pixelSize
      );

    const smallHeight =
      Math.floor(
        canvas.height / pixelSize
      );

    ctx.imageSmoothingEnabled =
      false;

    ctx.drawImage(
      canvas,
      0,
      0,
      canvas.width,
      canvas.height,
      0,
      0,
      smallWidth,
      smallHeight
    );

    ctx.drawImage(
      canvas,
      0,
      0,
      smallWidth,
      smallHeight,
      0,
      0,
      canvas.width,
      canvas.height
    );
    ctx.imageSmoothingEnabled =
      true;
    if (selectedFilter === 'filter4') {
      animationFrame =
        requestAnimationFrame(
          processFrame
        );
    }
  }
  processFrame();

}

function startNoiseEffect() {
  if (!video.videoWidth) {
    setTimeout(startNoiseEffect, 100);
    return;
  }

  let noiseCanvas = document.getElementById("displayCanvas");
  if (!noiseCanvas) {
    noiseCanvas = document.createElement("canvas");
    noiseCanvas.id = "displayCanvas";
    noiseCanvas.style.position = "absolute";
    noiseCanvas.style.top = "0";
    noiseCanvas.style.left = "0";
    noiseCanvas.style.width = "100%";
    noiseCanvas.style.height = "100%";
    noiseCanvas.style.pointerEvents = "none";
    noiseCanvas.style.zIndex = "2";
    video.parentNode.appendChild(noiseCanvas);
  }

  const nCtx = noiseCanvas.getContext("2d", { willReadFrequently: true });
  // Bajamos un poco la resolución del canvas de ruido para crear "grano" más grueso
  noiseCanvas.width = video.videoWidth / 1.5; 
  noiseCanvas.height = video.videoHeight / 1.5;

  let frameCount = 0;

  function processFrame() {
    if (selectedFilter !== 'filter6') return;

    // Solo actualizamos el ruido cada 2 frames para que se vea más como cine
    if (frameCount % 2 === 0) {
      const intensity = intensitySlider.value; //
      const w = noiseCanvas.width;
      const h = noiseCanvas.height;

      nCtx.clearRect(0, 0, w, h);

      const imageData = nCtx.createImageData(w, h);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        // Generamos un valor de gris
        const value = Math.random() * 255;
        
        data[i] = value;     // Rojo
        data[i + 1] = value; // Verde
        data[i + 2] = value; // Azul
        // La opacidad depende del slider y de un factor aleatorio para dar textura
        data[i + 3] = Math.random() * (intensity * 0.8); 
      }

      nCtx.putImageData(imageData, 0, 0);
    }

    frameCount++;
    animationFrame = requestAnimationFrame(processFrame);
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
const timeDisplay = document.getElementById("timeDisplay");
const videoContainer = document.getElementById("videoContainer");

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
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

const loadingOverlay =
  document.getElementById("loadingOverlay");
video.addEventListener("loadstart", () => {
  loadingOverlay.style.display = "flex";
});
video.addEventListener("canplay", () => {
  loadingOverlay.style.display = "none";
});

function updateMuteIcon() {
  if (video.muted) {
    muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
  } else {
    muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
  }
}

muteBtn.addEventListener("click", () => {
  video.muted = !video.muted;
  updateMuteIcon();
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

  window.addEventListener('beforeunload', cleanupFilters);
});