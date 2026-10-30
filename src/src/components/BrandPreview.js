import React from 'react';
import styles from './BrandPreview.module.css';

// Composant pour prévisualiser les boutons
export function ButtonPreview({ type = 'primary', children = 'Button Example' }) {
  const className = `${styles.btn} ${styles[`btn-${type}`]}`;
  
  return (
    <div className={styles.preview}>
      <button className={className}>
        {children}
      </button>
    </div>
  );
}

// Composant pour prévisualiser les liens
export function LinkPreview({ type = 'navigation', children = 'Example Link' }) {
  const className = `${styles.link} ${styles[`link-${type}`]}`;
  return (
    <div className={styles.preview}>
      <a href="#" className={className} onClick={(e) => e.preventDefault()}>
        {children}
      </a>
    </div>
  );
}

//Composant pour prévisualiser les messages flash
export function FlashPreview({ type = 'info', children = 'Example Flash Message' }) {
  const className = `${styles.flash} ${styles[`flash-${type}`]}`;
  return (
    <div className={styles.preview}>
      <div className={className}>{children}</div>
    </div>
  );
}