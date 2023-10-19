import React from 'react'
import Form from '@/app/components/Form/Form'
import FormField from '@/app/components/Form/FormField'
import FormSelect from '@/app/components/Form/FormSelect'
import { User } from '@/types/User'

type Props = {
    getUser: CallableFunction
    onChange: CallableFunction
}

export default function UsersForm({ getUser, onChange }: Props) {
    const user: User = getUser()

    const genderOptions = [
        { name: "Male", value: "male" },
        { name: "Female", value: "female" },
        { name: "Other", value: "other" }
    ]

    const roleOptions = [
        { name: "User", value: "user" },
        { name: "Admin", value: "admin" }
    ]

    return (
        <Form>
            <FormField type="number" name='id' value={user.id} disabled />
            <FormField type="text" onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.name, e.target.value)} name='firstName' value={user.firstName} />
            <FormField type="text" onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.name, e.target.value)} name='lastName' value={user.lastName} />
            <FormSelect onChange={(value: any) => onChange("gender", value)} options={genderOptions} name='gender' value={user.gender} />
            <FormField type='email' onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.name, e.target.value)} name='email' value={user.email} />
            <FormField type='password' onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.name, e.target.value)} name='password' value={user.password} />
            <FormField type='text' onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.name, e.target.value)} name='profilePicture' value={user.profilePicture} />
            <FormSelect onChange={(value: any) => onChange("role", value)} options={roleOptions} name='role' value={user.role} />
        </Form>
    )
}