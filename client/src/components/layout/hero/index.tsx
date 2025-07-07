"use client";
import Img1 from "../../../../public/hero-sub1.svg";
import Img2 from "../../../../public/hero-sub2.svg";
import Img3 from "../../../../public/hero-sub3.svg";
import Image from "next/image";
import styles from "./hero.module.scss";
import Button from "@/components/buttons";
import { IoIosArrowRoundForward } from "react-icons/io";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

const bgImages = [Img1, Img2, Img3];
const AUTO_PLAY_INTERVAL = 5000;

const Hero = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-play effect
  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setActiveIdx((prev) => (prev + 1) % bgImages.length);
    }, AUTO_PLAY_INTERVAL);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [activeIdx]);

  // Manual switch
  const handleBoxEnter = (idx: number) => {
    setActiveIdx(idx);
  };

  return (
    <section
      className={styles.hero}
      style={{ height: "100vh", width: "100vw" }}
    >
      <div className={styles.fullBgImage}>
        {bgImages.map((img, idx) => (
          <Image
            key={idx}
            src={img}
            alt={`Full background ${idx + 1}`}
            fill
            className={styles.bgImg}
            priority={idx === 0}
            style={{
              opacity: activeIdx === idx ? 1 : 0,
              zIndex: activeIdx === idx ? 2 : 1,
              transition: "opacity 1s cubic-bezier(0.4,0,0.2,1)",
              position: "absolute",
              top: 0,
              left: 0,
            }}
          />
        ))}
        <div className={styles.bgOverlay} />
      </div>
      <div className={styles.textBlock}>
        <h1 className={styles.heading}>Glow Different Feel Irresistible</h1>
        <p className={styles.subtitle}>
          Skincare that loves you back. Makeup that turns heads. Scents that
          stay with them.
        </p>
        <Link href="/products">
          <Button className={styles.heroBtn}>
            Explore all product{" "}
            <span>
              <IoIosArrowRoundForward />
            </span>
          </Button>
        </Link>
      </div>
      <div className={styles.content}>
        <div className={styles.leftImages}>
          {bgImages.map((img, idx) => (
            <div
              className={
                styles.imgBox +
                (activeIdx === idx ? " " + styles.activeImgBox : "")
              }
              key={idx}
              onMouseEnter={() => handleBoxEnter(idx)}
              onClick={() => handleBoxEnter(idx)}
              style={{ cursor: "pointer" }}
            >
              <Image
                src={img}
                alt={`Skincare ${idx + 1}`}
                fill
                className={styles.smallImg}
                style={{
                  opacity: activeIdx === idx ? 1 : 0.7,
                  transition:
                    "opacity 0.4s cubic-bezier(0.4,0,0.2,1), transform 0.4s cubic-bezier(0.4,0,0.2,1)",
                  transform: activeIdx === idx ? "scale(1.08)" : "scale(1)",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
