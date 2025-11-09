import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function LifePreserve(props) {
  const { nodes, materials } = useGLTF('/happy_world/LifePreserver.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Rectangle_sweep.geometry}
        material={materials.White}
      />
      <mesh castShadow receiveShadow geometry={nodes.Torus1_0.geometry} material={materials.Mat} />
      <mesh castShadow receiveShadow geometry={nodes.Torus1_1.geometry} material={materials.Mat} />
      <mesh castShadow receiveShadow geometry={nodes.Torus1_2.geometry} material={materials.Mat} />
      <mesh castShadow receiveShadow geometry={nodes.Torus1_3.geometry} material={materials.Mat} />
      <mesh castShadow receiveShadow geometry={nodes.Torus.geometry} material={materials.White} />
    </group>
  )
}

useGLTF.preload('/LifePreserver.glb')