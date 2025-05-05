"use client";

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';

// --- Constants ---
const VIEWER_BACKGROUND_COLOR = '#F5E4B9'; // Cream background from theme
const MODEL_COLOR = '#DD6B2A';             // Orange skin color from theme
// --- ---

interface ModelViewerProps {
  modelPath: string;
  rotation: { x: number; y: number; z: number };
}

const ModelViewer: React.FC<ModelViewerProps> = ({ modelPath, rotation }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const currentMount = mountRef.current;

    let geometry: THREE.BufferGeometry | null = null;
    let material: THREE.MeshStandardMaterial | null = null;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(VIEWER_BACKGROUND_COLOR);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    camera.position.set(0, 25, 38); // Zoom in slightly (decrease Z)

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    currentMount.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Controls setup
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 15, 0); // Keep target Y significantly
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controlsRef.current = controls;

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6); // Soft white light
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(50, 50, 50).normalize();
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xffffff, 0.5);
    pointLight.position.set(-50, -50, -50);
    scene.add(pointLight);

    // Load STL model
    const loader = new STLLoader();
    loader.load(
      modelPath,
      (loadedGeometry: THREE.BufferGeometry) => {
        geometry = loadedGeometry;
        material = new THREE.MeshStandardMaterial({ color: MODEL_COLOR, metalness: 0.3, roughness: 0.7 });
        const mesh = new THREE.Mesh(geometry, material);
        meshRef.current = mesh;

        geometry.computeBoundingBox();
        const boundingBox = geometry.boundingBox;
        if (boundingBox) {
          const center = new THREE.Vector3();
          boundingBox.getCenter(center);
          mesh.position.sub(center);

          const size = new THREE.Vector3();
          boundingBox.getSize(size);
          const maxDim = Math.max(size.x, size.y, size.z);
          const scale = 40 / maxDim;
          mesh.scale.set(scale, scale, scale);
        }

        mesh.rotation.set(rotation.x, rotation.y, rotation.z);

        scene.add(mesh);
        console.log('Model loaded successfully');
      },
      (xhr: ProgressEvent) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
      },
      (error: ErrorEvent) => {
        console.error('An error happened during loading:', error);
      }
    );

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      if (controlsRef.current) controlsRef.current.update();
      if (rendererRef.current && sceneRef.current) rendererRef.current.render(sceneRef.current, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (currentMount && rendererRef.current) {
        const width = currentMount.clientWidth;
        const height = currentMount.clientHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        rendererRef.current.setSize(width, height);
      }
    };
    window.addEventListener('resize', handleResize);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      if (currentMount && rendererRef.current) {
        currentMount.removeChild(rendererRef.current.domElement);
      }

      geometry?.dispose();
      material?.dispose();
      if (meshRef.current && sceneRef.current) {
        sceneRef.current.remove(meshRef.current);
      }
      meshRef.current = null;
      controlsRef.current?.dispose();
      rendererRef.current?.dispose();
      sceneRef.current = null;
      rendererRef.current = null;
      controlsRef.current = null;
    };
  }, [modelPath]);

  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.rotation.set(rotation.x, rotation.y, rotation.z);
    }
  }, [rotation.x, rotation.y, rotation.z]);

  return <div ref={mountRef} style={{ width: '100%', height: '500px', border: '1px solid #ccc' }} />
};

export default ModelViewer;