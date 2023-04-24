import React, { useState } from 'react';
import '../../styles/PhotoCard.module.css';
import styles from '../../styles/PhotoCard.module.css';

export default function CardPhoto(props) {
  const { url } = props

  return (
    <>
    <div className={styles.cardContainer}>
        <div className={styles.cardImg}>
        <img src={url} />
        </div>
    </div>
    </>
  );
}