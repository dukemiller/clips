import React from "react";
import styles from './styles.module.css';

export const ProgressBar = ({ onMouseDown, onChange, onMouseUp, onProgress, value }) => {
    return (
        <div className={styles.container}>
            <input
                type='range'
                className={styles.main}
                min={0} max={0.999999}
                step='any'
                value={value}
                onMouseDown={onMouseDown}
                onChange={onChange}
                onMouseUp={onMouseUp}
                onProgress={onProgress}
            />
        </div>
    );
}
