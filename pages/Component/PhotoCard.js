import React, { useState } from 'react';
import '../../styles/PhotoCard.module.css';
import styles from '../../styles/PhotoCard.module.css';

export default function CardPhoto() {
  return (
    <>
    <div className={styles.cardContainer}>
        <div className={styles.cardImg}>
        </div>
        <div className={styles.cardText}>
            <p>Albumname</p>
        </div>
    </div>
    </>
  );
}
