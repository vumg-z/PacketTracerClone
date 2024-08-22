// src/SceneSetup.js
import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth - 200, window.innerHeight);
document.getElementById('canvas-container').appendChild(renderer.domElement);
camera.position.z = 5;

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    renderer.setClearColor(0xffffff); 

}

animate();

export { scene, camera, renderer };
