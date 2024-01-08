'use client'

import { forwardRef, HTMLAttributes, Suspense, useImperativeHandle, useRef } from 'react'
import { OrbitControls, PerspectiveCamera, View as ViewImpl } from '@react-three/drei'
import { Three } from '@/helpers/components/Three'

type CommonProps = { color?: THREE.ColorRepresentation }
type ViewProps = HTMLAttributes<HTMLDivElement> & {
  orbit?: boolean
}

export const Common = ({ color }: CommonProps) => (
  <Suspense fallback={null}>
    {color && <color attach='background' args={[color]} />}
    <ambientLight intensity={0.5} />
    <PerspectiveCamera makeDefault fov={40} position={[0, 0, 20]} />
  </Suspense>
)

const View = forwardRef<HTMLElement, ViewProps>(({ children, orbit, ...props }, ref) => {
  const localRef = useRef(null)
  useImperativeHandle(ref, () => localRef.current)

  return (
    <>
      <div ref={localRef} {...props} />
      <Three>
        <ViewImpl track={localRef}>
          {children}
          {orbit && <OrbitControls />}
        </ViewImpl>
      </Three>
    </>
  )
})
View.displayName = 'View'

export { View }
