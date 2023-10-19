import { Advertisement } from '@/types/Advertisement'
import React, { ChangeEvent } from 'react'
import Form from '../components/Form/Form'
import FormField from '../components/Form/FormField'
import FormCheckbox from '../components/Form/Form/FormCheckbox'

type Props = {
    getAdvertisement: CallableFunction
    onChange: CallableFunction
}

export default function AdvertisementsForm({ getAdvertisement, onChange }: Props) {
    const advertisement: Advertisement = getAdvertisement()

    return (
        <Form>
            <FormField type='number' name='id' value={advertisement.id} disabled />
            <FormField type='number' name='company' value={advertisement.company} onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.name, e.target.value)} />
            <FormField type='text' name='title' value={advertisement.title} onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.name, e.target.value)} />
            <FormField type='text' name='description' value={advertisement.description} onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.name, e.target.value)} />
            <FormField type='number' name='salary' value={advertisement.salary} onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.name, e.target.value)} />
            <FormField type='text' name='location' value={advertisement.location} onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.name, e.target.value)} />
            <FormField type='number' name='workingHours' value={advertisement.workingHours} onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.name, e.target.value)} />
            <FormField type='text' name='type' value={advertisement.type} onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.name, e.target.value)} />
            <FormCheckbox name='active' defaultChecked={advertisement.active} onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.name, e.target.checked ? 1 : 0)} />
        </Form>
    )
}