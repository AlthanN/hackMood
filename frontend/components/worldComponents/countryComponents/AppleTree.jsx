import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function AppleTree(props) {
  const { nodes, materials } = useGLTF('/country_world/AppleTree.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['apple_tree_01_Cube001-Mesh'].geometry}
        material={materials['8BC34A']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['apple_tree_01_Cube001-Mesh_1'].geometry}
        material={materials['795548']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['apple_tree_01_Cube001-Mesh_2'].geometry}
        material={materials.F44336}
      />
    </group>
  )
}

useGLTF.preload('/AppleTree.glb')

export default AppleTree;