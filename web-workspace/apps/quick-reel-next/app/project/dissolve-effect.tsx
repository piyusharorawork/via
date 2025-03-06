"use client";

import { DissolveSegmentContent } from "@/store/project.store.types";
import { useEffect, useRef, useState } from "react";
import { Material, Mesh, ShaderMaterial } from "three";
import { FRAME_HEIGHT, FRAME_WIDTH } from "./preview";
import { useFrame } from "@react-three/fiber";

type Props = {
  content: DissolveSegmentContent;
};

const CrossfadeShader = {
  uniforms: {
    texture1: { value: null },
    texture2: { value: null },
    mixRatio: { value: 0.0 },
  },
  vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
  fragmentShader: `
      uniform sampler2D texture1;
      uniform sampler2D texture2;
      uniform float mixRatio;
      varying vec2 vUv;
      
      void main() {
        vec4 texel1 = texture2D(texture1, vUv);
        vec4 texel2 = texture2D(texture2, vUv);
        gl_FragColor = mix(texel1, texel2, mixRatio);
      }
    `,
};

export const DissolveEffect = (props: Props) => {
  const [material, setMaterial] = useState<Material>();
  useEffect(() => {
    const mat = new ShaderMaterial({
      uniforms: {
        texture1: { value: props.content.prevTexture },
        texture2: { value: props.content.nextTexture },
        mixRatio: { value: props.content.progress },
      },
      vertexShader: CrossfadeShader.vertexShader,
      fragmentShader: CrossfadeShader.fragmentShader,
    });
    setMaterial(mat);
  }, [props.content.progress]);

  // Create a ref for the material
  const meshRef = useRef<Mesh>(null);

  useEffect(() => {}, [props.content.progress, material]);

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[FRAME_WIDTH, FRAME_HEIGHT]} />
      {material && <primitive object={material} attach="material" />}
    </mesh>
  );
};
