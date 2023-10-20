import React from 'react'
import Form from '@/app/components/Form/Form'
import FormField from '@/app/components/Form/FormField'
import FormSelect from '@/app/components/Form/FormSelect'
import { User } from '@/types/User'
import FormSubmit from '../components/Form/Form/FormSubmit'

type Props = {
    getUser?: CallableFunction
    onChange?: CallableFunction
    onSubmit?: CallableFunction
}

export default function UsersForm({ getUser, onChange, onSubmit }: Props) {
    const user: User = getUser ? getUser() : {}

    const genderOptions = [
        { name: "Male", value: "male" },
        { name: "Female", value: "female" },
        { name: "Other", value: "other" }
    ]

    const roleOptions = [
        { name: "User", value: "user" },
        { name: "Admin", value: "admin" }
    ]

    if (!onChange && !onSubmit) return

    return (
        <Form {...onSubmit && { onSubmit: (e: React.FormEvent) => onSubmit(e) }}>
            {onChange &&
                <FormField
                    type="number"
                    name='id'
                    value={user.id ?? ""}
                    disabled
                />
            }
            <FormField
                type="text"
                name='firstName'
                {...onChange && {
                    value: user.firstName ?? "",
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => onChange && onChange(e.target.name, e.target.value)
                }}
            />
            <FormField
                type="text"
                name='lastName'
                {...onChange && {
                    value: user.lastName ?? "",
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => onChange && onChange(e.target.name, e.target.value)
                }}
            />
            <FormSelect
                name='gender'
                {...onChange && {
                    value: user.gender ?? "",
                    onChange: (value: any) => onChange && onChange("gender", value)
                }}
                options={genderOptions}
            />
            <FormField
                type='email'
                name='email'
                {...onChange && {
                    value: user.email ?? "",
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => onChange && onChange(e.target.name, e.target.value)
                }}
            />
            <FormField
                type='password'
                name='password'
                {...onChange && {
                    value: user.password ?? "",
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => onChange && onChange(e.target.name, e.target.value)
                }}
            />
            <FormField
                type='text'
                name='profilePicture'
                {...onChange && {
                    value: user.profilePicture ?? "",
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => onChange && onChange(e.target.name, e.target.value)
                }}
            />
            <FormSelect
                name='role'
                {...onChange && {
                    value: user.role ?? "",
                    onChange: (value: any) => onChange && onChange("role", value)
                }}
                options={roleOptions}
            />
            {onSubmit && <FormSubmit />}
        </Form>
    )
}