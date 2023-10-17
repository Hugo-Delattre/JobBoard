import React from 'react'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> { }

export default function FormField(props: Props) {
  return (
    <label className='flex flex-col w-full gap-2'>
      <span className='px-4'>{props.name}</span>
      <input className='h-12 px-4 py-2 bg-gray-700 rounded-lg' value={props?.value ?? undefined} {...props} />
    </label>
  )
}