import React from "react";
import styles from './styles.module.css'

export const PlaylistItem = (video) => {
    const star = video.favorite && <i className={`${styles.star} pi pi-star-fill`}>&nbsp;</i>;
    return (
        <div key={video.file} className={styles.container}>{star}{video.file}</div>
    );
}
