import React from "react";
import styles from './styles.module.css'

export const ShareButton = ({ onClick, disabled }) => {
    return (
        <div className={styles.container}>
            <div className={styles.outer}>
                <span className={styles.text}>Share</span>
                <button onClick={onClick} disabled={disabled}>
                    <i className='pi pi-share-alt' style={{ fontSize: '1.5em' }}/>
                </button>
            </div>
        </div>
    );
}
