import React from 'react'
import Form from '../components/Form/Form'
import FormField from '../components/Form/FormField'
import { Application } from '@/types/Application'
import FormTextArea from '../components/Form/Form/FormTextArea'

type Props = {
    getApplication: CallableFunction
    onChange: CallableFunction
}

export default function ApplicationsForm({ getApplication, onChange }: Props) {
    const application: Application = getApplication()

    return (
        <Form>
            <FormField name='id' value={application.id} disabled />
            <FormField name='firstName' value={application.firstName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.name, e.target.value)} />
            <FormField name='lastName' value={application.lastName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.name, e.target.value)} />
            <FormField name='phone' value={application.phone} onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.name, e.target.value)} />
            <FormField name='email' value={application.email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.name, e.target.value)} />
            <FormTextArea name='message' value={application.message} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.name, e.target.value)} />
            <FormField name='advertisementId' value={application.advertisementId} onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.name, e.target.value)} />
        </Form>
    )
}