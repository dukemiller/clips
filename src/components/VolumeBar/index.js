import React from "react";
import styles from './styles.module.css'

export const VolumeBar = ({ value, onChange }) => {
    return (
        <div className={styles.container}>
            <input type='range'
                   min={0} max={1} step='any'
                   className={styles.main}
                   value={value}
                   onChange={onChange}/>
        </div>
    );
}
