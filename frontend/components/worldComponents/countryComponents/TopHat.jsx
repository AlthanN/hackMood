import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function TopHat(props) {
  const { nodes, materials } = useGLTF('/country_world/TopHat.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['Top_hat_01_Circle003-Mesh'].geometry}
        material={materials['1A1A1A']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['Top_hat_01_Circle003-Mesh_1'].geometry}
        material={materials.F44336}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['Top_hat_01_Circle003-Mesh_2'].geometry}
        material={materials.FFCC88}
      />
    </group>
  )
}

useGLTF.preload('/TopHat.glb')

export default TopHat;