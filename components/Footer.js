import styles from "./Footer.module.css";
import Image from "next/image";
import netliheart from "../public/netliheart.svg";

export default function Footer() {
  return (
    <>
      <footer className={styles.footer}>
        Made with{" "}
        <Image src={netliheart} alt="Netlify Logo" height={30} width={30} />
        for you
      </footer>
    </>
  );
}
