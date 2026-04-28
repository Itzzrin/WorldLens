// Función para navegar entre páginas
function goTo(page) {
  window.location.href = page;
}

// Función para obtener nombre legible del filtro
function getFilterName(filterKey) {
  const filterNames = {
    'filter1': 'Filtro 1',
    'filter2': 'Filtro 2',
    'filter3': 'Filtro 3',
    'filter4': 'Filtro 4',
  };
  
  return filterNames[filterKey] || filterKey;
}

function toggleVideoTutorial() {
  const tutorial = document.getElementById('videoTutorial');
  const toggleBtn = document.querySelector('.toggle-tutorial i');
  const video = document.querySelector('#videoContent video');
  
  tutorial.classList.toggle('minimized');
  
  if (tutorial.classList.contains('minimized')) {
    toggleBtn.className = 'fas fa-plus';
    if (video && !video.paused) {
      video.pause();
    }
  } else {
    toggleBtn.className = 'fas fa-minus';
  }
}

// Función para remover un filtro específico
function removeFilter(filter) {
  if (typeof selectedFilters !== 'undefined') {
    selectedFilters = selectedFilters.filter(f => f !== filter);
    
    // Actualizar la interfaz
    document.querySelectorAll('.filter-option').forEach(el => {
      if (el.getAttribute('data-filter') === filter) {
        el.classList.remove('selected');
      }
    });
    
    if (typeof updateActiveFilters !== 'undefined') updateActiveFilters();
    if (typeof updateFilterCount !== 'undefined') updateFilterCount();
  }
}

// ════════════════════════════════════════════════════════════════
//  PDF VIEWER — zoom + pan con CSS transform (sin re-render en caliente)
// ════════════════════════════════════════════════════════════════

const PDF_URL   = 'Manual de Usuario - WorldLens.pdf';
const ZOOM_MIN  = 1;      // no permitir zoom out por debajo del ajuste al ancho
const ZOOM_MAX  = 5;
const ZOOM_STEP = 0.4;

let pdfDoc       = null;
let pdfPage      = 1;
let pdfRendering = false;
let pdfPending   = null;
let baseScale    = 1;   // escala base para que la página llene el ancho

// Estado del zoom/pan visual (CSS transform — NO re-render)
let visualZoom   = 1;   // multiplicador sobre baseScale
let panX         = 0;
let panY         = 0;

// ── Helpers de DOM (lazy — se inicializan al primer uso) ────────
function getBody()   { return document.getElementById('manualBody'); }
function getCanvas() { return document.getElementById('pdfCanvas'); }
function getWrapper(){ return document.getElementById('canvasWrapper'); }

// ── Aplicar transform al wrapper (instantáneo, sin re-render) ───
function applyTransform() {
  const w = getWrapper();
  if (!w) return;
  // Clamp panX/panY para que no se salga demasiado de los bordes
  const body        = getBody();
  const maxPanX     = Math.max(0, (w.offsetWidth  * visualZoom - body.clientWidth)  / 2);
  const maxPanY     = Math.max(0, (w.offsetHeight * visualZoom - body.clientHeight) / 2);
  panX = Math.min(maxPanX, Math.max(-maxPanX, panX));
  panY = Math.min(maxPanY, Math.max(-maxPanY, panY));
  w.style.transform       = `translate(${panX}px, ${panY}px) scale(${visualZoom})`;
  w.style.transformOrigin = 'center center';
  updateZoomUI();
}

// ── Re-render de alta calidad (solo al soltar gesto o botón) ────
function renderPage(num) {
  if (!pdfDoc) return;
  if (pdfRendering) { pdfPending = num; return; }
  pdfRendering = true;

  // Resetear transform antes de renderizar para medir bien
  const wrapper = getWrapper();
  if (wrapper) { wrapper.style.transform = ''; }

  pdfDoc.getPage(num).then(page => {
    const body   = getBody();
    const canvas = getCanvas();
    const ctx    = canvas.getContext('2d');

    const availW = body.clientWidth - 32;
    const vp1    = page.getViewport({ scale: 1 });
    baseScale    = (availW / vp1.width) * visualZoom;

    const dpr = window.devicePixelRatio || 1;
    const vp  = page.getViewport({ scale: baseScale });

    canvas.width        = Math.floor(vp.width  * dpr);
    canvas.height       = Math.floor(vp.height * dpr);
    canvas.style.width  = vp.width  + 'px';
    canvas.style.height = vp.height + 'px';

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    page.render({ canvasContext: ctx, viewport: vp }).promise.then(() => {
      pdfRendering = false;
      // Resetear transform visual después de re-render
      panX = 0; panY = 0;
      if (wrapper) wrapper.style.transform = '';
      updateZoomUI();
      if (pdfPending !== null) {
        const p = pdfPending; pdfPending = null;
        renderPage(p);
      }
    });

    document.getElementById('pdfPageInfo').textContent =
      `${num} / ${pdfDoc.numPages}`;
    document.getElementById('btnPrev').disabled = num <= 1;
    document.getElementById('btnNext').disabled = num >= pdfDoc.numPages;
  });
}

