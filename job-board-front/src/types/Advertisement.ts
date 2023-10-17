export interface Advertisement {
    id: number
    title: string
    company: number
    description: string
    salary: number
    location: string
    workingHours: number
    type: string
    images: number[]
    applications: number[]
    active: boolean
    publishDate: Date
}