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

export const addEntry = async (view: string, data: Record<string, any>) => {
    const response = await fetch(`http://localhost:8000/${view}`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(data)
    })

    const d = await response.json()
    console.log("post data", d)
}

export const editEntry = async (view: string, id: number, changes: Record<string, any>) => {
    await fetch(`http://localhost:8000/${view}/${id}`, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(changes)
    })
}

export const removeEntry = async (view: string, id: number) => {
    const response = await fetch(`http://localhost:8000/${view}/${id}`, {
        method: "DELETE"
    })

    if (response.status === 200) console.log("OK")
    else console.log("FAILED")

    console.log(response.status)
}