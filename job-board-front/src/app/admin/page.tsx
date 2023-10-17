import React from 'react'
import Table from './Table'
import Tabs from './Tabs'
import { getColumns, getTableData, getTables } from '@/lib/requests/dashboard'

type Props = {
  searchParams: Record<string, string>
}

export const metadata = {
  title: "Dashboard"
}



export default async function Dashboard(props: Props) {
  const { view } = props.searchParams

  const tables = await getTables()
  const columns = await getColumns(view)
  const data = await getTableData(view)

  return (
    <div className='flex flex-col gap-16 md:items-center'>
      <Tabs view={view} tables={tables} />
      <Table view={view} columns={columns} data={data} />
    </div>
  )
}