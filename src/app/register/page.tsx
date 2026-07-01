'use client'


import { error } from "console";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "../lib/axios";
import { showToast } from "../components/toast/Toast";

export default function RegisterPage() {
  

    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const router = useRouter()

    const onSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault()

        try{
            const res = await api.post('user/register',{
                name,
                password,
                email: email
            })
            showToast(res.data.message, 'success')
            router.push('/')
        }catch (error: any) {
            console.log(error);
            console.log(error.response);
            console.log(error.message);

    showToast(
        error.response?.data?.message || error.message,
        "danger"
    );
}
        
    }

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div
        className="card border-0 shadow"
        style={{ width: "100%", maxWidth: "400px", borderRadius: "12px" }}
      >
        <div className="card-body p-4 p-md-5">
          <div className="d-flex align-items-center justify-content-center flex-column">
            <h5 className="fw-bold mb-1">Register</h5>
            <p className="text-muted small mb-4">Register akun</p>
          </div>

          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label className="form-label small fw-semibold">Username</label>
              <input
                type="text"
                name="name"
                className="form-control form-control-sm py-2"
                placeholder="Masukan username anda"
                value={name}
                onChange={(e) => setName (e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="form-label small fw-semibold">Password</label>
              <input
                type="password"
                name="Buat Password"
                className="form-control form-control-sm py-2"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword (e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="form-label small fw-semibold">Email</label>
              <input
                type="text"
                name="email"
                className="form-control form-control-sm py-2"
                placeholder="masukan email anda"
                value={email}
                onChange={(e) => setEmail (e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="btn w-100 py-2 text-white fw-semibold"
              style={{ background: "#1e2a3a", borderRadius: "8px" }}
            >
              Daftar
            </button>
          </form>

          <p className="text-center text-muted small mt-4 mb-0">
            Belum punya akun?
          </p>
          <Link href={'/'}>
            <button
                type="button"
                className="btn btn-outline-dark mt-3 w-100 py-2 = fw-semibold" 
              >
                Login
              </button>
          </Link>
        </div>
      </div>
    </div>
  );
}