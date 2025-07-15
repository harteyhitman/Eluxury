'use client';
import { useState } from "react";
import { loginUser } from "@/libs/auth";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";
import styles from "@/styles/auth.module.scss";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const login = useAuthStore((state) => state.login);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { access_token, user } = await loginUser(form);
    login(access_token, user);
    router.push(user.role === "admin" ? "/adminDashboard" : "/showroom");
  };

return (
    <div className={styles.authContainer}>
      <form className={styles.formCard} onSubmit={handleSubmit}>
        <h2>Login</h2>

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

        <button type="submit" className={styles.button}>Sign In</button>
      </form>
    </div>
  );
}
