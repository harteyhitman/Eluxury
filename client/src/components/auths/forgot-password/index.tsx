"use client";

import { useState, useEffect, useRef, ChangeEvent } from "react";
import styles from "./forgotpassword.module.scss";
import { sendResetCode, verifyCodeAndReset } from "@/libs/api/mock";
import Button from "@/components/buttons";
import toast, { Toaster } from "react-hot-toast";
import AuthLayout from "@/components/layout/AuthLayout";
import FloatingInput from "@/components/input-field/FloatingInput";

export default function ForgotPasswordPage() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
    const [form] = useState({ email: "", password: "" });

  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const [resendAvailable, setResendAvailable] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (step === 2 && timer > 0) {
      setResendAvailable(false);
      timerRef.current = setTimeout(() => setTimer((t) => t - 1), 1000);
    }
    if (step === 2 && timer === 0) {
      setResendAvailable(true);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [timer, step]);

  const handleSendCode = async () => {
    if (!email) {
      setError("Email is required");
      return;
    }
    try {
      setLoading(true);
      setError(null);
      await sendResetCode(email);
      toast.success("Code sent to your email!");
      setStep(2);
      setTimer(60);
      setResendAvailable(false);
    } catch {
      setError("Failed to send reset code");
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!email) {
      setError("Email is required");
      return;
    }
    try {
      setLoading(true);
      setError(null);
      await sendResetCode(email);
      toast.success("Code resent to your email!");
      setTimer(60);
      setResendAvailable(false);
    } catch {
      setError("Failed to resend code");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!code) {
      setError("Code is required");
      return;
    }
    setStep(3);
  };

  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      setError("Please fill in all password fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await verifyCodeAndReset({ email, code, newPassword });
      toast.success("Password reset successful!");
      window.location.href = "/login";
    } catch {
      setError("Invalid code or password reset failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <Toaster position="top-right" reverseOrder={false} />
      <form className={styles.authForm} onSubmit={(e) => e.preventDefault()}>
        {/* Dynamic header */}
        {step === 1 && <h2>Forgot Password</h2>}
        {step === 2 && <h2>Enter Verification Code</h2>}
        {step === 3 && <h2>New Password</h2>}

        {/* Step 1: Email */}
        {step === 1 && (
          <>
            <p className={styles.enter_password}>Enter your email to receive a password reset code.</p>
            <FloatingInput
              type="email"
              name="email"
              label="Email"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                setEmail(e.target.value)
              }
              required
              error={error && !email ? error : ""}
            />
            <Button type="button" onClick={handleSendCode} disabled={loading}>
              {loading ? "Sending..." : "Send Code"}
            </Button>
          </>
        )}

        {/* Step 2: Code */}
        {step === 2 && (
          <>
            <p>
              Enter the 4 digit code sent to your email{" "}
              <b>{email || "your email"}</b>
              <span className={styles.changeEmail} onClick={() => setStep(1)}>
                Change email
              </span>
            </p>
            <div className={styles.codeInputWrapper}>
              {[0, 1, 2, 3].map((index) => (
                <input
                  key={index}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  className={styles.codeInput}
                  value={code[index] || ""}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "");
                    const newCode = code.split("");
                    newCode[index] = val;
                    setCode(newCode.join(""));
                    // move to next input if value entered
                    if (val) {
                      const next = document.getElementById(`code-${index + 1}`);
                      if (next) (next as HTMLInputElement).focus();
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Backspace") {
                      const newCode = code.split("");
                      if (code[index]) {
                        // Clear current digit
                        newCode[index] = "";
                        setCode(newCode.join(""));
                      } else {
                        // Move to previous input
                        const prev = document.getElementById(
                          `code-${index - 1}`,
                        );
                        if (prev) (prev as HTMLInputElement).focus();
                      }
                    }
                  }}
                  id={`code-${index}`}
                />
              ))}
            </div>
            <div className={styles.timerRow}>
              {resendAvailable ? (
                <Button
                  type="button"
                  onClick={handleResendCode}
                  disabled={loading}
                  className={styles.resendBtn}
                >
                  Resend Code
                </Button>
              ) : (
                <span className={styles.timerText}>
                  Resend code in {timer}s
                </span>
              )}
            </div>
            <Button
              type="button"
              onClick={handleVerifyCode}
              disabled={loading || code.length < 4}
            >
              {loading ? "Verifying..." : "Verify Code"}
            </Button>
          </>
        )}

        {/* Step 3: New Password */}
        {step === 3 && (
          <>
            <p>Set a new password for your account.</p>
            <FloatingInput
            name="password"
              label="Password"
              type="password"
              value={newPassword}
              onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                setNewPassword(e.target.value)
              }
              required
               error={error && !form.password ? error : undefined}
            />
            <FloatingInput
            name="confirmPassword"
              label="confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                setConfirmPassword(e.target.value)
              }
              required
              error={error && !form.password ? error : undefined}
            />
            <p className={styles.subInput}>
              Password must contain at least 8 characters and one number
            </p>
            <Button
              type="button"
              onClick={handleResetPassword}
              disabled={loading}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </Button>
          </>
        )}
      </form>
    </AuthLayout>
  );
}
