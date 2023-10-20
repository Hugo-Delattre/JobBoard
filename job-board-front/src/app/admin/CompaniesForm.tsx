import React from 'react'
import Form from '../components/Form/Form'
import FormField from '../components/Form/FormField'
import { Company } from '@/types/Company'
import FormSubmit from '../components/Form/Form/FormSubmit'

type Props = {
    getCompany?: CallableFunction
    onChange?: CallableFunction
    onSubmit?: CallableFunction
}

export default function CompaniesForm({ getCompany, onChange, onSubmit }: Props) {
    const company: Company = getCompany ? getCompany() : {}

    return (
        <Form {...onSubmit && { onSubmit: (e: React.FormEvent) => onSubmit(e) }}>
            {onChange &&
                <FormField
                    type='number'
                    name='id'
                    value={company.id ?? ""}
                    disabled
                />
            }
            <FormField
                type='text'
                name='name'
                {...onChange && {
                    value: company.name ?? "",
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.name, e.target.value)
                }}
            />
            <FormField
                type='text'
                name='sector'
                {...onChange && {
                    value: company.sector ?? "",
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.name, e.target.value)
                }}
            />
            <FormField
                type='number'
                name='userId'
                {...onChange && {
                    value: company.userId ?? "",
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.name, e.target.value)
                }}
            />
            {onSubmit && <FormSubmit />}
        </Form>
    )
}