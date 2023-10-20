import { Advertisement } from '@/types/Advertisement'
import React, { ChangeEvent, useEffect, useRef } from 'react'
import Form from '../components/Form/Form'
import FormField from '../components/Form/FormField'
import FormCheckbox from '../components/Form/Form/FormCheckbox'
import FormSubmit from '../components/Form/Form/FormSubmit'

type Props = {
    getAdvertisement?: CallableFunction
    onChange?: CallableFunction
    onSubmit?: CallableFunction
}

export default function AdvertisementsForm({ getAdvertisement, onChange, onSubmit }: Props) {
    const advertisement: Advertisement = getAdvertisement ? getAdvertisement() : {}

    return (
        <Form {...onSubmit && { onSubmit: (e: React.FormEvent) => onSubmit(e) }}>
            {onChange &&
                <FormField
                    type='number'
                    name='id'
                    value={advertisement.id ?? ""}
                    disabled
                />
            }
            <FormField
                type='number'
                name='companyId'
                {...onChange && {
                    value: advertisement.company ?? "",
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.name, e.target.value)
                }}
            />
            <FormField
                type='text'
                name='title'
                {...onChange && {
                    value: advertisement.title ?? "",
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.name, e.target.value)
                }}
            />
            <FormField
                type='text'
                name='description'
                {...onChange && {
                    value: advertisement.description ?? "",
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.name, e.target.value)
                }}
            />
            <FormField
                type='number'
                name='salary'
                {...onChange && {
                    value: advertisement.salary ?? "",
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.name, e.target.value)
                }}
            />
            <FormField
                type='text'
                name='location'
                {...onChange && {
                    value: advertisement.location ?? "",
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.name, e.target.value)
                }}
            />
            <FormField
                type='number'
                name='workingHours'
                {...onChange && {
                    value: advertisement.workingHours ?? "",
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.name, e.target.value)
                }}
            />
            <FormField
                type='text'
                name='type'
                {...onChange && {
                    value: advertisement.type ?? "",
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.name, e.target.value)
                }}
            />
            <FormCheckbox
                name='active'
                {...onChange && {
                    defaultChecked: advertisement.active ?? false,
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.name, e.target.checked ? 1 : 0)
                }}
            />
            {onSubmit && <FormSubmit />}
        </Form>
    )
}