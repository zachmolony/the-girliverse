'use client'

import { ObjectItem, usePopup } from '@/templates/hooks/usePopup'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const RoomScene = dynamic(() => import('@/components/canvas/RoomScene').then((mod) => mod.RoomScene), { ssr: false })
const View = dynamic(() => import('@/components/canvas/View').then((mod) => mod.View), {
  ssr: false,
  loading: () => (
    <div className='flex h-96 w-full flex-col items-center justify-center'>
      <svg className='-ml-1 mr-3 h-5 w-5 animate-spin text-black' fill='none' viewBox='0 0 24 24'>
        <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
        <path
          className='opacity-75'
          fill='currentColor'
          d='M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
        />
      </svg>
    </div>
  ),
})
const Common = dynamic(() => import('@/components/canvas/View').then((mod) => mod.Common), { ssr: false })

const PopUpWindow = ({ currentObject, closePopup }: { currentObject: ObjectItem; closePopup: () => void }) => {
  if (!currentObject) return null

  return (
    <div className='fixed inset-32 z-40 overflow-y-auto bg-black bg-opacity-50'>
      {/* Close button */}
      <div className='absolute right-0 top-0 p-4'>
        <button className='text-white' onClick={() => closePopup()}>
          Close
        </button>
      </div>
      <div className='flex h-full w-full flex-col items-center justify-center'>
        <div className='flex flex-col items-center justify-center'>
          {/* <img src={currentObject.image} /> */}
          <div className='flex flex-col items-center justify-center'>
            <div className='text-2xl text-white'>{currentObject.name}</div>
            <div className='text-2xl text-white'>{currentObject.description}</div>
            <div className='text-2xl text-white'>{currentObject.price}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Page() {
  const { isPopupOpen, currentObject, closePopup } = usePopup()

  return (
    <div className='h-screen w-screen'>
      {isPopupOpen && <PopUpWindow currentObject={currentObject} closePopup={closePopup} />}
      <View className='h-full w-full'>
        <Suspense fallback={null}>
          <RoomScene />
          <Common color={'#070014'} />
        </Suspense>
      </View>
    </div>
  )
}
