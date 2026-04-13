// Variables de estado
let isInfoVisible = false;
let isAnimated = false;
let isScanActive = false;
let mediaStream = null;

let tmModel;
let classLabels;
const canvas = document.getElementById("captureCanvas");
const ctx = canvas.getContext("2d");
let currentCountry = "";
let modelLoaded = false;
const countryModels = {
  "Mexico": "models/banderas/Mexico.glb",
  "Sudafrica": "models/banderas/Sudafrica.glb",
  "Corea": "models/banderas/Corea.glb",
  "Ucrania": "models/banderas/Ucrania.glb",
  "Tunez": "models/banderas/Tunez.glb",
  "Uzbekistan": "models/banderas/Uzbekistan.glb",
  "Colombia": "models/banderas/Colombia.glb",
  "Japon": "models/banderas/Japon.glb",
  "Cabo": "models/banderas/Cabo.glb",
  "Arabia": "models/banderas/Arabia.glb",
  "Espana": "models/banderas/Espana.glb",
  "RepublicaCheca": "models/banderas/RepublicaCheca.glb"
};

// Elementos del DOM
const cameraView = document.getElementById("cameraView");
const infoPanel = document.getElementById("infoPanel");
const toggleInfoBtn = document.getElementById("toggleInfoBtn");
const toggleAnimBtn = document.getElementById("toggleAnimBtn");
const toggleScanBtn = document.getElementById("toggleScanBtn");
const video = document.getElementById("cameraStream");
const infoPais = document.getElementById("infoPais");
const participaciones = document.getElementById("participaciones");
const mejorRes = document.getElementById("mejorRes");
const confederacion = document.getElementById("confederacion");
const bandera = document.getElementById("bandera");
const anfitrion = document.getElementById("anfitrion");
const championBadge = document.querySelector('.champion-badge');

// Variables para Three.js
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

let scene, camera, renderer, model, controls;
let animationId;
let mixer;

// Inicializar cámara al cargar la página
document.addEventListener("DOMContentLoaded", async function () {
  try {
    mediaStream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "environment" },
    });
    video.srcObject = mediaStream;
  } catch (err) {
    console.error("Error al acceder a la cámara:", err);
    alert("No se pudo acceder a la cámara. Asegúrate de tener permisos.");
  }
  initThree();
  await loadTeachableModel();
  startRealScan();
});

// Limpiar stream y animación al salir
window.addEventListener("beforeunload", function () {
  if (mediaStream) mediaStream.getTracks().forEach((track) => track.stop());
  if (animationId) cancelAnimationFrame(animationId);
});

function initThree() {
  const container = document.getElementById("ar-model-container");
  if (!container) {
    console.error("No se encontró el contenedor ar-model-container");
    return;
  }

  // Escena
  scene = new THREE.Scene();
  scene.background = null;

  // Cámara
  camera = new THREE.PerspectiveCamera(
    45,
    container.clientWidth / container.clientHeight,
    0.1,
    1000,
  );
  camera.position.set(0, 0, 3);

  renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    preserveDrawingBuffer: true,
    powerPreference: "high-performance"
  });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setClearColor(0x000000, 0); // AÑADIDO: fondo transparente explícito
  renderer.shadowMap.enabled = false;
  container.appendChild(renderer.domElement);

  // Controles de órbita
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableZoom = false;
  controls.enablePan = false;
  controls.rotateSpeed = 1.0;
  controls.target.set(0, 0, 0);

  controls.maxPolarAngle = Math.PI / 2; // Evitar que el modelo se voltee
  controls.minDistance = 1;
  controls.maxDistance = 3;

  // Luces básicas
  const ambientLight = new THREE.AmbientLight(0x404060);
  scene.add(ambientLight);
  const dirLight = new THREE.DirectionalLight(0xffffff, 1);
  dirLight.position.set(1, 2, 1);
  scene.add(dirLight);
  const backLight = new THREE.DirectionalLight(0xffffff, 0.5);
  backLight.position.set(-1, -1, -1);
  scene.add(backLight);

  // Iniciar loop
  animate();

  // Ajustar tamaño al cambiar ventana
  window.addEventListener("resize", onResize);
}

function onResize() {
  const container = document.getElementById("ar-model-container");
  if (!container || !renderer || !camera) return;
  
  const width = container.clientWidth;
  const height = container.clientHeight;
  
  if (width === 0 || height === 0) return;
 
  renderer.setSize(width, height);
  
  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  if (renderer && scene && camera) {
    renderer.render(scene, camera);
  }
  
  if (controls) {
    controls.update();
  }
}

