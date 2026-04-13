// Función para seleccionar videos
function selectVideo(el) {
  // Remover selección anterior
  document.querySelectorAll('.video-thumb').forEach(v => {
    v.classList.remove('selected');
  });
  el.classList.add('selected');

  // Obtener ruta y título del video
  const videoSrc = el.getAttribute('data-video-src');
  const videoTitle = el.getAttribute('data-title') || 'Video';

  // Guardar en localStorage
  localStorage.setItem('selectedVideo', videoSrc);
  localStorage.setItem('selectedVideoTitle', videoTitle);

  // Habilitar botón
  const btn = document.getElementById('editBtn');
  btn.classList.remove('disabled');
}

// Función para ir al editor, verificando que haya selección
function goToEditor() {
  const btn = document.getElementById('editBtn');
  if (btn.classList.contains('disabled')) {
    alert('Selecciona un video primero');
    return;
  }
  window.location.href = 'editor.html';
}