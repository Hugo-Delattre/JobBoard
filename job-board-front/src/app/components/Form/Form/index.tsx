import React from 'react'

interface Props extends React.HTMLAttributes<HTMLFormElement> { }

export default function Form(props: Props) {
  return (
    <form className='flex flex-col w-full gap-4' {...props} onSubmit={(e) => props.onSubmit && props.onSubmit(e)}>
      {props.children}
    </form>
  )
}