import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

const Model = ({ modelPath }) => {
  const { scene } = useGLTF(modelPath);
  return <primitive object={scene} scale={1} />;
};

const ThreeDViewer = ({ modelPath }) => {
  return (
   <div></div>
  );
};

export default ThreeDViewer;
