/* ===================== VISUALIZADOR 3D DO CARRO =====================
   Monta um carro estilizado em baixo-poli (Three.js) a partir dos
   parâmetros em cars-data.js: tamanho, estilo de carroceria, aerofólio
   e cor de pintura real da foto. Não é um escaneamento do modelo real —
   é um objeto 3D de verdade, nas proporções certas, que gira ao arrastar. */

const BODY_SIZES = {
  compact: { length: 4.3, width: 1.96, height: 1.12 },
  mid:     { length: 4.6, width: 1.9,  height: 1.32 },
  large:   { length: 5.0, width: 2.0,  height: 1.78 },
  xlarge:  { length: 5.35, width: 2.0, height: 1.5 }
};

const BODY_STYLES = {
  'coupe':       { cabinStart: 0.30, cabinEnd: 0.68, cabinHeightFrac: 0.5,  chassisHeightFrac: 0.42, cabinWidthFrac: 0.86 },
  'coupe-grand': { cabinStart: 0.26, cabinEnd: 0.66, cabinHeightFrac: 0.48, chassisHeightFrac: 0.46, cabinWidthFrac: 0.88 },
  'sedan':       { cabinStart: 0.28, cabinEnd: 0.78, cabinHeightFrac: 0.5,  chassisHeightFrac: 0.42, cabinWidthFrac: 0.84 },
  'sedan-long':  { cabinStart: 0.26, cabinEnd: 0.76, cabinHeightFrac: 0.48, chassisHeightFrac: 0.44, cabinWidthFrac: 0.84 },
  'sedan-sport': { cabinStart: 0.30, cabinEnd: 0.80, cabinHeightFrac: 0.42, chassisHeightFrac: 0.40, cabinWidthFrac: 0.86 },
  'suv':         { cabinStart: 0.20, cabinEnd: 0.86, cabinHeightFrac: 0.62, chassisHeightFrac: 0.4,  cabinWidthFrac: 0.88 },
  'suv-boxy':    { cabinStart: 0.16, cabinEnd: 0.9,  cabinHeightFrac: 0.68, chassisHeightFrac: 0.38, cabinWidthFrac: 0.92 },
  'supercar':    { cabinStart: 0.34, cabinEnd: 0.62, cabinHeightFrac: 0.38, chassisHeightFrac: 0.4,  cabinWidthFrac: 0.84 }
};

function hexToThreeColor(hex) {
  return new THREE.Color(hex);
}

function buildCar(bodyParams, paintHex) {
  const group = new THREE.Group();
  const size = BODY_SIZES[bodyParams.size] || BODY_SIZES.mid;
  const style = BODY_STYLES[bodyParams.style] || BODY_STYLES.sedan;

  const wheelRadius = size.height * 0.24;
  const chassisH = size.height * style.chassisHeightFrac;
  const cabinH = size.height * style.cabinHeightFrac;

  const paintMat = new THREE.MeshPhysicalMaterial({
    color: hexToThreeColor(paintHex),
    metalness: 0.55,
    roughness: 0.32,
    clearcoat: 0.6,
    clearcoatRoughness: 0.25
  });
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0x0a0e14,
    metalness: 0.1,
    roughness: 0.15,
    transparent: true,
    opacity: 0.88
  });
  const darkMat = new THREE.MeshStandardMaterial({ color: 0x111114, metalness: 0.4, roughness: 0.6 });
  const hubMat = new THREE.MeshStandardMaterial({ color: 0xc9c9cf, metalness: 0.8, roughness: 0.3 });

  /* chassi (corpo inferior) */
  const chassisY = wheelRadius + chassisH / 2;
  const chassis = new THREE.Mesh(
    new THREE.BoxGeometry(size.width * 0.97, chassisH, size.length, 2, 1, 6),
    paintMat
  );
  chassis.position.y = chassisY;
  group.add(chassis);

  /* cabine: saia (cor da carroceria) + estufa de vidro (escura) */
  const cabinLen = (style.cabinEnd - style.cabinStart) * size.length;
  const cabinZ = (style.cabinStart + (style.cabinEnd - style.cabinStart) / 2 - 0.5) * size.length;
  const cabinW = size.width * style.cabinWidthFrac;

  const skirtH = cabinH * 0.28;
  const skirt = new THREE.Mesh(new THREE.BoxGeometry(cabinW, skirtH, cabinLen), paintMat);
  skirt.position.set(0, chassisY + chassisH / 2 + skirtH / 2, cabinZ);
  group.add(skirt);

  const greenhouseH = cabinH * 0.72;
  const greenhouse = new THREE.Mesh(
    new THREE.BoxGeometry(cabinW * 0.92, greenhouseH, cabinLen * 0.94),
    glassMat
  );
  greenhouse.position.set(0, chassisY + chassisH / 2 + skirtH + greenhouseH / 2, cabinZ);
  group.add(greenhouse);

  /* faróis e lanternas */
  const lightW = size.width * 0.16;
  const lightGeo = new THREE.BoxGeometry(lightW, chassisH * 0.28, 0.08);
  const headMat = new THREE.MeshStandardMaterial({ color: 0xfff6d8, emissive: 0xffedb0, emissiveIntensity: 0.9 });
  const tailMat = new THREE.MeshStandardMaterial({ color: 0xff2222, emissive: 0xaa0000, emissiveIntensity: 0.8 });

  [-1, 1].forEach((side) => {
    const head = new THREE.Mesh(lightGeo, headMat);
    head.position.set(side * (size.width * 0.32), chassisY, -size.length / 2 + 0.05);
    group.add(head);

    const tail = new THREE.Mesh(lightGeo, tailMat);
    tail.position.set(side * (size.width * 0.32), chassisY, size.length / 2 - 0.05);
    group.add(tail);
  });

  /* rodas */
  const wheelWidth = size.width * 0.1;
  const wheelGeo = new THREE.CylinderGeometry(wheelRadius, wheelRadius, wheelWidth, 20);
  const hubGeo = new THREE.CylinderGeometry(wheelRadius * 0.55, wheelRadius * 0.55, wheelWidth * 1.05, 16);
  const axleZ = size.length * 0.32;
  const axleX = size.width / 2 - wheelWidth / 2 + 0.02;

  [-1, 1].forEach((zSide) => {
    [-1, 1].forEach((xSide) => {
      const wheel = new THREE.Mesh(wheelGeo, darkMat);
      wheel.rotation.z = Math.PI / 2;
      wheel.position.set(xSide * axleX, wheelRadius, zSide * axleZ);
      group.add(wheel);

      const hub = new THREE.Mesh(hubGeo, hubMat);
      hub.rotation.z = Math.PI / 2;
      hub.position.set(xSide * axleX, wheelRadius, zSide * axleZ);
      group.add(hub);
    });
  });

  /* aerofólio traseiro (opcional) */
  if (bodyParams.wing) {
    const wingY = chassisY + chassisH / 2 + size.height * 0.5;
    const strutGeo = new THREE.BoxGeometry(0.04, size.height * 0.35, 0.04);
    [-1, 1].forEach((side) => {
      const strut = new THREE.Mesh(strutGeo, darkMat);
      strut.position.set(side * size.width * 0.28, wingY - size.height * 0.17, size.length / 2 - 0.35);
      group.add(strut);
    });
    const wingPlane = new THREE.Mesh(
      new THREE.BoxGeometry(size.width * 0.82, 0.05, 0.32),
      darkMat
    );
    wingPlane.position.set(0, wingY, size.length / 2 - 0.35);
    group.add(wingPlane);
  }

  return group;
}

function makeShadowTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
  gradient.addColorStop(0, 'rgba(0,0,0,0.55)');
  gradient.addColorStop(0.6, 'rgba(0,0,0,0.28)');
  gradient.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 256, 256);
  return new THREE.CanvasTexture(canvas);
}

function initCarViewer(container, bodyParams, paintHex) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x111114);

  const camera = new THREE.PerspectiveCamera(38, container.clientWidth / container.clientHeight, 0.1, 100);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  scene.add(new THREE.AmbientLight(0x8899aa, 0.65));

  const keyLight = new THREE.DirectionalLight(0xfff2df, 1.15);
  keyLight.position.set(4, 6, 4);
  scene.add(keyLight);

  const rimLight = new THREE.DirectionalLight(0x6fbfff, 0.5);
  rimLight.position.set(-5, 3, -4);
  scene.add(rimLight);

  const ground = new THREE.Mesh(
    new THREE.CircleGeometry(9, 48),
    new THREE.MeshStandardMaterial({ color: 0x0a0a0c, roughness: 0.95 })
  );
  ground.rotation.x = -Math.PI / 2;
  scene.add(ground);

  const shadow = new THREE.Mesh(
    new THREE.PlaneGeometry(4.6, 4.6),
    new THREE.MeshBasicMaterial({ map: makeShadowTexture(), transparent: true, depthWrite: false })
  );
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.y = 0.01;
  scene.add(shadow);

  const carGroup = buildCar(bodyParams, paintHex);
  scene.add(carGroup);

  const carHeight = (BODY_SIZES[bodyParams.size] || BODY_SIZES.mid).height;
  const carLength = (BODY_SIZES[bodyParams.size] || BODY_SIZES.mid).length;

  let distance = carLength * 1.35;
  const minDistance = carLength * 0.75;
  const maxDistance = carLength * 2.4;
  let azimuth = Math.PI / 5;
  const polar = carHeight * 0.62;

  function updateCamera() {
    camera.position.set(Math.sin(azimuth) * distance, polar, Math.cos(azimuth) * distance);
    camera.lookAt(0, carHeight * 0.42, 0);
  }
  updateCamera();

  let dragging = false;
  let lastX = 0;
  let idleTimer = null;
  let autoRotate = true;

  function markInteraction() {
    autoRotate = false;
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => { autoRotate = true; }, 2600);
  }

  renderer.domElement.style.touchAction = 'none';
  renderer.domElement.style.cursor = 'grab';

  renderer.domElement.addEventListener('pointerdown', (e) => {
    dragging = true;
    lastX = e.clientX;
    renderer.domElement.style.cursor = 'grabbing';
    markInteraction();
  });

  window.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    const deltaX = e.clientX - lastX;
    lastX = e.clientX;
    azimuth += deltaX * 0.008;
    updateCamera();
  });

  window.addEventListener('pointerup', () => {
    dragging = false;
    renderer.domElement.style.cursor = 'grab';
  });

  renderer.domElement.addEventListener('wheel', (e) => {
    e.preventDefault();
    distance = Math.min(maxDistance, Math.max(minDistance, distance + e.deltaY * 0.01));
    updateCamera();
    markInteraction();
  }, { passive: false });

  function onResize() {
    const w = container.clientWidth;
    const h = container.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  }
  window.addEventListener('resize', onResize);

  function animate() {
    requestAnimationFrame(animate);
    if (autoRotate && !dragging) {
      azimuth += 0.0025;
      updateCamera();
    }
    renderer.render(scene, camera);
  }
  animate();
}
