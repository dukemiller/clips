import React from "react";
import PlaylistItem from "./PlaylistItem";
import {ListBox} from "primereact/listbox";

const Playlist = ({ value, values, onChange }) => {
    return (
        <ListBox
            value={value}
            options={values}
            itemTemplate={PlaylistItem}
            optionLabel={"file"}
            onChange={onChange}
            focusOnHover={true}
            listClassName={'playlist'}
        />
    );
}

export default Playlist;