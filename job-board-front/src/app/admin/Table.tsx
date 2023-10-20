"use client"

import React, { Reducer, useEffect, useReducer, useState } from 'react'
import EditModal from './EditModal'
import { getTableData, removeEntry } from '@/lib/requests/dashboard'
import { BsFillTrashFill } from "react-icons/bs"
import { columns as dashboardColumns } from '@/data/dashboard'
import AddModal from './AddModal'

type Props = {
    view: string,
    data: Record<string, any>[]
}

type ValuesActionType = "SET" | "SETALL" | "ADD" | "REMOVE"

type ValuesActionPayload<T> =
    T extends "SETALL" ? Record<string, any>[]
    : T extends "SET" ? { index: number; key: string; value: any }
    : T extends "ADD" ? Record<string, any>
    : T extends "REMOVE" ? number
    : null


type ValuesAction<T> = {
    type: ValuesActionType
    payload: ValuesActionPayload<T>;
}

type ValuesState = Record<string, any>[]

const reducer: Reducer<ValuesState, ValuesAction<ValuesActionType>> = (state: ValuesState, action: ValuesAction<ValuesActionType>) => {
    const { type, payload } = action
    switch (type) {
        case "SETALL":
            if (Array.isArray(payload)) {
                return payload
            }
            return state;

        case "SET":
            if (Array.isArray(payload) || typeof payload === "number") return state
            if (state[payload.index] && payload.key in state[payload.index]) {
                let newState = [...state]
                newState[payload.index][payload.key] = payload.value

                return newState
            }

            return state

        case "ADD":
            return [...state, payload]

        case "REMOVE":
            const index = state.findIndex((element: Record<string, any>) => {
                return element.id === payload
            })

            if (index === -1) return state

            const newState = [...state.slice(0, index), ...state.slice(index + 1)]

            return newState

        default:
            return state
    }
}

export default function Table({ view, data }: Props) {
    const columns = dashboardColumns[view as keyof typeof dashboardColumns]
    const [state, dispatch] = useReducer(reducer, data)
    const [modifiedValue, setModifiedValue] = useState<number>(-1)
    const [addingEntry, setAddingEntry] = useState<boolean>(false)

    useEffect(() => {
        if (view)
            getTableData(view)
                .then((tableData: Record<string, any>[]) => {
                    dispatch({ type: "SETALL", payload: tableData })
                })
                .catch((err) => console.log(err))
    }, [view])

    const handleEdit = (index: number): void => {
        setModifiedValue(index)
    }

    const handleRemove = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
        e.stopPropagation()
        removeEntry(view, id)
            .then((r) => {
                dispatch({ type: "REMOVE", payload: id })
            }).catch((err) => {
                console.log(err)
            })
    }

    const renderCell = (column: string, index: number) => {
        const value = state[index][column]
        return <span
            className='flex w-full h-4 w-fit max-w-[100px]'
        >
            {typeof value === "object" ? value?.id : value}
        </span>
    }

    const renderColumns = (): React.ReactNode => {
        return state.map((record: Record<string, any>, index: number) => {
            return (
                <tr
                    key={index}
                    onClick={() => handleEdit(index)}
                    className='py-10 rounded-full cursor-pointer hover:bg-gray-800'
                >
                    <td className='flex items-center p-4'>
                        <input onClick={(e) => e.stopPropagation()} type='checkbox' />
                    </td>
                    {columns.map((column: string, index2: number) => {
                        return <td key={index2} className='p-4 overflow-hidden text-ellipsis whitespace-nowrap'>
                            {renderCell(column, index)}
                        </td>
                    })}
                    <td className='flex items-center'>
                        <button
                            className='p-4 scale-90 rounded-md bg-white/20 hover:bg-red-500'
                            onClick={(e) => handleRemove(e, record.id)}
                        >
                            <BsFillTrashFill />
                        </button>
                    </td>
                </tr>
            )
        })
    }

    return (
        <>
            <EditModal
                view={view}
                modified={modifiedValue}
                onClose={() => setModifiedValue(-1)}
                state={state[modifiedValue]}
                dispatch={(index: number, key: string, value: any) => dispatch({ type: "SET", payload: { index, key, value } })}
                fields={columns}
            />

            <AddModal
                view={view}
                onClose={() => setAddingEntry(false)}
                dispatch={(data: Record<string, any>) => dispatch({ type: "ADD", payload: data })}
                addingEntry={addingEntry}
            >
            </AddModal>

            <table className='inline w-full overflow-x-auto overflow-y-hidden text-left border-collapse table-auto max-w-fit border-spacing-8'>
                <thead>
                    <tr>
                        <th className='flex items-center justify-center'>
                            <input type="checkbox" className='p-4' />
                        </th>
                        {columns.map((c: string, index: number) => {
                            return <th key={index} className='p-4'>{c}</th>
                        })}
                        <th>
                            <button
                                onClick={() => setAddingEntry(true)}
                                className='w-12 h-12 scale-90 bg-blue-500 rounded-md hover:bg-blue-600'>
                                +
                            </button>
                        </th>
                    </tr>
                </thead>
                <tbody className='relative'>
                    {renderColumns()}
                </tbody>
            </table>
        </>
    )
}