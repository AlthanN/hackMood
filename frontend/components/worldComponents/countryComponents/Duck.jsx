import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Duck(props) {
  const { nodes, materials } = useGLTF('/country_world/Duck.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Duck_01_Cube045_1.geometry}
        material={materials['455A64']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Duck_01_Cube045_1_1.geometry}
        material={materials['4CAF50']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Duck_01_Cube045_1_2.geometry}
        material={materials.FFFFFF}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Duck_01_Cube045_1_3.geometry}
        material={materials['795548']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Duck_01_Cube045_1_4.geometry}
        material={materials['78909C']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Duck_01_Cube045_1_5.geometry}
        material={materials.FFEB3B}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Duck_01_Cube045_1_6.geometry}
        material={materials['1A1A1A']}
      />
    </group>
  )
}

useGLTF.preload('/Duck.glb')

export default Duck;