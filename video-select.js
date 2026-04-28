
function selectVideo(el) {
  document.querySelectorAll('.video-thumb').forEach(v => {
    v.classList.remove('selected');
  });
  el.classList.add('selected');

  const videoSrc = el.getAttribute('data-video-src');
  const videoTitle = el.getAttribute('data-title') || 'Video';

  localStorage.setItem('selectedVideo', videoSrc);
  localStorage.setItem('selectedVideoTitle', videoTitle);

  const btn = document.getElementById('editBtn');
  btn.classList.remove('disabled');
}

function goToEditor() {
  const btn = document.getElementById('editBtn');
  if (btn.classList.contains('disabled')) {
    alert('Selecciona un video primero');
    return;
  }
  window.location.href = 'editor.html';
}