// ── UI de zoom ──────────────────────────────────────────────────
function updateZoomUI() {
  const el = document.getElementById('zoomLevel');
  if (el) el.textContent = Math.round(visualZoom * 100) + '%';
  const zOut = document.getElementById('btnZoomOut');
  const zIn  = document.getElementById('btnZoomIn');
  if (zOut) zOut.disabled = visualZoom <= ZOOM_MIN;
  if (zIn)  zIn.disabled  = visualZoom >= ZOOM_MAX;
  const body = getBody();
  if (body) body.style.cursor = visualZoom > 1 ? 'grab' : 'default';
}

function pdfZoomIn() {
  visualZoom = Math.min(ZOOM_MAX, parseFloat((visualZoom + ZOOM_STEP).toFixed(2)));
  renderPage(pdfPage);
}
function pdfZoomOut() {
  visualZoom = Math.max(ZOOM_MIN, parseFloat((visualZoom - ZOOM_STEP).toFixed(2)));
  panX = 0; panY = 0;
  renderPage(pdfPage);
}
function pdfZoomReset() {
  visualZoom = 1; panX = 0; panY = 0;
  renderPage(pdfPage);
}

// ── Navegación de páginas ───────────────────────────────────────
function pdfPrevPage() {
  if (pdfPage > 1) {
    pdfPage--; visualZoom = 1; panX = 0; panY = 0;
    renderPage(pdfPage);
  }
}
function pdfNextPage() {
  if (pdfDoc && pdfPage < pdfDoc.numPages) {
    pdfPage++; visualZoom = 1; panX = 0; panY = 0;
    renderPage(pdfPage);
  }
}

