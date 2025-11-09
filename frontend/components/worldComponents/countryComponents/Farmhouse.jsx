import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Farmhouse(props) {
  const { nodes, materials } = useGLTF('/country_world/Farmhouse.glb')
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Farm_SecondAge_Level1_1.geometry}
          material={materials.Wood}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Farm_SecondAge_Level1_2.geometry}
          material={materials.Wood_Light}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Farm_SecondAge_Level1_3.geometry}
          material={materials.Dirt}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Farm_SecondAge_Level1_4.geometry}
          material={materials.Main}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Farm_SecondAge_Level1_5.geometry}
          material={materials.Walls}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Farm_SecondAge_Level1_6.geometry}
          material={materials.Stone}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Farm_SecondAge_Level1_7.geometry}
          material={materials.Stone_Light}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/Farmhouse.glb')

export default Farmhouse;