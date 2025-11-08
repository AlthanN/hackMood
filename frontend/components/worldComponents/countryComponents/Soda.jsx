
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Soda(props) {
  const { nodes, materials } = useGLTF('/country_world/Soda Can.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['Circle001-Mesh'].geometry}
        material={materials['78909C']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['Circle001-Mesh_1'].geometry}
        material={materials.F44336}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['Circle001-Mesh_2'].geometry}
        material={materials.FFFFFF}
      />
    </group>
  )
}

useGLTF.preload('/Soda Can.glb')

export default Soda;