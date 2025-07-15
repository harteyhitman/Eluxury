'use client';
import { useState } from "react";
import { registerUser } from "@/libs/auth";
import { useRouter } from "next/navigation";
import styles from "@/styles/auth.module.scss";

export default function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await registerUser(form);
    router.push("/login");
  };

return (
    <div className={styles.authContainer}>
      <form className={styles.formCard} onSubmit={handleSubmit}>
        <h2>Create Account</h2>

        <div className={styles.inputGroup}>
          <label>Username</label>
          <input
            type="text"
            required
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Email</label>
          <input
            type="email"
            required
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Password</label>
          <input
            type="password"
            required
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>

        <button type="submit" className={styles.button}>Register</button>
      </form>
    </div>
  );
}
