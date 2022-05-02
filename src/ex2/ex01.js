import * as THREE from 'three'

export default function example() {
  const canvas = document.querySelector('#three-canvas');
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight)
  // 픽셀 비율 2
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1)

  // Scene
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
  )
  // z 축 (미터 단위)
  camera.position.x = 1;
  camera.position.y = 3;
  camera.position.z = 0;
  scene.add(camera);

  const ambientLignt = new THREE.AmbientLight('white', 0.5);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.x = 1;
  directionalLight.position.z = 5;
  scene.add(directionalLight)
  scene.add(ambientLignt)

  const axesHelper = new THREE.AxesHelper(3);
  scene.add(axesHelper);

  const gridHelper = new THREE.GridHelper(2);
  scene.add(gridHelper);

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshStandardMaterial({
    color: 'seagreen'
  });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh)
  camera.lookAt(mesh.position)

  // 그리기
  function draw() {
    renderer.render(scene, camera);

    renderer.setAnimationLoop(draw);
  }

  function setSize() {
    // 카메라 조정
    camera.aspect = window.innerWidth / window.innerHeight
    // 카메라가 변하면 적용시켜줘야함
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  }

  // 이벤트
  window.addEventListener('resize', setSize)

  draw()
}
