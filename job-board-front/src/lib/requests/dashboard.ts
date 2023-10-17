import { Column } from "@/types/Database"

export const getTables = async (): Promise<string[]> => {
    const response = await fetch("http://localhost:8000/dashboard/tables")
    if (response.status !== 200) return []
    const { data } = await response.json()

    return data
}

export const getColumns = async (view: string): Promise<Column[]> => {
    if (!view) return []
    const response = await fetch(`http://localhost:8000/dashboard/tables/${view}`)
    if (response.status !== 200) return []
    const { data } = await response.json()

    return data
}

export const getTableData = async (view: string): Promise<Record<string, unknown>[]> => {
    if (!view) return []
    const response = await fetch(`http://localhost:8000/${view}`)
    if (response.status !== 200) return []
    const { data } = await response.json()

    return data
}

export const editColumn = async (view: string, id: number, changes: Record<string, any>) => {
    await fetch(`http://localhost:8000/${view}/${id}`, {
        method: "PUT",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(changes)
    })
}