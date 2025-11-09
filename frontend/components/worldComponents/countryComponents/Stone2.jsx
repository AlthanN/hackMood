import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Stone2(props) {
  const { nodes, materials } = useGLTF('/country_world/Stone2.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group758319826.geometry}
        material={materials.mat22}
      />
    </group>
  )
}

useGLTF.preload('/Stone2.glb')

export default Stone2;