
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Hay(props) {
  const { nodes, materials } = useGLTF('/country_world/Hay.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Haystack_mesh.geometry}
        material={materials.lambert2SG}
      />
    </group>
  )
}

useGLTF.preload('/Haystack.glb')

export default Hay;