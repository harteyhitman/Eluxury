import styles from './EnvironmentSelector.module.scss';
import Image from 'next/image';

export const EnvironmentSelector = ({
  environments,
  currentEnvironment,
  onChange
}: {
  environments: any[];
  currentEnvironment: any;
  onChange: (env: any) => void;
}) => {
  return (
    <div className={styles.selector}>
      <h3 className={styles.selectorTitle}>Select Environment</h3>
      <div className={styles.environmentGrid}>
        {environments.map((env) => (
          <button
            key={env.id}
            className={`${styles.environmentButton} ${
              env.id === currentEnvironment.id ? styles.active : ''
            }`}
            onClick={() => onChange(env)}
            aria-label={`Show ${env.name} environment`}
          >
            <div className={styles.environmentImageWrapper}>
              <Image
                src={env.image}
                alt=""
                fill
                className={styles.environmentThumbnail}
              />
            </div>
            <span className={styles.environmentName}>{env.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};