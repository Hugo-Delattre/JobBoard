import React from 'react'

interface Props extends React.HTMLAttributes<HTMLTextAreaElement> {
    name: string
    value: string | undefined
}

export default function FormTextArea(props: Props) {
    return (
        <label className='flex flex-col w-full gap-2'>
            <span className='px-4'>{props.name}</span>
            <textarea className='px-4 py-2 bg-gray-700 rounded-lg min-h-12' {...props} value={props.value ?? ""} />
        </label>
    )
}