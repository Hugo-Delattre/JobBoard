import React from 'react'
import Form from '../components/Form/Form'
import FormField from '../components/Form/FormField'
import { Company } from '@/types/Company'

type Props = {
    getCompany: CallableFunction
    onChange: CallableFunction
}

export default function CompaniesForm({ getCompany, onChange }: Props) {
    const company: Company = getCompany()

    return (
        <Form>
            <FormField type='number' name='id' value={company.id} disabled />
            <FormField type='text' name='name' value={company.name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.name, e.target.value)} />
            <FormField type='number' name='representative' value={company.representative} onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.name, e.target.value)} />
            <FormField type='text' name='sector' value={company.sector} onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.name, e.target.value)} />
        </Form>
    )
}