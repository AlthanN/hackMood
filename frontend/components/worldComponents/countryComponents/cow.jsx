import React, { useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export function Cow(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/country_world/Cow.glb')
  const { actions } = useAnimations(animations, group)
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Root_Scene">
        <group name="RootNode">
          <group name="Armature" rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <primitive object={nodes.root} />
          </group>
          <group name="Cow" rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <skinnedMesh
              name="Cow_1"
              geometry={nodes.Cow_1.geometry}
              material={materials.White}
              skeleton={nodes.Cow_1.skeleton}
            />
            <skinnedMesh
              name="Cow_2"
              geometry={nodes.Cow_2.geometry}
              material={materials.Black}
              skeleton={nodes.Cow_2.skeleton}
            />
            <skinnedMesh
              name="Cow_3"
              geometry={nodes.Cow_3.geometry}
              material={materials.Pink}
              skeleton={nodes.Cow_3.skeleton}
            />
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/Cow.glb')

export default Cow;
