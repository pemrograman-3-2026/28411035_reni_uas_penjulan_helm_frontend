'use client'


import { useEffect, useState } from "react";
import { api } from "../lib/axios";

interface IStats {
    totalHelm: number;
    totalKategori: number;
}

export default function AdminDashboardPage() {

    const [stats, setStats] = useState<IStats>({
        totalHelm: 0,
        totalKategori: 0
    });

    const fetchStats = async () => {
        try {
            const [helmRes, kategoriRes] = await Promise.all([
                api.get('/helm/get-all'),
                api.get('/kategori/get-all')
            ]);

            setStats({
                totalHelm: Array.isArray(helmRes.data)
                    ? helmRes.data.length
                    : 0,

                totalKategori: Array.isArray(kategoriRes.data)
                    ? kategoriRes.data.length
                    : 0
            });

        } catch (error) {
            console.error("Gagal memuat statistik dashboard", error);
        }
    }

    useEffect(() => {
        fetchStats();
    }, []);

    return (
        <>
            <h1 className="h3 mb-3">Dashboard Toko Helm</h1>
            <p className="text-muted">
                Ringkasan data Toko Helm.
            </p>

            <div className="row g-3 mt-2">

                <div className="col-md-6">
                    <div className="card border-0 shadow-sm p-3 bg-primary text-white">
                        <h6>Total Helm</h6>
                        <h2 className="fw-bold m-0">
                            {stats.totalHelm}
                        </h2>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="card border-0 shadow-sm p-3 bg-success text-white">
                        <h6>Total Kategori</h6>
                        <h2 className="fw-bold m-0">
                            {stats.totalKategori}
                        </h2>
                    </div>
                </div>

            </div>
        </>
    );
}