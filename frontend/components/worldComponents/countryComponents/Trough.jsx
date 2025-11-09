import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Trough(props) {
  const { nodes, materials } = useGLTF('/country_world/Trough.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['wood_water_trough_Cube-Mesh'].geometry}
        material={materials.Material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['wood_water_trough_Cube-Mesh_1'].geometry}
        material={materials.water}
      />
    </group>
  )
}

useGLTF.preload('/Wood Water Trough.glb')

export default Trough;