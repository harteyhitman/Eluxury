import styles from './team.module.scss';
import Image from 'next/image';

const teamMembers = [
  {
    name: 'Élise Laurent',
    position: 'Creative Director',
    image: 'https://res.cloudinary.com/ddguvwiyp/image/upload/v1752069092/creative-director_xzvcac.jpg',
    bio: 'With over 20 years in luxury design, Élise brings a visionary approach to our collections.'
  },
  {
    name: 'Henri Dubois',
    position: 'Master Artisan',
    image: 'https://res.cloudinary.com/ddguvwiyp/image/upload/v1752069065/specialist_gcaf09.jpg',
    bio: 'A third-generation watchmaker, Henri oversees our timepiece craftsmanship.'
  },
  {
    name: 'Sophie Moreau',
    position: 'Materials Specialist',
    image: 'https://res.cloudinary.com/ddguvwiyp/image/upload/v1752069060/master_ck3omj.jpg',
    bio: 'Sophie travels the world sourcing only the finest materials for our creations.'
  }
];

export const Team = () => {
  return (
    <div className={styles.team}>
      <h3 className={styles.title}>Meet Our Guardians of Quality</h3>
      <p className={styles.subtitle}>
        Our team of experts ensures every piece meets our exacting standards
      </p>
      
      <div className={styles.teamGrid}>
        {teamMembers.map((member, index) => (
          <div key={index} className={styles.teamMember}>
            <div className={styles.imageWrapper}>
              <Image
                src={member.image}
                alt={member.name}
                width={300}
                height={300}
                className={styles.image}
              />
            </div>
            <h4 className={styles.memberName}>{member.name}</h4>
            <p className={styles.memberPosition}>{member.position}</p>
            <p className={styles.memberBio}>{member.bio}</p>
          </div>
        ))}
      </div>
    </div>
  );
};