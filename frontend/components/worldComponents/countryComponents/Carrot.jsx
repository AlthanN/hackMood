import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Carrot(props) {
  const { nodes, materials } = useGLTF('/country_world/Carrot.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['Node-Mesh'].geometry}
        material={materials.lambert2SG}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['Node-Mesh_1'].geometry}
        material={materials.lambert3SG}
      />
    </group>
  )
}

useGLTF.preload('/Carrot.glb')

export default Carrot;