'use client'

import Link from "next/link";
import { useEffect, useState } from "react";
import { api } from "@/app/lib/axios";
import { IKategori } from "../kategori/page";

export interface IHelm {
    id: number
    nama_helm: string
    merk: string
    harga: number
    stok: number
    kategori_id: number
    kategori: IKategori
}

export default function AdminHelmPage () {

    const [helm, setHelm]  = useState<IHelm[]>([])

    const getData = async () => {
        try {
            const res = await api.get('helm/get-all')
            setHelm(res.data)
        } catch (error) {
            console.log(error)
            
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div>
            <div className="d-flex justify-content-between">
                <h4>Data Helm</h4>
                <Link href={'/admin/helm/create'}>
                    <button type="button" className="btn btn-primary">Tambah Helm</button>
                </Link>

            </div>

            <table className="table mt-4 table-hover table-striped">
                <thead>
                    <tr>
                        <td>Nama Helm</td>
                        <td>Merk</td>
                        <td>Kategori</td>
                        <td>Harga</td>
                        <td>Stok</td>
                        <td>Aksi</td>
                    </tr>
                </thead>

                <tbody>
                    {helm.map(helm=>{
                        return (
                            <tr key ={helm.id}>
                                <td>{helm.nama_helm}</td>
                                <td>{helm.merk}</td>
                                <td>{helm.kategori?.nama}</td>
                                <td>{helm.harga}</td>
                                <td>{helm.stok}</td>
                                <td>
                                <div className="d-flex gap-2">
                                    <button type="button" className="btn btn-warning gap-2">Edit</button>
                                    <button type="button" className="btn btn-danger gap-2">Delete</button>
                                </div>
                                </td>
                                
                            </tr>
                        )
                    })}
                </tbody>

            </table>
        </div>
        
    )
}