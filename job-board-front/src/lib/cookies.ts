"use server"
import { cookies } from "next/headers"

export async function setCookie(key: string, value: string) {
    "use server"
    cookies().set(key, value)
}