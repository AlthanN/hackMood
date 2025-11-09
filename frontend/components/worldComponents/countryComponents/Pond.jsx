import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Pond(props) {
  const { nodes, materials } = useGLTF('/country_world/Pond.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['pond_01_Cube010-Mesh'].geometry}
        material={materials['4CAF50']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['pond_01_Cube010-Mesh_1'].geometry}
        material={materials['78909C']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['pond_01_Cube010-Mesh_2'].geometry}
        material={materials['795548']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['pond_01_Cube010-Mesh_3'].geometry}
        material={materials['8BC34A']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['pond_01_Cube010-Mesh_4'].geometry}
        material={materials['039BE5']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['pond_01_Cube010-Mesh_5'].geometry}
        material={materials['00BCD4']}
      />
    </group>
  )
}

useGLTF.preload('/Pond.glb')

export default Pond;