'use client'

import { useEffect, useState } from "react"
import Link from "next/link"
import { api } from "@/app/lib/axios"

export interface IKategori {
  id: number
  nama: string
  deskripsi: string
}

export default function AdminKategoriPage() {

  const [kategori, setKategori] = useState<IKategori[]>([])

  const getData = async () => {
    try {
      const res = await api.get("kategori/get-all")
      setKategori(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`kategori/delete/${id}`)
      getData()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>

      <div className="d-flex justify-content-between">
        <h4>Data Kategori</h4>

        <Link href={"/admin/kategori/create"}>
          <button className="btn btn-primary">
            Tambah Kategori
          </button>
        </Link>
      </div>

      <table className="table mt-4 table-hover table-striped">
        <thead>
          <tr>
            <td>Nama</td>
            <td>Deskripsi</td>
            <td>Aksi</td>
          </tr>
        </thead>

        <tbody>
          {kategori.map((item) => (
            <tr key={item.id}>
              <td>{item.nama}</td>
              <td>{item.deskripsi}</td>

              <td>
                <div className="d-flex gap-2">
                  <Link href={`/admin/kategori/edit/${item.id}`}>
                    <button className="btn btn-warning">
                      Edit
                    </button>
                  </Link>

                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </div>
              </td>

            </tr>
          ))}
        </tbody>

      </table>

    </div>
  )
}