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
  renderer.setClearColor('#00ff00')
  renderer.setClearAlpha(0.5);
  // Scene
  const scene = new THREE.Scene();
  // scene에 색을 넣어주면 renderer을 덮어씌움
  scene.background = new THREE.Color('#00ff00')
  const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
  )
  // z 축 (미터 단위)
  camera.position.x = 1;
  camera.position.y = 2;
  camera.position.z = 5;
  scene.add(camera);

  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.x = 1;
  light.position.z = 2;
  scene.add(light)

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  // 빛이 영향을 받지 않음
  // const material = new THREE.MeshBasicMaterial({
  //   color: 0xff0000
  // });
  const material = new THREE.MeshStandardMaterial({
    color: 0xff0000
  });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh)

  // 그리기
  renderer.render(scene, camera);

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

}
