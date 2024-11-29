import React from "react";
import {PlaylistItem} from "../PlaylistItem";
import {ListBox} from "primereact/listbox";
import styles from './styles.module.css'

export const Playlist = ({ value, values, onChange }) => {
    return (
        <ListBox
            value={value}
            options={values}
            itemTemplate={PlaylistItem}
            optionLabel={"file"}
            onChange={onChange}
            focusOnHover={true}
            className={styles.main}
            listClassName={styles.playlist}
        />
    );
}
