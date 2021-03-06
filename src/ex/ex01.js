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

  const scene = new THREE.Scene();
// 카메라
// https://threejs.org/docs/index.html?q=came#api/ko/cameras/PerspectiveCamera
// const camera = new THREE.PerspectiveCamera(
//     75,
//     window.innerWidth / window.innerHeight,
//     0.1,
//     1000
// )
// // z 축 (미터 단위)
// camera.position.x = 1;
// camera.position.y = 2;
// camera.position.z = 5;
// scene.add(camera);

  const camera = new THREE.OrthographicCamera(
      -(window.innerWidth / window.innerHeight),
      window.innerWidth / window.innerHeight,
      1,
      -1,
      0.1,
      1000
  )
  camera.position.x = 1;
  camera.position.y = 2;
  camera.position.z = 5;
  camera.lookAt(0, 0, 0);
  camera.zoom = 0.5;
  camera.updateProjectionMatrix();
  scene.add(camera)

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({
    color: 0xff0000
  });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh)

// 그리기
  renderer.render(scene, camera);
}
