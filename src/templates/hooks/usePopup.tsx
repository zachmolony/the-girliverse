'use client'

import * as React from 'react'

const PopupContext = React.createContext(
  null as {
    isPopupOpen: boolean
    currentObject: ObjectItem
    openPopup: (id: string) => void
    closePopup: () => void
  } | null,
)

export type ObjectItem = {
  id: string
  name: string
  description: string
  price: number
  image: string
}

const objectData: ObjectItem[] = [
  {
    id: 'candles',
    name: 'Candles',
    description: 'A set of candles',
    price: 100,
    image: '/images/candles.png',
  },
  {
    id: 'baker2gVHS',
    name: 'Baker 2G VHS',
    description: 'A VHS tape of Baker 2G',
    price: 100,
    image: '/images/baker2gVHS.png',
  },
]

export function usePopup() {
  const context = React.useContext(PopupContext)
  if (context === null) {
    throw new Error('usePopup must be used within a PopupProvider')
  }
  return context
}

export function PopupProvider({ children }) {
  const [isPopupOpen, setIsPopupOpen] = React.useState(false)
  const [currentObject, setCurrentObject] = React.useState<ObjectItem>(null)

  const openPopup = (id) => {
    setCurrentObject(objectData.find((object) => object.id === id))
    setIsPopupOpen(true)
  }

  const closePopup = () => {
    setIsPopupOpen(false)
  }

  const value = {
    isPopupOpen,
    currentObject,
    openPopup,
    closePopup,
  }

  return <PopupContext.Provider value={value}>{children}</PopupContext.Provider>
}
