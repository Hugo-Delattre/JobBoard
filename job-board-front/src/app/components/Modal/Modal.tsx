"use client"
import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

type Props = {
    children: React.ReactNode
}

export default function Modal({ children }: Props) {
    const [modalsContainer, setModalContainer] = useState<HTMLElement>()

    useEffect(() => {
        const el = document.getElementById("modals")
        if (el) setModalContainer(el)
    }, [])


    if (modalsContainer)
        return createPortal(children, modalsContainer)
}