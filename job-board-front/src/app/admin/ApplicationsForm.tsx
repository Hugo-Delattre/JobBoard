import React from 'react'
import Form from '../components/Form/Form'
import FormField from '../components/Form/FormField'
import { Application } from '@/types/Application'
import FormTextArea from '../components/Form/Form/FormTextArea'
import FormSubmit from '../components/Form/Form/FormSubmit'

type Props = {
    getApplication?: CallableFunction
    onChange?: CallableFunction
    onSubmit?: CallableFunction
}

export default function ApplicationsForm({ getApplication, onChange, onSubmit }: Props) {
    const application: Application = getApplication ? getApplication() : {}

    return (
        <Form {...onSubmit && { onSubmit: (e: React.FormEvent) => onSubmit(e) }}>
            {onChange &&
                <FormField
                    name='id'
                    value={application.id ?? ""}
                    disabled
                />
            }
            <FormField
                name='firstName'
                {...onChange && {
                    value: application.firstName ?? "",
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.name, e.target.value)
                }}
            />
            <FormField
                name='lastName'
                {...onChange && {
                    value: application.lastName ?? "",
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.name, e.target.value)
                }}
            />
            <FormField
                name='phone'
                {...onChange && {
                    value: application.phone ?? "",
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.name, e.target.value)
                }}
            />
            <FormField
                name='email'
                {...onChange && {
                    value: application.email ?? "",
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.name, e.target.value)
                }}
            />
            <FormTextArea
                name='message'
                {...onChange && {
                    value: application.message ?? "",
                    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.name, e.target.value)
                }}
            />
            <FormField
                name='advertisementId'
                {...onChange && {
                    value: application.advertisementId ?? "",
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.name, e.target.value)
                }}
            />
            {onSubmit && <FormSubmit />}
        </Form>
    )
}