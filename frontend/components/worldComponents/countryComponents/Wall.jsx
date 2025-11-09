import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Wall(props) {
  const { nodes, materials } = useGLTF('/country_world/Wall.glb')
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Wall_SecondAge_1.geometry}
          material={materials.Stone}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Wall_SecondAge_2.geometry}
          material={materials.Stone_Light}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Wall_SecondAge_3.geometry}
          material={materials.Wood}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/Wall.glb')

export default Wall;
