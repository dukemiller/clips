import React from "react";
import styles from './styles.module.css'

export const PlaylistItem = (video) => {
  const star = video.favorite && <i className={`${styles.star} pi pi-star-fill`}>&nbsp;</i>;
  const creationDate = video.date ? video.date.split(' ')[0].substring(2).replace(/(\d+)-(\d+)-(\d+)/, '$2/$3/$1') : '';

  return (
    <div key={video.file} className={styles.container}>
      <div className={styles.title}>
        {star}
        <span>{video.file}</span>
      </div>
      <div className={styles.creationDate}>{creationDate}</div>
    </div>
  );
}
