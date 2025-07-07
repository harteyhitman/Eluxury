"use client";

import { useEffect, useState } from "react";
import { login } from "@/libs/api/auth";
import { useRouter } from "next/navigation";
import styles from "./loginform.module.scss";
import toast, { Toaster } from "react-hot-toast";
import Typography from "@/components/typos";
import Button from "@/components/buttons";
import Spinner from "@/components/spinner";
import FloatingInput from "@/components/input-field/FloatingInput";
import AuthLayout from "@/components/layout/AuthLayout";
import { useUserStore } from "@/stores/useUserStore";
import Cookies from "js-cookie";

const LoginPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { setUser } = useUserStore();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await login(form.email, form.password);

      if (response.success) {
        // Set cookie client-side
        Cookies.set("auth_token", response.data.token, {
          expires: 7, // 7 days
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          path: "/",
        });

        // Set user in store
        setUser(response.data.user);

        toast.success("Login successful! 🔐");

        // Redirect based on role
        const isAdmin = response.data.user.role === "admin";
        router.push(isAdmin ? "/admin/dashboard" : "/");
      } else {
        const errorMsg = response.message || "Login failed";
        setError(errorMsg);
        toast.error(errorMsg);
      }
    } catch (error) {
      setError("An unexpected error occurred.");
      console.log(error);
      toast.error("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberEmail");
    if (rememberedEmail) {
      setForm((prev) => ({ ...prev, email: rememberedEmail }));
    }
  }, []);

  return (
    <AuthLayout>
      <Toaster position="top-right" reverseOrder={false} />
      <form onSubmit={handleSubmit} className={styles.authForm}>
        <div className={styles.regTypo}>
          <h2 className="text-primary">Welcome back!</h2>
          <p className="text-primary text-center">
            Enter your details below to log in
          </p>
        </div>

        {error && (
          <Typography variant="caption" color="red" className={styles.error}>
            {error}
          </Typography>
        )}

        <FloatingInput
          type="email"
          name="email"
          label="Email"
          value={form.email}
          onChange={handleChange}
          required
          error={error && !form.email ? error : undefined}
        />

        <FloatingInput
          type="password"
          name="password"
          label="Password"
          value={form.password}
          onChange={handleChange}
          required
          error={error && !form.password ? error : undefined}
        />

        <div className={styles.authExtras}>
          <label className={styles.rememberMe}>
            <input
              type="checkbox"
              name="remember"
              onChange={(e) => {
                if (e.target.checked) {
                  localStorage.setItem("rememberEmail", form.email);
                } else {
                  localStorage.removeItem("rememberEmail");
                }
              }}
            />
            Remember me
          </label>
          <a href="/forgot-password" className={styles.forgotLink}>
            Forgot Password?
          </a>
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? <Spinner size={22} color="#fff" /> : "Log In"}
        </Button>

        <div className={styles.loginLink}>
          Don&apos;t have an account?
          <a href="/register" className={styles.loginAnchor}>
            Sign up
          </a>
        </div>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
