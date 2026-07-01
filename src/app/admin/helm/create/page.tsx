'use client'


import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { showToast } from "@/app/components/toast/Toast"
import { api } from "@/app/lib/axios"
import { IKategori } from "@/app/admin/kategori/page"

export default function AdminCreateHelmPage() {

    const router = useRouter()

    const [kategori, setKategori] = useState<IKategori[]>([])
    const [namaHelm, setNamaHelm] = useState("")
    const [merk, setMerk] = useState("")
    const [kategoriId, setKategoriId] = useState("")
    const [harga, setHarga] = useState(0)
    const [stok, setStok] = useState(0)

    const getKategori = async () => {
        try {
            const res = await api.get("kategori/get-all")
            setKategori(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getKategori()
    }, [])

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const body = {
                nama_helm: namaHelm,
                merk: merk,
                kategori_id: Number(kategoriId),
                harga: harga,
                stok: stok
            }

            const res = await api.post("helm/create", body)

            showToast(res.data.message, "success")
            router.push("/admin/helm")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <h4>Input Helm</h4>

            <div className="row">
                <div className="col-md-6">

                    <form onSubmit={onSubmit}>

                        <div className="mb-3">
                            <label className="form-label small fw-semibold">
                                Nama Helm
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                onChange={(e) => setNamaHelm(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label small fw-semibold">
                                Merk
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                onChange={(e) => setMerk(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label small fw-semibold">
                                Kategori
                            </label>

                            <select
                                className="form-control"
                                defaultValue=""
                                onChange={(e) => setKategoriId(e.target.value)}
                            >
                                <option value="" disabled>
                                    Pilih Kategori
                                </option>

                                {kategori.map((item) => (
                                    <option
                                        key={item.id}
                                        value={item.id}
                                    >
                                        {item.nama}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-3">
                            <label className="form-label small fw-semibold">
                                Harga
                            </label>

                            <input
                                type="number"
                                className="form-control"
                                onChange={(e) => setHarga(Number(e.target.value))}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label small fw-semibold">
                                Stok
                            </label>

                            <input
                                type="number"
                                className="form-control"
                                onChange={(e) => setStok(Number(e.target.value))}
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary"
                        >
                            Save Helm
                        </button>

                    </form>

                </div>
            </div>
        </div>
    )
}