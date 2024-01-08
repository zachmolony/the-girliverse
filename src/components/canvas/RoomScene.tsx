import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { SoftShadows, Float, Sky, PerformanceMonitor, PerspectiveCamera } from '@react-three/drei'
import { useControls } from 'leva'
import { Perf } from 'r3f-perf'
import { easing } from 'maath'
import { Room } from './models/Room'

function Light() {
  const ref = useRef()
  useFrame((state, delta) => {
    if (!ref.current) return
    easing.dampE(
      ref.current.rotation,
      [(state.pointer.y * Math.PI) / 50, (state.pointer.x * Math.PI) / 20, 0],
      0.2,
      delta,
    )
  })
  return (
    <group ref={ref}>
      <directionalLight position={[5, 5, -8]} castShadow intensity={5} shadow-mapSize={1024} shadow-bias={-0.001}>
        <orthographicCamera attach='shadow-camera' args={[-8.5, 8.5, 8.5, -8.5, 0.1, 20]} />
      </directionalLight>
    </group>
  )
}

export function RoomScene() {
  const [bad, set] = useState(false)
  const { impl, debug, enabled, samples, ...config } = useControls({
    debug: true,
    enabled: true,
    size: { value: 35, min: 0, max: 100, step: 0.1 },
    focus: { value: 0.5, min: 0, max: 2, step: 0.1 },
    samples: { value: 16, min: 1, max: 40, step: 1 },
    x: { value: 0, min: -10, max: 10, step: 0.1 },
    y: { value: -2.5, min: -10, max: 10, step: 0.1 },
    z: { value: 0, min: -10, max: 10, step: 0.1 },
  })

  const cameraRef = useRef<typeof PerspectiveCamera>(null)
  useFrame((state, delta) => {
    if (!cameraRef.current) return
    easing.damp3(cameraRef.current.position, [state.pointer.x * 0.5, state.pointer.y * 0.5 + 2, 15], 0.2, delta)
  })

  return (
    <group position={[config.x, config.y, config.z]}>
      {debug && <Perf position='top-left' />}
      <PerformanceMonitor onDecline={() => set(true)} />
      {enabled && <SoftShadows {...config} samples={bad ? Math.min(6, samples) : samples} />}
      <PerspectiveCamera makeDefault fov={40} ref={cameraRef} />
      <color attach='background' args={['#d0d0d0']} />
      <fog attach='fog' args={['#d0d0d0', 8, 35]} />
      <ambientLight intensity={0.4} />
      {/* <Light /> */}
      <Room scale={0.5} position={[0, -1, 0]} />
      <Sky inclination={0.52} scale={20} />
    </group>
  )
}

function Sphere({ color = 'hotpink', floatIntensity = 15, position = [0, 5, -8], scale = 1 }) {
  return (
    <Float floatIntensity={floatIntensity}>
      <mesh castShadow position={position} scale={scale}>
        <sphereGeometry />
        <meshBasicMaterial color={color} roughness={1} />
      </mesh>
    </Float>
  )
}
