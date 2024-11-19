import React from "react";
import {Button} from "primereact/button";
import styles from './styles.module.css'

export const SortByButton = ({ onClick, value }) => {
    return (
        <Button
            size="small"
            icon='pi pi-sort-alt'
            iconPos="right"
            className={styles.button}
            onClick={onClick}
            label={value === 'file' ? 'Filename' : 'Date created'}
            text
        />
    );
}
