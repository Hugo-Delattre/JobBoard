export interface User {
    id: number
    firstName: string
    lastName: string
    gender: "male" | "female" | "other"
    email: string
    password: string
    company: number
    profilePicture?: number
    resume?: number
    role: "user" | "admin"
}