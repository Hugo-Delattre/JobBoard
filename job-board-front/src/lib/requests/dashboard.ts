export const getTables = async (): Promise<string[]> => {
    const response = await fetch("http://localhost:8000/dashboard/tables")
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

    if (response.status === 200) {
        const { id } = await response.json()
        return id
    }

    throw false
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

    if (response.status === 200) return true
    throw false
}