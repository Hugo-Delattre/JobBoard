"use client"

import React, { Reducer, useEffect, useReducer, useState } from 'react'
import EditModal from './EditModal'
import { getTableData, removeEntry } from '@/lib/requests/dashboard'
import { BsFillTrashFill } from "react-icons/bs"
import type { Column } from '@/types/Database'

type Props = {
    view: string,
    columns: Column[]
    data: Record<string, any>[]
}

type ValuesActionType = "SET" | "SETALL"

type ValuesActionPayload<T> = Record<string, any> | { index: number; key: string; value: any }


type ValuesAction<T> = {
    (arg: ValuesActionPayload<T>): T;
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
            if (Array.isArray(payload)) return state
            if (state[payload.index] && payload.key in state[payload.index]) {
                let newState = [...state]
                newState[payload.index][payload.key] = payload.value

                return newState
            }

            return state

        default:
            return state
    }
}

export default function Table({ view, columns, data }: Props) {
    const [state, dispatch] = useReducer(reducer, [...data])
    const [modifiedValue, setModifiedValue] = useState<number>(-1)

    useEffect(() => {
        if (view)
            getTableData(view)
                .then((d: Record<string, any>[]) => {
                    if (Array.isArray(d))
                        // @ts-ignore
                        dispatch({ type: "SETALL", payload: d })
                })
                .catch((err) => console.log(err))
    }, [view])

    const handleEdit = (index: number): void => {
        setModifiedValue(index)
    }

    const handleRemove = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
        e.preventDefault()
        removeEntry(view, id)

    }

    const renderCell = (entry: any, x: number, y: number) => {
        const value = typeof entry?.[1] === "object" ? entry[1]?.id : entry[1]
        return <span
            className='flex w-full h-4'
        >
            {value}
        </span>
    }

    const renderColumns = (): React.ReactNode => {
        return state.map((record: Record<string, any>, index: number) => {
            const entries = Object.entries(record)
            return (
                <tr
                    key={index}
                    onClick={() => handleEdit(index)}
                    className='rounded-full cursor-pointer hover:bg-gray-800'
                >
                    <td className='p-4'>
                        <input onClick={(e) => e.stopPropagation()} type='checkbox' />
                    </td>
                    {entries.map((entry: any[], index2: number) => {
                        return <td key={index2} className='p-4'>
                            {renderCell(entry, index2, index)}
                        </td>
                    })}
                    <td className=''>
                        <button
                            className='p-4 rounded-md bg-white/20 hover:bg-red-500'
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
                // @ts-ignore
                dispatch={(index: number, key: string, value: any) => dispatch({ type: "SET", payload: { index, key, value } })}
                fields={columns}
            />
            <table className='inline w-full overflow-x-auto overflow-y-hidden text-left border-collapse table-auto max-w-fit border-spacing-8'>
                <thead>
                    <tr>
                        <th className='flex items-center justify-center'>
                            <input type="checkbox" className='p-4' />
                        </th>
                        {columns.map((c: Record<string, unknown>, index: number) => {
                            if (c.name && typeof c.name === "string")
                                return <th key={index} className='p-4'>{c.name}</th>
                        })}
                    </tr>
                </thead>
                <tbody className='relative'>
                    {renderColumns()}
                </tbody>
            </table>
        </>
    )
}