import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link } from '@inertiajs/react'
import React from 'react'

export default function KontakShow({ kontak }) {
    return (
        <AuthenticatedLayout header={
            <nav className="flex">
                <ol className="inline-flex items-center space-x-1 md:space-x-2">
                    <li className="inline-flex items-center">
                        <Link href={route('kontak.index')} className="text-sm font-semibold text-slate-800 leading-tight transition-colors hover:text-blue-800">KONTAK</Link>
                    </li>
                    <li className="inline-flex items-center">
                        /<p className="ms-1">{kontak.nama}</p>
                    </li>
                </ol>
            </nav>
        }>
            <Head title={kontak.nama} />
            <div className="my-4 p-4 rounded-lg w-[90%] bg-white mx-auto md:w-[70%]">
                <p className="text-xl font-bold pb-4">
                    {kontak.nama}
                </p>
                <div className="mb-3 transition-colors p-4 rounded-md hover:bg-blue-50">
                    <p className="mb-1 text-sm">Email</p>
                    <p className="font-semibold text-md">
                        {kontak.email}
                    </p>
                </div>
                <div className="mb-3 transition-colors p-4 rounded-md hover:bg-blue-50">
                    <p className="mb-1 text-sm">No HP</p>
                    <p className="font-semibold text-md">
                        {kontak.no_hp}
                    </p>
                </div>
                <div className="mb-3 transition-colors p-4 rounded-md hover:bg-blue-50">
                    <p className="mb-1 text-sm">Alamat</p>
                    <p className="font-semibold text-md">
                        {kontak.alamat}
                    </p>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
