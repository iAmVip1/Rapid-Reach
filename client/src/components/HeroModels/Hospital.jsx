
import { useGLTF } from '@react-three/drei'

export function Hospital(props) {
  const { nodes, materials } = useGLTF('/models/service/hospital.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Object_4.geometry} material={materials.Material} rotation={[0, -Math.PI / 2, 0]} />
    </group>
  )
}

useGLTF.preload('/models/service/hospital.glb')
