import * as THREE from 'three'

export default function example() {
  const canvas = document.querySelector('#three-canvas');
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight)
  // 픽셀 비율 2
  console.log(window.window.devicePixelRatio)
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1)
  // 투명도
  // renderer.setClearAlpha(0.5);
  // 색 넣기
  renderer.setClearAlpha(0.5);
  // Scene
  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog('black', 3, 7);

  // scene에 색을 넣어주면 renderer을 덮어씌움
  scene.background = new THREE.Color('#00ff00')
  const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
  )
  // z 축 (미터 단위)
  camera.position.y = 1;
  camera.position.z = 5;
  scene.add(camera);

  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.x = 1;
  light.position.y = 3;
  light.position.z = 5;
  scene.add(light)

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  // 빛이 영향을 받지 않음
  // const material = new THREE.MeshBasicMaterial({
  //   color: 0xff0000
  // });
  const material = new THREE.MeshStandardMaterial({
    color: 0xff0000
  });
  const meshs = [];
  for (let i = 0; i < 10; i++) {
    let mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = Math.random() * 5 - 2.5;
    mesh.position.z = Math.random() * 5 - 2.5;
    scene.add(mesh)
    meshs.push(mesh)
  }

  // 그리기
  let time = Date.now();
  function draw() {
    const newTime = Date.now();
    const deltaTime = newTime - time;
    time = newTime;
    meshs.forEach(item => {
      item.rotation.y += deltaTime * 0.001
    })

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
