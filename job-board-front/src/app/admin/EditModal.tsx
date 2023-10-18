"use client"

import React, { useEffect, useState } from 'react'
import Modal from '../components/Modal/Modal'
import { Column } from '@/types/Database'
import { editEntry } from '@/lib/requests/dashboard'
import UsersForm from './UsersForm'

type Props = {
    view: string,
    modified: number,
    fields: Column[]
    onClose?: CallableFunction,
    state: Record<string, any>,
    dispatch: CallableFunction
}

export default function EditModal(props: Props) {
    const [visible, setVisible] = useState<boolean>(false)

    const handleChange = async (key: string, value: any) => {
        props.dispatch(props.modified, key, value)
        await editEntry(props.view, props.state.id, { [key]: value })
    }

    const renderForm = () => {
        switch (props.view) {
            case "users":
                return <UsersForm
                    getUser={() => props.state}
                    onChange={(key: string, value: any) => handleChange(key, value)}
                />
            case "companies":
                return
            default:
                return
        }
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
        setVisible(props.modified >= 0)
    }, [props.modified])

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
                        {props.modified >= 0 ?
                            renderForm()
                            : null
                        }
                    </div>
                </div>
            </div>
        </Modal>
    )
}