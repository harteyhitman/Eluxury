import Button from "../buttons";
import FloatingInput from "../input-field/FloatingInput";
import styles from "./addressform.module.scss";

export default function AddAddressForm({ onClose }: { onClose: () => void }) {
  return (
    <form className={styles.form}>
      <div className={styles.formGroup}>
        <label>Country</label>
        <select className={styles.select}>
          <option>Select country</option>
          <option>Nigeria</option>
          <option>Ghana</option>
          <option>South Africa</option>
        </select>
      </div>

      <div className={styles.formGroup}>
        <FloatingInput
          label="State"
          type="text"
          name="state"
          value=""
          onChange={() => {}}
        />
      </div>

      <div className={styles.formGroup}>
        <FloatingInput
          label="City"
          type="text"
          name="city"
          value=""
          onChange={() => {}}
        />
      </div>

      <div className={styles.formGroup}>
        <FloatingInput
          label="Address"
          type="text"
          name="address"
          value=""
          onChange={() => {}}
        />
      </div>

      <div className={styles.formGroup}>
        <FloatingInput
          label="Postal code"
          type="text"
          name="postalCode"
          value=""
          onChange={() => {}}
        />
      </div>

      <div className={styles.btnGroup}>
        <Button type="submit" className={styles.saveBtn}>
          SAVE ADDRESS
        </Button>
        <Button className={styles.cancelBtn} onClick={onClose}>
          CANCEL
        </Button>
      </div>
    </form>
  );
}
