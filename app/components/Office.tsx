import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    ["black-material"]: THREE.Mesh;
    ["exterior_Baked-material"]: THREE.Mesh;
    ["light-material"]: THREE.Mesh;
    ["monitor-material"]: THREE.Mesh;
    ["office_hp_Baked-material"]: THREE.Mesh;
    ["orange-material"]: THREE.Mesh;
    ["office_hp_Baked-material001"]: THREE.Mesh;
    Cube: THREE.Mesh;
    Cube001: THREE.Mesh;
  };
  materials: {
    black: THREE.MeshBasicMaterial;
    exterior_Baked: THREE.MeshBasicMaterial;
    light: THREE.MeshBasicMaterial;
    monitor: THREE.MeshBasicMaterial;
    office_hp_Baked: THREE.MeshBasicMaterial;
    orange: THREE.MeshBasicMaterial;
    Mirvac: THREE.MeshStandardMaterial;
  };
};

export function Office(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/office.glb") as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <group
        position={[3.149, 0.153, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.048}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["black-material"].geometry}
          material={materials.black}
          position={[-63.278, -60, 59]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["exterior_Baked-material"].geometry}
          material={materials.exterior_Baked}
          position={[-146.609, -11.784, 27.648]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["light-material"].geometry}
          material={materials.light}
          position={[-125.965, 16, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["monitor-material"].geometry}
          material={materials.monitor}
          position={[-26.511, 3.268, 18.32]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["office_hp_Baked-material"].geometry}
          material={materials.office_hp_Baked}
          position={[-53.653, 14.482, 15.699]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["orange-material"].geometry}
          material={materials.orange}
          position={[-125.965, 16, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["office_hp_Baked-material001"].geometry}
          material={materials.office_hp_Baked}
          position={[-60.465, -3, 55.809]}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube.geometry}
        material={materials.black}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube001.geometry}
        material={materials.Mirvac}
      />
    </group>
  );
}

useGLTF.preload("/office.glb");
