import * as THREE from 'three';

export interface SkeletonData {
  name: string;
  length: number;
  height: number;
  weight: number;
  measurements: {
    skullLength: number;
    tailLength: number;
    legLength: number;
    neckLength: number;
  };
  joints: {
    [key: string]: THREE.Vector3;
  };
  boneSegments: {
    [key: string]: {
      start: string;
      end: string;
      length: number;
    };
  };
}

export class DeinosuchusSkeleton {
  private data: SkeletonData;

  constructor() {
    this.data = {
      name: "Deinosuchus schwimeri",
      length: 9.4, // meters
      height: 3.0, // meters
      weight: 1500, // kg
      measurements: {
        skullLength: 1.2, // meters
        tailLength: 7.0, // meters
        legLength: 0.8, // meters
        neckLength: 1.5 // meters
      },
      joints: {
        head: new THREE.Vector3(0, 0, 0),
        neck: new THREE.Vector3(0, 0, 0),
        torso: new THREE.Vector3(0, 0, 0),
        hip: new THREE.Vector3(0, 0, 0),
        tailBase: new THREE.Vector3(0, 0, 0),
        frontLeftLeg: new THREE.Vector3(0, 0, 0),
        frontRightLeg: new THREE.Vector3(0, 0, 0),
        hindLeftLeg: new THREE.Vector3(0, 0, 0),
        hindRightLeg: new THREE.Vector3(0, 0, 0)
      },
      boneSegments: {
        skull: {
          start: "head",
          end: "neck",
          length: 1.2
        },
        neck: {
          start: "neck",
          end: "torso",
          length: 1.5
        },
        torso: {
          start: "torso",
          end: "hip",
          length: 2.0
        },
        tail: {
          start: "hip",
          end: "tailBase",
          length: 7.0
        },
        frontLeftArm: {
          start: "torso",
          end: "frontLeftLeg",
          length: 0.8
        },
        frontRightArm: {
          start: "torso",
          end: "frontRightLeg",
          length: 0.8
        },
        hindLeftLeg: {
          start: "hip",
          end: "hindLeftLeg",
          length: 0.8
        },
        hindRightLeg: {
          start: "hip",
          end: "hindRightLeg",
          length: 0.8
        }
      }
    };
  }

  getData(): SkeletonData {
    return this.data;
  }

  getBoneSegmentLength(segmentName: string): number {
    return this.data.boneSegments[segmentName]?.length || 0;
  }

  getJointPosition(jointName: string): THREE.Vector3 {
    return this.data.joints[jointName] || new THREE.Vector3();
  }

  updateJointPosition(jointName: string, position: THREE.Vector3): void {
    if (this.data.joints.hasOwnProperty(jointName)) {
      this.data.joints[jointName].copy(position);
    }
  }
}