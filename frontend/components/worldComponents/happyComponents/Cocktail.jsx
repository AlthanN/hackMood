import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Cocktail(props) {
  const { nodes, materials } = useGLTF('/happy_world/Cocktail.glb')
  return (
    <group {...props} dispose={null}>
      <mesh castShadow receiveShadow geometry={nodes.straw.geometry} material={materials.green} />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.cocktail_1.geometry}
        material={materials._defaultMat}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.cocktail_1_1.geometry}
        material={materials.greyLight}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.cocktail_1_2.geometry}
        material={materials.red}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.lemon_1.geometry}
        material={materials.brownLight}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.lemon_1_1.geometry}
        material={materials.yellow}
      />
    </group>
  )
}

useGLTF.preload('/Cocktail.glb')
