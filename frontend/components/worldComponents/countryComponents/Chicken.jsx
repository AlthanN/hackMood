
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Chicken(props) {
  const { nodes, materials } = useGLTF('/country_world/Chicken.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['Cube035_Cube034-Mesh'].geometry}
        material={materials.FF9800}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['Cube035_Cube034-Mesh_1'].geometry}
        material={materials.FFFFFF}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['Cube035_Cube034-Mesh_2'].geometry}
        material={materials['1A1A1A']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['Cube035_Cube034-Mesh_3'].geometry}
        material={materials.F44336}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['Cube035_Cube034-Mesh_4'].geometry}
        material={materials['455A64']}
      />
    </group>
  )
}

useGLTF.preload('/Chicken.glb')

export default Chicken;
