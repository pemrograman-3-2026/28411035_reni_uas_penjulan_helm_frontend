'use client'

import { useEffect, useState } from "react"
import { IHelm } from "../admin/helm/page"
import { api } from "../lib/axios"

export default function UserDashboardPage() {

    const [helm, setHelm] = useState<IHelm[]>([])

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
            <div className="row">
                {helm.map((helm) => (
                    <div key={helm.id} className="col-md-4 col-sm-6 col-xs-12">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{helm.nama_helm}</h5>
                                <p className="card-text">{helm.kategori.nama}</p>
                                <div className="d-flex gap-1">
                                    <button className="btn btn-primary">Detail</button>
                                    <button className="btn btn-warning">Beli</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}