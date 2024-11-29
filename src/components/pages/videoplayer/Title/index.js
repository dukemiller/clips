import React from "react";
import styles from './styles.module.css'

export const Title = ({ text }) => {
  return (
    <center>
      <h1 className={styles.main}>{text}</h1>
    </center>
  );
}
