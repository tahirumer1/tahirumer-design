"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Scene3D() {
  const mount = useRef(null);
  const mouse = useRef({ x: 0, y: 0, tx: 0, ty: 0 });

  useEffect(() => {
    const el = mount.current;
    if (!el) return;

    const w = el.clientWidth;
    const h = el.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    el.appendChild(renderer.domElement);

    const geo1 = new THREE.TorusKnotGeometry(1.3, 0.08, 240, 16, 2, 3);
    const mat1 = new THREE.MeshStandardMaterial({
      color: 0x9d4ef4,
      metalness: 0.7,
      roughness: 0.2,
      emissive: 0x9d4ef4,
      emissiveIntensity: 0.42,
    });
    const knot = new THREE.Mesh(geo1, mat1);
    scene.add(knot);

    const geo2 = new THREE.IcosahedronGeometry(2.4, 1);
    const mat2 = new THREE.MeshBasicMaterial({
      color: 0xf5f5f5,
      wireframe: true,
      transparent: true,
      opacity: 0.06,
    });
    const shell = new THREE.Mesh(geo2, mat2);
    scene.add(shell);

    const dotGeo = new THREE.BufferGeometry();
    const dotCount = 150;
    const positions = new Float32Array(dotCount * 3);
    for (let i = 0; i < dotCount * 3; i++) positions[i] = (Math.random() - 0.5) * 10;
    dotGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const dotMat = new THREE.PointsMaterial({
      color: 0x9d4ef4,
      size: 0.025,
      transparent: true,
      opacity: 0.5,
    });
    const dots = new THREE.Points(dotGeo, dotMat);
    scene.add(dots);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.4);
    keyLight.position.set(3, 3, 5);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x9d4ef4, 1.0);
    rimLight.position.set(-3, 2, -2);
    scene.add(rimLight);

    const ambient = new THREE.AmbientLight(0x303030, 0.6);
    scene.add(ambient);

    const onMouse = (e) => {
      const rect = el.getBoundingClientRect();
      mouse.current.tx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouse.current.ty = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouse);

    const onResize = () => {
      const nw = el.clientWidth;
      const nh = el.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener("resize", onResize);

    let raf;
    const clock = new THREE.Clock();
    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      mouse.current.x += (mouse.current.tx - mouse.current.x) * 0.05;
      mouse.current.y += (mouse.current.ty - mouse.current.y) * 0.05;
      knot.rotation.x = t * 0.15 + mouse.current.y * 0.3;
      knot.rotation.y = t * 0.2 + mouse.current.x * 0.3;
      shell.rotation.x = -t * 0.05 + mouse.current.y * 0.15;
      shell.rotation.y = t * 0.08 + mouse.current.x * 0.15;
      dots.rotation.y = t * 0.02;
      dots.rotation.x = t * 0.01;
      renderer.render(scene, camera);
    };
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      renderer.render(scene, camera);
    } else {
      animate();
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      geo1.dispose(); mat1.dispose();
      geo2.dispose(); mat2.dispose();
      dotGeo.dispose(); dotMat.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mount} className="scene3d" />;
}
