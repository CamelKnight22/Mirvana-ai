"use client";
import * as THREE from "three";
import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    back_hair: THREE.SkinnedMesh;
    Body: THREE.SkinnedMesh;
    Eye_outer: THREE.SkinnedMesh;
    eyebrow: THREE.SkinnedMesh;
    hair: THREE.SkinnedMesh;
    hair_tie: THREE.SkinnedMesh;
    hairbun: THREE.SkinnedMesh;
    lashes: THREE.SkinnedMesh;
    legs: THREE.SkinnedMesh;
    Lower_Lessa: THREE.SkinnedMesh;
    Lower_Teeth: THREE.SkinnedMesh;
    Mouth: THREE.SkinnedMesh;
    pants: THREE.SkinnedMesh;
    shirt: THREE.SkinnedMesh;
    shirt_1: THREE.SkinnedMesh;
    shirt_2: THREE.SkinnedMesh;
    shirt_3: THREE.SkinnedMesh;
    shoes: THREE.SkinnedMesh;
    Tongue: THREE.SkinnedMesh;
    Upper_Lessa: THREE.SkinnedMesh;
    Upper_Teeth: THREE.SkinnedMesh;
    rootx: THREE.Bone;
    c_eye_targetx: THREE.Bone;
  };
  materials: {
    Hair: THREE.MeshStandardMaterial;
    skin: THREE.MeshStandardMaterial;
    eye: THREE.MeshStandardMaterial;
    shirt: THREE.MeshStandardMaterial;
    legs: THREE.MeshStandardMaterial;
    lessa: THREE.MeshStandardMaterial;
    teeth: THREE.MeshStandardMaterial;
    mouth: THREE.MeshStandardMaterial;
    pants: THREE.MeshStandardMaterial;
    Material: THREE.MeshStandardMaterial;
    Shoes: THREE.MeshStandardMaterial;
    tongue: THREE.MeshStandardMaterial;
  };
  animations: GLTFAction[];
};

type ActionName = "idle" | "talk";
interface GLTFAction extends THREE.AnimationClip {
  name: ActionName;
}
export interface AnimationControl {
  mode: "continuous" | "once";
  animation: ActionName;
  animationSpeed?: number;
}
export function Model(
  props: JSX.IntrinsicElements["group"] & { animationControl: AnimationControl }
) {
  const group = useRef<THREE.Group>(null);
  const { nodes, materials, animations } = useGLTF("/Model.glb") as GLTFResult;
  const { actions } = useAnimations<GLTFAction>(animations, group);

  useEffect(() => {
    const { animation } = props.animationControl;
    const action = actions[animation];

    if (action) {
      action.play();
    }

    return () => {
      if (action) {
        action.stop();
      }
    };
  }, [actions, props.animationControl]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="root">
          <skinnedMesh
            name="back_hair"
            geometry={nodes.back_hair.geometry}
            material={materials.Hair}
            skeleton={nodes.back_hair.skeleton}
          />
          <skinnedMesh
            name="Body"
            geometry={nodes.Body.geometry}
            material={materials.skin}
            skeleton={nodes.Body.skeleton}
          />
          <skinnedMesh
            name="Eye_outer"
            geometry={nodes.Eye_outer.geometry}
            material={materials.eye}
            skeleton={nodes.Eye_outer.skeleton}
          />
          <skinnedMesh
            name="eyebrow"
            geometry={nodes.eyebrow.geometry}
            material={materials.Hair}
            skeleton={nodes.eyebrow.skeleton}
          />
          <skinnedMesh
            name="hair"
            geometry={nodes.hair.geometry}
            material={materials.Hair}
            skeleton={nodes.hair.skeleton}
          />
          <skinnedMesh
            name="hair_tie"
            geometry={nodes.hair_tie.geometry}
            material={materials.shirt}
            skeleton={nodes.hair_tie.skeleton}
          />
          <skinnedMesh
            name="hairbun"
            geometry={nodes.hairbun.geometry}
            material={materials.Hair}
            skeleton={nodes.hairbun.skeleton}
          />
          <skinnedMesh
            name="lashes"
            geometry={nodes.lashes.geometry}
            material={materials.Hair}
            skeleton={nodes.lashes.skeleton}
          />
          <skinnedMesh
            name="legs"
            geometry={nodes.legs.geometry}
            material={materials.legs}
            skeleton={nodes.legs.skeleton}
          />
          <skinnedMesh
            name="Lower_Lessa"
            geometry={nodes.Lower_Lessa.geometry}
            material={materials.lessa}
            skeleton={nodes.Lower_Lessa.skeleton}
          />
          <skinnedMesh
            name="Lower_Teeth"
            geometry={nodes.Lower_Teeth.geometry}
            material={materials.teeth}
            skeleton={nodes.Lower_Teeth.skeleton}
          />
          <skinnedMesh
            name="Mouth"
            geometry={nodes.Mouth.geometry}
            material={materials.mouth}
            skeleton={nodes.Mouth.skeleton}
          />
          <skinnedMesh
            name="pants"
            geometry={nodes.pants.geometry}
            material={materials.pants}
            skeleton={nodes.pants.skeleton}
          />
          <skinnedMesh
            name="shirt"
            geometry={nodes.shirt.geometry}
            material={materials.shirt}
            skeleton={nodes.shirt.skeleton}
          />
          <skinnedMesh
            name="shirt_1"
            geometry={nodes.shirt_1.geometry}
            material={materials.shirt}
            skeleton={nodes.shirt_1.skeleton}
          />
          <skinnedMesh
            name="shirt_2"
            geometry={nodes.shirt_2.geometry}
            material={materials.shirt}
            skeleton={nodes.shirt_2.skeleton}
          />
          <skinnedMesh
            name="shirt_3"
            geometry={nodes.shirt_3.geometry}
            material={materials.Material}
            skeleton={nodes.shirt_3.skeleton}
          />
          <skinnedMesh
            name="shoes"
            geometry={nodes.shoes.geometry}
            material={materials.Shoes}
            skeleton={nodes.shoes.skeleton}
          />
          <skinnedMesh
            name="Tongue"
            geometry={nodes.Tongue.geometry}
            material={materials.tongue}
            skeleton={nodes.Tongue.skeleton}
          />
          <skinnedMesh
            name="Upper_Lessa"
            geometry={nodes.Upper_Lessa.geometry}
            material={materials.lessa}
            skeleton={nodes.Upper_Lessa.skeleton}
          />
          <skinnedMesh
            name="Upper_Teeth"
            geometry={nodes.Upper_Teeth.geometry}
            material={materials.teeth}
            skeleton={nodes.Upper_Teeth.skeleton}
          />
          <primitive object={nodes.rootx} />
          <primitive object={nodes.c_eye_targetx} />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/Model.glb");
