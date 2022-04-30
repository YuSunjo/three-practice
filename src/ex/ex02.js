import * as THREE from 'three'

export default function example() {
  // 동적 캔버스 조립
// console.log(THREE)
// const renderer = new THREE.WebGLRenderer()
//
// renderer.setSize(window.innerWidth, window.innerHeight)
//
// console.log(renderer.domElement);
// document.body.appendChild(renderer.domElement)

  const canvas = document.querySelector('#three-canvas');
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight)
  // 픽셀 비율 2
  console.log(window.window.devicePixelRatio)
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1)

  // Scene
  const scene = new THREE.Scene();
// 카메라
// https://threejs.org/docs/index.html?q=came#api/ko/cameras/PerspectiveCamera
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

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({
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
