import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Fence(props) {
  const { nodes, materials } = useGLTF('/country_world/Fence.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Fence_Cube057.geometry}
        material={materials.Brown}
      />
    </group>
  )
}

useGLTF.preload('/Fence.glb')

export default Fence;