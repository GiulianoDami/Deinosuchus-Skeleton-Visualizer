import * as THREE from 'three';

export class DeinosuchusVisualizer {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private skeletonGroup: THREE.Group;
  private animationId: number | null = null;

  constructor(container: HTMLElement) {
    // Initialize scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x87CEEB);
    
    // Initialize camera
    this.camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    this.camera.position.set(0, 2, 8);
    
    // Initialize renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    this.renderer.shadowMap.enabled = true;
    container.appendChild(this.renderer.domElement);
    
    // Create skeleton group
    this.skeletonGroup = new THREE.Group();
    this.scene.add(this.skeletonGroup);
    
    // Add lighting
    this.addLighting();
    
    // Create skeleton
    this.createSkeleton();
    
    // Handle window resize
    window.addEventListener('resize', this.onWindowResize.bind(this));
  }
  
  private addLighting(): void {
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0x404040, 1);
    this.scene.add(ambientLight);
    
    // Directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7);
    directionalLight.castShadow = true;
    this.scene.add(directionalLight);
    
    // Hemisphere light for more natural illumination
    const hemisphereLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 0.5);
    this.scene.add(hemisphereLight);
  }
  
  private createSkeleton(): void {
    // Create a simplified representation of Deinosuchus skeleton
    // This would typically load from a 3D model or generate from data
    
    // Skull
    const skullGeometry = new THREE.BoxGeometry(2, 1.5, 1.2);
    const skullMaterial = new THREE.MeshPhongMaterial({ color: 0x8B4513 });
    const skull = new THREE.Mesh(skullGeometry, skullMaterial);
    skull.position.set(0, 1.5, 0);
    skull.castShadow = true;
    skull.receiveShadow = true;
    this.skeletonGroup.add(skull);
    
    // Spine
    const spineGeometry = new THREE.CylinderGeometry(0.2, 0.2, 6, 8);
    const spineMaterial = new THREE.MeshPhongMaterial({ color: 0xA0522D });
    const spine = new THREE.Mesh(spineGeometry, spineMaterial);
    spine.rotation.z = Math.PI / 2;
    spine.position.set(0, 1, 0);
    spine.castShadow = true;
    spine.receiveShadow = true;
    this.skeletonGroup.add(spine);
    
    // Tail
    const tailGeometry = new THREE.CylinderGeometry(0.1, 0.1, 4, 8);
    const tailMaterial = new THREE.MeshPhongMaterial({ color: 0x8B4513 });
    const tail = new THREE.Mesh(tailGeometry, tailMaterial);
    tail.rotation.z = -Math.PI / 4;
    tail.position.set(-2, 1, 0);
    tail.castShadow = true;
    tail.receiveShadow = true;
    this.skeletonGroup.add(tail);
    
    // Legs
    const legGeometry = new THREE.CylinderGeometry(0.15, 0.15, 2, 8);
    const legMaterial = new THREE.MeshPhongMaterial({ color: 0x8B4513 });
    
    // Front legs
    const frontLeg1 = new THREE.Mesh(legGeometry, legMaterial);
    frontLeg1.position.set(0.8, 0.5, 0.5);
    frontLeg1.castShadow = true;
    frontLeg1.receiveShadow = true;
    this.skeletonGroup.add(frontLeg1);
    
    const frontLeg2 = new THREE.Mesh(legGeometry, legMaterial);
    frontLeg2.position.set(-0.8, 0.5, 0.5);
    frontLeg2.castShadow = true;
    frontLeg2.receiveShadow = true;
    this.skeletonGroup.add(frontLeg2);
    
    // Back legs
    const backLeg1 = new THREE.Mesh(legGeometry, legMaterial);
    backLeg1.position.set(0.8, 0.5, -0.5);
    backLeg1.castShadow = true;
    backLeg1.receiveShadow = true;
    this.skeletonGroup.add(backLeg1);
    
    const backLeg2 = new THREE.Mesh(legGeometry, legMaterial);
    backLeg2.position.set(-0.8, 0.5, -0.5);
    backLeg2.castShadow = true;
    backLeg2.receiveShadow = true;
    this.skeletonGroup.add(backLeg2);
  }
  
  private onWindowResize(): void {
    this.camera.aspect = this.renderer.domElement.clientWidth / this.renderer.domElement.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.renderer.domElement.clientWidth, this.renderer.domElement.clientHeight);
  }
  
  public animate(): void {
    this.animationId = requestAnimationFrame(() => this.animate());
    
    // Simple rotation animation
    if (this.skeletonGroup) {
      this.skeletonGroup.rotation.y += 0.005;
    }
    
    this.renderer.render(this.scene, this.camera);
  }
  
  public start(): void {
    this.animate();
  }
  
  public stop(): void {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }
  
  public dispose(): void {
    this.stop();
    if (this.renderer) {
      this.renderer.dispose();
    }
    if (this.renderer.domElement) {
      this.renderer.domElement.remove();
    }
    window.removeEventListener('resize', this.onWindowResize.bind(this));
  }
}