// ── Inicializar eventos de interacción ──────────────────────────
function initViewerEvents() {
  const body = getBody();
  if (!body || body._viewerEventsAttached) return;
  body._viewerEventsAttached = true;

  // ── Mouse drag (pan) ──────────────────────────────────────────
  let mouseDown = false, mStartX = 0, mStartY = 0, mPanX0 = 0, mPanY0 = 0;

  body.addEventListener('mousedown', e => {
    if (visualZoom <= 1) return;
    mouseDown = true;
    mStartX = e.clientX; mStartY = e.clientY;
    mPanX0  = panX;      mPanY0  = panY;
    body.style.cursor = 'grabbing';
    e.preventDefault();
  });
  window.addEventListener('mousemove', e => {
    if (!mouseDown) return;
    panX = mPanX0 + (e.clientX - mStartX);
    panY = mPanY0 + (e.clientY - mStartY);
    applyTransform();
  });
  window.addEventListener('mouseup', () => {
    if (!mouseDown) return;
    mouseDown = false;
    body.style.cursor = visualZoom > 1 ? 'grab' : 'default';
  });

  // ── Ctrl + rueda = zoom ───────────────────────────────────────
  body.addEventListener('wheel', e => {
    if (!e.ctrlKey) return;
    e.preventDefault();
    const delta = e.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP;
    const next  = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN,
                    parseFloat((visualZoom + delta).toFixed(2))));
    if (next === visualZoom) return;
    visualZoom = next;
    if (visualZoom <= 1) { panX = 0; panY = 0; }
    renderPage(pdfPage);
  }, { passive: false });

  // ── Touch ─────────────────────────────────────────────────────
  let t1X = 0, t1Y = 0, tPanX0 = 0, tPanY0 = 0;
  let pinchDist0 = 0, pinchZoom0 = 1;
  let gesture = 'none'; // 'none' | 'pan' | 'pinch' | 'swipe'
  let moved = false;

  body.addEventListener('touchstart', e => {
    moved = false;
    if (e.touches.length === 1) {
      gesture = 'unknown';
      t1X = e.touches[0].clientX;
      t1Y = e.touches[0].clientY;
      tPanX0 = panX; tPanY0 = panY;
    } else if (e.touches.length === 2) {
      gesture = 'pinch';
      pinchDist0 = getTouchDist(e.touches);
      pinchZoom0 = visualZoom;
      // También preparar pan de pinch
      t1X = (e.touches[0].clientX + e.touches[1].clientX) / 2;
      t1Y = (e.touches[0].clientY + e.touches[1].clientY) / 2;
      tPanX0 = panX; tPanY0 = panY;
    }
  }, { passive: true });

  body.addEventListener('touchmove', e => {
    e.preventDefault(); // siempre prevenir scroll nativo dentro del visor

    if (e.touches.length === 2) {
      // ── Pinch-to-zoom + pan simultáneo ─────────────────────────
      gesture = 'pinch';
      moved   = true;
      const dist  = getTouchDist(e.touches);
      const ratio = dist / pinchDist0;
      visualZoom  = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN,
                      parseFloat((pinchZoom0 * ratio).toFixed(3))));

      // Pan del centroide
      const cx = (e.touches[0].clientX + e.touches[1].clientX) / 2;
      const cy = (e.touches[0].clientY + e.touches[1].clientY) / 2;
      panX = tPanX0 + (cx - t1X);
      panY = tPanY0 + (cy - t1Y);
      applyTransform();
      return;
    }

    if (e.touches.length === 1) {
      const dx = e.touches[0].clientX - t1X;
      const dy = e.touches[0].clientY - t1Y;
      const dist = Math.sqrt(dx*dx + dy*dy);

      // Determinar gesto si aún es unknown
      if (gesture === 'unknown' && dist > 8) {
        gesture = visualZoom > 1 ? 'pan' : 'swipe';
      }

      if (gesture === 'pan') {
        moved = true;
        panX  = tPanX0 + dx;
        panY  = tPanY0 + dy;
        applyTransform();
      }
      // swipe: no hacer nada en move, solo registrar
    }
  }, { passive: false });

  body.addEventListener('touchend', e => {
    if (gesture === 'pinch') {
      // Re-render a alta calidad después de soltar pinch
      renderPage(pdfPage);
    } else if (gesture === 'swipe' && !moved && e.changedTouches.length === 1) {
      // Swipe horizontal para cambiar página (solo zoom=1)
      const dx = e.changedTouches[0].clientX - t1X;
      const dy = Math.abs(e.changedTouches[0].clientY - t1Y);
      if (Math.abs(dx) > 45 && dy < 80) {
        dx < 0 ? pdfNextPage() : pdfPrevPage();
      }
    }
    if (e.touches.length === 0) {
      gesture = 'none'; moved = false;
    }
  }, { passive: true });
}

function getTouchDist(touches) {
  const dx = touches[0].clientX - touches[1].clientX;
  const dy = touches[0].clientY - touches[1].clientY;
  return Math.sqrt(dx*dx + dy*dy);
}

// ── Abrir / cerrar ──────────────────────────────────────────────
function openManual() {
  document.getElementById('manualModal').classList.remove('hidden');

  if (pdfDoc) { initViewerEvents(); return; }

  // Configurar worker de PDF.js
  if (typeof pdfjsLib !== 'undefined') {
    pdfjsLib.GlobalWorkerOptions.workerSrc =
      'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
  }

  pdfjsLib.getDocument(PDF_URL).promise.then(doc => {
    pdfDoc  = doc;
    pdfPage = 1;
    document.getElementById('manualLoading').classList.add('hidden');
    getCanvas().classList.remove('hidden');
    initViewerEvents();
    renderPage(pdfPage);

    // Cerrar al tocar el overlay
    document.getElementById('manualModal').addEventListener('click', function(e) {
      if (e.target === this) closeManual();
    });
  }).catch(() => {
    document.getElementById('manualLoading').classList.add('hidden');
    document.getElementById('manualError').classList.remove('hidden');
  });
}

function closeManual() {
  document.getElementById('manualModal').classList.add('hidden');
}

function downloadManual() {
  const link = document.createElement('a');
  link.href     = PDF_URL;
  link.download = 'Manual de Usuario - WorldLens.pdf';
  link.click();
}

function scrollToParticipants() {
        const section = document.getElementById('participants-section');
        if (section) {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }