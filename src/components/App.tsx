import { Bounds, Center, Html, OrbitControls, Sphere } from "@react-three/drei";
// @ts-nocheck
import { Canvas, Props, extend, useFrame, useThree } from "@react-three/fiber";
import { useControls } from "leva";
import React from "react";
// import {
//   EffectComposer,
//   DepthOfField,
//   Bloom,
//   Noise,
//   Vignette,
// } from "@react-three/postprocessing";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
// import * as THREE from "three";
import "./App.scss";

extend({ EffectComposer, RenderPass, UnrealBloomPass });

const Canv = ({ children, ...props }: Props) => {
  return (
    <Canvas
      gl={{ antialias: true }}
      {...props}
      style={{ height: "100vh", backgroundColor: "#000" }}
    >
      {children}
    </Canvas>
  );
};

// const geom = new THREE.BoxBufferGeometry(2, 3, 0.1);

function useSceneControls() {
  return useControls({
    radius: { min: 1, max: 10, value: 3 },
    turns: { min: 1, max: 10, value: 6, step: 1 },
    objPerTurn: { min: 1, max: 100, value: 40 },
    heightStep: { min: 0, max: 1, step: 0.001, value: 1 },
  });
}

const Scene = () => {
  const { turns, heightStep, radius, objPerTurn } = useSceneControls();
  const angleStep = React.useMemo(
    () => (Math.PI * 2) / objPerTurn,
    [objPerTurn],
  );
  const items = React.useMemo(
    () => [...Array(turns * objPerTurn).keys()] || [],
    [turns, objPerTurn],
  );
  return (
    <scene>
      <group>
        {items.map((i, key, m) => {
          const rad = (m.length - i) * 0.5;
          // const rad = radius;

          const [x, y, z] = [
            Math.cos(angleStep * i) * rad,
            heightStep * i,
            Math.sin(angleStep * i) * rad,
          ];

          return (
            <mesh
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              key={key}
              // geometry={geom}
              position={[x, y, z]}
              rotation-y={-angleStep * i}
            >
              <sphereBufferGeometry attach={"geometry"} args={[radius]} />

              <meshBasicMaterial
                attach={"material"}
                color={Math.random() * 0x888888 + 0x888888}
              />
            </mesh>
          );
        })}
      </group>
      <group rotation-y={3}>
        {items.map((i, _, m) => {
          const rad = (m.length - i) * 0.5;
          // const rad = radius;
          //
          const [x, y, z] = [
            Math.cos(angleStep * i) * rad,
            heightStep * i,
            Math.sin(angleStep * i) * rad,
          ];

          return (
            <mesh
              // geometry={geom}
              position={[x, y, z]}
              rotation-y={-angleStep * i}
              key={i}
            >
              <boxBufferGeometry
                args={[radius, radius, radius]}
                attach={"geometry"}
              />
              {/*<sphereBufferGeometry attach={"geometry"} />*/}

              <meshBasicMaterial
                attach={"material"}
                color={Math.random() * 0x888888 + 0x888888}
              />
            </mesh>
          );
        })}
      </group>
    </scene>
  );
};

function Bloom({ children }) {
  const { gl, camera, size } = useThree();
  const [scene, setScene] = React.useState();
  const composer = React.useRef(null);
  React.useEffect(
    () => void scene && composer.current?.setSize(size.width, size.height),
    [size],
  );
  // @ts-ignore
  useFrame(() => scene && composer.current.render(), 1);
  return (
    <>
      <scene ref={setScene}>{children}</scene>
      <effectComposer ref={composer} args={[gl]}>
        <renderPass attachArray="passes" scene={scene} camera={camera} />
        <unrealBloomPass attachArray="passes" args={[undefined, 1.5, 1, 0]} />
      </effectComposer>
    </>
  );
}

const Tree = () => {
  return (
    <group>
      <OrbitControls
        autoRotate
        autoRotateSpeed={-3}
        // minDistance={7}
        // maxDistance={10}
      />
      <Bounds fit margin={1}>
        <Center>
          <Bloom>
            <Scene />
          </Bloom>
        </Center>
      </Bounds>
    </group>
  );
};
function App() {
  return (
    <div className={"App"}>
      <Canv>
        <Tree />
      </Canv>
      <h1>
        Created by{" "}
        {/* biome-ignore lint/a11y/noBlankTarget: <explanation> */}
        <a href={"https://www.linkedin.com/in/axmin/"} target={"_blank"}>
          ax-sh
        </a>
      </h1>
    </div>
  );
}

export default App;
