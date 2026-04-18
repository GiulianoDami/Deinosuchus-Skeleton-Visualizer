import * as THREE from 'three';

export class VisualizationEngine {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private skeletonGroup: THREE.Group;
  private animationId: number | null = null;

  constructor(container: HTMLElement) {
    // Initialize scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xf0f8ff);
    
    // Initialize camera
    this.camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    this.camera.position.set(0, 2, 5);
    
    // Initialize renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(this.renderer.domElement);
    
    // Create skeleton group
    this.skeletonGroup = new THREE.Group();
    this.scene.add(this.skeletonGroup);
    
    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    this.scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7);
    this.scene.add(directionalLight);
    
    // Handle window resize
    window.addEventListener('resize', () => {
      this.camera.aspect = container.clientWidth / container.clientHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(container.clientWidth, container.clientHeight);
    });
  }

  public async loadSkeleton(modelPath: string): Promise<void> {
    try {
      // In a real implementation, this would load a 3D model
      // For now, we'll create a simplified representation
      this.createBasicSkeleton();
    } catch (error) {
      console.error('Failed to load skeleton:', error);
    }
  }

  private createBasicSkeleton(): void {
    // Clear existing skeleton
    this.skeletonGroup.clear();
    
    // Create a simplified Deinosuchus skeleton representation
    const boneMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x8B4513,
      shininess: 30
    });
    
    // Create skull
    const skullGeometry = new THREE.BoxGeometry(1.5, 1, 1);
    const skull = new THREE.Mesh(skullGeometry, boneMaterial);
    skull.position.set(0, 1.5, 0);
    this.skeletonGroup.add(skull);
    
    // Create vertebral column
    for (let i = 0; i < 15; i++) {
      const vertebraGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.5, 16);
      const vertebra = new THREE.Mesh(vertebraGeometry, boneMaterial);
      vertebra.position.set(0, 1 - i * 0.4, 0);
      vertebra.rotation.z = Math.PI / 2;
      this.skeletonGroup.add(vertebra);
    }
    
    // Create limb bones (simplified)
    const limbMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xA0522D,
      shininess: 20
    });
    
    // Front limbs
    const frontLegGeometry = new THREE.CylinderGeometry(0.15, 0.15, 1.2, 16);
    const frontLeg1 = new THREE.Mesh(frontLegGeometry, limbMaterial);
    frontLeg1.position.set(-0.8, 0.5, 0.5);
    frontLeg1.rotation.z = Math.PI / 4;
    this.skeletonGroup.add(frontLeg1);
    
    const frontLeg2 = new THREE.Mesh(frontLegGeometry, limbMaterial);
    frontLeg2.position.set(0.8, 0.5, 0.5);
    frontLeg2.rotation.z = -Math.PI / 4;
    this.skeletonGroup.add(frontLeg2);
    
    // Rear limbs
    const rearLegGeometry = new THREE.CylinderGeometry(0.2, 0.2, 1.5, 16);
    const rearLeg1 = new THREE.Mesh(rearLegGeometry, limbMaterial);
    rearLeg1.position.set(-0.6, 0.2, -0.8);
    rearLeg1.rotation.z = Math.PI / 6;
    this.skeletonGroup.add(rearLeg1);
    
    const rearLeg2 = new THREE.Mesh(rearLegGeometry, limbMaterial);
    rearLeg2.position.set(0.6, 0.2, -0.8);
    rearLeg2.rotation.z = -Math.PI / 6;
    this.skeletonGroup.add(rearLeg2);
  }

  public animate(): void {
    this.animationId = requestAnimationFrame(() => this.animate());
    
    // Simple rotation animation
    if (this.skeletonGroup) {
      this.skeletonGroup.rotation.y += 0.005;
    }
    
    this.renderer.render(this.scene, this.camera);
  }

  public stopAnimation(): void {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  public setCameraPosition(x: number, y: number, z: number): void {
    this.camera.position.set(x, y, z);
  }

  public setCameraTarget(target: THREE.Vector3): void {
    this.camera.lookAt(target);
  }

  public dispose(): void {
    this.stopAnimation();
    if (this.renderer) {
      this.renderer.dispose();
    }
    if (this.skeletonGroup) {
      this.skeletonGroup.clear();
    }
  }
}