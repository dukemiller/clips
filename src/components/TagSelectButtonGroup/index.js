import {TagSelectButton} from "../TagSelectButton";
import {SelectButton} from "primereact/selectbutton";
import React from "react";
import styles from './styles.module.css'

export const TagSelectButtonGroup = ({ value, onChange, values }) => {
    return (
        <div className={styles.container}>
            <SelectButton
                allowEmpty={false}
                value={value}
                options={values}
                itemTemplate={TagSelectButton}
                optionValue={'name'}
                optionLabel={'name'}
                onChange={({ value }) => onChange(value || "Untagged")}
            />
        </div>
    );
}