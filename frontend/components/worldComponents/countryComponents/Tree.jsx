import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Tree(props) {
  const { nodes, materials } = useGLTF('/country_world/Tree.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['Node-Mesh'].geometry}
        material={materials.mat9}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['Node-Mesh_1'].geometry}
        material={materials.mat20}
      />
    </group>
  )
}

useGLTF.preload('/Tree.glb')

export default Tree;
