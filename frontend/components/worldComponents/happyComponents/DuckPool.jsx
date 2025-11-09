import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function DuckPool(props) {
  const { nodes, materials } = useGLTF('/happy_world/DuckPool.glb')
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Torus_1.geometry}
          material={materials.Material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Torus_2.geometry}
          material={materials['Material.001']}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/Rubber Duck Pool Toy.glb')