function loadModel(country) {

  if (model) {
    scene.remove(model);
    if (model.geometry) model.geometry.dispose();
    if (model.material) {
      if (Array.isArray(model.material)) {
        model.material.forEach(m => m.dispose());
      } else {
        model.material.dispose();
      }
    }
  }

  const modelPath = countryModels[country];
  if (!modelPath) {
    console.error(`No hay modelo para el país: ${country}`);
    createFallbackModel();
    return;
  }

  console.log(`Cargando modelo para ${country} desde:`, modelPath);
  modelLoaded = false;

  const loader = new GLTFLoader();

  loader.load(
    modelPath,
    (gltf) => {
      console.log(`Modelo de ${country} cargado exitosamente`);
      model = gltf.scene;

      // Calcular bounding box para centrar y escalar automáticamente
      const box = new THREE.Box3().setFromObject(model);
      const size = box.getSize(new THREE.Vector3()).length();
      const center = box.getCenter(new THREE.Vector3());

      













































































































      3.32
      
      const scale = 1.5 / size;
      model.scale.set(scale, scale, scale);

      // Reposicionar para que quede centrado
      model.position.set(
        -center.x * scale,
        -center.y * scale,
        -center.z * scale,
      );

      // Si tiene animaciones, prepararlas
      if (gltf.animations && gltf.animations.length > 0) {
        mixer = new THREE.AnimationMixer(model);
        const action = mixer.clipAction(gltf.animations[0]);
        action.play();
        console.log("Animación cargada");
      }

      scene.add(model);
      model.visible = true;
      modelLoaded = true;
      currentCountry = country;
    },
    (xhr) => {
      console.log(`Cargando ${country}: ${((xhr.loaded / xhr.total) * 100).toFixed(2)}%`);
    },
    (error) => {
      console.error(`Error cargando el modelo de ${country}:`, error);
      createFallbackModel();
    },
  );
}

function createFallbackModel() {
  console.warn("Usando modelo de respaldo");
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshStandardMaterial({ color: 0x3b82f6 });
  model = new THREE.Mesh(geometry, material);
  scene.add(model);
  model.visible = false;
}

function animate() {
  animationId = requestAnimationFrame(animate);

  if (model && mixer && isAnimated) {
    mixer.update(0.016);
  }

  if (controls) controls.update();

  if (renderer && scene && camera) {
    renderer.render(scene, camera);
  }
}

// Funciones de los botones
function toggleInfo() {
  isInfoVisible = !isInfoVisible;
  cameraView.classList.toggle("compact", isInfoVisible);
  infoPanel.classList.toggle("hidden", !isInfoVisible);
  toggleInfoBtn.innerHTML = isInfoVisible
    ? '<i class="fas fa-times-circle"></i> Cerrar información'
    : '<i class="fas fa-info-circle"></i> Mostrar información';

  smoothResize();
}

function smoothResize() {
  let startTime = null;
  const duration = 500; // 500ms que coincide con la transición CSS
  
  function animateResize(currentTime) {
    if (!startTime) startTime = currentTime;
    const elapsed = currentTime - startTime;
    
    // Redimensionar en cada frame de la animación
    onResize();
    
    if (elapsed < duration) {
      requestAnimationFrame(animateResize);
    }
  }
  
  requestAnimationFrame(animateResize);
}

function toggleAnimation() {
  isAnimated = !isAnimated;
  toggleAnimBtn.innerHTML = isAnimated
    ? '<i class="fas fa-pause"></i> Detener animación'
    : '<i class="fas fa-play"></i> Animar bandera';
}

function toggleScan() {
  isScanActive = !isScanActive;
  toggleScanBtn.innerHTML = isScanActive
    ? '<i class="fas fa-times"></i> Quitar escaneo'
    : '<i class="fas fa-search"></i> Simular escaneo';
}

