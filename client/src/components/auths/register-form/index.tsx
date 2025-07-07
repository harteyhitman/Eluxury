"use client";
import { useState } from "react";
import styles from "./register.module.scss";
import { registerUser } from "@/libs/api/auth";
import { useRouter } from "next/navigation";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import toast, { Toaster } from "react-hot-toast";
import FloatingInput from "@/components/input-field/FloatingInput";
import Button from "@/components/buttons";
import AuthLayout from "@/components/layout/AuthLayout";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [, setSuccess] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await registerUser(form);
      setSuccess(res.message);
      toast.success("Account created successfully! 🎉");
      router.push("/login");
    } catch (err: unknown) {
      if (typeof err === "object" && err !== null && "response" in err) {
        const errorResponse = err as {
          response?: { data?: { message?: string } };
        };
        setError(errorResponse.response?.data?.message || "Something went wrong");
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <Toaster position="top-right" reverseOrder={false} />
      <form onSubmit={handleSubmit} className={styles.authForm}>
        <div className={styles.regTypo}>
        <h2>Get Started</h2>
        <p>Level up your beauty game - let&apos;s go!</p>
 </div>
        <FloatingInput
          label="First Name"
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
          required
        />
        <FloatingInput
          label="Last Name"
          name="lastName"
          value={form.lastName}
          onChange={handleChange}
          required
        />
        <div className={styles.phoneInputWrap}>
          <PhoneInput
            country={"ng"}
            value={form.phoneNumber}
            onChange={(phone) => setForm({ ...form, phoneNumber: `+${phone}` })}
            inputClass={styles.phoneInput}
            buttonClass={styles.phoneBtn}
            containerClass={styles.phoneContainer}
            dropdownClass={styles.phoneDropdown}
            enableSearch
          />
        </div>
        <FloatingInput
          label="Email"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <FloatingInput
          label="Password"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </Button>
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.loginLink}>
          Already have an account?{" "}
          <a href="/login" className={styles.loginAnchor}>Log in</a>
        </div>
      </form>
    </AuthLayout>
  );
}
