import Image from 'next/image'
import styles from './brands.module.scss'
import Brand1 from '/public/assets/images/brands1.jpeg'
import Brand2 from '/public/assets/images/brand2.jpeg'
import Brand3 from '/public/assets/images/brand3.jpeg'
import Brand4 from '/public/assets/images/brand4.jpeg'
import Brand5 from '/public/assets/images/brand5.jpeg'
import Brand6 from '/public/assets/images/brand6.jpeg'
import Typography from '@/components/typos'

const brands = [
  {
    name: 'Yves Saint Laurent',
    img: Brand1,
    link: '/brands/yves-saint-laurent',
  },
  {
    name: 'Essenza',
    img: Brand2,
    link: '/brands/essenza',
  },
  {
    name: 'Fenty',
    img: Brand3,
    link: '/brands/fenty',
  },
  {
    name: 'Amouage',
    img: Brand4,
    link: '/brands/amouage',
  },
  {
    name: 'Tom Ford',
    img: Brand5,
    link: '/brands/tom-ford',
  },
  {
    name: 'Clinique',
    img: Brand6,
    link: '/brands/clinique',
  },
]

const Brands = () => {
  return (
    <section className={styles.brandsSection}>
      <div className={styles.headerRow}>
        <Typography variant="h2" className={styles.title}>
          Shop By Brands
        </Typography>
        <a href="/brands" className={styles.allBrands}>
          <Typography variant="body" color='secondary' weight='bold' className={styles.allBrandsText}>
            All Brands
          </Typography>
          <span className={styles.arrow}>&rarr;</span>
        </a>
      </div>
      <div className={styles.grid}>
        {brands.map((brand) => (
          <a
            key={brand.name}
            href={brand.link}
            className={styles.brandCard}
            aria-label={brand.name}
          >
            <Image
              src={brand.img}
              alt={brand.name}
              className={styles.brandLogo}
              width={100}
              height={100}
            />
          </a>
        ))}
      </div>
    </section>
  )
}

export default Brands
