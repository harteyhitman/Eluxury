"use client";
import { useState } from "react";
import { registerUser } from "@/libs/auth";
import { useRouter } from "next/navigation";
import styles from "@/styles/auth.module.scss";
import Link from "next/link";

export default function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await registerUser(form);
    router.push("/auths/login");
  };

  return (
    <div className={styles.authContainer}>
      <form className={styles.formCard} onSubmit={handleSubmit}>
        <h2>Register</h2>

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
          <div className={styles.passwordField}>
            <input
              type={showPassword ? "text" : "password"}
              required
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <span onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>
        </div>

        <button type="submit" className={styles.button}>
          Register
        </button>

        <p className={styles.toggleText}>
          Already have an account?
          <Link href="/auths/login">Login</Link>
        </p>
      </form>
    </div>
  );
}
