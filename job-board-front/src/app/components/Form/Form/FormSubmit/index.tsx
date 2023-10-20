import React from 'react'

type Props = {}

export default function FormSubmit({ }: Props) {
  return (
    <button
      className='self-center px-16 py-2 bg-blue-500 rounded-md hover:bg-blue-600 w-fit'
      type='submit'
    >
      Submit
    </button>
  )
}