import React from 'react'
import Dictionary from '../../interfaces/Dictionary'

interface Props {
  modals: Dictionary<React.FC>
  current: Current[]
}

interface Current {
  name: string
  params?: object
}

const Modal: React.FC<Props> = ({ modals, current }) => {
  const currentModals = current.filter((current) => modals[current.name])

  if (!currentModals.length) return null

  return (
    <>
      {currentModals.map((current, i) => {
        const ModalComponent = modals[current.name]
        return <ModalComponent key={i} {...current.params} />
      })}
    </>
  )
}

export default Modal
