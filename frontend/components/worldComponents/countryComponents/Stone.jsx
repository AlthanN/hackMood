import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Stone(props) {
  const { nodes, materials } = useGLTF('/country_world/Stone.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group1988159041.geometry}
        material={materials.mat22}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group337471551.geometry}
        material={materials.mat22}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group765248285.geometry}
        material={materials.mat22}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group697255115.geometry}
        material={materials.mat22}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group821822121.geometry}
        material={materials.mat22}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group1383753236.geometry}
        material={materials.mat22}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group1230782801.geometry}
        material={materials.mat22}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group295268605.geometry}
        material={materials.mat22}
      />
    </group>
  )
}

useGLTF.preload('/Stone.glb')

export default Stone;