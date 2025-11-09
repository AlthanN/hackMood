import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Turtle(props) {
  const { nodes, materials } = useGLTF('/happy_world/Turtle.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Turtle_01_Circle009_1.geometry}
        material={materials['4CAF50']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Turtle_01_Circle009_1_1.geometry}
        material={materials.DD9944}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Turtle_01_Circle009_1_2.geometry}
        material={materials['1A1A1A']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Turtle_01_Circle009_1_3.geometry}
        material={materials['8BC34A']}
      />
    </group>
  )
}

useGLTF.preload('/Turtle.glb')