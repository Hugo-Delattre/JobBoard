import React from 'react'
import Table from './Table'
import Tabs from './Tabs'
import { getTableData, getTables } from '@/lib/requests/dashboard'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

type Props = {
  searchParams: Record<string, string>
}

export const metadata = {
  title: "Dashboard"
}

const checkRole = async () => {
  const id = cookies().get("id")?.value

  const response = await fetch(`http://localhost:8000/users/${id}`)
  const { data } = await response.json()

  if (data?.role !== "admin") redirect("/")
}

export default async function Dashboard(props: Props) {
  await checkRole()
  const { view } = props.searchParams

  const tables = await getTables()
  const data = await getTableData(view)

  return (
    <div className='flex flex-col gap-16 md:items-center'>
      <Tabs view={view} tables={tables} />
      {!!view &&
        <Table view={view} data={data} />
      }
    </div>
  )
}