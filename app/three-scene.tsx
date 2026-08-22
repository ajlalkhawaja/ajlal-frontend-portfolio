"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeScene() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0, 7.4);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    host.appendChild(renderer.domElement);

    const rig = new THREE.Group();
    scene.add(rig);

    const knotGeometry = new THREE.TorusKnotGeometry(1.72, 0.13, 220, 20, 2, 3);
    const knotMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xa8ff60,
      emissive: 0x315c19,
      emissiveIntensity: 0.65,
      metalness: 0.7,
      roughness: 0.22,
      clearcoat: 1,
      clearcoatRoughness: 0.18,
      transparent: true,
      opacity: 0.86,
    });
    const knot = new THREE.Mesh(knotGeometry, knotMaterial);
    knot.rotation.set(0.55, 0.2, -0.2);
    rig.add(knot);

    const shellGeometry = new THREE.IcosahedronGeometry(2.45, 3);
    const shellMaterial = new THREE.MeshBasicMaterial({
      color: 0x7ce7ff,
      wireframe: true,
      transparent: true,
      opacity: 0.09,
      blending: THREE.AdditiveBlending,
    });
    const shell = new THREE.Mesh(shellGeometry, shellMaterial);
    rig.add(shell);

    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0xd7ffb8,
      transparent: true,
      opacity: 0.17,
      blending: THREE.AdditiveBlending,
    });
    const ringGeometry = new THREE.TorusGeometry(2.8, 0.012, 8, 160);
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.set(1.1, 0.28, 0.15);
    rig.add(ring);

    const pointCount = 680;
    const positions = new Float32Array(pointCount * 3);
    for (let index = 0; index < pointCount; index += 1) {
      const radius = 2.8 + Math.random() * 2.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[index * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[index * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[index * 3 + 2] = radius * Math.cos(phi);
    }
    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      color: 0xc8f5ff,
      size: 0.018,
      transparent: true,
      opacity: 0.56,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    const keyLight = new THREE.PointLight(0xa8ff60, 28, 16, 1.5);
    keyLight.position.set(3, 2.5, 4);
    scene.add(keyLight);
    const fillLight = new THREE.PointLight(0x41dfff, 20, 15, 1.6);
    fillLight.position.set(-3, -1.5, 4);
    scene.add(fillLight);
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));

    const pointer = { x: 0, y: 0 };
    const onPointerMove = (event: PointerEvent) => {
      const bounds = host.getBoundingClientRect();
      pointer.x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
      pointer.y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
    };
    host.addEventListener("pointermove", onPointerMove);

    const resize = () => {
      const width = Math.max(host.clientWidth, 1);
      const height = Math.max(host.clientHeight, 1);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    resize();

    const clock = new THREE.Clock();
    let frame = 0;
    const animate = () => {
      const elapsed = clock.getElapsedTime();
      const motion = reducedMotion ? 0.12 : 1;
      rig.rotation.y += ((pointer.x * 0.2) - rig.rotation.y) * 0.035 * motion;
      rig.rotation.x += ((-pointer.y * 0.14) - rig.rotation.x) * 0.035 * motion;
      knot.rotation.z = elapsed * 0.11 * motion;
      shell.rotation.y = -elapsed * 0.055 * motion;
      shell.rotation.x = elapsed * 0.03 * motion;
      ring.rotation.z = elapsed * 0.07 * motion;
      particles.rotation.y = elapsed * 0.018 * motion;
      particles.rotation.x = elapsed * 0.009 * motion;
      renderer.render(scene, camera);
      frame = window.requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      host.removeEventListener("pointermove", onPointerMove);
      knotGeometry.dispose();
      knotMaterial.dispose();
      shellGeometry.dispose();
      shellMaterial.dispose();
      ringGeometry.dispose();
      ringMaterial.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div className="threeScene" ref={hostRef} aria-hidden="true" />;
}
