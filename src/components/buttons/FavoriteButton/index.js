import React from "react";
import styles from './styles.module.css'

export const FavoriteButton = ({ onClick, value, disabled }) => {
    return (
        <div className={styles.container}>
            <div className={styles.outer}>
                <span className={styles.text}>Favorite</span>
                <button onClick={onClick} disabled={disabled}>
                    <i className={value ? "pi pi-star-fill" : "pi pi-star"} style={{ 'fontSize': '1.5em' }}/>
                </button>
            </div>
        </div>
    )
}
