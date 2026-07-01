'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { showToast } from "@/app/components/toast/Toast"
import { api } from "@/app/lib/axios"

export default function CreateKategoriPage() {

  const router = useRouter()

  const [nama, setNama] = useState("")
  const [deskripsi, setDeskripsi] = useState("")

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const body = {
        nama,
        deskripsi
      }

      const res = await api.post("kategori/create", body)

      showToast(res.data.message, "success")
      router.push("/admin/kategori")

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>

      <h4>Tambah Kategori</h4>

      <form onSubmit={onSubmit}>

        <div className="mb-3">
          <label>Nama</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setNama(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Deskripsi</label>
          <textarea
            className="form-control"
            onChange={(e) => setDeskripsi(e.target.value)}
          />
        </div>

        <button className="btn btn-primary">
          Simpan
        </button>

      </form>

    </div>
  )
}