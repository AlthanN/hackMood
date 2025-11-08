import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Pig(props) {
  const { nodes, materials } = useGLTF('/country_world/Pig.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Geo_Pig.geometry}
        material={materials.lambert2SG}
      />
    </group>
  )
}

useGLTF.preload('/Pig.glb')

export default Pig;
