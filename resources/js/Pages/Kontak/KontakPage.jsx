import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link, useForm } from '@inertiajs/react'
import React from 'react'
import Swal from 'sweetalert2'

export default function KontakPage({ kontak_list }) {
    const frmHps = useForm()
    const hapusKontak = kontak => {
        Swal.fire({
            icon: 'question',
            title: 'Hapus Kontak?',
            text: kontak.nama,
            showLoaderOnConfirm: true,
            showCancelButton: true,
            confirmButtonText: 'Hapus',
            preConfirm: () => frmHps.delete(route('kontak.delete', kontak.id), {
                onSuccess: () => {
                    Swal.fire('Success', 'Kontak berhasil dihapus!', 'success')
                },
                onError: (er) => {
                    console.log(er)
                    Swal.fire('Error!', 'Cek Log', 'error')
                }
            })
        })
    }
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Kontak
                </h2>
            }
        >
            <Head title="Kontak" />
            <div className="mt-4 px-2 w-full mx-auto md:px-0 md:max-w-[75%]">
                <Link href={route('kontak.create')} className="bg-slate-800 transition-colors rounded-lg hover:bg-slate-400 text-white px-2 py-4">
                    TAMBAH KONTAK
                </Link>
            </div>
            <div className="w-full mx-auto grid grid-cols-1 pt-4 gap-4 md:max-w-[75%] md:grid-cols-2 lg:grid-cols-4">
                {
                    kontak_list.map((kontak, index) => <div key={index} className="bg-white rounded-lg mx-auto min-h-100 w-full">
                        <img src={kontak.foto ? '/storage/' + kontak.foto : '/no-image.jpg'} alt={kontak.nama} className="object-cover w-full h-[150px] rounded-t-lg" />
                        <div className="p-6">
                            <Link href={route('kontak.show', kontak.id)} className="flex mb-2 gap-2 text-wrap transition-colors hover:text-blue-700">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                </svg>
                                <p className="text-wrap">
                                    {kontak.nama}
                                </p>
                            </Link>
                            <div className="flex mb-2 gap-2 text-wrap">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                                </svg>

                                <p className="text-wrap">
                                    {kontak.no_hp}
                                </p>
                            </div>
                            <div className="flex mb-2 gap-2 text-wrap">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                                </svg>


                                <p className="text-wrap">
                                    {kontak.email}
                                </p>
                            </div>
                            <div className="flex mb-2 gap-2 text-wrap">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                </svg>


                                <p className="text-wrap">
                                    {kontak.alamat}
                                </p>
                            </div>
                            <div className="py-4">
                                <Link href={route('kontak.edit', kontak.id)} className="px-2 py-1 me-2 rounded-md text-white text-sm font-semibold transition-colors bg-amber-600 hover:bg-amber-400">
                                    EDIT
                                </Link>
                                <button onClick={() => hapusKontak(kontak)} className="px-2 py-1 me-2 rounded-md text-white text-sm font-semibold transition-colors bg-red-600 hover:bg-red-400">
                                    HAPUS
                                </button>
                            </div>
                        </div>
                    </div>)
                }
            </div>

        </AuthenticatedLayout>
    )
}
