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