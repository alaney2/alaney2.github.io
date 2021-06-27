import * as THREE from 'https://unpkg.com/three/build/three.module.js';

import './style.css';

// import * as THREE from 'three';

// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('canvas'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setX(-3);
camera.position.setZ(30);

renderer.render( scene, camera );

// Torus

const geometry = new THREE.TorusGeometry( 10, 3, 16, 100 );
const material = new THREE.MeshStandardMaterial( { color: 0xFF6347 } );
const torus = new THREE.Mesh( geometry, material );

scene.add(torus);

// Lighting

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set( 5, 5, 5 );

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add( pointLight, ambientLight );

// const lightHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper);

// const controls = new OrbitControls(camera, renderer.domElement);

// Stars

function addStar() {
  const geometry = new THREE.SphereGeometry( 0.25, 24, 24 );
  const material = new THREE.MeshStandardMaterial( { color: 0xffffff } );
  const star = new THREE.Mesh( geometry, material );

  const [x, y, z] = Array(3).fill().map( () => THREE.MathUtils.randFloatSpread( 100 ) );

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

// Background

const spaceTexture = new THREE.TextureLoader().load('space.jpeg');
scene.background = spaceTexture;

//Avatar

const alanTexture = new THREE.TextureLoader().load('alan.jpg');

const alan = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial( { map: alanTexture} )
);

scene.add(alan);

alan.position.x = (2);
alan.position.z = (-5);

// Sun

const sunTexture = new THREE.TextureLoader().load('sun.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const sun = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial( {
    map: sunTexture,
    normalMap: normalTexture
  } )
)

scene.add(sun);

sun.position.setX(-10);
sun.position.z = (30);


// Functions

function animate() {
  requestAnimationFrame( animate );

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  sun.rotation.x += 0.005;

  // alan.rotation.x -= 0.001;
  alan.rotation.y += 0.0015;
  // controls.update();

  renderer.render( scene, camera );
}

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  sun.rotation.x += 0.05;
  sun.rotation.y += 0.075;
  sun.rotation.z += 0.05;

  alan.rotation.y += 0.01;
  alan.rotation.z += 0.01;

  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;
  camera.position.z = t * -0.01;
}

document.body.onscroll = moveCamera;
moveCamera();

animate();