function startRealScan() {
  console.log("Iniciando escaneo en tiempo real");
  let lastClass = "";
  let stableCount = 0;
  let lastProcessedCountry = "";

  setInterval(async () => {
    if (!tmModel || !video.videoWidth) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0);

    const predictions = await tmModel.predict(canvas);

    let highestProb = 0;
    let detectedClass = "";

    predictions.forEach(p => {
      if (p.probability > highestProb) {
        highestProb = p.probability;
        detectedClass = p.className;
      }
    });

    if (detectedClass === lastClass) {
      stableCount++;
    } else {
      stableCount = 0;
    }

    lastClass = detectedClass;
    console.log("Clase detectada:", detectedClass, "Probabilidad:", highestProb.toFixed(2));
    if (highestProb > 0.70 && stableCount > 3 && detectedClass !== "NoFlag") {

      toggleInfoBtn.disabled = false;
      toggleAnimBtn.disabled = false;

      if (detectedClass !== lastProcessedCountry) {
        console.log(`Cambiando a país: ${detectedClass}`);
        updateCountryInfo(detectedClass);
        if (countryModels[detectedClass]) {
          loadModel(detectedClass);
        }
        lastProcessedCountry = detectedClass;
      } else if (model) {
        model.visible = true;
      }

    } else {
      toggleInfoBtn.disabled = true;
      toggleAnimBtn.disabled = true;

      if (isAnimated) {
        isAnimated = false;
        toggleAnimBtn.innerHTML = '<i class="fas fa-play"></i> Animar bandera';
      }

      if (isInfoVisible) {
        toggleInfo();
      }

      if (model) {
        model.visible = false;
      }
    }
  }, 300);
}

