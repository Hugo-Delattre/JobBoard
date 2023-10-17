"use client"

import React, { useState } from 'react'

interface option {
    name: string
    value: string | number
}

interface Props {
    name: string
    value: any
    options: option[]
    onChange: CallableFunction
}

export default function FormSelect({ options = [], ...props }: Props) {
    const [selected, setSelected] = useState<number>(options.findIndex((o) => o.value === props.value))
    const [expanded, setExpanded] = useState<boolean>(false)

    const handleSelect = (index: number) => {
        props.onChange(options[index].value)
        setSelected(index)
        setExpanded(false)
    }

    return (
        <label className='flex flex-col gap-2'>
            <span className='px-4'>{props.name}</span>
            <div className='relative flex flex-col items-start justify-center h-12 px-4 py-2 bg-gray-700 rounded-lg cursor-pointer'>
                <button onClick={() => setExpanded(p => !p)}>{options[selected]?.name ?? ""}</button>
                <div className={`${expanded ? "flex" : "hidden"} absolute flex-col bg-gray-700 w-full overflow-hidden rounded-lg right-0 left-0 top-14 shadow-sm`}>
                    {options.map((option, index) => {
                        return (
                            <button
                                key={index}
                                className={`px-4 py-2 text-left border-t first:border-none border-t-white/20 ${index === selected ? "bg-gray-600 hover:bg-gray-600/75" : "hover:bg-gray-600/50"}`}
                                onClick={() => handleSelect(index)}>
                                {option.name}
                            </button>
                        )
                    })}
                </div>
            </div>
        </label>
    )
}