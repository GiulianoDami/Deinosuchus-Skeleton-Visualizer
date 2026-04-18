import * as THREE from 'three';

// Initialize the scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87CEEB);

// Initialize the camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 5, 15);

// Initialize the renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// Add lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(10, 20, 15);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 1024;
directionalLight.shadow.mapSize.height = 1024;
scene.add(directionalLight);

// Create a simple Deinosuchus skeleton representation
const skeletonGroup = new THREE.Group();

// Create bones using cylinders and spheres
const boneMaterial = new THREE.MeshPhongMaterial({ color: 0xf0f0f0, shininess: 30 });

// Skull
const skullGeometry = new THREE.SphereGeometry(1.5, 32, 32);
const skull = new THREE.Mesh(skullGeometry, boneMaterial);
skull.position.set(0, 3, 0);
skull.castShadow = true;
skull.receiveShadow = true;
skeletonGroup.add(skull);

// Spine
const spineGeometry = new THREE.CylinderGeometry(0.3, 0.3, 8, 16);
const spine = new THREE.Mesh(spineGeometry, boneMaterial);
spine.position.set(0, 0, 0);
spine.rotation.z = Math.PI / 2;
spine.castShadow = true;
spine.receiveShadow = true;
skeletonGroup.add(spine);

// Leg bones (simplified)
const legMaterial = new THREE.MeshPhongMaterial({ color: 0xd0d0d0 });
const legGeometry = new THREE.CylinderGeometry(0.2, 0.2, 4, 16);

const frontLeftLeg = new THREE.Mesh(legGeometry, legMaterial);
frontLeftLeg.position.set(-1, -2, 1);
frontLeftLeg.rotation.z = Math.PI / 4;
frontLeftLeg.castShadow = true;
frontLeftLeg.receiveShadow = true;
skeletonGroup.add(frontLeftLeg);

const frontRightLeg = new THREE.Mesh(legGeometry, legMaterial);
frontRightLeg.position.set(1, -2, 1);
frontRightLeg.rotation.z = -Math.PI / 4;
frontRightLeg.castShadow = true;
frontRightLeg.receiveShadow = true;
skeletonGroup.add(frontRightLeg);

const backLeftLeg = new THREE.Mesh(legGeometry, legMaterial);
backLeftLeg.position.set(-1, -2, -1);
backLeftLeg.rotation.z = -Math.PI / 4;
backLeftLeg.castShadow = true;
backLeftLeg.receiveShadow = true;
skeletonGroup.add(backLeftLeg);

const backRightLeg = new THREE.Mesh(legGeometry, legMaterial);
backRightLeg.position.set(1, -2, -1);
backRightLeg.rotation.z = Math.PI / 4;
backRightLeg.castShadow = true;
backRightLeg.receiveShadow = true;
skeletonGroup.add(backRightLeg);

scene.add(skeletonGroup);

// Add ground plane
const groundGeometry = new THREE.PlaneGeometry(30, 30);
const groundMaterial = new THREE.MeshPhongMaterial({ color: 0x228B22 });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
ground.position.y = -5;
ground.receiveShadow = true;
scene.add(ground);

// Handle window resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  
  // Rotate the skeleton slowly
  skeletonGroup.rotation.y += 0.005;
  
  renderer.render(scene, camera);
}

animate();

export { scene, camera, renderer };