function updateCountryInfo(country) {
  const countryData = {
    "Mexico": {
      nombre: "México 🇲🇽",
      descripcion: "La selección mexicana es una de las más representativas de la CONCACAF y una de las pocas selecciones que han participado en todos los Mundiales. En 2026, México será país anfitrión y sede de múltiples partidos.",
      participaciones: "17",
      mejorResultado: "Cuartos",
      confederacion: "FMF"
    },
    "Sudafrica": {
      nombre: "Sudáfrica 🇿🇦",
      descripcion: "Conocida como 'Bafana Bafana' ('Los Muchachos'), Sudáfrica fue anfitriona del Mundial 2010, el primero en África. Su mayor logro continental es la Copa Africana de Naciones 1996 como local, y también obtuvo el subcampeonato en 1998. Participó en los Mundiales de 1998, 2002 y 2010, aunque sin superar la fase de grupos.",
      participaciones: "4",
      mejorResultado: "Fase de grupos",
      confederacion: "CAF"
    },
    "Corea": {
      nombre: "Corea del Sur 🇰🇷",
      descripcion: "Corea del Sur, conocida como los 'Guerreros Taegeuk', es la selección asiática con más participaciones mundialistas. Su mayor logro histórico fue el 4º puesto en el Mundial 2002 que coorganizó con Japón, convirtiéndose en el primer equipo asiático en alcanzar semifinales. También ha ganado la Copa Asiática en dos ocasiones (1956 y 1960).",
      participaciones: "12",
      mejorResultado: "Cuarto Lugar",
      confederacion: "AFC"
    },
    "Ucrania": {
      nombre: "Ucrania 🇺🇦",
      descripcion: "Ucrania, conocida como 'Zhovto-Blakytni' (Amarillo-Azul), participó por primera vez en un Mundial en Alemania 2006 como independiente, alcanzando los cuartos de final. Su mejor actuación internacional reciente fue llegar a cuartos de final en la Eurocopa 2020. Anteriormente, sus jugadores formaban parte de la selección de la Unión Soviética.",
      participaciones: "2",
      mejorResultado: "Cuartos",
      confederacion: "UEFA"
    },
    "Tunez": {
      nombre: "Túnez 🇹🇳",
      descripcion: "Túnez, apodada 'Las Águilas de Cartago', hizo historia en 1978 al convertirse en el primer equipo africano en ganar un partido mundialista (3-1 contra México). Su mayor logro continental es la Copa Africana de Naciones 2004, que ganó como local. Es una de las selecciones africanas con más participaciones mundialistas (7).",
      participaciones: "7",
      mejorResultado: "Fase de grupos",
      confederacion: "CAF"
    },
    "Uzbekistan": {
      nombre: "Uzbekistán 🇺🇿",
      descripcion: "Uzbekistán, conocido como los 'Lobos Blancos', hará historia en 2026 al participar por primera vez en un Mundial, convirtiéndose en el primer equipo de Asia Central en lograrlo. Su mayor éxito internacional fue la medalla de oro en los Juegos Asiáticos de 1994 y el cuarto puesto en la Copa Asiática 2011.",
      participaciones: "1",
      mejorResultado: "Octavos",
      confederacion: "AFC"
    },
    "Colombia": {
      nombre: "Colombia 🇨🇴",
      descripcion: "Colombia, 'Los Cafeteros', logró su mejor participación mundialista en Brasil 2014 alcanzando los cuartos de final. Su mayor logro histórico es la Copa América 2001, ganada como local. Cuenta con jugadores emblemáticos como Carlos Valderrama y James Rodríguez, ganador de la Bota de Oro en 2014.",
      participaciones: "7",
      mejorResultado: "Cuartos",
      confederacion: "Conmebol"
    },
    "Japon": {
      nombre: "Japón 🇯🇵",
      descripcion: "Japón, conocido como los 'Samuráis Azules', es una de las potencias asiáticas con cuatro títulos de la Copa Asiática. Ha alcanzado los octavos de final en cuatro Mundiales (2002, 2010, 2018, 2022). Fue subcampeón de la Copa Confederaciones 2001 y es reconocido por su juego combinativo y técnico.",
      participaciones: "9",
      mejorResultado: "Octavos",
      confederacion: "AFC"
    },
    "Cabo": {
      nombre: "Cabo Verde 🇨🇻",
      descripcion: "Cabo Verde, conocido como los 'Tubarões Azuis' (Tiburones Azules), es una selección africana en ascenso. Participó por primera vez en la Copa Africana de Naciones en 2013, alcanzando los cuartos de final en 2021. Para el Mundial 2026, buscará clasificarse por primera vez en su historia.",
      participaciones: "1",
      mejorResultado: "Cuartos",
      confederacion: "CAF"
    },
    "Arabia": {
      nombre: "Arabia Saudita 🇸🇦",
      descripcion: "Arabia Saudita, conocidos como los 'Halcones Verdes', es una de las selecciones más exitosas de Asia con tres títulos de la Copa Asiática. Su mejor actuación mundialista fue en Estados Unidos 1994, cuando alcanzaron los octavos de final en su debut. Son famosos por su victoria 2-1 sobre Argentina en el Mundial 2022.",
      participaciones: "7",
      mejorResultado: "Octavos",
      confederacion: "AFC"
    },
    "Espana": {
      nombre: "España 🇪🇸",
      descripcion: "España, conocida como 'La Roja', es una de las selecciones más exitosas de la historia. Ganó la Copa del Mundo en 2010 en Sudáfrica, convirtiéndose en el octavo país en lograrlo, y también conquistó la Eurocopa en 1964, 2008 y 2012, siendo la única selección que ha ganado dos Eurocopas consecutivas. Su estilo de juego 'tiki-taka' revolucionó el fútbol mundial a finales de los 2000s.",
      participaciones: "16",
      mejorResultado: "Campeón (2010)",
      confederacion: "UEFA"
    },
    "RepublicaCheca": {
      nombre: "República Checa 🇨🇿",
      descripcion: "República Checa, heredera de la desaparecida Checoslovaquia, ha tenido un papel destacado en el fútbol europeo. Como Checoslovaquia, fue subcampeona del Mundo en 1934 y 1962, y ganó la Eurocopa en 1976. Ya como República Checa, fue subcampeona de la Eurocopa 1996 y alcanzó las semifinales en 2004. Cuenta con jugadores legendarios como Pavel Nedvěd y Petr Čech.",
      participaciones: "9",
      mejorResultado: "Subcampeón (1934, 1962)",
      confederacion: "UEFA"
    }
  };

  const data = countryData[country];
  if (data) {
    bandera.innerHTML = data.nombre;
    infoPais.innerHTML = data.descripcion;
    participaciones.innerHTML = data.participaciones;
    mejorRes.innerHTML = data.mejorResultado;
    confederacion.innerHTML = data.confederacion;
  }
  if (country === "Mexico") {
        championBadge.classList.remove('hidden');
      } else {
        championBadge.classList.add('hidden');
      }
}

async function loadTeachableModel() {

  const modelURL = "models/flagScan/model.json";
  const metadataURL = "models/flagScan/metadata.json";

  tmModel = await tmImage.load(modelURL, metadataURL);

  classLabels = tmModel.getClassLabels();

  console.log("Modelo cargado correctamente");
}

// Exponer funciones globalmente
window.toggleInfo = toggleInfo;
window.toggleAnimation = toggleAnimation;
window.toggleScan = toggleScan;
window.startRealScan = startRealScan;
window.loadTeachableModel = loadTeachableModel;
window.smoothResize = smoothResize;