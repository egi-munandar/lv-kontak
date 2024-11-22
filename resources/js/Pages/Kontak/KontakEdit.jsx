import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import PrimaryButton from '@/Components/PrimaryButton'
import TextInput from '@/Components/TextInput'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link, useForm } from '@inertiajs/react'
import React from 'react'
import Swal from 'sweetalert2'

export default function KontakEdit({ kontak }) {
    const editFrm = useForm(kontak)
    const photoFrm = useForm()
    const submitEdit = e => {
        e.preventDefault()
        editFrm.put(route('kontak.update', kontak.id), {
            onSuccess: () => {
                Swal.fire('Success!', 'Data berhasil dirubah', 'success')
            }
        })
    }
    const uploadPhoto = () => {
        photoFrm.post(route('kontak.upload_photo', kontak.id), {
            onSuccess: () => {
                Swal.fire('Success!', 'Foto berhasil diupload!', 'success')
            },
            onError: () => {
                Swal.fire('Error!', 'Foto gagal diganti!', 'error')
            }
        })
    }
    const test = () => {
        console.log('a');
    }
    return (
        <AuthenticatedLayout header={
            <nav className="flex">
                <ol className="inline-flex items-center space-x-1 md:space-x-2">
                    <li className="inline-flex items-center">
                        <Link href={route('kontak.index')} className="text-sm font-semibold text-slate-800 leading-tight transition-colors hover:text-blue-800">KONTAK</Link>
                    </li>
                    <li className="inline-flex items-center">
                        /<p className="ms-1">Edit {kontak.nama}</p>
                    </li>
                </ol>
            </nav>
        }>
            <Head title={`Edit ${kontak.nama}`} />
            <div className="w-full mt-4">
                <div className="mx-auto w-[90%] md:w-[60%]">
                    <img alt={kontak.nama} src={photoFrm.data.file_foto ? URL.createObjectURL(photoFrm.data.file_foto) : (kontak.foto ? '/storage/' + kontak.foto : '/no-image.jpg')} className="rounded-lg object-contain max-h-[400px] mx-auto" />
                    <div className="flex gap-2">
                        <div className="w-full">
                            <input onChange={e => photoFrm.setData('file_foto', e.target.files[0])} type='file' accept='.jpg,.png'
                                className="w-full text-gray-500 font-medium text-sm bg-gray-50 file:cursor-pointer transition-colors file:border-0 file:py-2 file:px-4 file:mr-4 file:bg-gray-800 file:hover:bg-gray-700 file:text-white rounded"

                            />
                        </div>
                        <div className="w-[20%]">
                            <PrimaryButton onClick={uploadPhoto} disabled={!photoFrm.data.file_foto || photoFrm.processing} >UPLOAD</PrimaryButton>
                        </div>
                    </div>
                    {
                        photoFrm.progress ?
                            <div className={"w-[" + photoFrm.progress.percentage + "%] bg-gray-200 rounded-full mt-1 h-3"}>
                                <div className={'bg-blue-800 transition-all duration-300 rounded-full w-[' + photoFrm.progress.percentage + '%] text-center leading-none text-white text-xs'}>
                                    {photoFrm.progress.percentage}%
                                </div></div>
                            : ''
                    }
                </div>
            </div>
            <div className="flex w[90%] my-4 mx-auto rounded-lg bg-white p-6 md:my-8 md:w-[60%]">
                <form className="w-full" onSubmit={submitEdit}>
                    <div className="mb-3">
                        <InputLabel>Nama</InputLabel>
                        <TextInput defaultValue={editFrm.data.nama} className="w-full" onChange={e => editFrm.setData('nama', e.target.value)} placeholder="Input nama..." />
                        <InputError message={editFrm.errors.nama} className='mt-2' />
                    </div>
                    <div className="mb-3">
                        <InputLabel>Email</InputLabel>
                        <TextInput type="email" defaultValue={editFrm.data.email} className="w-full" onChange={e => editFrm.setData('email', e.target.value)} placeholder="Input email..." />
                        <InputError message={editFrm.errors.email} className='mt-2' />
                    </div>
                    <div className="mb-3">
                        <InputLabel>No HP</InputLabel>
                        <TextInput defaultValue={editFrm.data.no_hp} className="w-full" onChange={e => editFrm.setData('no_hp', e.target.value)} placeholder="081234..." />
                    </div>
                    <div className="mb-3">
                        <InputLabel>Alamat</InputLabel>
                        <textarea defaultValue={editFrm.data.alamat} className="rounded-md w-full border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" rows={3}
                            placeholder="Jl abc123..." onChange={e => editFrm.setData('alamat', e.target.value)} />
                    </div>
                    <PrimaryButton type="submit" disabled={editFrm.processing}>SIMPAN</PrimaryButton>
                </form>
            </div>
        </AuthenticatedLayout>
    )
}
