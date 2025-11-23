import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useMediaQuery } from "react-responsive";
import HeroLights from "./HeroLights";
import { FireStation } from "./FireStation";
import { AmbulanceCar } from "./AmbulanceCar";


const AmbulanceModel = () => {
     const isTablet = useMediaQuery({ query: '(max-width: 1024px)' });
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  return (
    <Canvas camera={{position: [0, 0, 15], fov: 45 }}>
        <ambientLight intensity={0.2} color="#1a1a40" />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <OrbitControls
  enablePan={false}
  enableZoom={!isTablet}
  maxDistance={20}
  minDistance={5}
  minPolarAngle={Math.PI / 2}   // lock vertical rotation
  maxPolarAngle={Math.PI / 2}   // lock vertical rotation
/>

        <HeroLights />

        <group
  scale={isMobile ?  1 : 1}   // increase size
  position={[0, -1, 0]}             // center on Y-axis
  rotation={[0, -Math.PI / 4, 0]}   // keep rotation if needed
>
  <AmbulanceCar />
</group>

    </Canvas>
  )
}

export default AmbulanceModel