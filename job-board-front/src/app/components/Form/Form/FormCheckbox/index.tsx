import React from 'react'

interface Props extends React.HTMLAttributes<HTMLInputElement> {
    name?: string
}

export default function FormCheckbox(props: Props) {
    return (
        <label className='flex items-center gap-3 px-2'>
            <input type='checkbox' className='w-4 h-4 px-10' {...props} />
            <span className='text-left'>{props.name}</span>
        </label>
    )
}