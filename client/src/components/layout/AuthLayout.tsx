import React from "react";
import styles from "./AuthLayout.module.scss";
import Link from "next/link";
import { Logo } from "../icons/logo";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => (
  <div className={styles.authWrapper}>
    <Link href="/">
      <Logo width={100} height={30} />
    </Link>
    <div className={styles.formArea}>{children}</div>
  </div>
);

export default AuthLayout;
