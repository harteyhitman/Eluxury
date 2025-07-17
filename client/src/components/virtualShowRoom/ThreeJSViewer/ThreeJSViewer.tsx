'use client'

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
// @ts-ignore
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import styles from './ThreeJSViewer.module.scss';

export const ThreeJSViewer = ({ product, environment }: { product: any; environment: any }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);

  useEffect(() => {
    // Setup scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Environment
    const envTexture = new THREE.TextureLoader().load(environment.image);
    const envGeometry = new THREE.SphereGeometry(500, 60, 40);
    envGeometry.scale(-1, 1, 1);
    const envMaterial = new THREE.MeshBasicMaterial({ map: envTexture });
    const envMesh = new THREE.Mesh(envGeometry, envMaterial);
    scene.add(envMesh);

    // Product model
    const productGeometry = new THREE.BoxGeometry(2, 2, 2);
    const productMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xdddddd,
      roughness: 0.1,
      metalness: 0.9
    });
    const productMesh = new THREE.Mesh(productGeometry, productMaterial);
    scene.add(productMesh);
    camera.position.z = 5;

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.maxPolarAngle = Math.PI;
    controls.minPolarAngle = 0;
    controls.enableZoom = true;
    controls.enablePan = false;
    controlsRef.current = controls;

    // Mount
    mountRef.current?.appendChild(renderer.domElement);
    
    // Handle resize
    const handleResize = () => {
      const width = mountRef.current?.clientWidth || window.innerWidth;
      const height = mountRef.current?.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    // Animation loop
    const animate = () => {
      requestRef.current = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(requestRef.current!);
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeChild(renderer.domElement);
      controls.dispose();
      renderer.dispose();
    };
  }, [product, environment]);

  return <div className={styles.viewerContainer} ref={mountRef} />;
};