"use client"

import Link from 'next/link'
import React, { MutableRefObject, useEffect, useRef, useState } from 'react'

type Props = {
  view: string,
  tables: string[]
}

export default function Tabs({ view, tables }: Props) {
  const [tab, setTab] = useState<string>(view)
  const [offsetLeft, setOffsetLeft] = useState<number>(0)
  const [underlineWidth, setUnderlineWidth] = useState<number>(0)

  const refs: MutableRefObject<Record<string, HTMLAnchorElement>> = useRef({})

  const handleTabChange = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, table: string) => {
    const target = e.target as HTMLAnchorElement

    setOffsetLeft(target.offsetLeft + 8)
    setUnderlineWidth(target.clientWidth - 16)
    setTab(table)
  }

  useEffect(() => {
    if (!refs.current?.[tab as keyof typeof refs.current]) return
    const { offsetLeft, clientWidth } = refs.current?.[tab as keyof typeof refs.current]

    setOffsetLeft(offsetLeft + 8)
    setUnderlineWidth(clientWidth - 16)
  }, [tab])

  return (
    <div className='relative flex flex-col gap-4 md:flex-row'>
      <div style={{ width: underlineWidth, left: offsetLeft }} className='absolute h-1 transition-all bg-white rounded-full -bottom-4' />
      {tables.map((table: string, index) => {
        const text = `${table.slice(0, 1).toUpperCase()}${table.slice(1)}`
        return <Link
          ref={(e) => e ? refs.current[table as keyof typeof refs.current] = e : null}
          key={index}
          href={`/admin?view=${table}`}
          onClick={(e) => handleTabChange(e, table)}
        >
          {text}
        </Link>
      })}
    </div >
  )
}
