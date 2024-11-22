import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link, useForm } from '@inertiajs/react'
import React from 'react'
import Swal from 'sweetalert2'

export default function KontakCreate() {
    const addFrm = useForm({
        nama: '',
        email: '',
        no_hp: '',
        alamat: ''
    });
    const submitAdd = e => {
        e.preventDefault();
        addFrm.post(route('kontak.store'), {
            onSuccess: () => {
                Swal.fire('Success!', 'Data berhasil disimpan', 'success')
            }
        })
    }
    return (
        <AuthenticatedLayout header={<nav className="flex">
            <ol className="inline-flex items-center space-x-1 md:space-x-2">
                <li className="inline-flex items-center">
                    <Link href={route('kontak.index')} className="text-sm font-semibold text-slate-800 leading-tight transition-colors hover:text-blue-800">KONTAK</Link>
                </li>
                <li className="inline-flex items-center">
                    /<p className="ms-1">Tambah Kontak</p>
                </li>
            </ol>
        </nav>}>
            <Head title="Tambah Kontak" />
            <div className="flex w-[90%] my-4 mx-auto rounded-lg bg-white p-6 md:my-8 md:w-[60%]">
                <form className="w-full" onSubmit={submitAdd}>
                    <div className="mb-3">
                        <InputLabel>Nama</InputLabel>
                        <TextInput className="w-full" onChange={e => addFrm.setData('nama', e.target.value)} placeholder="Input nama..." />
                        <InputError message={addFrm.errors.nama} className='mt-2' />
                    </div>
                    <div className="mb-3">
                        <InputLabel>Email</InputLabel>
                        <TextInput className="w-full" onChange={e => addFrm.setData('email', e.target.value)} placeholder="Input email..." />
                        <InputError message={addFrm.errors.email} className='mt-2' />
                    </div>
                    <div className="mb-3">
                        <InputLabel>No HP</InputLabel>
                        <TextInput className="w-full" onChange={e => addFrm.setData('no_hp', e.target.value)} placeholder="081234..." />
                    </div>
                    <div className="mb-3">
                        <InputLabel>Alamat</InputLabel>
                        <textarea className="rounded-md w-full border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" rows={3}
                            placeholder="Jl abc123..." onChange={e => addFrm.setData('alamat', e.target.value)} />
                    </div>
                    <PrimaryButton type="submit" disabled={addFrm.processing}>SIMPAN</PrimaryButton>
                </form>
            </div>
        </AuthenticatedLayout>
    )
}
