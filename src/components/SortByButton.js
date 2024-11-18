import React from "react";
import {Button} from "primereact/button";

const SortByButton = ({ onClick, value }) => {
    return (
        <Button
            size="small"
            icon='pi pi-sort-alt'
            iconPos="right"
            style={{ float: 'right' }}
            onClick={onClick}
            label={value === 'file' ? 'Filename' : 'Date created'}
            text
        />
    );
}

export default SortByButton;