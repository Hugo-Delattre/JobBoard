"use client"

import React, { useEffect, useState } from 'react'
import Modal from '../components/Modal/Modal'
import UsersForm from './UsersForm'
import CompaniesForm from './CompaniesForm'
import AdvertisementsForm from './AdvertisementsForm'
import ApplicationsForm from './ApplicationsForm'
import { addEntry } from '@/lib/requests/dashboard'

type Props = {
    view: string
    onClose?: CallableFunction
    addingEntry: boolean
    dispatch: CallableFunction
}

export default function AddModal(props: Props) {
    const [visible, setVisible] = useState<boolean>(false)

    const renderForm = () => {
        switch (props.view) {
            case "users":
                return (
                    <UsersForm
                        onSubmit={handleSubmit}
                    />
                )
            case "companies":
                return (
                    <CompaniesForm
                        onSubmit={handleSubmit}
                    />
                )
            case "advertisements":
                return (
                    <AdvertisementsForm
                        onSubmit={handleSubmit}

                    />
                )
            case "applications":
                return (
                    <ApplicationsForm
                        onSubmit={handleSubmit}
                    />
                )
            default:
                return
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const target = e.target as HTMLFormElement
        const formData = new FormData(target)
        const data: Record<string, any> = {}

        formData.forEach((v, k) => data[k] = v)

        const id = await addEntry(props.view, data)

        if (id) props.dispatch({ ...data, id })
    }

    const handleClose = () => {
        if (props.onClose) props.onClose()
        setVisible(false)
    }

    const handleClickOutside = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation()
        handleClose()
    }

    const handleEscKey = (e: KeyboardEvent) => {
        e.stopPropagation()
        if (e.key === "Escape") handleClose()
    }

    useEffect(() => {
        if (visible) window.addEventListener("keydown", handleEscKey)
        else return () => {
            window.removeEventListener("keydown", handleEscKey)
        }
    }, [visible])

    useEffect(() => {
        setVisible(props.addingEntry)
    }, [props.addingEntry])

    return (
        <Modal>
            <div
                onClick={handleClickOutside}
                className={`fixed inset-0 z-50 flex items-center justify-center bg-black/25 ${visible ? "block" : "hidden"}`}
            >
                <div
                    onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => e.stopPropagation()}
                    className='w-full h-full p-4 overflow-hidden bg-gray-800 md:max-w-xl md:h-fit md:rounded-xl'
                >
                    {/* Header */}
                    <div className='flex items-center justify-center'>
                        <span className='basis-1/3' />
                        <span className='text-xl font-medium text-center basis-1/3'>
                            {`${props.view?.slice(0, 1).toUpperCase()}${props.view?.slice(1).toLowerCase()}`}
                        </span>
                        <span className='flex justify-end basis-1/3'>
                            <button
                                onClick={handleClose}
                                className='flex items-center justify-center w-4 h-4 text-xl bg-red-500 rounded-full group'
                            >
                                <div className='hidden w-2 h-2 rounded-full bg-white/75 group-hover:block' />
                            </button>
                        </span>
                    </div>
                    <div className='flex flex-col items-center h-full gap-4 py-8 overflow-y-auto max-h-[80vh] overflow-y-auto'>
                        {props.addingEntry ?
                            renderForm()
                            : null
                        }
                    </div>
                </div>
            </div>
        </Modal>
    )
}