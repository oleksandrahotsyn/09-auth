"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login, LoginRequest } from "@/lib/api/api";
import { ApiError } from "@/app/api/api";
import css from "./SignInPage.module.css";

const SignIn = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const handleSubmit = async (formData: FormData)
    
return(
<main className={css.mainContent}>
    <form className={css.form}>
      <h1 className={css.formTitle}>Sign in</h1>

      <div className={css.formGroup}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          className={css.input}
          required
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          className={css.input}
          required
        />
      </div>

      <div className={css.actions}>
        <button type="submit" className={css.submitButton}>
          Log in
        </button>
      </div>

      <p className={css.error}>{error}</p>
    </form>
    </main>);
}