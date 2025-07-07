"use client";

import { useState } from "react";
import styles from "./profile.module.scss";
import { FaLongArrowAltLeft } from "react-icons/fa";
import Link from "next/link";
import { useUserStore } from "@/stores/useUserStore";
import InputField from "../input-field";
import Button from "../buttons";
import { RiDeleteBinLine } from "react-icons/ri";
import AddAddressForm from "../address-form/AddressForm";
import Modal from "../modal";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState<
    "orders" | "addresses" | "wishlist" | "logout"
  >("orders");

  const { logout } = useUserStore();
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div className={styles.accountWrapper}>
      <Link href="/" className={styles.myAccount}>
        <div>
          <FaLongArrowAltLeft />
        </div>{" "}
        <div>Profile</div>
      </Link>
      <div className={styles.accountContent}>
        <aside className={styles.sidebar}>
          <ul>
            <li
              className={activeTab === "orders" ? styles.active : ""}
              onClick={() => setActiveTab("orders")}
            >
              My Orders
            </li>
            <li
              className={activeTab === "addresses" ? styles.active : ""}
              onClick={() => setActiveTab("addresses")}
            >
              My addresses
            </li>
            <li
              className={activeTab === "wishlist" ? styles.active : ""}
              onClick={() => setActiveTab("wishlist")}
            >
              Wishlist
            </li>
            <li
              className={activeTab === "logout" ? styles.active : ""}
              onClick={logout}
            ></li>
          </ul>
        </aside>
        <main className={styles.main}>
          {activeTab === "orders" && (
            <div>
              <h2 className={styles.sectionTitle}></h2>
              <div className={styles.ordersBox}>
                <div className={styles.ordersEmpty}>
                  <div className={styles.ordersEmptyIcon}>
                    <span className={styles.ordersEmptyBadge}>0</span>
                    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
                      <circle cx="28" cy="28" r="28" fill="#EDEDED" />
                      <rect
                        x="18"
                        y="18"
                        width="20"
                        height="20"
                        rx="4"
                        fill="#222"
                      />
                      <rect
                        x="25"
                        y="25"
                        width="6"
                        height="10"
                        rx="1"
                        fill="#fff"
                      />
                    </svg>
                  </div>
                  <div className={styles.ordersEmptyText}>No Orders yet</div>
                </div>
              </div>
            </div>
          )}
          {activeTab === "addresses" && (
            <div className={styles.addressFormWrapper}>
              <h2 className={styles.sectionTitle}>Personal info</h2>

              <form className={styles.addressForm}>
                <div className={styles.formGrid}>
                  <div className={styles.inputGroup}>
                    <InputField onChange={() => {}} label="Name" id="name" />
                  </div>

                  <div className={styles.inputGroup}>
                    <InputField onChange={() => {}} label="Email" id="email" />
                  </div>

                  <div className={styles.inputGroupFull}>
                    <InputField
                      onChange={() => {}}
                      label="Name"
                      id="phone"
                    />
                  </div>
                </div>

                <h3
                  className={`${styles.sectionTitle} ${styles.deleteAddressSection}`}
                >
                  First address
                  <Button className={styles.deleteAddress}>
                    <RiDeleteBinLine /> <span>Delete address</span>
                  </Button>
                </h3>

                <div className={styles.formGrid}>
                  <div className={styles.inputGroup}>
                    <InputField onChange={() => {}} label="State" id="state" />
                  </div>

                  <div className={styles.inputGroup}>
                    <InputField onChange={() => {}} label="City" id="city" />
                  </div>

                  <div className={styles.inputGroup}>
                    <InputField
                     onChange={() => {}}
                      label="Country"
                      id="country"
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <InputField
                     onChange={() => {}}
                      label="Postal"
                      id="postal"
                    />
                  </div>

                  <div className={styles.inputGroupFull}>
                    <InputField
                     onChange={() => {}}
                      label="Address"
                      id="street"
                    />
                  </div>
                </div>

                <Button
                  type="button"
                  className={styles.addNewAddress}
                  onClick={() => setModalOpen(true)}
                >
                  ADD NEW ADDRESS
                </Button>
              </form>
              <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
                <AddAddressForm onClose={() => setModalOpen(false)} />
              </Modal>
            </div>
          )}

          {activeTab === "wishlist" && (
            <div className={styles.wishlistBox}>
              <h2 className={styles.sectionTitle}>Favorite</h2>
              <div className={styles.ordersEmptyText}>
                No items in wishlist.
              </div>
            </div>
          )}
        </main>
      </div>
      <p onClick={logout} className="text-center text-[#000]">
        logout
      </p>
    </div>
  );
};

export default ProfilePage;
